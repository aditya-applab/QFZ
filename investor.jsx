// ============================================================
//  QFZ Observatory — Investor Development
// ============================================================

/* ---- shared: ring stat ---- */
function RingStat({ value, label, sub, color = QFZ.green, size = 92, track }) {
  const v = useCountUp(value, {});
  return (
    <div className="target-ring" style={{ position: 'relative', width: size, height: size }}>
      <div className="donut-host" style={{ width: size, height: size }}>
        <RadialTicks value={value} color={color} track={track} height={size} ticks={48} raised />
        <div className="donut-c"><div className="dv" style={{ fontSize: 24, color }}>{v}%</div></div>
      </div>
    </div>);

}

/* ---- KPI mini card ---- */
function KpiMini({ c, accent, delay }) {
  const [ref, inView] = useInView();
  const v = useCountUp(c.value, { run: inView, decimals: 2 });
  const isT = c.kind === 'target';
  return (
    <div ref={ref} className={`kpi-mini ${isT ? 'is-target' : ''}`} style={{ animation: `fadeIn .5s ease-out ${delay}ms both` }}>
      <div className="label">{c.label}</div>
      <div className="val">{fmt.dec(v, 2)}<span className="u">{c.unit}</span></div>
      <div className="vs">{c.vs}{!isT && c.pct != null ? ` (${c.pct}%)` : ''}</div>
      <div className="bar"><Bullet pct={c.pct} color={accent} height={6} delay={delay + 200} /></div>
    </div>);

}
function LicenseGroup({ g }) {
  return (
    <div className="lic-group">
      <div className="lic-group-label">
        <div className="ico" style={{ background: g.accent }}><Icon name={g.icon} size={20} /></div>
        <div>
          <div className="sub" style={{ color: g.accent }}>{g.key} · {g.tier}</div>
          <div className="ttl">{g.title}</div>
          <div className="sub">{g.sub}</div>
        </div>
      </div>
      {g.cards.map((c, i) => <KpiMini key={c.id} c={c} accent={g.accent} delay={i * 70} />)}
    </div>);

}

function ActivityFeed() {
  return (
    <Card style={{ padding: 22 }}>
      <div className="card-header" style={{ marginBottom: 8 }}>
        <div><div className="card-eyebrow" style={{ fontWeight: "400" }}>Real-time</div><div className="card-title" style={{ fontSize: "20px", fontWeight: "600" }}>Live Activity Feed</div></div>
        <span className="pill success" style={{ fontWeight: "400" }}><span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: QFZ.green, display: 'inline-block' }} /> Live</span>
      </div>
      <div>
        {ACTIVITY_FEED.map((a, i) =>
        <div className="feed-item" key={i} style={{ animation: `fadeIn .5s ease-out ${i * 70}ms both`, alignItems: "center" }}>
            <div className="feed-ico" style={{ background: hexA(a.color, 0.12), color: a.color }}><Icon name={a.icon} size={15} /></div>
            <div className="feed-body"><div className="ttl"><b style={{ fontWeight: "400", color: "rgb(64, 65, 66)" }}>{a.who}</b> {a.what}</div></div>
            <div className="feed-time">{a.t}</div>
          </div>
        )}
      </div>
    </Card>);

}

function LeadsCard() {
  return (
    <Card style={{ padding: 24 }}>
      <div className="card-header">
        <div><div className="card-eyebrow" style={{ fontWeight: "400" }}>Where our leads come from</div><div className="card-title" style={{ fontSize: "20px", fontWeight: "600" }}>Leads Generated</div><div className="card-subtitle" style={{ color: "rgb(140, 140, 140)", fontSize: "12px" }}>Inbound investor interest by source</div></div>
        <Pill tone="success">{LEADS.yoy} YoY</Pill>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 18 }}>
        <span style={{ fontSize: 38, fontWeight: 600, color: QFZ.navy, letterSpacing: -1.4, lineHeight: 1 }}>{fmt.int(LEADS.total)}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: QFZ.textSec }}>YTD leads</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: "24px" }}>
        {LEADS.sources.map((s, i) =>
        <div key={s.src} style={{ animation: `fadeIn .5s ease-out ${i * 70}ms both` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: QFZ.navy, display: 'inline-flex', alignItems: 'center', gap: 8 }}><span style={{ width: 9, height: 9, borderRadius: 3, background: s.color }} />{s.src}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: QFZ.navy }}>{fmt.int(s.val)} <span style={{ color: QFZ.textMuted, fontWeight: 600 }}>({s.pct}%)</span></span>
            </div>
            <Bullet pct={s.pct * 2.4} color={s.color} delay={i * 90} />
          </div>
        )}
      </div>
    </Card>);

}

