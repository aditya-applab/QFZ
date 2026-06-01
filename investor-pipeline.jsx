// ============================================================
//  QFZ Observatory — Deal Pipeline & Health + page wrapper
// ============================================================
function initials(name) {return name.split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();}
function scoreColor(s) {return s >= 80 ? QFZ.green : s >= 65 ? QFZ.warm : QFZ.burgundy;}

function DealTable({ deals, selId, onSelect }) {
  return (
    <table className="pipe-table">
      <thead><tr>
        <th>Company Name</th><th>Deal Owner</th><th>Sector</th><th className="num">Estimated Value</th><th>Stage</th><th className="num">Score</th><th></th>
      </tr></thead>
      <tbody>
        {deals.map((d, i) =>
        <tr key={d.id} className={selId === d.id ? 'sel' : ''} onClick={() => onSelect(d)} style={{ animation: `fadeIn .45s ease-out ${i * 45}ms both` }}>
            <td>
              <div className="deal-co">
                <span className="deal-av" style={{ background: SECTOR_COLOR[d.sector] || QFZ.blue }}>{initials(d.name)}</span>
                <div><div className="nm">{d.name}</div><div className="mt" style={{ fontWeight: "400" }}>Updated {2 + i}h ago</div></div>
              </div>
            </td>
            <td style={{ fontWeight: "400" }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}><span style={{ width: 22, height: 22, borderRadius: '50%', background: hexA(QFZ.blue, 0.12), color: QFZ.blue, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700 }}>{initials(d.owner)}</span>{d.owner}</span></td>
            <td><span className="sector-tag" style={{ color: SECTOR_COLOR[d.sector] || QFZ.blue, background: hexA(SECTOR_COLOR[d.sector] || QFZ.blue, 0.12), fontWeight: "400" }}>{d.sector}</span></td>
            <td className="num" style={{ color: QFZ.navy, fontWeight: "400" }}>QAR {d.value >= 1000 ? fmt.dec(d.value / 1000, 2) + 'B' : d.value + 'M'}</td>
            <td><Pill tone={d.stageTone}>{d.stage}</Pill></td>
            <td className="num">
              <span className="score-bar"><span className="score-track"><span className="score-fill" style={{ width: `${d.score}%`, background: scoreColor(d.score) }} /></span><b style={{ color: QFZ.navy, fontWeight: "400" }}>{d.score}</b></span>
            </td>
            <td className="num"><Icon name="chevronRight" size={15} style={{ color: QFZ.textMuted }} /></td>
          </tr>
        )}
      </tbody>
    </table>);

}

