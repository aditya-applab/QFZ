// ============================================================
//  QFZ Observatory — shell (sidebar, topbar, router, AI drawer)
// ============================================================
const NAV = [
{ section: 'Main', items: [
  { id: 'overview', label: 'Overview', icon: 'home', path: '#/overview' },
  { id: 'investor-development', label: 'Investor Development', icon: 'chart', path: '#/investor-development' },
  { id: 'development-operations', label: 'Development & Operations', icon: 'build', path: '#/development-operations' },
  { id: 'human-capital', label: 'Human Capital', icon: 'users', path: '#/human-capital' },
  { id: 'strategy', label: 'Strategy', icon: 'target', path: '#/strategy' },
  { id: 'finance', label: 'Finance & Business Support', icon: 'wallet', path: '#/finance' }]
},
{ section: 'Workspace', items: [
  { id: 'reports', label: 'Reports', icon: 'doc', path: '#/reports' },
  { id: 'documents', label: 'Documents', icon: 'folder', path: '#/documents' },
  { id: 'data-explorer', label: 'Data Explorer', icon: 'db', path: '#/data-explorer' }]
}];

const PAGE_TITLES = {
  'landing': 'Welcome', 'dashboards': 'All Dashboards',
  'overview': 'Executive Overview', 'investor-development': 'Investor Development',
  'development-operations': 'Development & Operations', 'human-capital': 'Human Capital',
  'strategy': 'Strategy', 'finance': 'Finance & Business Support', 'reports': 'Reports',
  'approvals': 'Approvals', 'documents': 'Documents', 'data-explorer': 'Data Explorer'
};
const PAGE_COMPONENTS = {
  'landing': 'LandingPage', 'dashboards': 'AllDashboardsPage',
  'overview': 'OverviewPage', 'investor-development': 'InvestorDevelopmentPage',
  'development-operations': 'DevOpsPage', 'human-capital': 'HumanCapitalPage',
  'strategy': 'StrategyPage', 'finance': 'FinancePage', 'reports': 'ReportsPage',
  'approvals': 'ApprovalsPage', 'documents': 'DocumentsPage', 'data-explorer': 'DataExplorerPage'
};
const AI_PROMPTS = ['Key performance metrics', 'Deals at risk this week', 'Capex deployment', 'Sector growth'];

function Sidebar({ active, navigate, collapsed, onToggle }) {
  return (
    <aside className={`sidebar ${collapsed ? 'is-collapsed' : ''}`}>
      <div className="sidebar-glass-highlight" aria-hidden="true" />
      <div className="sidebar-logo" style={{ cursor: 'pointer' }} onClick={() => navigate('#/dashboards')} title="All Dashboards">
        {collapsed ?
        <div className="sidebar-logo-mark"><QFZLogo height={24} markOnly /></div> :
        <div className="sidebar-logo-full"><QFZLogo height={48} /></div>}
      </div>
      <div className="sidebar-nav">
        {NAV.map((sec, i) =>
        <div className="nav-section" key={i}>
            {!collapsed && <div className="nav-section-label">{sec.section}</div>}
            {sec.items.map((item) =>
          <div key={item.id} className={`nav-item ${active === item.id ? 'active' : ''}`}
          onClick={() => navigate(item.path)} title={collapsed ? item.label : ''}>
                <Icon name={item.icon} size={18} className="nav-icon" />
                {!collapsed && <span style={{ fontWeight: "400", fontSize: "13px" }}>{item.label}</span>}
                {!collapsed && item.badge && <span className="badge">{item.badge}</span>}
                {collapsed && item.badge && <span className="badge badge-mini">{item.badge}</span>}
              </div>
          )}
          </div>
        )}
      </div>
      {!collapsed && <div className="sidebar-footer"><div className="sidebar-footer-text" style={{ fontSize: "10px" }}>We make our investors the&nbsp;center of everything we do.</div></div>}
      <button className="sidebar-collapse-btn" onClick={onToggle}>
        <Icon name={collapsed ? 'chevronRight' : 'chevronLeft'} size={14} />
        {!collapsed && <span>Collapse menu</span>}
      </button>
    </aside>);

}

/* Shared "Ask Anything" pill — trigger (header) opens the AI drawer */
function AskBar({ onClick, trigger = true }) {
  return (
    <div className={`askbar ${trigger ? 'askbar-trigger' : ''}`} onClick={onClick}>
      <span className="askbar-spark"><Icon name="sparkle" size={15} /></span>
      <span className="askbar-ph">Ask Anything…</span>
      <span className="askbar-tools">
        <span className="askbar-clip"><Icon name="paperclip" size={15} /></span>
        <span className="askbar-voice"><Icon name="pulse" size={12} /> Voice</span>
        <span className="askbar-go"><Icon name="search" size={14} /></span>
      </span>
    </div>);

}