function LicensesDonutCard() {
  const total = LICENSES_BY_TIER.reduce((a, b) => a + b.count, 0);
  const [active, setActive] = useState(null);
  const data = LICENSES_BY_TIER.map((t) => ({ name: t.label, value: t.count, color: t.color }));
  const sel = active ? LICENSES_BY_TIER.find((t) => t.label === active) : null;
  return (
    <Card style={{ padding: 24 }}>
      <div className="card-header">
        <div><div className="card-eyebrow" style={{ fontWeight: "400" }}>Licenses by tier</div><div className="card-title" style={{ fontSize: "20px", fontWeight: "600" }}>Licenses Issued</div><div className="card-subtitle" style={{ color: "rgb(140, 140, 140)", fontSize: "12px" }}>By tier and zone · click a segment</div></div>
        <Pill>{total} this month</Pill>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 28, alignItems: 'stretch' }}>
        <div className="donut-host donut-host-lg" style={{ width: 320, height: 320 }}>
          <Donut data={data} height={320} inner="62%" outer="86%" active={active} onSelect={(n) => setActive((a) => a === n ? null : n)}
          formatter={(p) => `<b>${p.name}</b><br/>${p.value} licenses (${p.percent}%)`} />
          <div className="donut-c"><div className="dv">{sel ? sel.count : total}</div><div className="dl">{sel ? sel.label : 'total'}</div></div>
        </div>
        <div className="legend-list" style={{ alignItems: "stretch", justifyContent: "center", gap: "24px" }}>
          {LICENSES_BY_TIER.map((t) => {
            const pct = Math.round(t.count / total * 100);
            return (
              <div className="legend-row" key={t.tier} onMouseEnter={() => setActive(t.label)} onMouseLeave={() => setActive(null)} style={{ cursor: 'pointer', opacity: active && active !== t.label ? 0.45 : 1, transition: 'opacity .15s', alignItems: "center" }}>
                <span style={{ fontSize: 10.5, fontWeight: 600, color: t.color, background: hexA(t.color, 0.12), lineHeight: "1.4", textAlign: "justify", borderRadius: "4px", height: "35px", padding: "9px 8px 3px" }}>{t.tier}</span>
                <div className="nm">{t.label}<div style={{ fontSize: 10, color: QFZ.textMuted, fontWeight: "400" }}>{t.count} licenses</div></div>
                <span className="pc" style={{ width: "80px", fontWeight: "400", fontSize: "16px" }}>{pct}%</span>
              </div>);

          })}
        </div>
      </div>
    </Card>);

}