function DealDetail({ deal, onClose }) {
  const d = deal.detail;
  const color = SECTOR_COLOR[deal.sector] || QFZ.blue;
  const valStr = deal.value >= 1000 ? `QAR ${fmt.dec(deal.value / 1000, 2)} Bn` : `QAR ${deal.value}M`;
  return (
    <div className="deal-detail">
      <div className="deal-detail-head" style={{ borderTop: `3px solid ${color}` }}>
        <div className="eyebrow"><span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: color }} /> Deal detail · {deal.stage}</div>
        <h3>{deal.name}</h3>
        <div className="meta">
          <span className="m">{deal.country}</span>
          <span className="m"><Icon name="briefcase" size={12} /> {deal.sector}</span>
          <span className="m"><Icon name="user" size={12} /> {d.dealOwner}</span>
          <span className="m"><Icon name="money" size={12} /> {valStr}</span>
          <span className="m"><Icon name="award" size={12} /> Score {deal.score}/100</span>
        </div>
        <button className="deal-detail-close" onClick={onClose} aria-label="Close"><Icon name="close" size={16} /></button>
      </div>
      <div className="deal-detail-body">
        <div className="dd-left">
          <div className="dd-block"><div className="dd-h"><Icon name="info" size={13} /> Company overview</div><p>{d.companyOverview}</p></div>
          <div className="dd-block"><div className="dd-h"><Icon name="build" size={13} /> Project overview</div><p>{d.projectOverview}</p></div>
          <div className="dd-block"><div className="dd-h"><Icon name="pulse" size={13} /> Current situation / key challenges</div><p>{d.situation}</p></div>
          <div className="dd-block">
            <div className="dd-h"><Icon name="target" size={13} /> Strategic rationale &amp; expected impact</div>
            <div className="dd-impact">
              <div className="dd-impact-cell"><div className="v">{200 + deal.score * 6}</div><div className="l">Jobs created</div></div>
              <div className="dd-impact-cell"><div className="v">{(deal.score / 20).toFixed(1)}×</div><div className="l">Supply-chain multiplier</div></div>
              <div className="dd-impact-cell"><div className="v">{deal.sector}</div><div className="l">Priority cluster</div></div>
            </div>
          </div>
          <div className="dd-block">
            <div className="dd-h"><Icon name="award" size={13} /> Deal score breakdown</div>
            <div className="dd-score">
              {[['Financial strength', Math.min(100, deal.score + 6)], ['Strategic fit', deal.score], ['Risk profile', Math.max(40, deal.score - 12)], ['Readiness', Math.min(100, deal.score + 2)]].map(([k, v]) =>
              <div className="dd-score-row" key={k}>
                  <span className="k">{k}</span>
                  <span className="track"><span className="fill" style={{ width: `${v}%`, background: v >= 80 ? QFZ.green : v >= 65 ? QFZ.warm : QFZ.burgundy }} /></span>
                  <span className="v">{v}</span>
                </div>
              )}
            </div>
          </div>
          <div className="dd-block">
            <div className="dd-h"><Icon name="users" size={13} /> Key contacts</div>
            <div className="dd-contacts">
              <div className="dd-contact"><span className="av" style={{ background: color }}>{initials(d.dealOwner)}</span><div><div className="nm">{d.dealOwner}</div><div className="rl">QFZ Deal Owner</div></div></div>
              <div className="dd-contact"><span className="av" style={{ background: QFZ.charcoal }}>{initials(deal.name)}</span><div><div className="nm">{deal.name.split(' ')[0]} Leadership</div><div className="rl">Investor side · {deal.country}</div></div></div>
            </div>
          </div>
          <div className="dd-next">
            <div className="dd-h" style={{ color: QFZ.blue, marginBottom: 6 }}><Icon name="bolt" size={13} /> Actionable next steps · {d.nextDate}</div>
            <p style={{ color: QFZ.text }}>{d.nextSteps}</p>
          </div>
        </div>
        <div className="dd-right">
          <div className="dd-block">
            <div className="dd-h"><Icon name="layers" size={13} /> Investment details</div>
            <div className="dd-detail-grid">
              {[['Status', d.status], ['Deal owner', d.dealOwner], ['Asset type', d.assetType], ['Free zone', d.zone],
              ['National stakeholder', d.stakeholder], ['Deal CAPEX', `QAR ${fmt.int(d.dealCapex)} Mn`],
              ['QFZ CAPEX', `QAR ${fmt.int(d.qfzCapex)} Mn`], ['Land size', `${d.landSize} sqm`], ['Power', d.power]].map(([l, v]) =>
              <div className="dd-cell" key={l}><div className="l">{l}</div><div className="v">{v}</div></div>
              )}
            </div>
          </div>
          <div className="dd-block">
            <div className="dd-h"><Icon name="clock" size={13} /> Milestones & touchpoints</div>
            <div className="dd-mile">
              {[['Last contact with investor', d.lastContact], ['Next contact with investor', d.nextContact],
              ['Completion of previous stage', d.prevStageDate], ['Target date to next stage', d.targetNext],
              ['Target date to L3 / L4', d.targetL3L4]].map(([k, v]) =>
              <div className="dd-mile-row" key={k}><span className="k">{k}</span><span className="vv">{v}</span></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>);

}

