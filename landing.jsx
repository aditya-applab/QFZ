// ============================================================
//  QFZ Observatory — Landing Page + All Dashboards hub (full-screen)
// ============================================================
const APPROVALS_QUEUE = [
{ icon: 'briefcase', color: QFZ.blue, title: 'Investment Approval — TechNova FZ-LLC', meta: 'Investor Relations · QAR 240M', p: 'High' },
{ icon: 'map', color: QFZ.warm, title: 'Land Allocation — Plot B22', meta: 'Operations · 58,600 m²', p: 'Medium' },
{ icon: 'license', color: QFZ.green, title: 'License Upgrade — Global Logistics', meta: 'Investor Relations · L3 → L4', p: 'High' },
{ icon: 'wallet', color: QFZ.burgundy, title: 'Capex Disbursement — Phase 2', meta: 'Finance · QAR 180M', p: 'High' }];

function ApprovalsMenu({ navigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => {if (ref.current && !ref.current.contains(e.target)) setOpen(false);};
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  return (
    <div style={{ position: 'relative' }} ref={ref}>
      <button className={`hc-gear ${open ? 'on' : ''}`} title="Approvals" style={{ position: 'relative' }} onClick={() => setOpen((o) => !o)}>
        <Icon name="check" size={16} />
        <span style={{ position: 'absolute', top: 6, right: 6, minWidth: 14, height: 14, padding: '0 3px', borderRadius: 999, background: QFZ.warm, border: '2px solid #fff', color: '#fff', fontSize: 8, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{APPROVALS_QUEUE.length}</span>
      </button>
      {open &&
      <div className="notif-pop">
          <div className="notif-pop-head">
            <div><div className="notif-pop-title">Centralized Approvals</div><div className="notif-pop-sub">{APPROVALS_QUEUE.length} awaiting your decision</div></div>
          </div>
          <div className="notif-pop-list">
            {APPROVALS_QUEUE.map((n, i) =>
          <div key={i} className="notif-row" style={{ alignItems: "center" }}>
                <span className="notif-ico" style={{ background: hexA(n.color, 0.12), color: n.color }}><Icon name={n.icon} size={15} /></span>
                <div className="notif-body"><div className="notif-title">{n.title}</div><div className="notif-meta">{n.meta}</div></div>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: .4, color: n.p === 'High' ? QFZ.burgundy : QFZ.warm, flexShrink: 0 }}>{n.p.toUpperCase()}</span>
              </div>
          )}
          </div>
          <button className="notif-pop-foot" onClick={() => {setOpen(false);navigate('#/approvals');}}>Open approvals workspace</button>
        </div>
      }
    </div>);

}
function FSTopbar({ navigate, onAI }) {
  return (
    <div className="fs-topbar">
      <div className="fs-topbar-inner">
        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 11, flexShrink: 0 }} onClick={() => navigate('#/dashboards')}>
          <QFZLogo height={26} />
          <span style={{ fontSize: 11, fontWeight: 600, color: QFZ.textMuted, borderLeft: '1px solid rgba(64,65,66,0.15)', paddingLeft: 11 }}>Executive Platform</span>
        </div>
        <div style={{ flex: 1 }} />
        <div className="header-controls" style={{ marginRight: 10 }}><ApprovalsMenu navigate={navigate} /></div>
        <HeaderControls onAI={onAI} />
      </div>
    </div>);

}

