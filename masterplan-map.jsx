// ============================================================
//  QFZ Observatory — Real interactive Qatar map (Leaflet + satellite tiles)
//  Click a zone → map flies in and reveals its plots as polygons.
//  Click a plot → highlight + popup + right detail panel.
// ============================================================

// Real-ish coordinates [lat, lng]
const FZ_LATLNG = {
  rb:  [25.245, 51.565], ua: [24.99, 51.585], dtp: [25.32, 51.44],
  awi: [25.135, 51.555], lhc: [25.42, 51.49],
};
const QATAR_CENTER = [25.28, 51.30];

function plotBounds(zoneId) {
  const [lat, lng] = FZ_LATLNG[zoneId] || QATAR_CENTER;
  const plots = ZONE_PLOTS[zoneId] || [];
  const n = plots.length;
  const cols = Math.ceil(Math.sqrt(n));
  const rows = Math.ceil(n / cols);
  const cell = 0.0060, gap = 0.0012;
  const totalW = cols * cell + (cols - 1) * gap;
  const totalH = rows * cell + (rows - 1) * gap;
  const startLng = lng - totalW / 2;
  const startLat = lat + totalH / 2;
  return plots.map((p, i) => {
    const c = i % cols, r = Math.floor(i / cols);
    const x0 = startLng + c * (cell + gap);
    const y1 = startLat - r * (cell + gap);
    return { ...p, bounds: [[y1 - cell, x0], [y1, x0 + cell]] };
  });
}

const MP_LEGEND = [
  { label: 'Allocated', color: QFZ.blue },
  { label: 'Available', color: QFZ.green },
  { label: 'Under development', color: QFZ.warm },
  { label: 'Reserved', color: QFZ.burgundySoft },
];