function FunnelStrip({ funnel }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${funnel.length}, 1fr)`, gap: 34 }}>
      {funnel.map((f, i) => {
        const next = funnel[i + 1];
        const conv = next ? Math.round(next.count / f.count * 100) : null;
        return (
          <div key={f.id} style={{ position: 'relative', padding: '20px 14px', borderRadius: 14, background: '#fff', border: '1px solid var(--qfz-border-soft)', textAlign: 'center', animation: `fadeIn .5s ease-out ${i * 70}ms both` }}>
          <div style={{ width: 38, height: 38, margin: '0 auto 12px', borderRadius: 11, background: hexA(f.color, 0.12), color: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={f.icon} size={18} /></div>
          <div style={{ fontSize: 11.5, color: QFZ.textSec, fontWeight: "400" }}>{f.label}</div>
          <div style={{ fontSize: 26, fontWeight: 600, color: f.color, letterSpacing: -.8, marginTop: 10 }}><CountUp value={f.count} /></div>
          {conv != null &&
            <div className="funnel-conn" aria-hidden="true">
            <span className="funnel-arrow"><Icon name="chevronRight" size={16} /></span>
          </div>}
        </div>);
      })}
    </div>);

}

function L0Pane() {
  const data = PIPELINE.L0;
  const [sel, setSel] = useState(null);
  return (
    <div className="page-col">
      <Card style={{ padding: 22 }}>
        <div className="card-header" style={{ marginBottom: 14 }}>
          <div><div className="card-eyebrow">Investor pipeline performance</div><div className="card-title" style={{ fontSize: "20px" }}>L0 Pipeline - Early-stage Leads</div><div className="card-subtitle">{data.deals.length} active leads · click any row to view full detail</div></div>
          <div style={{ display: 'flex', gap: "32px" }}>
            <div><div style={{ fontSize: 10, fontWeight: 600, color: QFZ.textMuted, letterSpacing: .4, padding: "0px" }}>TOTAL PIPELINE VALUE</div><div style={{ fontSize: 18, fontWeight: 600, color: QFZ.navy, marginTop: 8 }}>{data.totalValue}</div></div>
            <div><div style={{ fontSize: 10, fontWeight: 600, color: QFZ.textMuted, letterSpacing: .4 }}>CONVERSION RATE</div><div style={{ fontSize: 18, fontWeight: 600, color: QFZ.green, marginTop: 8 }}>{data.conversion}</div></div>
          </div>
        </div>
        <FunnelStrip funnel={data.funnel} />
      </Card>
      <Card className="solid-white" style={{ padding: '8px 16px 12px' }}><DealTable deals={data.deals} selId={sel && sel.id} onSelect={setSel} /></Card>
      {sel && <DealDetail deal={sel} onClose={() => setSel(null)} />}
    </div>);

}

function ClientDealTable({ rows }) {
  return (
    <div className="client-table-scroll">
      <table className="pipe-table client-table">
        <thead><tr>
          {CLIENT_COLS.map((c) => <th key={c.key} className={c.num ? 'num' : ''}>{c.label}</th>)}
        </tr></thead>
        <tbody>
          {rows.map((r, i) =>
          <tr key={i} style={{ animation: `fadeIn .4s ease-out ${i * 30}ms both` }}>
              {CLIENT_COLS.map((c) =>
            <td key={c.key} className={c.num ? 'num' : ''}>
                  {c.key === 'name' ?
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}><span className="deal-av" style={{ width: 28, height: 28, background: SECTOR_COLOR[r.sector] || QFZ.blue, fontSize: 9 }}>{initials(r.name)}</span><b style={{ color: QFZ.navy, fontWeight: 600 }}>{r.name}</b></span> :
              c.badge ? <Pill tone={r.statusTone}>{r[c.key]}</Pill> :
              c.key === 'planning' ? <span style={{ color: r[c.key] === 'On plan' ? QFZ.green : QFZ.warm, fontWeight: 400 }}>{r[c.key]}</span> :
              c.strong ? <b style={{ color: QFZ.navy }}>{r[c.key]}</b> : r[c.key]}
                </td>
            )}
            </tr>
          )}
        </tbody>
      </table>
    </div>);

}

function StagePane({ data, accent, rows }) {
  const [railSel, setRailSel] = useState(data.rail[data.rail.length - 1].id);
  return (
    <div className="pipe-layout">
      <div className="pipe-rail">
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: .5, color: QFZ.textMuted, textTransform: 'uppercase', marginBottom: 2 }}>Pipeline flow</div>
        {data.rail.map((n, i) =>
        <React.Fragment key={n.id}>
            <div className={`rail-node ${railSel === n.id ? 'on' : ''}`} onClick={() => setRailSel(n.id)} style={railSel === n.id ? { background: n.color, borderColor: n.color } : {}}>
              <div className="rk" style={{ color: railSel === n.id ? '#fff' : n.color }}>{n.id}</div>
              <div className="rc">{n.count}</div>
              <div className="rl" style={{ color: railSel === n.id ? 'rgba(255,255,255,0.85)' : QFZ.textSec, fontWeight: "400" }}>{n.label}</div>
            </div>
            {i < data.rail.length - 1 && <div className="rail-arrow"><Icon name="chevronDown" size={16} /></div>}
          </React.Fragment>
        )}
      </div>
      <div className="page-col" style={{ gap: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
          {data.cards.map((c, i) =>
          <Card key={c.label} style={{ padding: '16px 18px', animation: `fadeIn .5s ease-out ${i * 70}ms both` }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: QFZ.textMuted }}>{c.label}</div>
              <div style={{ fontSize: 30, fontWeight: 600, color: accent, letterSpacing: -1, marginTop: 6 }}><CountUp value={c.value} /></div>
              <div style={{ fontSize: 11.5, color: QFZ.textSec, marginTop: 4, fontWeight: "400" }}>{c.sub}</div>
              {c.pct != null && <div style={{ marginTop: 10 }}><Bullet pct={c.pct} color={accent} /></div>}
            </Card>
          )}
        </div>
        <Card className="solid-white" style={{ padding: '8px 8px 12px' }}>
          <div style={{ padding: '12px 10px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="card-title" style={{ fontSize: 16, fontWeight: 600 }}>Pipeline deals · {rows.length} records</div>
            <span style={{ fontSize: 11, color: QFZ.textMuted }}>Scroll horizontally for all columns</span>
          </div>
          <ClientDealTable rows={rows} />
        </Card>
      </div>
    </div>);

}

function DealPipeline() {
  const [tab, setTab] = useState('L0');
  const tabs = [
  { id: 'L0', label: 'L0 Pipeline', tag: 'Initial leads' },
  { id: 'L3', label: 'L3 Pipeline', tag: 'Licensed' },
  { id: 'L4', label: 'L4 Pipeline', tag: 'Construction' }];

  return (
    <div className="page-col">
      <div className="subtabs" style={{ alignSelf: 'flex-start', height: "44px" }}>
        {tabs.map((t) => <button key={t.id} className={`subtab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>{t.label} <span className="tag">{t.tag}</span></button>)}
      </div>
      {tab === 'L0' && <L0Pane />}
      {tab === 'L3' && <StagePane data={PIPELINE.L3} accent={QFZ.green} rows={CLIENT_L3} />}
      {tab === 'L4' && <StagePane data={PIPELINE.L4} accent={QFZ.burgundy} rows={CLIENT_L4} />}
    </div>);

}