function LandingPage({ navigate, onAI }) {
  const cards = [
  { title: 'Dashboards', desc: 'Explore insights and performance across all sectors and operations.', icon: 'grid', color: QFZ.blue, go: '#/dashboards' },
  { title: 'Employee Services', desc: 'Access HR services, payroll, leave requests and employee information.', icon: 'users', color: QFZ.green, go: '#/human-capital' },
  { title: 'Approval Workflow', desc: 'Review and approve requests, documents and transactions.', icon: 'check', color: QFZ.warm, go: '#/approvals' },
  { title: 'Tasks & To-Dos', desc: 'Manage your tasks, track progress and meet deadlines.', icon: 'list', color: QFZ.burgundy, go: '#/approvals' },
  { title: 'Reports', desc: 'Access detailed reports and analytics across all departments.', icon: 'doc', color: QFZ.mint, go: '#/reports' }];

  const snippets = [
  { v: '3', l: 'new investors registered today', i: 'user', c: QFZ.blue },
  { v: '8', l: 'deals advanced to L4 stage', i: 'trending', c: QFZ.green },
  { v: '14', l: 'approvals pending your review', i: 'check', c: QFZ.warm },
  { v: 'QAR 12.8B', l: 'active investment value', i: 'money', c: QFZ.burgundy }];

  return (
    <div className="fs-page">
      <FSTopbar navigate={navigate} onAI={onAI} />
      <div className="landing-hero">
        <div className="landing-hero-bg" aria-hidden="true">
          <div className="brand-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
          <div className="landing-skyline" />
        </div>
        <div className="landing-hero-content">
          <div style={{ fontSize: 15, fontWeight: 600, opacity: 0.9 }}>Welcome,</div>
          <h1>His Excellency Sheikh Jassim</h1>
          <p>One Platform. Smarter Decisions. Greater Impact.</p>
          <div className="landing-snippets">
            {snippets.map((s, i) =>
            <div key={i} className="landing-snippet" style={{ animation: `fadeIn .6s ease-out ${i * 90}ms both` }}>
                <span className="ls-ico" style={{ background: hexA(s.c, 0.16), color: '#fff' }}><Icon name={s.i} size={14} /></span>
                <div><div className="ls-v"><CountUp value={s.v} /></div><div className="ls-l">{s.l}</div></div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="landing-proceed">
        <div className="landing-proceed-head"><span>How would you like to proceed today?</span><div className="rule" /></div>
        <div className="landing-cards">
          {cards.map((c, i) =>
          <button key={c.title} className="landing-card" onClick={() => navigate(c.go)} style={{ animation: `slideUp .5s ease-out ${i * 80}ms both` }}>
              <span className="lc-ico" style={{ background: `linear-gradient(135deg, ${c.color}, ${hexA(c.color, 0.7)})` }}><Icon name={c.icon} size={24} /></span>
              <div className="lc-title">{c.title}</div>
              <div className="lc-desc">{c.desc}</div>
              <span className="lc-arrow"><Icon name="arrow" size={16} /></span>
            </button>
          )}
        </div>
      </div>
      <div className="landing-quote">
        <div className="lq-mark">"</div>
        <div className="lq-text">Driving Sustainable Growth<br /><b>Building a Future-Ready Economy</b></div>
      </div>
    </div>);

}

function AllDashboardsPage({ navigate, onAI }) {
  const dashboards = [
  { title: 'Human Capital', desc: 'Manage workforce, talent and employee lifecycle.', icon: 'users', color: QFZ.blue, go: '#/human-capital', badge: '1 New', badgeTone: 'info' },
  { title: 'Investor Development', desc: 'Track investors, deals, pipeline and progress.', icon: 'chart', color: QFZ.burgundy, go: '#/investor-development', badge: '3 New · 2 at L4', badgeTone: 'success' },
  { title: 'Development & Operations', desc: 'Monitor zoning, master plan and utilization.', icon: 'build', color: QFZ.green, go: '#/development-operations', badge: '45% utilized', badgeTone: 'warning' },
  { title: 'Strategy', desc: 'Vision 2030 objectives and strategic pillars.', icon: 'target', color: QFZ.warm, go: '#/strategy', badge: '9 on track', badgeTone: 'success' },
  { title: 'Finance & Business Support', desc: 'Revenue, capex and where the budget goes.', icon: 'wallet', color: QFZ.blueSoft, go: '#/finance', badge: '23 invoices', badgeTone: 'warning' },
  { title: 'Reports & Analytics', desc: 'Detailed reports, KPIs and analytical insights.', icon: 'doc', color: QFZ.mint, go: '#/reports', badge: '5 new', badgeTone: 'info' },
  { title: 'Approvals', desc: 'Review tasks, approvals and action items.', icon: 'check', color: QFZ.burgundySoft, go: '#/approvals', badge: '12 pending', badgeTone: 'danger' },
  { title: 'Data Explorer', desc: 'Query, pivot and visualise QFZ datasets.', icon: 'db', color: QFZ.charcoal, go: '#/data-explorer', badge: '8 live', badgeTone: 'info' }];

  const services = [
  { title: 'Employee Self Services', desc: 'HR, payroll, leave and people operations.', icon: 'users', color: QFZ.blue, go: '#/human-capital' },
  { title: 'CRM', desc: 'Investors, deals and relationship pipeline.', icon: 'briefcase', color: QFZ.burgundy, go: '#/investor-development' },
  { title: 'ERP', desc: 'Finance, procurement and resource planning.', icon: 'wallet', color: QFZ.green, go: '#/finance' },
  { title: 'Dashboards', desc: 'Explore all performance dashboards.', icon: 'grid', color: QFZ.warm, go: '#/investor-development', live: true }];

  const stats = [
  { v: '3', l: 'New investors\nregistered today', i: 'user', c: QFZ.blue },
  { v: '8', l: 'Deals advanced\nto L4 stage', i: 'trending', c: QFZ.green },
  { v: '14', l: 'Approvals\npending review', i: 'check', c: QFZ.warm },
  { v: 'Monthly', l: 'Economic report\npublished', i: 'doc', c: QFZ.burgundy }];

  const tasks = [
  { t: 'Review executive hiring approval', m: 'Human Capital', p: 'High', c: QFZ.burgundy },
  { t: 'Approve land allocation request', m: 'Development & Operations', p: 'High', c: QFZ.burgundy },
  { t: 'Review ERP purchase order', m: 'Finance', p: 'Medium', c: QFZ.warm },
  { t: 'Assess compliance risk', m: 'Governance', p: 'Medium', c: QFZ.warm }];

  return (
    <div className="fs-page">
      <FSTopbar navigate={navigate} onAI={onAI} />
      <div className="dash-hero">
        <div className="dash-hero-bg" aria-hidden="true"></div>
        <div className="dash-hero-content">
          <div className="dash-hero-left">
            <span className="dash-hero-eyebrow"><Icon name="sparkle" size={12} style={{ fill: '#fff', stroke: 'none' }} /> Qatar Free Zones · Executive Cockpit</span>
            <h2 style={{ fontSize: "36px", color: "rgb(255, 255, 255)" }}>Shaping the future of free zones.<br /><span style={{ color: "rgb(255, 255, 255)" }}>Driving sustainable growth and investor confidence.</span></h2>
            <p>One platform connecting investment, operations, people and finance — turning live data from every free zone into faster, clearer executive decisions.</p>
            <div className="dash-hero-chips">
              <span className="dash-hero-chip"><Icon name="map" size={13} /> 5 active free zones</span>
              <span className="dash-hero-chip"><Icon name="users" size={13} /> 145 investors onboarded</span>
              <span className="dash-hero-chip"><Icon name="money" size={13} /> QAR 12.8B active value</span>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
              <button className="btn" style={{ background: '#fff', color: QFZ.blue }}>View Performance Summary <Icon name="arrow" size={13} /></button>
              <button className="btn" style={{ background: 'rgba(255,255,255,0.14)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)' }} onClick={onAI}><Icon name="sparkle" size={13} style={{ fill: '#fff', stroke: 'none' }} /> Ask QFZ AI</button>
            </div>
          </div>
          <div className="dash-hero-stats">
            {stats.map((s, i) =>
            <div key={i} className="dash-stat" style={{ animation: `fadeIn .6s ease-out ${i * 90}ms both`, borderWidth: "1px" }}>
                <span className="ds-ico" style={{ background: 'rgba(255,255,255,0.18)', color: '#fff' }}><Icon name={s.i} size={16} /></span>
                <div className="ds-v" style={{ color: '#fff' }}><CountUp value={s.v} /></div>
                <div className="ds-l">{s.l}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="dash-section-head" style={{ marginTop: 28, margin: "32px 0px 14px" }}><SectionPill label="Quick access" icon="bolt" variant="brand" /><span style={{ fontSize: 12, color: QFZ.textSec }}>Jump straight into a service area</span></div>
      <div className="service-grid">
        {services.map((s, i) =>
        <button key={s.title} className={`service-card ${s.live ? 'is-live' : 'is-soon'}`} onClick={() => s.live && navigate(s.go)} style={{ animation: `slideUp .5s ease-out ${i * 60}ms both` }}>
          <span className="svc-ico" style={{ background: `linear-gradient(135deg, ${s.color}, ${hexA(s.color, 0.7)})` }}><Icon name={s.icon} size={22} /></span>
          <div className="svc-title">{s.title}</div>
          <div className="svc-desc">{s.desc}</div>
          <span className="svc-arrow">{s.live ? <Icon name="arrow" size={15} /> : <Icon name="arrow" size={15} />}</span>
        </button>
        )}
      </div>
      <div className="dash-section-head" style={{ margin: "36px 0px 14px" }}><SectionPill label="Stay informed" icon="bell" variant="brand" /><span style={{ fontSize: 12, color: QFZ.textSec }}>Announcements and what's on your calendar</span></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <div className="card" style={{ padding: 22 }}>
          <div className="card-header" style={{ marginBottom: 14 }}><div className="card-title" style={{ fontSize: "20px" }}>Announcements &amp; Executive Updates</div><Icon name="doc" size={16} /></div>
          {[{ tag: 'STRATEGIC', c: QFZ.blue, t: 'Q2 strategic priorities published', m: 'Yesterday · CEO Office', d: 'Updated focus areas for the next quarter are now available.' },
          { tag: 'POLICY', c: QFZ.burgundy, t: 'New investor onboarding policy', m: '2 days ago · Legal', d: 'Streamlined process reduces approval time by 30%.' },
          { tag: 'MILESTONE', c: QFZ.green, t: 'QAR 12B investment milestone', m: '3 days ago · Investor Relations', d: 'Active investment value crossed a historic threshold.' }].map((a, i) =>
          <div key={i} style={{ paddingBottom: 13, marginBottom: 13, borderBottom: i < 2 ? '1px solid rgba(64,65,66,0.06)' : 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}><span style={{ padding: '3px 9px', borderRadius: 999, background: hexA(a.c, 0.12), color: a.c, fontSize: 9, fontWeight: 600, letterSpacing: 1 }}>{a.tag}</span><span style={{ fontSize: 10.5, color: QFZ.textMuted }}>{a.m}</span></div>
            <div style={{ fontSize: 13, fontWeight: 600, color: QFZ.navy, marginBottom: 4 }}>{a.t}</div>
            <div style={{ fontSize: 11.5, color: QFZ.textSec, lineHeight: 1.5 }}>{a.d}</div>
          </div>
          )}
        </div>
        <div className="card" style={{ padding: 22 }}>
          <div className="card-header" style={{ marginBottom: 14 }}><div className="card-title" style={{ fontSize: "20px" }}>Upcoming Meetings &amp; Calendar</div><Icon name="calendar" size={16} /></div>
          {[{ t: '09:30', d: '45m', ti: 'Q2 Board Review Prep', a: 'Strategy + Finance', c: QFZ.blue },
          { t: '11:00', d: '30m', ti: 'TechNova Investment Brief', a: 'Investor Relations', c: QFZ.burgundy },
          { t: '14:00', d: '60m', ti: 'Land Allocation Committee', a: 'Operations + Legal', c: QFZ.warm },
          { t: '16:30', d: '30m', ti: 'Vision 2030 Steering', a: 'CEO Office', c: QFZ.green }].map((m, i) =>
          <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 13px', borderRadius: 13, background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(64,65,66,0.04)', marginBottom: 9 }}>
            <div style={{ textAlign: 'center', flexShrink: 0 }}><div style={{ fontSize: 13, fontWeight: 600, color: QFZ.navy }}>{m.t}</div><div style={{ fontSize: 9, fontWeight: 500, color: QFZ.textMuted, marginTop: 3 }}>{m.d}</div></div>
            <div style={{ width: 3, background: m.c, borderRadius: 2 }} />
            <div><div style={{ fontSize: 12.5, fontWeight: 600, color: QFZ.navy }}>{m.ti}</div><div style={{ fontSize: 11, color: QFZ.textSec, marginTop: 3 }}>{m.a}</div></div>
          </div>
          )}
        </div>
      </div>
    </div>);

}
Object.assign(window, { LandingPage, AllDashboardsPage, FSTopbar });