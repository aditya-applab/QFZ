// ============================================================
//  QFZ Observatory — Executive Overview (landing)
// ============================================================
function HeroInsight({ navigate }) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  return (
    <div className="card gradient gradient-blue" style={{ padding: 28, overflow: 'hidden', position: 'relative', background: 'linear-gradient(135deg, #2540A3 0%, #862041 140%)', border: '1px solid rgba(255,255,255,0.10)' }}>
      <div style={{ position: 'absolute', top: -60, right: -40, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.16), transparent 65%)' }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 28, alignItems: 'end', position: 'relative', zIndex: 1 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, padding: '4px 11px', borderRadius: 999, background: 'rgba(255,255,255,0.18)' }}><Icon name="sparkle" size={12} style={{ fill: '#fff', stroke: 'none' }} /> AI Insight</span>
            <span style={{ fontSize: 12, opacity: .8 }}>{today}</span>
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 600, letterSpacing: -.5, lineHeight: 1.2 }}>Welcome back, Sheikh Jassim.</h2>
          <p style={{ fontSize: 13.5, opacity: .9, lineHeight: 1.6, marginTop: 10, maxWidth: 560 }}>
            Active investment value reached <b>QAR 12.8B</b> this month with <b>10 new investors</b> onboarded.
            Ras Bufontas and Umm Alhoul lead growth; 6 construction projects advanced in manufacturing and technology.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
            {[{ l: 'Active Investors', v: '145', s: 'across 5 sectors', b: 78 }, { l: 'Licenses Issued', v: '63', s: '↑ 22% vs target', b: 62 }, { l: 'Capex Deployed', v: 'QAR 9.6B', s: '85% of plan', b: 85 }].map((t) =>
            <div key={t.l} style={{ flex: 1, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 14, padding: '14px 16px' }}>
                <div style={{ fontSize: 11, fontWeight: 600, opacity: .82 }}>{t.l}</div>
                <div className="hero-stat-v" style={{ fontSize: 22, fontWeight: 600, letterSpacing: -.6, marginTop: 4, color: '#fff' }}><CountUp value={t.v} /></div>
                <div style={{ fontSize: 10.5, opacity: .78, marginTop: 3 }}>{t.s}</div>
              </div>
            )}
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.10)', borderRadius: 18, padding: 18, border: '1px solid rgba(255,255,255,0.16)' }}>
          <div style={{ fontSize: 12, fontWeight: 600, opacity: .85, marginBottom: 6 }}>Investment velocity · this week</div>
          <Sparkline values={[62, 60, 68, 65, 78, 82, 88, 92]} color="#fff" height={120} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 8 }}>
            <span style={{ fontSize: 11, opacity: .8 }}>QAR deployed</span>
            <span className="hero-stat-v" style={{ fontSize: 26, fontWeight: 600, letterSpacing: -.6, color: '#fff' }}><CountUp value="92%" /></span>
          </div>
        </div>
      </div>
    </div>);

}

