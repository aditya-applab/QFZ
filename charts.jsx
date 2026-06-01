// ============================================================
//  QFZ Observatory — chart components (ECharts)
//  Design language: clean & airy — soft fading gradient fills,
//  smooth lines, faint dashed gridlines, ruler tick axes,
//  rounded pill-cap columns, floating pill tooltips/markers.
// ============================================================
const AX = { textStyle: { fontFamily: 'Nunito Sans, sans-serif' } };

function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${a})`;
}
// brand palette cycle for multi-bar charts
const CHART_PALETTE = [QFZ.blue, QFZ.burgundy, QFZ.green, QFZ.warm, QFZ.mint, QFZ.blueSoft];
// soft top→bottom fade fill
function softFill(color, top = 0.22, bot = 0.0) {
  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  { offset: 0, color: hexA(color, top) }, { offset: 1, color: hexA(color, bot) }]);
}
// clean white pill tooltip
const tooltipBox = {
  backgroundColor: 'rgba(255,255,255,0.98)', borderColor: 'rgba(64,65,66,0.08)', borderWidth: 1,
  padding: [9, 13], textStyle: { color: QFZ.text, fontSize: 12, fontFamily: 'Nunito Sans' },
  extraCssText: 'border-radius:14px; box-shadow:0 10px 30px rgba(64,65,66,0.14); backdrop-filter:blur(8px);'
};
// faint dashed gridline
const splitDashed = { lineStyle: { color: 'rgba(64,65,66,0.07)', type: 'dashed' } };
// muted axis label
const axLabel = { color: 'rgba(64,65,66,0.55)', fontSize: 11.5, fontWeight: 600 };
// ruler-style category x-axis (thin baseline + light ticks)
function rulerX(data, extra = {}) {
  return {
    type: 'category', boundaryGap: extra.boundaryGap ?? false, data,
    axisLine: { lineStyle: { color: 'rgba(64,65,66,0.16)' } },
    axisTick: { show: true, alignWithLabel: extra.alignWithLabel ?? false, length: 5, interval: 0, lineStyle: { color: 'rgba(64,65,66,0.18)' } },
    axisLabel: { ...axLabel, margin: 14 },
    ...extra
  };
}
// floating "Highest" pill marker on a series max
function highestPill(color, unit = 'B') {
  return {
    symbol: 'roundRect', symbolSize: [78, 26], symbolOffset: [0, -20], silent: true,
    itemStyle: { color: '#fff', borderColor: hexA(color, 0.30), borderWidth: 1, shadowBlur: 12, shadowColor: 'rgba(64,65,66,0.14)' },
    label: { formatter: (p) => `▲ ${Number(p.value).toFixed(1)}${unit}`, color: QFZ.navy, fontSize: 11, fontWeight: 800 },
    data: [{ type: 'max' }]
  };
}

/* ---------------- Capex: Actual vs Target vs Last Year ---------------- */
function CapexLine({ height = 300, range = 'YTD' }) {
  const option = useMemo(() => ({
    ...AX,
    grid: { left: 8, right: 22, top: 30, bottom: 26, containLabel: true },
    legend: { show: false },
    tooltip: { trigger: 'axis', ...tooltipBox,
      axisPointer: { type: 'line', lineStyle: { color: 'rgba(64,65,66,0.25)', type: 'dashed' }, snap: true },
      valueFormatter: (v) => v == null ? '—' : `${v.toFixed(1)} B` },
    xAxis: rulerX(MONTHS),
    yAxis: { type: 'value', splitLine: splitDashed, axisLabel: { ...axLabel, formatter: '{value}B' } },
    series: [
    { name: 'Last Year', type: 'line', smooth: true, symbol: 'none', data: CAPEX.lastYear,
      lineStyle: { color: hexA(QFZ.gray, 0.85), width: 2, type: 'dashed' }, z: 1 },
    { name: 'Target', type: 'line', smooth: true, symbol: 'none', data: CAPEX.target,
      lineStyle: { color: hexA(QFZ.burgundy, 0.9), width: 2, type: 'dashed' }, z: 2,
      areaStyle: { color: softFill(QFZ.burgundy, 0.05, 0) } },
    { name: 'Actual', type: 'line', smooth: true, symbol: 'circle', symbolSize: 8, showSymbol: false,
      data: CAPEX.actual, lineStyle: { color: QFZ.blue, width: 2.2, type: 'dashed' },
      itemStyle: { color: QFZ.blue, borderColor: '#fff', borderWidth: 2 },
      areaStyle: { color: softFill(QFZ.blue, 0.15, 0) }, z: 3 }],

    animationDuration: 1300, animationEasing: 'cubicOut'
  }), [range]);
  return <EChart option={option} height={height} />;
}

/* ---------------- Clickable status donut (Application Tracker) ---------------- */
function StatusDonut({ stages, active, onSelect, height = 260 }) {
  const option = useMemo(() => ({
    ...AX,
    tooltip: { trigger: 'item', ...tooltipBox,
      formatter: (p) => `<b>${p.data.label}</b><br/>${p.value} deals · QAR ${p.data.amount}B (${p.percent}%)` },
    series: [{
      type: 'pie', radius: ['60%', '83%'], center: ['50%', '50%'], avoidLabelOverlap: false,
      padAngle: 3, itemStyle: { borderRadius: 8, borderWidth: 0 },
      label: { show: false }, labelLine: { show: false },
      emphasis: { scaleSize: 8, itemStyle: { shadowBlur: 16, shadowColor: 'rgba(64,65,66,0.16)' } },
      data: stages.map((s) => ({ value: s.count, name: s.id, label: s.label, amount: s.amount,
        itemStyle: { color: softFill(s.color, 1, 0.7), opacity: active && active !== s.id ? 0.3 : 1 },
        selected: active === s.id }))
    }],
    animationDuration: 950, animationType: 'expansion'
  }), [stages, active]);
  const events = useMemo(() => ({ click: (p) => onSelect && onSelect(p.data.name) }), [onSelect]);
  return <EChart option={option} height={height} onEvents={events} />;
}

/* ---------------- Radial "dotted ring" gauge ---------------- */
function RadialTicks({ value, max = 100, color = QFZ.blue, height = 220, ticks = 60, track = 'rgba(64,65,66,0.09)', raised = false }) {
  const option = useMemo(() => {
    const filled = Math.round(value / max * ticks);
    const litFill = raised ?
    new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: 'rgba(255,255,255,0.95)' },
    { offset: 0.5, color: color },
    { offset: 1, color: typeof color === 'string' && color.startsWith('#') ? hexA(color, 0.7) : color }]) :
    color;
    const litStyle = raised ?
    { color: litFill, shadowBlur: 9, shadowColor: 'rgba(0,0,0,0.28)', shadowOffsetX: 1, shadowOffsetY: 2 } :
    { color };
    const data = Array.from({ length: ticks }, (_, i) => ({
      value: 1, itemStyle: i < filled ? litStyle : { color: track } }));
    return { ...AX, tooltip: { show: false },
      series: [{ type: 'pie', radius: ['73%', '93%'], center: ['50%', '50%'], padAngle: 4,
        startAngle: 90, silent: true, label: { show: false }, labelLine: { show: false },
        data, animationDuration: 1100, animationEasing: 'cubicOut' }] };
  }, [value, max, color, ticks, track, raised]);
  return <EChart option={option} height={height} />;
}

/* ---------------- Standard donut ---------------- */
function Donut({ data, height = 220, inner = '62%', outer = '85%', onSelect, active, formatter }) {
  const option = useMemo(() => ({
    ...AX,
    tooltip: { trigger: 'item', ...tooltipBox, formatter: formatter || ((p) => `<b>${p.name}</b><br/>${p.value} (${p.percent}%)`) },
    series: [{ type: 'pie', radius: [inner, outer], center: ['50%', '50%'], padAngle: 2.5,
      itemStyle: { borderRadius: 7, borderWidth: 0 },
      label: { show: false }, labelLine: { show: false }, emphasis: { scaleSize: 7 },
      data: data.map((d) => ({ value: d.value, name: d.name,
        itemStyle: { color: d.color, opacity: active && active !== d.name ? 0.32 : 1 } })) }],
    animationDuration: 950
  }), [data, active]);
  const events = useMemo(() => ({ click: (p) => onSelect && onSelect(p.name) }), [onSelect]);
  return <EChart option={option} height={height} onEvents={events} />;
}

/* ---------------- Horizontal bars — soft fill + rounded pill cap ---------------- */
function GradientBars({ data, height = 240, max, unit = '', color = QFZ.blue }) {
  const option = useMemo(() => {
    const cats = data.map((d) => d.name).reverse();
    const vals = data.map((d) => d.value).reverse();
    const colors = data.map((d, i) => d.color || CHART_PALETTE[i % CHART_PALETTE.length]).reverse();
    return {
      ...AX,
      grid: { left: 6, right: 46, top: 8, bottom: 6, containLabel: true },
      tooltip: { trigger: 'axis', ...tooltipBox, axisPointer: { type: 'none' }, valueFormatter: (v) => `${fmt.int(v)}${unit}` },
      xAxis: { type: 'value', max, splitLine: { show: false }, axisLabel: { show: false }, axisLine: { show: false }, axisTick: { show: false } },
      yAxis: { type: 'category', data: cats, axisLine: { show: false }, axisTick: { show: false },
        axisLabel: { color: QFZ.text, fontSize: 11.5, fontWeight: 500, width: 130, overflow: 'truncate', margin: 12 } },
      series: [
      { type: 'bar', barWidth: 13, z: 1,
        data: vals.map((v, i) => ({ value: v, itemStyle: { borderRadius: 8,
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: hexA(colors[i], 0.22) }, { offset: 1, color: hexA(colors[i], 0.85) }]) } })),
        label: { show: true, position: 'right', color: QFZ.navy, fontSize: 12, fontWeight: 600,
          formatter: (p) => `${fmt.int(p.value)}${unit}` },
        animationDuration: 1100, animationEasing: 'cubicOut', animationDelay: (i) => i * 80 },
      { type: 'pictorialBar', symbol: 'roundRect', symbolSize: [7, 13], symbolPosition: 'end', symbolOffset: [-1, 0], z: 2,
        data: vals.map((v, i) => ({ value: v, itemStyle: { color: colors[i] } })),
        animationDuration: 1100, animationDelay: (i) => i * 80 + 200 }]

    };
  }, [data, max, unit, color]);
  return <EChart option={option} height={height} />;
}

/* ---------------- Vertical columns — soft fill + rounded pill cap ---------------- */
function GradientColumns({ cats, vals, height = 220, color = QFZ.blue, unit = '', colors }) {
  const option = useMemo(() => {
    const cs = cats.map((_, i) => colors && colors[i] || color || CHART_PALETTE[i % CHART_PALETTE.length]);
    return {
      ...AX,
      grid: { left: 6, right: 8, top: 22, bottom: 22, containLabel: true },
      tooltip: { trigger: 'axis', ...tooltipBox, axisPointer: { type: 'none' }, valueFormatter: (v) => `${v}${unit}` },
      xAxis: rulerX(cats, { boundaryGap: true, alignWithLabel: true }),
      yAxis: { type: 'value', splitLine: splitDashed, axisLabel: { ...axLabel } },
      series: [
      { type: 'bar', barWidth: 28, z: 1,
        data: vals.map((v, i) => ({ value: v, itemStyle: { borderRadius: 12,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: hexA(cs[i], 0.45) }, { offset: 1, color: hexA(cs[i], 0.03) }]) } })),
        animationDuration: 1000, animationDelay: (i) => i * 80 },
      { type: 'pictorialBar', symbol: 'roundRect', symbolSize: [28, 7], symbolPosition: 'end', symbolOffset: [0, -2], z: 2,
        data: vals.map((v, i) => ({ value: v, itemStyle: { color: cs[i] } })),
        animationDuration: 1000, animationDelay: (i) => i * 80 + 200 }]

    };
  }, [cats, vals, color, unit, colors]);
  return <EChart option={option} height={height} />;
}

/* ---------------- Hiring vs Attrition ---------------- */
function HiringAttrition({ height = 300 }) {
  const option = useMemo(() => ({
    ...AX,
    grid: { left: 8, right: 18, top: 30, bottom: 26, containLabel: true },
    tooltip: { trigger: 'axis', ...tooltipBox, axisPointer: { type: 'line', lineStyle: { color: 'rgba(64,65,66,0.25)', type: 'dashed' } } },
    legend: { show: false },
    xAxis: rulerX(HC.trendMonths),
    yAxis: { type: 'value', splitLine: splitDashed, axisLabel: { ...axLabel } },
    series: [
    { name: 'Monthly Target', type: 'line', smooth: true, symbol: 'none', data: HC.monthlyTarget,
      lineStyle: { color: hexA(QFZ.gray, 0.85), width: 2, type: 'dashed' } },
    { name: 'New Hires', type: 'line', smooth: true, symbol: 'circle', showSymbol: false, data: HC.hires,
      lineStyle: { color: QFZ.blue, width: 2.2, type: 'dashed' },
      itemStyle: { color: QFZ.blue, borderColor: '#fff', borderWidth: 2 }, areaStyle: { color: softFill(QFZ.blue, 0.15, 0) },
      markPoint: highestPill(QFZ.blue, '') },
    { name: 'Attrition', type: 'line', smooth: true, symbol: 'circle', showSymbol: false, data: HC.attrition,
      lineStyle: { color: QFZ.burgundy, width: 2.2, type: 'dashed' }, itemStyle: { color: QFZ.burgundy, borderColor: '#fff', borderWidth: 2 },
      areaStyle: { color: softFill(QFZ.burgundy, 0.11, 0) } }],

    animationDuration: 1300
  }), []);
  return <EChart option={option} height={height} />;
}

/* ---------------- mini sparkline ---------------- */
function Sparkline({ values, color = QFZ.blue, height = 40 }) {
  const option = useMemo(() => ({
    grid: { left: 2, right: 2, top: 6, bottom: 4 },
    xAxis: { type: 'category', show: false, boundaryGap: false, data: values.map((_, i) => i) },
    yAxis: { type: 'value', show: false, scale: true },
    tooltip: { show: false },
    series: [{ type: 'line', data: values, smooth: true, symbol: 'none',
      lineStyle: { color, width: 1.5, type: 'dashed' }, areaStyle: { color: softFill(color, 0.16, 0) } }],
    animationDuration: 1000
  }), [values, color]);
  return <EChart option={option} height={height} />;
}

/* ---------------- mini bullet progress ---------------- */
function Bullet({ pct, color = QFZ.blue, height = 7, track = 'rgba(64,65,66,0.08)', delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ height, background: track, borderRadius: 99, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: inView ? `${Math.min(100, pct)}%` : 0,
        background: color,
        borderRadius: 99, transition: `width 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }} />
    </div>);

}