/* ---- Portfolio + Sector (lighter 'just show') ---- */
function InvestorPortfolio() {
  const sectors = [
  { label: 'Manufacturing', value: 820, color: QFZ.blue, n: 42 }, { label: 'Logistics', value: 528, color: QFZ.green, n: 28 },
  { label: 'Technology', value: 384, color: QFZ.burgundy, n: 19 }, { label: 'Energy', value: 286, color: QFZ.warm, n: 14 },
  { label: 'Healthcare', value: 218, color: QFZ.burgundySoft, n: 12 }, { label: 'Other', value: 196, color: QFZ.mint, n: 17 }];

  const total = sectors.reduce((a, b) => a + b.value, 0);
  return (
    <div className="page-col">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
        {[{ l: 'Active Investors', v: '145', s: '+10 this month', c: QFZ.blue, i: 'users' }, { l: 'Portfolio Value', v: 'QAR 12.8B', s: '+14.2% MoM', c: QFZ.green, i: 'money' }, { l: 'Avg. Deal Size', v: 'QAR 88M', s: 'across 145 deals', c: QFZ.burgundy, i: 'briefcase' }, { l: 'Retention', v: '94%', s: 'renewal rate', c: QFZ.warm, i: 'check' }].map((k, idx) =>
        <div key={k.l} style={{ animation: `fadeIn .5s ${idx * 60}ms both` }}><KpiCard label={k.l} value={k.v} sub={k.s} sparkColor={k.c} accent={k.c} /></div>
        )}
      </div>
      <Card style={{ padding: 24 }}>
        <div className="card-header"><div><div className="card-eyebrow">Where our investors land</div><div className="card-title">Portfolio by Sector</div><div className="card-subtitle">Total committed value · QAR millions</div></div></div>
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 28, alignItems: 'center' }}>
          <div className="donut-host" style={{ width: 240, height: 240 }}>
            <Donut data={sectors.map((s) => ({ name: s.label, value: s.value, color: s.color }))} height={240} formatter={(p) => `<b>${p.name}</b><br/>QAR ${p.value}M (${p.percent}%)`} />
            <div className="donut-c"><div className="dv">{fmt.dec(total / 1000, 1)}B</div><div className="dl">total value</div></div>
          </div>
          <GradientBars data={sectors.map((s) => ({ name: s.label, value: s.value, color: s.color }))} height={230} unit="M" />
        </div>
      </Card>
    </div>);

}
function SectorAnalysis() {
  return (
    <div className="page-col">
      <Card style={{ padding: 24 }}>
        <div className="card-header"><div><div className="card-eyebrow">Sector momentum</div><div className="card-title">12-Week Trend by Sector</div><div className="card-subtitle">Investor growth index by sector</div></div></div>
        <GradientColumns cats={['Manufacturing', 'Logistics', 'Technology', 'Energy', 'Healthcare', 'Maritime']} vals={[74, 62, 58, 44, 35, 28]} height={300} />
      </Card>
    </div>);

}

