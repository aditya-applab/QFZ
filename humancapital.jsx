// ============================================================
//  QFZ Observatory — Human Capital
// ============================================================
function HCTopCards() {
  const cards = [
    { l:'Total Headcount', v:'1,248', d:'+6.3%', t:'up', c:QFZ.blue, i:'users' },
    { l:'Total Departments', v:'24', d:null, c:QFZ.green, i:'grid' },
    { l:'Nationalities', v:'42', d:null, c:QFZ.burgundy, i:'globe' },
    { l:'Female Employees', v:'38.6%', d:'+2.1%', t:'up', c:QFZ.burgundySoft, i:'user' },
    { l:'Turnover Rate (YTD)', v:'6.8%', d:'-1.3%', t:'down', c:QFZ.warm, i:'trending' },
    { l:'Vacancies', v:'56', d:'+6', t:'up', c:QFZ.mint, i:'briefcase' },
  ];
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:14 }}>
      {cards.map((k,i)=>(
        <div key={k.l} style={{ animation:`fadeIn .5s ${i*60}ms both` }}>
          <KpiCard label={k.l} value={k.v} delta={k.d} deltaTone={k.t} sparkColor={k.c} accent={k.c} />
        </div>
      ))}
    </div>
  );
}

function WorkforceRadial() {
  const [sel, setSel] = useState(null);
  const nats = HC.nationalities;
  const total = HC.totalHeadcount;
  const top = nats[0];
  const v = useCountUp(total, {});
  return (
    <Card style={{ padding:24 }}>
      <div className="card-header"><div><div className="card-eyebrow">Total registration integrity</div><div className="card-title">Workforce Overview</div><div className="card-subtitle">Headcount by nationality · click a row</div></div></div>
      <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap:24, alignItems:'center' }}>
        <div className="donut-host" style={{ width:220, height:220 }}>
          <RadialTicks value={sel ? Math.round((sel.value/total)*100) : 82} color={sel ? sel.color : QFZ.blue} height={220} ticks={64} />
          <div className="donut-c">
            <div className="dv">{sel ? sel.value : v}</div>
            <div className="dl">{sel ? sel.name : 'Total employees'}</div>
          </div>
        </div>
        <div className="legend-list">
          {nats.map(n=>{
            const pct = Math.round((n.value/total)*100);
            return (
              <div className="legend-row" key={n.name} onMouseEnter={()=>setSel(n)} onMouseLeave={()=>setSel(null)} style={{ cursor:'pointer' }}>
                <span className="sw" style={{ background:n.color }} /><span className="nm">{n.name}</span><span className="vv">{n.value}</span><span className="pc">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

function OrgOverview() {
  return (
    <Card style={{ padding:24 }}>
      <div className="card-header"><div><div className="card-eyebrow">Organization overview</div><div className="card-title">Structure at a glance</div></div></div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
        {HC.orgStats.map(s=>(
          <div key={s.label} style={{ background:'rgba(64,65,66,0.025)', border:'1px solid rgba(64,65,66,0.05)', borderRadius:12, padding:'14px 16px', textAlign:'center' }}>
            <div style={{ width:34, height:34, margin:'0 auto 8px', borderRadius:10, background:hexA(QFZ.blue,0.1), color:QFZ.blue, display:'flex', alignItems:'center', justifyContent:'center' }}><Icon name={s.icon} size={16} /></div>
            <div style={{ fontSize:11, fontWeight:600, color:QFZ.textMuted }}>{s.label}</div>
            <div style={{ fontSize:24, fontWeight:600, color:QFZ.navy, letterSpacing:-.6, marginTop:3 }}>{s.value}</div>
            <div style={{ fontSize:10.5, color:QFZ.textSec, fontWeight:600 }}>{s.unit}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function HiringAttritionPanel() {
  return (
    <Card style={{ padding:24 }}>
      <div className="card-header">
        <div><div className="card-eyebrow">How we're growing</div><div className="card-title">Hiring vs Attrition · 12-Month Trend</div><div className="card-subtitle">Net headcount change with monthly target line</div></div>
        <div className="segmented" style={{ marginBottom:0 }}>{['12M','6M','3M'].map((r,i)=><button key={r} className={`segmented-item ${i===0?'active':''}`}>{r}</button>)}</div>
      </div>
      <div style={{ display:'flex', gap:18, alignItems:'stretch' }}>
        <div style={{ flex:1, minWidth:0 }}><HiringAttrition height={300} /></div>
        <div style={{ width:200, flexShrink:0, display:'flex', flexDirection:'column', gap:10, justifyContent:'center' }}>
          {[{l:'YTD Hires',v:'281',d:'↑ 18% YoY',c:QFZ.blue,i:'arrowUp'},{l:'YTD Attrition',v:'98',d:'↓ 6% YoY',c:QFZ.burgundy,i:'arrowDown'},{l:'Net Growth',v:'+183',d:'On track',c:QFZ.green,i:'check'}].map(s=>(
            <div key={s.l} style={{ padding:'10px 13px', borderRadius:13, background:hexA(s.c,0.06), border:`1px solid ${hexA(s.c,0.16)}` }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}><span style={{ width:28, height:28, borderRadius:9, background:s.c, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center' }}><Icon name={s.i} size={14} /></span><span style={{ fontSize:10.5, fontWeight:600, color:QFZ.textMuted, letterSpacing:.3, textTransform:'uppercase' }}>{s.l}</span></div>
              <div style={{ fontSize:22, fontWeight:600, color:QFZ.navy, letterSpacing:-.6, marginTop:4 }}><CountUp value={s.v} /></div>
              <div style={{ fontSize:11.5, fontWeight:600, color:s.c }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function WorkforceTab() {
  const total = HC.departments.reduce((a,b)=>a+b.value,0);
  return (
    <div className="page-col">
      <HCTopCards />
      <div style={{ display:'grid', gridTemplateColumns:'1.2fr 1fr 1fr', gap:18 }}>
        <Card style={{ padding:24 }}>
          <div className="card-header"><div><div className="card-eyebrow">By department</div><div className="card-title">Headcount by Department</div></div></div>
          <GradientBars data={HC.departments.map(d=>({name:d.name,value:d.value,color:d.color}))} height={250} />
        </Card>
        <WorkforceRadial />
        <OrgOverview />
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
        <Card style={{ padding:24 }}>
          <div className="card-header"><div><div className="card-eyebrow">By employment type</div><div className="card-title">Employment Type</div></div></div>
          <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap:24, alignItems:'center' }}>
            <div className="donut-host" style={{ width:220, height:220 }}>
              <Donut data={HC.employmentType.map(e=>({name:e.name,value:e.value,color:e.color}))} height={220} formatter={(p)=>`<b>${p.name}</b><br/>${p.value}%`} />
              <div className="donut-c"><div className="dv">{fmt.int(HC.totalHeadcount)}</div><div className="dl">total</div></div>
            </div>
            <div className="legend-list">
              {HC.employmentType.map(e=>(<div className="legend-row" key={e.name}><span className="sw" style={{ background:e.color }} /><span className="nm">{e.name}</span><span className="pc">{e.value}%</span></div>))}
            </div>
          </div>
        </Card>
        <Card style={{ padding:24 }}>
          <div className="card-header"><div><div className="card-eyebrow">By age group</div><div className="card-title">Headcount by Age Group</div></div></div>
          <GradientColumns cats={HC.ageGroups.map(a=>a.g)} vals={HC.ageGroups.map(a=>a.v)} height={250} />
        </Card>
      </div>
      <HiringAttritionPanel />
    </div>
  );
}

function HumanCapitalPage() {
  const [tab, setTab] = useState('workforce');
  const tabs = [
    { id:'workforce', label:'Workforce & Organization' }, { id:'attendance', label:'Attendance' },
    { id:'recruitment', label:'Recruitment' }, { id:'learning', label:'Learning & Development' },
    { id:'performance', label:'Performance' }, { id:'travel', label:'Travel & Expense' },
  ];
  return (
    <div className="page-col">
      <div className="subtabs" style={{ alignSelf:'flex-start', flexWrap:'wrap' }}>
        {tabs.map(t => <button key={t.id} className={`subtab ${tab===t.id?'active':''}`} onClick={()=>setTab(t.id)}>{t.label}</button>)}
      </div>
      {tab==='workforce' && <WorkforceTab />}
      {tab!=='workforce' && <AttendanceLite key={tab} tab={tab} />}
    </div>
  );
}
function AttendanceLite({ tab }) {
  if (tab==='attendance') {
    return (
      <div className="page-col">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:12 }}>
          {[{l:'Attendance Rate',v:'96.2%',c:QFZ.green,i:'check'},{l:'Late Arrivals',v:'42',c:QFZ.warm,i:'clock'},{l:'Absenteeism',v:'2.1%',c:QFZ.burgundy,i:'user'},{l:'On Leave Today',v:'128',c:QFZ.blue,i:'calendar'},{l:'Early Departures',v:'18',c:QFZ.mint,i:'arrowDown'}].map((k,i)=>(
            <div key={k.l} style={{ animation:`fadeIn .5s ${i*60}ms both` }}><KpiCard label={k.l} value={k.v} sparkColor={k.c} /></div>
          ))}
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
          <Card style={{ padding:24 }}><div className="card-header"><div><div className="card-eyebrow">Trend</div><div className="card-title">Attendance Rate Trend</div></div></div><Sparkline values={[80,84,82,79,81,80,82]} color={QFZ.green} height={220} /></Card>
          <Card style={{ padding:24 }}><div className="card-header"><div><div className="card-eyebrow">By department</div><div className="card-title">Attendance by Department</div></div></div><GradientBars data={[{name:'Corporate Services',value:97.6},{name:'Finance',value:96.4},{name:'Dev & Operations',value:95.1},{name:'Investment Dev',value:94.8},{name:'Strategy',value:96.7}].map(d=>({...d,color:QFZ.green}))} height={230} max={100} unit="%" /></Card>
        </div>
      </div>
    );
  }
  return <HCJustShow tab={tab} />;
}

/* ---- "just show" panels: Recruitment, Learning, Performance, Travel ---- */
function HCJustShow({ tab }) {
  const CFG = {
    recruitment: {
      tiles:[{l:'Open Positions',v:'56',c:QFZ.blue,i:'briefcase'},{l:'Applicants',v:'1,284',c:QFZ.green,i:'users'},{l:'Offers Extended',v:'38',c:QFZ.warm,i:'doc'},{l:'Time-to-Hire',v:'28d',c:QFZ.burgundy,i:'clock'}],
      left:{ eyebrow:'Hiring funnel', title:'Recruitment Funnel', kind:'cols', cats:['Applied','Screened','Interview','Offer','Hired'], vals:[1284,512,196,64,38], color:QFZ.blue },
      right:{ eyebrow:'By department', title:'Open Roles by Department', kind:'bars', data:[{name:'Dev & Operations',value:16},{name:'Investment Dev',value:12},{name:'Corporate Services',value:11},{name:'Finance',value:9},{name:'Strategy',value:8}] },
    },
    learning: {
      tiles:[{l:'Active Courses',v:'142',c:QFZ.blue,i:'book'},{l:'Completion Rate',v:'87%',c:QFZ.green,i:'check'},{l:'Learning Hours',v:'12,400',c:QFZ.warm,i:'clock'},{l:'Certifications',v:'320',c:QFZ.burgundy,i:'award'}],
      left:{ eyebrow:'By category', title:'Courses by Category', kind:'cols', cats:['Leadership','Technical','Compliance','Soft Skills','Digital'], vals:[38,46,22,18,18], color:QFZ.green },
      right:{ eyebrow:'Engagement', title:'Completion by Department', kind:'bars', data:[{name:'Corporate Services',value:92},{name:'Finance',value:88},{name:'Investment Dev',value:85},{name:'Dev & Operations',value:83},{name:'Strategy',value:90}], max:100, unit:'%' },
    },
    performance: {
      tiles:[{l:'Avg. Rating',v:'4.2',c:QFZ.blue,i:'star'},{l:'Reviews Completed',v:'92%',c:QFZ.green,i:'check'},{l:'Goals Met',v:'78%',c:QFZ.warm,i:'target'},{l:'Top Performers',v:'64',c:QFZ.burgundy,i:'award'}],
      left:{ eyebrow:'Distribution', title:'Rating Distribution', kind:'cols', cats:['1','2','3','4','5'], vals:[12,38,224,486,488], color:QFZ.blue },
      right:{ eyebrow:'By department', title:'Avg. Rating by Department', kind:'bars', data:[{name:'Strategy',value:4.4},{name:'Finance',value:4.3},{name:'Investment Dev',value:4.2},{name:'Corporate Services',value:4.1},{name:'Dev & Operations',value:4.0}], max:5 },
    },
    travel: {
      tiles:[{l:'Trips (YTD)',v:'214',c:QFZ.blue,i:'globe'},{l:'Total Spend',v:'QAR 4.2M',c:QFZ.green,i:'money'},{l:'Pending Claims',v:'23',c:QFZ.warm,i:'doc'},{l:'Avg. Cost / Trip',v:'QAR 19.6k',c:QFZ.burgundy,i:'wallet'}],
      left:{ eyebrow:'By purpose', title:'Trips by Purpose', kind:'cols', cats:['Investor','Conference','Training','Audit','Other'], vals:[96,52,34,18,14], color:QFZ.warm },
      right:{ eyebrow:'By region', title:'Spend by Region', kind:'bars', data:[{name:'GCC',value:1.6},{name:'Europe',value:1.1},{name:'Asia',value:0.8},{name:'Americas',value:0.5},{name:'Africa',value:0.2}], unit:'M' },
    },
  };
  const cfg = CFG[tab] || CFG.recruitment;
  return (
    <div className="page-col">
      <div className="mini-tiles" style={{ gridTemplateColumns:'repeat(4,1fr)' }}>
        {cfg.tiles.map((k,i)=>(
          <div key={k.l} style={{ animation:`fadeIn .5s ${i*60}ms both` }}>
            <KpiCard label={k.l} value={k.v} sparkColor={k.c} />
          </div>
        ))}
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
        <Card style={{ padding:24 }}>
          <div className="card-header"><div><div className="card-eyebrow">{cfg.left.eyebrow}</div><div className="card-title">{cfg.left.title}</div></div></div>
          <GradientColumns cats={cfg.left.cats} vals={cfg.left.vals} height={250} />
        </Card>
        <Card style={{ padding:24 }}>
          <div className="card-header"><div><div className="card-eyebrow">{cfg.right.eyebrow}</div><div className="card-title">{cfg.right.title}</div></div></div>
          <GradientBars data={cfg.right.data} height={230} max={cfg.right.max} unit={cfg.right.unit||''} />
        </Card>
      </div>
    </div>
  );
}
Object.assign(window, { HumanCapitalPage });