/* ---------------- KPI card — clean & airy (uppercase label, soft number,
     pastel sparkline, soft growth pill) ---------------- */
function sparkFrom(seed) {
  let h = 0;const s = String(seed);
  for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) >>> 0;
  const pts = [];let v = 42 + h % 16;
  for (let i = 0; i < 12; i++) {const n = (h >> i % 7 & 7) - 3;v = Math.max(22, Math.min(80, v + n + 1.6));pts.push(Math.round(v));}
  return pts;
}
function KpiCard({ label, value, delta, deltaTone = 'up', sub, spark, sparkColor, accent = QFZ.blue, hideSpark, vspark }) {
  const series = useMemo(() => spark || sparkFrom(String(label) + value), [label, value, spark]);
  return (
    <div className="kpi2" style={{ '--kpi-accent': accent }}>
      <span className="kpi2-accent" aria-hidden="true" />
      <div className="kpi2-top">
        <div className="kpi2-label" style={{ fontWeight: "400" }}><span className="kpi2-dot" />{label}</div>
      </div>
      <div className="kpi2-val">
        <span style={{ color: "rgb(35, 35, 35)", fontWeight: "500", fontSize: "24px" }}><CountUp value={value} /></span>
        {vspark && <span className="kpi2-vspark"><Sparkline values={series} color={sparkColor || accent} height={32} /></span>}
      </div>
      <div className="kpi2-foot">
        {delta && <span className={`kpi2-delta ${deltaTone}`}>{delta}<Icon name={deltaTone === 'down' ? 'arrowDown' : 'trending'} size={10} /></span>}
        {sub && <span className="kpi2-sub">{sub}</span>}
      </div>
    </div>);

}

