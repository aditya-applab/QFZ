// ============================================================
//  QFZ Observatory — interactive Qatar map (ECharts geo)
// ============================================================
echarts.registerMap('qatar', QATAR_GEOJSON);

function FreeZonesMap() {
  const [sel, setSel] = useState('rb');
  const zone = FREE_ZONES.find(z => z.id === sel) || FREE_ZONES[0];

  const option = useMemo(() => ({
    geo: {
      map: 'qatar', roam: true, scaleLimit: { min: 1, max: 6 }, zoom: 1.62, center: [51.45, 25.25], top: 24, bottom: 24,
      itemStyle: {
        areaColor: new echarts.graphic.LinearGradient(0,0,0,1, [
          { offset: 0, color: 'rgba(37,64,163,0.10)' }, { offset: 1, color: 'rgba(37,64,163,0.05)' }]),
        borderColor: 'rgba(37,64,163,0.55)', borderWidth: 1.4,
        shadowColor: 'rgba(37,64,163,0.25)', shadowBlur: 24, shadowOffsetY: 8,
      },
      emphasis: { itemStyle: { areaColor: 'rgba(37,64,163,0.14)' }, label: { show: false } },
      select: { itemStyle: { areaColor: 'rgba(37,64,163,0.14)' }, label: { show: false } },
      silent: true,
    },
    tooltip: { trigger: 'item', ...tooltipBox, formatter: (p) => p.data && p.data.zoneName
      ? `<b>${p.data.zoneName}</b><br/>${p.data.investors} investors · ${p.data.occ}% occupancy` : '' },
    series: [
      { name: 'Doha', type: 'scatter', coordinateSystem: 'geo', z: 4, silent: true,
        symbol: 'circle', symbolSize: 13, data: [{ value: DOHA.coord }],
        itemStyle: { color: '#fff', borderColor: QFZ.charcoal, borderWidth: 3 },
        label: { show: true, formatter: 'Doha', position: 'right', color: QFZ.charcoal, fontWeight: 600, fontSize: 12 } },
      { name: 'Zones', type: 'effectScatter', coordinateSystem: 'geo', z: 6,
        rippleEffect: { brushType: 'stroke', scale: 3.2, period: 3.4 },
        symbolSize: (v, p) => (p.data.id === sel ? 26 : 17),
        data: FREE_ZONES.map(z => ({ value: z.coord, id: z.id, zoneName: z.name, investors: z.investors, occ: z.occupancy,
          itemStyle: { color: z.color, borderColor: '#fff', borderWidth: 2.5,
            shadowColor: hexA(z.color, 0.6), shadowBlur: z.id === sel ? 22 : 8,
            opacity: z.id === sel ? 1 : 0.92 } })),
        label: { show: true, formatter: (p) => p.data.id === sel ? `{b|${FREE_ZONES.find(z=>z.id===p.data.id).short}}` : '',
          position: 'top', distance: 10,
          rich: { b: { color: QFZ.text, fontWeight: 600, fontSize: 12.5, backgroundColor: 'rgba(255,255,255,0.85)', padding: [3,7], borderRadius: 6 } } },
        emphasis: { scale: 1.25 } },
    ],
    animationDuration: 900,
  }), [sel]);

  const events = useMemo(() => ({ click: (p) => { if (p.data && p.data.id) { setSel(p.data.id); setPlot(null); } } }), []);
  const [tilt, setTilt] = useState(false);
  const [plot, setPlot] = useState(null);
  const plots = ZONE_PLOTS[sel] || [];

  return (
    <div className="fz-map-wrap">
      <div className="fz-map-stage">
        <div className="fz-compass" aria-hidden="true"><span>N</span><Icon name="arrowUp" size={11} /><small>S</small></div>
        <div className="fz-map-tools">
          <button className={`fz-tool ${tilt ? 'on' : ''}`} onClick={() => setTilt(t => !t)} title="Toggle 2D / 3D view">{tilt ? '3D' : '2D'}</button>
        </div>
        <div className="fz-legend">
          {FREE_ZONES.map(z => (
            <button key={z.id} className={`fz-legend-item ${z.id===sel?'on':''}`} onClick={() => { setSel(z.id); setPlot(null); }}>
              <span className="dot" style={{ background: z.color }} /> {z.short}
            </button>
          ))}
        </div>
        <div className={`fz-map-canvas ${tilt ? 'tilt-3d' : ''}`}>
          <EChart option={option} height={460} onEvents={events} />
        </div>
        <div className="fz-map-hint">Scroll to zoom · drag to pan</div>
      </div>
      {plot
        ? <PlotDetailPanel plot={plot} onBack={() => setPlot(null)} />
        : <ZoneProfile zone={zone} plots={plots} onPlot={setPlot} />}
    </div>
  );
}