/* Right-side header controls (matches reference: settings · lang · AI avatar) */
const NOTIFICATIONS = [
  { icon: 'user', color: QFZ.blue, time: '3 min ago', title: 'New investor application', meta: 'TechVista Solutions · Ras Bufontas', unread: true },
  { icon: 'license', color: QFZ.green, time: '1 hour ago', title: 'License granted', meta: 'Qatar Advanced Manufacturing', unread: true },
  { icon: 'construction', color: QFZ.warm, time: '2 hours ago', title: 'Construction milestone reached', meta: 'Green Future Energy FZCO', unread: true },
  { icon: 'check', color: QFZ.burgundy, time: 'Yesterday', title: 'Capex disbursement approved', meta: 'Phase 2 · QAR 180M', unread: false },
  { icon: 'doc', color: QFZ.blueSoft, time: 'Yesterday', title: 'Monthly economic report published', meta: 'Strategy & Transformation', unread: false },
];
function HeaderControls({ onAI }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const unread = NOTIFICATIONS.filter(n => n.unread).length;
  return (
    <div className="header-controls">
      <div style={{ position: 'relative' }} ref={ref}>
        <button className={`hc-gear ${open ? 'on' : ''}`} title="Notifications" style={{ position: 'relative' }} onClick={() => setOpen(o => !o)}>
          <Icon name="bell" size={16} />
          {unread > 0 && <span style={{ position: 'absolute', top: 6, right: 6, minWidth: 14, height: 14, padding: '0 3px', borderRadius: 999, background: QFZ.secondary, border: '2px solid #fff', color: '#fff', fontSize: 8, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{unread}</span>}
        </button>
        {open && (
          <div className="notif-pop">
            <div className="notif-pop-head">
              <div><div className="notif-pop-title">Notifications</div><div className="notif-pop-sub">{unread} unread</div></div>
              <button className="notif-pop-clear" onClick={() => setOpen(false)}>Mark all read</button>
            </div>
            <div className="notif-pop-list">
              {NOTIFICATIONS.map((n, i) => (
                <div key={i} className={`notif-row ${n.unread ? 'unread' : ''}`}>
                  <span className="notif-ico" style={{ background: hexA(n.color, 0.12), color: n.color }}><Icon name={n.icon} size={15} /></span>
                  <div className="notif-body"><div className="notif-title">{n.title}</div><div className="notif-meta">{n.meta}</div></div>
                  <div className="notif-time">{n.time}</div>
                </div>
              ))}
            </div>
            <button className="notif-pop-foot">View all notifications</button>
          </div>
        )}
      </div>
      <div className="lang-toggle"><button className="lang-pill active">EN</button><button className="lang-pill">العربية</button></div>
      <div className="topbar-user" style={{ paddingLeft: 10, borderLeft: '1px solid var(--qfz-border-soft)' }}><div className="avatar">SJ</div></div>
    </div>);

}

function Topbar({ title, navigate, onAI }) {
  return (
    <div className="topbar">
      <div className="topbar-glass-highlight" aria-hidden="true" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0, flexShrink: 0 }}>
        <button onClick={() => navigate('#/dashboards')} title="All Dashboards" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}><QFZLogo height={26} flagOnly /></button>
        <div className="topbar-label">
          <div className="topbar-label-eyebrow">Qatar Free Zones Authority</div>
          <div className="topbar-label-title">{title}</div>
        </div>
      </div>
      <div style={{ flex: 1 }} />
      <HeaderControls onAI={onAI} />
    </div>);

}