function InvestorDevelopmentPage() {
  const [tab, setTab] = useState('kpi');
  const tabs = [
  { id: 'kpi', label: 'KPI Performance' }, { id: 'app', label: 'Investor Application Tracker' },
  { id: 'deal', label: 'Deal Pipeline & Health' }, { id: 'port', label: 'Investor Portfolio' }, { id: 'sector', label: 'Sector Analysis', disabled: true }];

  return (
    <div className="page-col" style={{ padding: "1px 0px 0px" }}>
      <div className="tabbar-row" style={{ padding: "24px 0px 16px" }}>
        <div className="subtabs">
          {tabs.map((t) => <button key={t.id} className={`subtab ${tab === t.id ? 'active' : ''} ${t.disabled ? 'disabled' : ''}`} onClick={() => !t.disabled && setTab(t.id)} disabled={t.disabled}>{t.label}</button>)}
        </div>
        <label className="tab-search">
          <Icon name="search" size={15} />
          <input placeholder="Search investors, deals, sectors…" />
          <kbd>⌘K</kbd>
        </label>
      </div>
      {tab === 'kpi' && <KPIPerformance />}
      {tab === 'app' && <AppTracker />}
      {tab === 'deal' && <DealPipeline />}
      {tab === 'port' && <InvestorPortfolio />}
      {tab === 'sector' && <SectorAnalysis />}
    </div>);

}
Object.assign(window, { InvestorDevelopmentPage, DealPipeline, InvestorPortfolio, SectorAnalysis });