// ============================================================
//  QFZ Observatory — core library (Icon, Logo, EChart, atoms, hooks)
// ============================================================
const { useState, useEffect, useRef, useMemo, useCallback, useLayoutEffect } = React;

/* ---------------- Icon set ---------------- */
const ICON_PATHS = {
  home: <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5z" />,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  chart: <><path d="M3 3v18h18" /><path d="M7 16l4-6 4 3 5-7" /></>,
  build: <><path d="M3 21h18" /><path d="M5 21V7l7-4 7 4v14" /><path d="M9 9h.01M9 13h.01M9 17h.01M14 9h.01M14 13h.01M14 17h.01" /></>,
  target: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
  wallet: <><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3" /><path d="M16 12h6" /><circle cx="16" cy="12" r="1.5" /></>,
  doc: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M8 13h8M8 17h6" /></>,
  folder: <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />,
  check: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></>,
  db: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" /></>,
  sparkle: <path d="M12 3l1.9 5.7L20 10l-6.1 1.3L12 17l-1.9-5.7L4 10l6.1-1.3z" />,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></>,
  search: <><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></>,
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  filter: <path d="M22 3H2l8 9.46V19l4 2v-8.54z" />,
  arrow: <><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></>,
  arrowDown: <><path d="M12 5v14" /><path d="M19 12l-7 7-7-7" /></>,
  arrowUp: <><path d="M12 19V5" /><path d="M5 12l7-7 7 7" /></>,
  arrowRight: <><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  chevronRight: <path d="M9 18l6-6-6-6" />,
  chevronLeft: <path d="M15 18l-9-6 9-6" />,
  chevronUp: <path d="M18 15l-6-6-6 6" />,
  menu: <path d="M3 12h18M3 6h18M3 18h18" />,
  map: <><path d="M1 6v16l7-3 8 3 7-3V3l-7 3-8-3-7 3z" /><path d="M8 3v15M16 6v15" /></>,
  pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
  briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>,
  license: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="M14 8h4M14 12h4M5 16h14" /></>,
  construction: <><path d="M3 21h18" /><path d="M5 21V10l7-7 7 7v11" /><rect x="9" y="13" width="6" height="8" /></>,
  industry: <><path d="M2 20h20" /><path d="M5 20V8l5 3V8l5 3V8l5 3v9" /></>,
  award: <><circle cx="12" cy="8" r="6" /><path d="M9 13l-2 8 5-3 5 3-2-8" /></>,
  money: <><circle cx="12" cy="12" r="10" /><path d="M12 6v12M9 9h4.5a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3H15" /></>,
  pulse: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>,
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5M12 15V3" /></>,
  bolt: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  flag: <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><path d="M4 22V15" /></>,
  info: <><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></>,
  close: <path d="M18 6L6 18M6 6l12 12" />,
  refresh: <><path d="M23 4v6h-6M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" /></>,
  file: <><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M13 2v7h7" /></>,
  star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />,
  user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>,
  list: <><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></>,
  layers: <><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" /></>,
  globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" /></>,
  zap: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  trending: <><path d="M23 6l-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" /></>,
  clock: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
  external: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6M10 14L21 3" /></>
};
function Icon({ name, size = 18, className = '', style }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      {ICON_PATHS[name] || null}
    </svg>);

}

/* ---------------- QFZ logo ---------------- */
function QFZLogo({ variant = 'color', height = 26, markOnly = false, flagOnly = false }) {
  const R = (typeof window !== 'undefined' && window.__resources) || {};
  const FULL_SRC = R.qfzLogoFull || 'qfz/qfz-logo-wordflag.png';
  const FLAG_SRC = R.qfzFlag || 'qfz/qfz-flag.png';
  // Collapsed rail and topbar button use the flag-only mark.
  if (markOnly || flagOnly) {
    return <img src={FLAG_SRC} alt="QFZ" style={{ height, width: 'auto', display: 'block' }} />;
  }
  return <img src={FULL_SRC} alt="QFZ" style={{ height, width: 'auto', display: 'block' }} />;
}

/* ---------------- ECharts React wrapper (animate on reveal + on remount) ---------------- */
function EChart({ option, height = 300, style, className = '', onEvents, group, notMerge = true }) {
  const ref = useRef(null);
  const chartRef = useRef(null);
  const optRef = useRef(option);
  const firstOpt = useRef(true);
  optRef.current = option;
  useEffect(() => {
    if (!ref.current) return;
    const chart = echarts.init(ref.current, null, { renderer: 'canvas' });
    chartRef.current = chart;
    if (group) chart.group = group;
    const ro = new ResizeObserver(() => chart.resize());
    ro.observe(ref.current);
    let done = false;
    // Hold the first paint until the chart scrolls into view, so its entrance animation
    // plays when the user actually sees it (not silently off-screen).
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done) {done = true;chart.setOption(optRef.current, true);}
    }, { threshold: 0.12 });
    io.observe(ref.current);
    // Fallback: if still not painted shortly after mount (e.g. zero-size observer race), paint anyway.
    const fb = setTimeout(() => {if (!done) {done = true;chart.setOption(optRef.current, true);}}, 1200);
    return () => {clearTimeout(fb);ro.disconnect();io.disconnect();chart.dispose();chartRef.current = null;};
  }, []);
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    if (firstOpt.current) {firstOpt.current = false;return;} // initial paint handled on reveal
    chart.setOption(option, notMerge);
  }, [option]);
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || !onEvents) return;
    const handlers = {};
    Object.entries(onEvents).forEach(([ev, fn]) => {handlers[ev] = fn;chart.on(ev, fn);});
    return () => {Object.entries(handlers).forEach(([ev, fn]) => chart.off(ev, fn));};
  }, [onEvents, option]);
  return <div ref={ref} className={className} style={{ width: '100%', height, ...style }} />;
}

