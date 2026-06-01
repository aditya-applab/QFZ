// ============================================================
//  QFZ Observatory — Development & Operations
// ============================================================
function ZoneSummaryCards() {
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:14 }}>
      {ZONE_SUMMARY.map((z, i) => (
        <div key={z.label} style={{ animation:`fadeIn .5s ease-out ${i*60}ms both` }}>
          <KpiCard label={z.label} value={z.unit==='%' ? `${z.value}%` : (z.unit ? `${z.value} ${z.unit}` : z.value)} sub={z.sub} sparkColor={z.color} accent={z.color} />
        </div>
      ))}
    </div>
  );
}

function MasterPlan() {
  const [sel, setSel] = useState(PLOTS.find(p=>p.id==='P-B22'));
  const blocks = ['A','B','C','D'];
  const statusTone = { 'Built':QFZ.green, 'Under Dev.':QFZ.warm, 'Open':QFZ.gray };
  return (
    <Card style={{ padding:24 }}>
      <div className="card-header">
        <div><div className="card-eyebrow">Ras Bufontas Free Zone</div><div className="card-title">Master Plan · Live Plot Status</div><div className="card-subtitle">Click any plot to inspect allocation, power and build status</div></div>
        <div style={{ display:'flex', gap:14, alignItems:'center' }}>
          {Object.entries(statusTone).map(([k,c])=>(<span key={k} style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:11, fontWeight:600, color:QFZ.textSec }}><span style={{ width:9, height:9, borderRadius:3, background:c }} />{k}</span>))}
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap:20, alignItems:'start' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {blocks.map(b => {
            const cells = PLOTS.filter(p=>p.block===b);
            return (
              <div className="plot-grid" key={b} style={{ gridTemplateColumns:`80px repeat(${Math.max(3,cells.length)}, 1fr)` }}>
                <div className="plot-block-label">Block {b}</div>
                {cells.map(p => {
                  const open = p.status==='Open';
                  return (
                    <div key={p.id} className={`plot-cell ${open?'open':''} ${sel&&sel.id===p.id?'sel':''}`}
                         style={ open?{}:{ background:`linear-gradient(150deg, ${p.color} 0%, ${hexA(p.color,0.82)} 100%)`, color:'#fff' } }
                         onClick={()=>setSel(p)}>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                        <span className="pid">{p.id}</span>
                        <span className="pstatus">{p.status.toUpperCase()}</span>
                      </div>
                      <div>
                        <div className="psec"><span className="s">{p.sector!=='—'?p.sector:'Available'}</span><span className="z">{open?'':`${(p.size/1000).toFixed(1)}K m²`}</span></div>
                        {!open && <div className="plot-meter"><div style={{ width:`${p.util}%` }} /></div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <PlotDetail plot={sel} statusTone={statusTone} />
      </div>
    </Card>
  );
}

function PlotDetail({ plot, statusTone }) {
  if (!plot) return null;
  const open = plot.status==='Open';
  const c = open ? QFZ.gray : plot.color;
  return (
    <div className="fz-profile" key={plot.id} style={{ position:'sticky', top:8 }}>
      <div className="fz-profile-head">
        <span className="fz-chip" style={{ background:hexA(c,0.14), color:c }}><span className="dot" style={{ background:c }} /> Plot {plot.id}</span>
        <h3>{open ? 'Available plot' : plot.investor}</h3>
        <p>Block {plot.block} · {open ? 'Open for allocation in Phase 2' : `Allocated to ${plot.investor}`}</p>
      </div>
      <div className="fz-stat-grid">
        <FzStat label="Land area" value={`${fmt.int(plot.size)} m²`} />
        <FzStat label="Sector" value={plot.sector} />
        <FzStat label="Build status" value={plot.status} />
        <FzStat label="Power" value={plot.power} />
      </div>
      <div style={{ marginTop:14 }}>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, fontWeight:600, marginBottom:6 }}>
          <span style={{ color:QFZ.textSec }}>Capacity utilization</span><span style={{ color:c }}>{plot.util}%</span>
        </div>
        <Bullet pct={plot.util} color={c} height={8} />
      </div>
      <div className="fz-anchor" style={{ background:hexA(c,0.05), borderColor:hexA(c,0.16) }}>
        <div className="lbl">Allocated to</div>
        <div className="val"><span style={{ width:24, height:24, borderRadius:7, background:c, color:'#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:600 }}>{open?'—':plot.investor.split(/\s+/).slice(0,2).map(w=>w[0]).join('')}</span> {open?'Unallocated':plot.investor}</div>
      </div>
      <button className="btn primary" style={{ marginTop:16, justifyContent:'center', width:'100%' }}>View full plot report <Icon name="arrow" size={13} /></button>
    </div>
  );
}

function LandMix() {
  const total = LAND_BY_TYPE.reduce((a,b)=>a+b.value,0);
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
      <Card style={{ padding:24 }}>
        <div className="card-header"><div><div className="card-eyebrow">Master plan composition</div><div className="card-title">Land by Zone Type</div><div className="card-subtitle">Total area · million m²</div></div></div>
        <GradientBars data={LAND_BY_TYPE.map(l=>({name:l.type,value:l.value,color:l.color}))} height={220} unit="M" />
      </Card>
      <Card style={{ padding:24 }}>
        <div className="card-header"><div><div className="card-eyebrow">Allocation status</div><div className="card-title">Allocated vs Available</div><div className="card-subtitle">Share of total master-plan area</div></div></div>
        <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:24, alignItems:'center' }}>
          <div className="donut-host" style={{ width:200, height:200 }}>
            <Donut height={200} data={[{name:'Allocated',value:63.3,color:QFZ.green},{name:'Under development',value:12.6,color:QFZ.warm},{name:'Available',value:24.1,color:'rgba(64,65,66,0.18)'}]} formatter={(p)=>`<b>${p.name}</b><br/>${p.value}%`} />
            <div className="donut-c"><div className="dv">63.3%</div><div className="dl">allocated</div></div>
          </div>
          <div className="legend-list">
            {[{n:'Allocated',v:'16.25M m²',p:'63.3%',c:QFZ.green},{n:'Under development',v:'3.24M m²',p:'12.6%',c:QFZ.warm},{n:'Available',v:'9.43M m²',p:'24.1%',c:'rgba(64,65,66,0.3)'}].map(r=>(
              <div className="legend-row" key={r.n}><span className="sw" style={{ background:r.c }} /><div className="nm">{r.n}<div style={{ fontSize:10, color:QFZ.textMuted, fontWeight:600 }}>{r.v}</div></div><span className="pc">{r.p}</span></div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

function DevOpsPage() {
  return (
    <div className="page-col">
      <ZoneSummaryCards />
      <Card style={{ padding:24 }}>
        <div className="card-header">
          <div><div className="card-eyebrow">Zoning &amp; master plan</div><div className="card-title">Zoning &amp; Master Plan Dashboard</div><div className="card-subtitle">Click a free zone to zoom in and inspect any plot across all zones</div></div>
          <div style={{ display:'flex', gap:8 }}>
            <button className="btn ghost"><Icon name="filter" size={13} /> Filter</button>
            <button className="btn ghost"><Icon name="download" size={13} /> Export</button>
          </div>
        </div>
        <MasterPlanMap />
      </Card>
      <MasterPlan />
      <LandMix />
    </div>
  );
}
Object.assign(window, { DevOpsPage });