function KPIPerformance() {
  const [range, setRange] = useState('YTD');
  return (
    <div className="page-col">
      <div className="perf-banner">
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "600" }}>QFZ Investment Development performance is <span className="accent" style={{ fontSize: "24px" }}>on track.</span></h2>
          <p style={{ fontSize: "10px", margin: "8px 0px 0px" }}>Total Licensed Investments (L3) reached <b>QAR 39.5 Bn</b> against the 2026 target of <b>QAR 60 Bn</b>.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
          <div style={{ textAlign: 'right' }}><div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Overall Target Achievement</div><div style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>2026 Overall Target</div></div>
          <RingStat value={OVERALL_TARGET} color="#FFFFFF" track="rgba(255,255,255,0.25)" size={92} />
        </div>
      </div>

      <Card className="glass" style={{ padding: 24 }}>
        <div className="card-header">
          <div><div className="card-eyebrow" style={{ fontWeight: "400" }}>License-level performance</div><div className="card-title" style={{ fontSize: "20px", fontWeight: "600" }}>L3 &amp; L4 - Results vs Targets</div><div className="card-subtitle" style={{ color: "rgb(140, 140, 140)", fontSize: "12px" }}>Annual and cumulative 2-year licensing against plan · QAR Bn</div></div>
        </div>
        {LICENSE_GROUPS.map((g) => {
          const LIC_COLORS = { 'l3-26-res': QFZ.burgundy, 'l3-26-tgt': QFZ.warm, 'l3-267-res': QFZ.mint, 'l3-267-tgt': QFZ.blue,
            'l4-26-res': QFZ.warmDeep, 'l4-26-tgt': QFZ.blueSoft, 'l4-267-res': QFZ.green, 'l4-267-tgt': QFZ.burgundySoft };
          return (
            <div key={g.key} className="lic-group-block">
              <div className="lic-group-title">
                <span className="lic-group-key" style={{ background: hexA(g.accent, 0.12), color: g.accent }}>{g.key}</span>
                <span className="lic-group-name">{g.title}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
                {g.cards.map((c, i) => {
                  const col = LIC_COLORS[c.id] || QFZ.blue;
                  return (
                    <div key={c.id} style={{ animation: `fadeIn .5s ease-out ${i * 70}ms both` }}>
                      <KpiCard label={c.label} value={`${fmt.dec(c.value, 2)} ${c.unit}`} sub={c.vs}
                        delta={c.kind === 'result' ? `${c.pct}%` : null} deltaTone="up"
                        sparkColor={col} accent={col} vspark />
                    </div>);
                })}
              </div>
            </div>);
        })}
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1.9fr 1fr', gap: 18 }}>
        <Card style={{ padding: 24 }}>
          <div className="card-header">
            <div><div className="card-eyebrow" style={{ fontWeight: "400" }}>Capex deployed</div><div className="card-title" style={{ fontSize: "20px", fontWeight: "600" }}>Capex Value · Actual vs Target vs Last Year</div><div className="card-subtitle" style={{ color: "rgb(140, 140, 140)", fontSize: "12px" }}>Hover any month to inspect · QAR Billion</div></div>
            <div className="segmented" style={{ marginBottom: 0 }}>
              {['YTD', 'FY26', '3-Year'].map((r) => <button key={r} className={`segmented-item ${range === r ? 'active' : ''}`} onClick={() => setRange(r)} style={{ padding: "6px 18px", fontSize: "11px" }}>{r}</button>)}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 0 }}><CapexLine height={300} range={range} /></div>
            <div style={{ width: 150, flexShrink: 0, display: 'flex', flexDirection: 'column', paddingTop: 6, gap: "32px", justifyContent: "flex-end", alignItems: "flex-start" }}>
              {[{ l: 'Actual', v: '9.6B', c: QFZ.blue }, { l: 'Target', v: '12.0B', c: QFZ.burgundy }, { l: 'Last Year', v: '8.1B', c: QFZ.gray }].map((s) =>
              <div key={s.l} style={{ borderLeft: `3px solid ${s.c}`, paddingLeft: 11 }}>
                  <div style={{ fontSize: 11, color: QFZ.textMuted, margin: "0px 0px 4px", fontWeight: "400" }}>{s.l}</div>
                  <div style={{ color: QFZ.navy, letterSpacing: -.6, fontWeight: "600", fontSize: "16px" }}>QAR {s.v}</div>
                </div>
              )}
              <div style={{ marginTop: 4, padding: '14px 16px', borderRadius: 12, background: hexA(QFZ.green, 0.08), border: `1px solid ${hexA(QFZ.green, 0.18)}`, textAlign: "left" }}>
                <div style={{ fontSize: 11, color: QFZ.textMuted, margin: "0px 0px 8px", fontWeight: "300" }}>vs target</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: QFZ.green, margin: 0 }}>79% of plan</div>
              </div>
            </div>
          </div>
        </Card>
        <ActivityFeed />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <LeadsCard />
        <LicensesDonutCard />
      </div>
    </div>);

}