function MasterPlanMap() {
  const mapEl = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const plotLayerRef = useRef(null);
  const plotShapesRef = useRef({});
  const [zone, setZone] = useState(null);
  const [plot, setPlot] = useState(null);
  const [base, setBase] = useState('sat'); // sat | map
  const zoneRef = useRef(null);
  zoneRef.current = zone;

  // init map once
  useEffect(() => {
    if (!mapEl.current || mapRef.current) return;
    const map = L.map(mapEl.current, { zoomControl: false, attributionControl: false, scrollWheelZoom: true });
    mapRef.current = map;
    map.setView(QATAR_CENTER, 9);
    L.control.zoom({ position: 'topright' }).addTo(map);
    addBase(map, 'sat');
    // zone markers
    Object.keys(FZ_LATLNG).forEach(zid => {
      const z = FREE_ZONES.find(f => f.id === zid);
      const icon = L.divIcon({ className: 'mp-pin-wrap', html:
        `<span class="mp-pin" style="--c:${z.color}"><span class="mp-pin-dot"></span></span><span class="mp-pin-label">${z.short}</span>`,
        iconSize: [0, 0], iconAnchor: [0, 0] });
      const m = L.marker(FZ_LATLNG[zid], { icon }).addTo(map);
      m.on('click', () => focusZone(zid));
      markersRef.current[zid] = m;
    });
    plotLayerRef.current = L.layerGroup().addTo(map);
    setTimeout(() => map.invalidateSize(), 250);
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  function addBase(map, kind) {
    if (map.__base) { map.__base.forEach(l => map.removeLayer(l)); }
    const layers = [];
    if (kind === 'sat') {
      layers.push(L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19 }));
      layers.push(L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', { maxZoom: 19, opacity: 0.9 }));
    } else {
      layers.push(L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { maxZoom: 19 }));
    }
    layers.forEach(l => l.addTo(map));
    map.__base = layers;
  }

  function drawPlots(zid) {
    const layer = plotLayerRef.current; if (!layer) return;
    layer.clearLayers(); plotShapesRef.current = {};
    plotBounds(zid).forEach(p => {
      const rect = L.rectangle(p.bounds, { color: '#fff', weight: 1.5, fillColor: p.color, fillOpacity: 0.55 });
      rect.on('click', () => selectPlot(p));
      rect.bindTooltip(p.id, { permanent: true, direction: 'center', className: 'mp-plot-tip' });
      rect.addTo(layer);
      plotShapesRef.current[p.id] = { rect, plot: p };
    });
  }

  function focusZone(zid) {
    setZone(zid); setPlot(null);
    drawPlots(zid);
    const map = mapRef.current;
    if (map) map.flyTo(FZ_LATLNG[zid], 14, { duration: 1.1 });
  }

  function selectPlot(p) {
    setPlot(p);
    // restyle shapes
    Object.entries(plotShapesRef.current).forEach(([id, s]) => {
      s.rect.setStyle({ weight: id === p.id ? 3 : 1.5, fillOpacity: id === p.id ? 0.8 : 0.45 });
      if (id === p.id) s.rect.bringToFront();
    });
    const map = mapRef.current;
    if (map) {
      const c = [(p.bounds[0][0] + p.bounds[1][0]) / 2, (p.bounds[0][1] + p.bounds[1][1]) / 2];
      L.popup({ className: 'mp-pop', closeButton: false, offset: [0, -4] })
        .setLatLng(c)
        .setContent(
          `<div class="mp-pop-head"><b>Plot ${p.id}</b><span style="background:${p.color}">${p.status}</span></div>` +
          `<div class="mp-pop-row"><span>Total</span><b>${fmt.int(p.totalArea)} m²</b></div>` +
          `<div class="mp-pop-row"><span>Allocated</span><b>${fmt.int(p.allocated)} m²</b></div>` +
          `<div class="mp-pop-row"><span>Investor</span><b>${p.investor}</b></div>`)
        .openOn(map);
    }
  }

  function reset() {
    setZone(null); setPlot(null);
    if (plotLayerRef.current) plotLayerRef.current.clearLayers();
    const map = mapRef.current;
    if (map) { map.closePopup(); map.flyTo(QATAR_CENTER, 9, { duration: 1.0 }); }
  }

  function switchBase(kind) { setBase(kind); if (mapRef.current) addBase(mapRef.current, kind); }

  const zoneObj = zone ? FREE_ZONES.find(z => z.id === zone) : null;

  return (
    <div className="mp-wrap">
      <div className="mp-stage">
        <div ref={mapEl} className="mp-leaflet" />

        {/* base layer switch */}
        <div className="mp-base-switch">
          <button className={base === 'sat' ? 'on' : ''} onClick={() => switchBase('sat')}>Satellite</button>
          <button className={base === 'map' ? 'on' : ''} onClick={() => switchBase('map')}>Map</button>
        </div>

        {/* breadcrumb */}
        <div className="mp-crumb">
          <button onClick={reset} className={!zone ? 'on' : ''}>All free zones</button>
          {zoneObj && <><Icon name="chevronRight" size={12} /><span>{zoneObj.name}</span></>}
        </div>

        {/* legend */}
        <div className="mp-legend">
          <div className="mp-legend-title">Land status</div>
          {MP_LEGEND.map(l => <div key={l.label} className="mp-legend-row"><span className="sw" style={{ background: l.color }} />{l.label}</div>)}
        </div>

        {zone && <button className="mp-reset" onClick={reset}><Icon name="chevronLeft" size={13} /> All zones</button>}
        {!zone && <div className="mp-hint">Click a free zone pin to zoom in and reveal its plots</div>}
      </div>

      {plot
        ? <PlotDetailPanel plot={plot} onBack={() => { setPlot(null); if (mapRef.current) mapRef.current.closePopup(); }} />
        : <MapZonePanel zone={zoneObj} onPickZone={focusZone} activeZone={zone} onPlot={selectPlot} />}
    </div>
  );
}

function MapZonePanel({ zone, onPickZone, activeZone, onPlot }) {
  if (!zone) {
    return (
      <div className="fz-profile">
        <div className="fz-profile-head">
          <span className="fz-chip" style={{ background: hexA(QFZ.blue, 0.12), color: QFZ.blue }}><span className="dot" style={{ background: QFZ.blue }} /> Master plan</span>
          <h3>Qatar Free Zones · Land Bank</h3>
          <p>Select a free zone on the map to fly in, reveal its plots, and inspect any parcel.</p>
        </div>
        <div className="mp-zone-list">
          {FREE_ZONES.filter(z => ZONE_PLOTS[z.id]).map(z => {
            const plots = ZONE_PLOTS[z.id];
            const avail = plots.filter(p => p.status === 'Available').length;
            return (
              <button key={z.id} className="mp-zone-item" onClick={() => onPickZone(z.id)}>
                <span className="dot" style={{ background: z.color }} />
                <div className="nm">{z.name}<div className="mt">{plots.length} plots · {avail} available</div></div>
                <Icon name="chevronRight" size={15} />
              </button>
            );
          })}
        </div>
      </div>
    );
  }
  const plots = ZONE_PLOTS[activeZone] || [];
  return <ZoneProfile zone={zone} plots={plots} onPlot={onPlot} />;
}

Object.assign(window, { MasterPlanMap, MapZonePanel });