/* ---------------- semicircle gauge ---------------- */
function Gauge({ value, label, color = QFZ.blue, height = 200 }) {
  const option = useMemo(() => ({
    ...AX,
    series: [{
      type: 'gauge', startAngle: 200, endAngle: -20, min: 0, max: 100, radius: '100%', center: ['50%', '72%'],
      progress: { show: true, width: 13, roundCap: true, itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: QFZ.warm }, { offset: 1, color: color }]) } },
      pointer: { show: true, length: '62%', width: 4, itemStyle: { color: color } },
      anchor: { show: true, size: 14, itemStyle: { color: '#fff', borderColor: color, borderWidth: 3 } },
      axisLine: { lineStyle: { width: 13, color: [[1, 'rgba(64,65,66,0.08)']] } },
      axisTick: { show: false }, splitLine: { show: false }, axisLabel: { show: false },
      detail: { valueAnimation: true, offsetCenter: [0, '-6%'], fontSize: 30, fontWeight: 700, color: QFZ.navy, formatter: '{value}%' },
      title: { show: false }, data: [{ value }]
    }],
    animationDuration: 1300
  }), [value, color]);
  return <EChart option={option} height={height} />;
}

Object.assign(window, { CapexLine, StatusDonut, RadialTicks, Donut, GradientBars, GradientColumns,
  HiringAttrition, Sparkline, Bullet, KpiCard, sparkFrom, Gauge, hexA, tooltipBox, softFill, splitDashed, axLabel, rulerX });