/* ---------------- Hooks ---------------- */
function useHash() {
  const [hash, setHash] = useState(window.location.hash || '#/dashboards');
  useEffect(() => {
    const on = () => setHash(window.location.hash || '#/overview');
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const navigate = useCallback((h) => {window.location.hash = h;}, []);
  return [hash, navigate];
}

function useInView(opts = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {if (e.isIntersecting) {setInView(true);io.disconnect();}}, opts);
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

// Animated number count-up; starts when `run` becomes true
function useCountUp(target, { duration = 1100, run = true, decimals = 0 } = {}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf, start;
    const from = 0;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(from + (target - from) * eased);
      if (p < 1) raf = requestAnimationFrame(step);else
      setVal(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return decimals ? Number(val.toFixed(decimals)) : Math.round(val);
}

/* ---------------- formatting ---------------- */
const fmt = {
  int: (n) => n.toLocaleString('en-US'),
  dec: (n, d = 1) => Number(n).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })
};

/* ---------------- CountUp: animate any KPI string (prefix + number + suffix) ---------------- */
function parseCount(value) {
  if (typeof value === 'number') return { prefix: '', num: value, suffix: '', decimals: Number.isInteger(value) ? 0 : 1, comma: false };
  const s = String(value);
  const m = s.match(/^([^\d-]*)(-?\d[\d,]*\.?\d*)(.*)$/);
  if (!m) return null;
  const [, prefix, numStr, suffix] = m;
  if (/\d/.test(suffix)) return null; // e.g. "L3 → L4" — not a single metric
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
  const comma = numStr.includes(',');
  const num = parseFloat(numStr.replace(/,/g, ''));
  if (isNaN(num)) return null;
  return { prefix, num, suffix, decimals, comma };
}
function fmtCount(n, decimals, comma) {
  if (!comma && decimals === 0 && n >= 1000) return n.toLocaleString('en-US');
  return Number(n).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
function CountUp({ value, duration = 1200, className, style }) {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const p = useMemo(() => parseCount(value), [value]);
  const n = useCountUp(p ? p.num : 0, { run: inView && !!p, decimals: p ? p.decimals : 0, duration });
  if (!p) return <span className={className} style={{ ...style, fontWeight: "400" }}>{value}</span>;
  return <span ref={ref} className={className} style={{ ...style, color: "rgb(35, 35, 35)", fontWeight: "400", fontSize: "24px" }}>{p.prefix}{fmtCount(n, p.decimals, p.comma)}{p.suffix}</span>;
}

/* ---------------- UI atoms ---------------- */
function Card({ children, className = '', style, onClick, hover }) {
  return <div className={`card ${className}`} style={style} onClick={onClick}
  data-hover={hover ? '1' : undefined}>{children}</div>;
}
function Pill({ children, tone = 'neutral', style }) {
  return <span className={`pill ${tone}`} style={{ ...style, fontWeight: "400" }}>{children}</span>;
}
function SectionPill({ label, icon, variant = 'brand' }) {
  const map = {
    brand: ['rgba(37,64,163,0.10)', '#2540A3'], purple: ['rgba(134,32,65,0.10)', '#862041'],
    dark: ['rgba(64,65,66,0.08)', '#404142'], green: ['rgba(65,162,86,0.12)', '#41A256']
  };
  const [bg, fg] = map[variant] || map.brand;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 11px 5px 9px',
      borderRadius: 999, background: bg, color: fg, fontSize: 11.5, letterSpacing: 0.1, fontWeight: "600" }}>
      {icon && <Icon name={icon} size={13} />}{label}
    </span>);

}
function Delta({ value, tone, suffix }) {
  const t = tone || (String(value).trim().startsWith('-') ? 'down' : 'up');
  return (
    <span className={`kpi-delta ${t}`}>
      <Icon name={t === 'down' ? 'arrowDown' : 'arrowUp'} size={10} />{value}{suffix ? ` ${suffix}` : ''}
    </span>);

}

Object.assign(window, { Icon, QFZLogo, EChart, useHash, useInView, useCountUp, fmt, CountUp, Card, Pill, SectionPill, Delta,
  useState, useEffect, useRef, useMemo, useCallback, useLayoutEffect });