function ZoneProfile({ zone, plots = [], onPlot }) {
  return (
    <div className="fz-profile" key={zone.id}>
      <div className="fz-profile-head">
        <span className="fz-chip" style={{ background: hexA(zone.color, 0.14), color: zone.color }}>
          <span className="dot" style={{ background: zone.color }} /> Free zone profile
        </span>
        <h3>{zone.name}</h3>
        <p>{zone.tagline}</p>
      </div>
      <div className="fz-stat-grid">
        <FzStat label="Total area" value={zone.area} />
        <FzStat label="Active investors" value={zone.investors} />
        <FzStat label="Plots" value={zone.plots} />
        <FzStat label="Occupancy" value={`${zone.occupancy}%`} />
      </div>
      <div className="fz-plots">
        <div className="fz-plots-head">
          <span className="lbl">Plots in this zone</span>
          <span className="cnt">{plots.length} plots · click to inspect</span>
        </div>
        <div className="fz-plot-grid">
          {plots.map(p => (
            <button key={p.id} className="fz-plot-chip" onClick={() => onPlot(p)} style={{ borderColor: hexA(p.color, 0.35) }}>
              <span className="fz-plot-dot" style={{ background: p.color }} />
              <span className="fz-plot-id">{p.id}</span>
              <span className="fz-plot-st" style={{ color: p.color }}>{p.status}</span>
              <span className="fz-plot-area">{fmt.int(p.totalArea)} m²</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlotDetailPanel({ plot, onBack }) {
  const [tab, setTab] = useState('Overview');
  const tabs = ['Overview', 'Investor', 'Infrastructure', 'History'];
  return (
    <div className="fz-profile plot-detail-panel" key={plot.id}>
      <button className="plot-back" onClick={onBack}><Icon name="chevronLeft" size={14} /> Back to zone</button>
      <div className="plot-detail-head">
        <div>
          <span className="fz-chip" style={{ background: hexA(plot.color, 0.14), color: plot.color }}>
            <span className="dot" style={{ background: plot.color }} /> Plot {plot.id}
          </span>
          <h3>{plot.zoneShort} · Block {plot.block}</h3>
        </div>
        <span className="plot-status-tag" style={{ background: hexA(plot.color, 0.12), color: plot.color }}>{plot.status}</span>
      </div>
      <div className="plot-area-row">
        <div className="plot-area-cell"><div className="v">{fmt.int(plot.totalArea)}</div><div className="l">Total m²</div></div>
        <div className="plot-area-cell"><div className="v" style={{ color: QFZ.blue }}>{fmt.int(plot.allocated)}</div><div className="l">Allocated</div></div>
        <div className="plot-area-cell"><div className="v" style={{ color: QFZ.green }}>{fmt.int(plot.available)}</div><div className="l">Available</div></div>
      </div>
      <div className="plot-tabs">
        {tabs.map(t => <button key={t} className={`plot-tab ${tab===t?'on':''}`} onClick={() => setTab(t)}>{t}</button>)}
      </div>
      <div className="plot-tab-body">
        {tab === 'Overview' && (
          <div className="plot-kv">
            {[['Zone type', plot.zoneType], ['Sector', plot.sector], ['Sub-sector', plot.subSector],
              ['Land use', plot.landUse], ['Building status', plot.buildingStatus], ['Land status', plot.landStatus]].map(([k,v]) =>
              <div className="plot-kv-row" key={k}><span className="k">{k}</span><span className="v">{v}</span></div>)}
          </div>
        )}
        {tab === 'Investor' && (
          plot.investor === '—'
            ? <div className="plot-empty"><Icon name="layers" size={22} /><p>This plot is available for allocation.</p></div>
            : <div className="plot-kv">
                {[['Investor', plot.investor], ['Lease type', plot.leaseType], ['Allocation date', plot.allocationDate],
                  ['Lease end', plot.leaseEnd], ['Utilization', `${plot.util}%`]].map(([k,v]) =>
                  <div className="plot-kv-row" key={k}><span className="k">{k}</span><span className="v">{v}</span></div>)}
              </div>
        )}
        {tab === 'Infrastructure' && (
          <div className="plot-kv">
            {[['Power availability', plot.power], ['Water availability', plot.water], ['Road access', plot.roadAccess]].map(([k,v]) =>
              <div className="plot-kv-row" key={k}><span className="k">{k}</span><span className="v">{v}</span></div>)}
          </div>
        )}
        {tab === 'History' && (
          <div className="plot-timeline">
            {[['Plot registered', '12 Jan 2023'], ['Allocation ' + (plot.investor==='—'?'pending':'confirmed'), plot.allocationDate], ['Infrastructure handover', plot.status==='Available'?'—':'08 Mar 2024'], ['Latest inspection', '21 Apr 2026']].map(([k,v],i) =>
              <div className="plot-tl-row" key={i}><span className="dot" style={{ background: plot.color }} /><div><div className="k">{k}</div><div className="v">{v}</div></div></div>)}
          </div>
        )}
      </div>
      {plot.status !== 'Available' &&
        <div style={{ marginTop: 4 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
            <span style={{ color: QFZ.textSec }}>Capacity utilization</span><span style={{ color: plot.color }}>{plot.util}%</span>
          </div>
          <Bullet pct={plot.util} color={plot.color} height={8} />
        </div>}
    </div>
  );
}
function FzStat({ label, value, wide }) {
  return (
    <div className={`fz-stat ${wide ? 'wide' : ''}`}>
      <div className="lbl">{label}</div><div className="val">{value}</div>
    </div>
  );
}

Object.assign(window, { FreeZonesMap, ZoneProfile, FzStat, PlotDetailPanel });