/* Full-screen AI drawer — drops from the top, "Where should we start?" */
function AIDrawer({ open, onClose }) {
  const [q, setQ] = useState('');
  const [msgs, setMsgs] = useState([]);
  const [render, setRender] = useState(false);
  const [phase, setPhase] = useState('in');
  const threadRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => {
    if (open) {setRender(true);setPhase('in');} else
    if (render) {
      setPhase('out');
      const t = setTimeout(() => {setRender(false);setMsgs([]);setQ('');}, 470);
      return () => clearTimeout(t);
    }
  }, [open]);
  useEffect(() => {
    if (!render || phase === 'out') return;
    const f = setTimeout(() => inputRef.current && inputRef.current.focus(), 430);
    const onKey = (e) => {if (e.key === 'Escape') onClose();};
    document.addEventListener('keydown', onKey);
    return () => {clearTimeout(f);document.removeEventListener('keydown', onKey);};
  }, [render, phase]);
  useEffect(() => {if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight;}, [msgs]);
  const send = (text) => {
    const t = (text || q).trim();if (!t) return;
    setMsgs((m) => [...m, { from: 'me', text: t }]);setQ('');
    setTimeout(() => setMsgs((m) => [...m, { from: 'ai', text: `Here's what I found on “${t.slice(0, 42)}${t.length > 42 ? '…' : ''}”. Capex is at 79% of plan, 6 deals are flagged at risk, and Ras Bufontas leads sector growth this quarter.` }]), 650);
  };
  if (!render) return null;
  const chat = msgs.length > 0;
  const out = phase === 'out';
  return (
    <div className="ai-drawer">
      <div className={`ai-drawer-scrim ${out ? 'closing' : ''}`} onClick={onClose} />
      <div className={`ai-drawer-sheet ${chat ? 'chat' : ''} ${out ? 'closing' : ''}`}>
        <button className="ai-drawer-close" onClick={onClose} aria-label="Close"><Icon name="close" size={18} /></button>
        {!chat ?
        <div className="ai-drawer-intro">
            <span className="ai-drawer-spark"><Icon name="sparkle" size={26} /></span>
            <div className="ai-drawer-hi">Hi, Sheikh Jassim</div>
            <h2 className="ai-drawer-q">Where should we start?</h2>
            <div className="ai-drawer-sugg">
              {AI_PROMPTS.map((s) => <button key={s} onClick={() => send(s)}>{s}</button>)}
            </div>
          </div> :

        <div className="ai-drawer-thread" ref={threadRef}>
            {msgs.map((m, i) =>
          <div key={i} className={`ai-msg-row ai-msg-row-${m.from}`}>
                {m.from === 'ai' && <span className="ai-avatar-mini sm"><Icon name="sparkle" size={11} /></span>}
                <div className={`ai-msg ai-msg-${m.from}`}>{m.text}</div>
              </div>
          )}
          </div>
        }
        <div className="ai-drawer-barwrap">
          <div className="askbar askbar-live">
            <span className="askbar-spark"><Icon name="sparkle" size={15} /></span>
            <input ref={inputRef} placeholder="Ask Anything…" value={q}
            onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => {if (e.key === 'Enter') send();}} />
            <span className="askbar-tools">
              <span className="askbar-clip"><Icon name="paperclip" size={15} /></span>
              <span className="askbar-voice"><Icon name="pulse" size={12} /> Voice</span>
              <button className="askbar-go" onClick={() => send()} aria-label="Send"><Icon name="search" size={14} /></button>
            </span>
          </div>
        </div>
      </div>
    </div>);

}

function Fallback({ name }) {
  return <div className="card" style={{ padding: 40, textAlign: 'center', color: QFZ.textMuted }}>Page “{name}” is being prepared.</div>;
}

/* Floating AI launcher — opens the full-screen assistant */
function AIFab({ onClick }) {
  return (
    <button className="ai-fab" onClick={onClick} title="QFZ AI Assistant" aria-label="Open QFZ AI Assistant">
      <span className="ai-fab-ring" aria-hidden="true" />
      <Icon name="sparkle" size={24} />
    </button>);

}

function App() {
  const [hash, navigate] = useHash();
  const [collapsed, setCollapsed] = useState(false);
  const [tick, setTick] = useState(0);
  const [aiOpen, setAiOpen] = useState(false);
  const firstRef = useRef(true);
  const base = hash.replace(/^#\//, '').split('/')[0] || 'overview';
  const active = PAGE_COMPONENTS[base] ? base : 'overview';
  const title = PAGE_TITLES[active];
  const Comp = window[PAGE_COMPONENTS[active]] || (() => <Fallback name={active} />);
  const fullScreen = active === 'landing' || active === 'dashboards';
  const openAI = () => setAiOpen(true);
  useEffect(() => {
    if (firstRef.current) firstRef.current = false;else setTick((t) => t + 1);
    window.scrollTo(0, 0);const sa = document.querySelector('.scroll-area, .fs-scroll');if (sa) sa.scrollTop = 0;
  }, [hash]);
  const drawer = <>{!aiOpen && <AIFab onClick={openAI} />}{<AIDrawer open={aiOpen} onClose={() => setAiOpen(false)} />}</>;
  if (fullScreen) {
    return (
      <>
        <div className="mesh-bg" />
        <div className="fs-scroll"><Comp key={active + '#' + tick} navigate={navigate} onAI={openAI} /></div>
        {drawer}
      </>);

  }
  return (
    <>
      <div className="mesh-bg" />
      <div className={`app ${collapsed ? 'collapsed' : ''}`}>
        <Sidebar active={active} navigate={navigate} collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
        <div className="main">
          <Topbar title={title} navigate={navigate} onAI={openAI} />
          <div className="scroll-area"><Comp key={active + '#' + tick} navigate={navigate} onAI={openAI} subRoute={hash} /></div>
        </div>
      </div>
      {drawer}
    </>);

}
Object.assign(window, { App, Sidebar, Topbar, AskBar, HeaderControls, AIDrawer, AIFab });