/* ============== Application Tracker ============== */
function AppTracker() {
  const [active, setActive] = useState(null);
  const total = APP_STAGES.reduce((a, b) => a + b.count, 0);
  const totalAmt = APP_STAGES.reduce((a, b) => a + b.amount, 0);
  const sel = active ? APP_STAGES.find((s) => s.id === active) : null;
  return (
    <div className="page-col">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 14 }}>
        {[{ l: 'Active Deals', v: total, s: 'across all stages', c: QFZ.blue, i: 'briefcase' },
        { l: 'Total Value', v: `QAR ${fmt.dec(totalAmt, 1)}B`, s: 'committed pipeline', c: QFZ.green, i: 'money' },
        { l: 'Licensed (L3+)', v: APP_STAGES.slice(2).reduce((a, b) => a + b.count, 0), s: 'past approval', c: QFZ.burgundy, i: 'license' },
        { l: 'In Construction', v: 14, s: 'L4 stage', c: QFZ.warm, i: 'construction' },
        { l: 'Completed', v: 9, s: 'L5 operational', c: QFZ.mint, i: 'check' }].map((k, idx) =>
        <div key={k.l} style={{ animation: `fadeIn .5s ease-out ${idx * 70}ms both` }}>
            <KpiCard label={k.l} value={k.v} sub={k.s} sparkColor={k.c} accent={k.c} hideSpark />
          </div>
        )}
      </div>
      <Card style={{ padding: 24 }}>
        <div className="card-header">
          <div><div className="card-eyebrow">Active deals by progress</div><div className="card-title">Application Pipeline by Status</div><div className="card-subtitle">Click any status to see its summary · count & committed value</div></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 28, alignItems: 'center' }}>
          <div className="donut-host donut-host-lg" style={{ width: 360, height: 360, margin: '0 auto' }}>
            <StatusDonut stages={APP_STAGES} active={active} onSelect={(id) => setActive((a) => a === id ? null : id)} height={360} />
            <div className="donut-c">
              <div className="dv">{sel ? sel.count : total}</div>
              <div className="dl">{sel ? sel.label : 'active deals'}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: sel ? sel.color : QFZ.green, marginTop: 6 }}>QAR {sel ? sel.amount : fmt.dec(totalAmt, 1)}B</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 300px)', gap: 12, alignContent: 'center' }}>
            {APP_STAGES.map((s, i) => {
              const share = Math.round(s.count / total * 100);
              return (
                <div key={s.id} className={`app-stage-card ${active === s.id ? 'on' : ''}`} onClick={() => setActive((a) => a === s.id ? null : s.id)}
                style={{ opacity: active && active !== s.id ? 0.55 : 1, animation: `fadeIn .5s ease-out ${i * 60}ms both` }}>
                <span className="edge" style={{ background: s.color }} />
                <div className="st-head"><span className="st-id" style={{ background: s.color }}>{s.id}</span><span className="st-label">{s.label}</span></div>
                <div className="st-mid">
                  <span className="st-count" style={{ color: s.color }}><CountUp value={s.count} /></span>
                  <span className="st-unit">active deals</span>
                </div>
                <div className="st-chips">
                  <span className="st-chip" style={{ color: s.color, background: hexA(s.color, 0.12) }}><Icon name="money" size={11} /> QAR {fmt.dec(s.amount, 1)}B</span>
                  <span className="st-chip muted">{share}% of pipeline</span>
                </div>
              </div>);

            })}
          </div>
        </div>
      </Card>
    </div>);

}

Object.assign(window, { KPIPerformance, AppTracker, RingStat });