function OverviewPage({ navigate }) {
  const modules = [
  { title: 'Employee Services', tag: 'HR', desc: 'Attendance, recruitment, learning and everything your teams need.', color: QFZ.blue, icon: 'users', stat: '508', statL: 'People on the team', go: '#/human-capital' },
  { title: 'Investor CRM', tag: 'Investors', desc: 'Pipeline, deal health and sector trends across every investor.', color: QFZ.burgundy, icon: 'briefcase', stat: '145', statL: 'Active investors', go: '#/investor-development' },
  { title: 'Finance & ERP', tag: 'Finance', desc: 'A clear view of capex, revenue and where the budget is going.', color: QFZ.green, icon: 'wallet', stat: 'QAR 1.8B', statL: 'Revenue this year', go: '#/finance' }];

  const snapshot = [
  { l: 'Conversion Rate', v: 38, c: QFZ.blue }, { l: 'Capex vs Plan', v: 85, c: QFZ.green }, { l: 'Qatarization', v: 42, c: QFZ.warm }];

  return (
    <div className="page-col">
      <HeroInsight navigate={navigate} />

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 18 }}>
        <Card style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
          <div className="card-header"><div><div className="card-eyebrow">Today's snapshot</div><div className="card-title">Performance Today</div></div><span className="pill success"><span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: QFZ.green, display: 'inline-block' }} /> Live</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, flex: 1, alignContent: 'center', marginTop: 10 }}>
            {snapshot.map((s) =>
            <div key={s.l} style={{ textAlign: 'center' }}>
                <div className="donut-host" style={{ width: '100%', height: 190 }}>
                  <RadialTicks value={s.v} color={s.c} height={190} ticks={48} />
                  <div className="donut-c"><div className="dv" style={{ fontSize: 22, color: s.c }}>{s.v}%</div></div>
                </div>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: QFZ.textSec, marginTop: 4 }}>{s.l}</div>
              </div>
            )}
          </div>
        </Card>
        <Card style={{ padding: 24 }}>
          <div className="card-header"><div><div className="card-eyebrow">Activity · 24h</div><div className="card-title">Activity Timeline</div></div></div>
          <div>
            {ACTIVITY_FEED.map((a, i) =>
            <div className="feed-item" key={i} style={{ animation: `fadeIn .5s ${i * 60}ms both`, alignItems: "center" }}>
                <div className="feed-ico" style={{ background: hexA(a.color, 0.12), color: a.color }}><Icon name={a.icon} size={15} /></div>
                <div className="feed-body"><div className="ttl"><b>{a.who}</b> {a.what}</div></div>
                <div className="feed-time">{a.t}</div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* module quick-access section removed */}

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 16 }}>
        <Card style={{ padding: 22 }}>
          <div className="card-header" style={{ marginBottom: 12 }}><div><div className="card-eyebrow">Awaiting your decision</div><div className="card-title">Approvals</div></div><span className="chip info">12 items</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 14 }}>
            {[{ l: 'PENDING', v: '12', c: QFZ.warm }, { l: 'APPROVED', v: '8', c: QFZ.green }, { l: 'REJECTED', v: '2', c: QFZ.burgundy }, { l: 'TOTAL', v: '34', c: QFZ.blue }].map((s) =>
            <div key={s.l} style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(64,65,66,0.03)', border: '1px solid rgba(64,65,66,0.05)' }}><div style={{ fontSize: 9, fontWeight: 600, color: QFZ.textMuted, letterSpacing: 1 }}>{s.l}</div><div style={{ fontSize: 18, fontWeight: 600, color: s.c, marginTop: 4 }}><CountUp value={s.v} /></div></div>
            )}
          </div>
          {[{ i: 'briefcase', c: QFZ.blue, t: 'Investment Approval — TechNova FZ-LLC', m: 'Investor Relations · 2h ago', v: 'QAR 240M', p: 'High', pc: QFZ.burgundy }, { i: 'map', c: QFZ.warm, t: 'Land Allocation — Plot B22', m: 'Operations · 4h ago', v: '58,600 m²', p: 'Medium', pc: QFZ.warm }, { i: 'license', c: QFZ.green, t: 'License Upgrade — Global Logistics', m: 'Investor Relations · 6h ago', v: 'L3 → L4', p: 'High', pc: QFZ.burgundy }].map((r, i) =>
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 13px', borderRadius: 13, background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(64,65,66,0.04)', borderLeft: `3px solid ${r.pc}`, marginBottom: 8 }}>
              <span style={{ width: 34, height: 34, borderRadius: 10, background: r.c, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name={r.i} size={14} /></span>
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontSize: 12.5, fontWeight: 600, color: QFZ.navy, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.t}</div><div style={{ fontSize: 10.5, color: QFZ.textSec, marginTop: 2 }}>{r.m}</div></div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}><div style={{ fontSize: 12, fontWeight: 600, color: QFZ.navy }}>{r.v}</div><div style={{ fontSize: 9.5, color: r.pc, fontWeight: 600, marginTop: 2, letterSpacing: .5 }}>{r.p.toUpperCase()}</div></div>
            </div>
          )}
        </Card>
        <Card style={{ padding: 22 }}>
          <div className="card-header" style={{ marginBottom: 12 }}><div><div className="card-eyebrow">Your week ahead</div><div className="card-title">Upcoming Meetings</div></div><Icon name="calendar" size={16} /></div>
          {[{ t: '09:30', d: '45m', ti: 'Q2 Board Review Prep', a: 'Strategy + Finance', c: QFZ.blue }, { t: '11:00', d: '30m', ti: 'TechNova Investment Brief', a: 'Investor Relations', c: QFZ.burgundy }, { t: '14:00', d: '60m', ti: 'Land Allocation Committee', a: 'Operations + Legal', c: QFZ.warm }, { t: '16:30', d: '30m', ti: 'Vision 2030 Steering', a: 'CEO Office', c: QFZ.green }].map((m, i) =>
          <div key={i} style={{ display: 'flex', gap: 14, padding: '11px 13px', borderRadius: 13, background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(64,65,66,0.04)', marginBottom: 8 }}>
              <div style={{ textAlign: 'center', flexShrink: 0 }}><div style={{ fontSize: 13, fontWeight: 600, color: QFZ.navy }}>{m.t}</div><div style={{ fontSize: 9, fontWeight: 600, color: QFZ.textMuted, marginTop: 3 }}>{m.d}</div></div>
              <div style={{ width: 3, background: m.c, borderRadius: 2 }} />
              <div><div style={{ fontSize: 12.5, fontWeight: 600, color: QFZ.navy }}>{m.ti}</div><div style={{ fontSize: 11, color: QFZ.textSec, marginTop: 3 }}>{m.a}</div></div>
            </div>
          )}
        </Card>
        <Card style={{ padding: 22 }}>
          <div className="card-header" style={{ marginBottom: 12 }}><div><div className="card-eyebrow">Recent announcements</div><div className="card-title">Announcements</div></div><Icon name="bell" size={16} /></div>
          {[{ tag: 'STRATEGIC', c: QFZ.blue, t: 'Q2 strategic priorities published', m: 'Yesterday · CEO Office', d: 'Updated focus areas for the next quarter now available.' }, { tag: 'POLICY', c: QFZ.burgundy, t: 'New investor onboarding policy', m: '2 days ago · Legal', d: 'Streamlined process reduces approval time by 30%.' }, { tag: 'MILESTONE', c: QFZ.green, t: 'QAR 12B investment milestone', m: '3 days ago · Investor Relations', d: 'Active investment value crossed a historic threshold.' }].map((a, i) =>
          <div key={i} style={{ paddingBottom: 12, marginBottom: 12, borderBottom: i < 2 ? '1px solid rgba(64,65,66,0.06)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}><span style={{ padding: '2px 8px', borderRadius: 999, background: hexA(a.c, 0.12), color: a.c, fontSize: 9, fontWeight: 600, letterSpacing: 1 }}>{a.tag}</span><span style={{ fontSize: 10, color: QFZ.textMuted }}>{a.m}</span></div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: QFZ.navy, marginBottom: 3 }}>{a.t}</div>
              <div style={{ fontSize: 11, color: QFZ.textSec, lineHeight: 1.4 }}>{a.d}</div>
            </div>
          )}
        </Card>
      </div>
    </div>);

}
Object.assign(window, { OverviewPage });