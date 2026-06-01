// ============================================================
//  QFZ Observatory — Strategy, Finance, Reports, Approvals, Documents, Data Explorer
// ============================================================
function PageHead({ eyebrow, title, sub, right }) {
  return (
    <div className="card-header"><div><div className="card-eyebrow">{eyebrow}</div><div className="card-title">{title}</div>{sub && <div className="card-subtitle">{sub}</div>}</div>{right}</div>
  );
}
function MiniTiles({ items }) {
  return (
    <div style={{ display:'grid', gridTemplateColumns:`repeat(${items.length},1fr)`, gap:14 }}>
      {items.map((k,i)=>(
        <div key={k.l} style={{ animation:`fadeIn .5s ${i*60}ms both` }}>
          <KpiCard label={k.l} value={k.v} sub={k.s} delta={k.d} deltaTone={k.t||'up'} sparkColor={k.c} accent={k.c} />
        </div>
      ))}
    </div>
  );
}

function StrategyPage() {
  const objectives = [
    { name:'Grow active investment to QAR 18B', pct:71, color:QFZ.blue },
    { name:'Reach 95 cumulative L3 licenses', pct:82, color:QFZ.green },
    { name:'Achieve 45% Qatarization', pct:64, color:QFZ.warm },
    { name:'Deploy QAR 12B capex (FY26)', pct:80, color:QFZ.burgundy },
    { name:'Full occupancy at Ras Bufontas', pct:78, color:QFZ.mint },
  ];
  return (
    <div className="page-col">
      <MiniTiles items={[{l:'Strategic Objectives',v:'14',c:QFZ.blue,i:'target',s:'across 4 pillars'},{l:'On Track',v:'9',c:QFZ.green,i:'check',s:'64% of objectives'},{l:'At Risk',v:'3',c:QFZ.warm,i:'info',s:'need attention'},{l:'Vision 2030 Index',v:'73%',c:QFZ.burgundy,i:'flag',s:'+5% YoY'}]} />
      <div style={{ display:'grid', gridTemplateColumns:'1.3fr 1fr', gap:18 }}>
        <Card style={{ padding:24 }}>
          <PageHead eyebrow="Where we're heading" title="Strategic Objective Progress" sub="FY2026 targets" />
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {objectives.map((o,i)=>(
              <div key={o.name}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}><span style={{ fontSize:12.5, fontWeight:600, color:QFZ.navy }}>{o.name}</span><span style={{ fontSize:12.5, fontWeight:600, color:o.color }}>{o.pct}%</span></div>
                <Bullet pct={o.pct} color={o.color} height={8} delay={i*80} />
              </div>
            ))}
          </div>
        </Card>
        <Card style={{ padding:24 }}>
          <PageHead eyebrow="Pillar balance" title="Investment by Pillar" />
          <div className="donut-host" style={{ width:'100%', height:260, display:'flex', justifyContent:'center' }}>
            <div style={{ width:260, height:260, position:'relative' }}>
              <Donut height={260} data={[{name:'Economic Diversification',value:38,color:QFZ.blue},{name:'Human Development',value:24,color:QFZ.green},{name:'Sustainability',value:22,color:QFZ.warm},{name:'Governance',value:16,color:QFZ.burgundy}]} formatter={(p)=>`<b>${p.name}</b><br/>${p.value}%`} />
              <div className="donut-c"><div className="dv">4</div><div className="dl">pillars</div></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function FinancePage() {
  const months = MONTHS;
  const revenue = [120,135,148,162,170,185,196,210,222,238,250,262].map(v=>v/100);
  const opt = {
    grid:{ left:8, right:18, top:30, bottom:26, containLabel:true },
    tooltip:{ trigger:'axis', ...tooltipBox, axisPointer:{ type:'line', lineStyle:{ color:'rgba(64,65,66,0.25)', type:'dashed' } }, valueFormatter:(v)=>`QAR ${v.toFixed(2)}B` },
    xAxis: rulerX(months),
    yAxis:{ type:'value', splitLine: splitDashed, axisLabel:{ ...axLabel, formatter:'{value}B' } },
    series:[{ name:'Revenue', type:'line', smooth:true, symbol:'circle', showSymbol:false, data:revenue,
      lineStyle:{ color:QFZ.green, width:2.2, type:'dashed' },
      itemStyle:{ color:QFZ.green, borderColor:'#fff', borderWidth:2 }, areaStyle:{ color: softFill(QFZ.green, 0.15, 0) } }],
    animationDuration:1300,
  };
  return (
    <div className="page-col">
      <MiniTiles items={[{l:'Revenue YTD',v:'QAR 1.8B',c:QFZ.green,i:'money',s:'+16% YoY'},{l:'Capex Deployed',v:'QAR 9.6B',c:QFZ.blue,i:'wallet',s:'85% of plan'},{l:'Operating Margin',v:'34.2%',c:QFZ.burgundy,i:'trending',s:'+2.1pts'},{l:'Pending Invoices',v:'23',c:QFZ.warm,i:'doc',s:'QAR 142M'}]} />
      <Card style={{ padding:24 }}>
        <PageHead eyebrow="Revenue trajectory" title="Revenue · FY2026" sub="Cumulative · QAR Billion" />
        <EChart option={opt} height={300} />
      </Card>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
        <Card style={{ padding:24 }}><PageHead eyebrow="Where it goes" title="Spend by Category" /><GradientBars data={[{name:'Infrastructure',value:48,color:QFZ.blue},{name:'Operations',value:24,color:QFZ.green},{name:'Incentives',value:16,color:QFZ.warm},{name:'Admin',value:12,color:QFZ.burgundy}].map(d=>d)} height={210} max={60} unit="%" /></Card>
        <Card style={{ padding:24 }}><PageHead eyebrow="Revenue mix" title="Revenue by Source" />
          <div className="donut-host" style={{ width:'100%', height:210, display:'flex', justifyContent:'center' }}><div style={{ width:210, height:210, position:'relative' }}>
            <Donut height={210} data={[{name:'Lease',value:46,color:QFZ.blue},{name:'Licensing',value:28,color:QFZ.green},{name:'Services',value:18,color:QFZ.warm},{name:'Other',value:8,color:QFZ.gray}]} formatter={(p)=>`<b>${p.name}</b><br/>${p.value}%`} />
            <div className="donut-c"><div className="dv">QAR 1.8B</div><div className="dl">total</div></div>
          </div></div>
        </Card>
      </div>
    </div>
  );
}

function ListPage({ eyebrow, title, sub, rows, cols, badgeKey, badgeTone }) {
  return (
    <Card className="solid-white" style={{ padding:'8px 16px 12px' }}>
      <div style={{ padding:'14px 6px 4px' }}><div className="card-eyebrow">{eyebrow}</div><div className="card-title">{title}</div>{sub && <div className="card-subtitle">{sub}</div>}</div>
      <table className="pipe-table">
        <thead><tr>{cols.map(c=><th key={c.key} className={c.num?'num':''}>{c.label}</th>)}</tr></thead>
        <tbody>{rows.map((r,i)=>(
          <tr key={i} style={{ animation:`fadeIn .4s ${i*40}ms both` }}>
            {cols.map(c=>(
              <td key={c.key} className={c.num?'num':''}>
                {c.key===badgeKey ? <Pill tone={badgeTone(r)}>{r[c.key]}</Pill> : (c.strong ? <b style={{ color:QFZ.navy }}>{r[c.key]}</b> : r[c.key])}
              </td>
            ))}
          </tr>
        ))}</tbody>
      </table>
    </Card>
  );
}

function ApprovalsPage() {
  const rows = [
    { item:'Investment Approval — TechNova FZ-LLC', dept:'Investor Relations', value:'QAR 240M', priority:'High', status:'Pending' },
    { item:'Land Allocation — Plot B22', dept:'Operations', value:'58,600 m²', priority:'Medium', status:'Pending' },
    { item:'License Upgrade — Global Logistics', dept:'Investor Relations', value:'L3 → L4', priority:'High', status:'Pending' },
    { item:'Capex Disbursement — Phase 2', dept:'Finance', value:'QAR 180M', priority:'High', status:'Approved' },
    { item:'Vendor Contract — Facilities', dept:'Procurement', value:'QAR 12M', priority:'Low', status:'Approved' },
    { item:'Incentive Package — SolarGen', dept:'Strategy', value:'QAR 64M', priority:'Medium', status:'Rejected' },
  ];
  return (
    <div className="page-col">
      <MiniTiles items={[{l:'Pending',v:'12',c:QFZ.warm,i:'clock'},{l:'Approved (MTD)',v:'8',c:QFZ.green,i:'check'},{l:'Rejected',v:'2',c:QFZ.burgundy,i:'close'},{l:'Avg. Time to Decide',v:'2.4d',c:QFZ.blue,i:'trending'}]} />
      <ListPage eyebrow="Decisions waiting on you" title="Approval Queue" sub="Across investment, land and licensing workflows"
        rows={rows} badgeKey="status" badgeTone={(r)=>r.status==='Approved'?'success':r.status==='Rejected'?'danger':'warning'}
        cols={[{key:'item',label:'Request',strong:true},{key:'dept',label:'Department'},{key:'value',label:'Value',num:true},{key:'priority',label:'Priority'},{key:'status',label:'Status'}]} />
    </div>
  );
}

function ReportsPage() {
  const rows = [
    { name:'Q1 2026 Investment Review', type:'Quarterly', owner:'Investor Relations', date:'12 Apr 2026', status:'Published' },
    { name:'Monthly Economic Bulletin', type:'Monthly', owner:'Strategy', date:'02 May 2026', status:'Published' },
    { name:'Capex Deployment Report', type:'Monthly', owner:'Finance', date:'30 Apr 2026', status:'Published' },
    { name:'Zone Utilization Analysis', type:'Ad-hoc', owner:'Dev & Operations', date:'21 Apr 2026', status:'Draft' },
    { name:'Workforce & Qatarization', type:'Quarterly', owner:'Human Capital', date:'15 Apr 2026', status:'Published' },
  ];
  return (
    <div className="page-col">
      <MiniTiles items={[{l:'Reports Published',v:'48',c:QFZ.blue,i:'doc',s:'this year'},{l:'Scheduled',v:'12',c:QFZ.green,i:'calendar',s:'next 30 days'},{l:'Drafts',v:'5',c:QFZ.warm,i:'edit'},{l:'Subscribers',v:'126',c:QFZ.burgundy,i:'users'}]} />
      <ListPage eyebrow="Knowledge base" title="Reports & Analytics" sub="Detailed reports across all departments"
        rows={rows} badgeKey="status" badgeTone={(r)=>r.status==='Published'?'success':'warning'}
        cols={[{key:'name',label:'Report',strong:true},{key:'type',label:'Type'},{key:'owner',label:'Owner'},{key:'date',label:'Date',num:true},{key:'status',label:'Status'}]} />
    </div>
  );
}

function DocumentsPage() {
  const rows = [
    { name:'Investor Onboarding Policy v3', cat:'Policy', size:'2.4 MB', date:'02 May 2026', status:'Final' },
    { name:'Master Plan — Ras Bufontas', cat:'Planning', size:'18.1 MB', date:'28 Apr 2026', status:'Final' },
    { name:'Lease Template — Industrial', cat:'Legal', size:'0.8 MB', date:'20 Apr 2026', status:'Final' },
    { name:'FY26 Budget Workbook', cat:'Finance', size:'5.2 MB', date:'15 Apr 2026', status:'Review' },
    { name:'Sustainability Guidelines', cat:'Policy', size:'3.6 MB', date:'10 Apr 2026', status:'Final' },
  ];
  return (
    <div className="page-col">
      <MiniTiles items={[{l:'Total Documents',v:'1,284',c:QFZ.blue,i:'folder'},{l:'Shared with me',v:'96',c:QFZ.green,i:'users'},{l:'Pending Review',v:'14',c:QFZ.warm,i:'eye'},{l:'Storage Used',v:'42 GB',c:QFZ.burgundy,i:'db'}]} />
      <ListPage eyebrow="Document library" title="Documents" sub="Policies, legal templates, planning and finance"
        rows={rows} badgeKey="status" badgeTone={(r)=>r.status==='Final'?'success':'warning'}
        cols={[{key:'name',label:'Document',strong:true},{key:'cat',label:'Category'},{key:'size',label:'Size',num:true},{key:'date',label:'Modified',num:true},{key:'status',label:'Status'}]} />
    </div>
  );
}

function DataExplorerPage() {
  return (
    <div className="page-col">
      <MiniTiles items={[{l:'Datasets',v:'36',c:QFZ.blue,i:'db'},{l:'Live Connections',v:'8',c:QFZ.green,i:'refresh'},{l:'Saved Views',v:'24',c:QFZ.warm,i:'star'},{l:'Last Sync',v:'2m',c:QFZ.burgundy,i:'clock'}]} />
      <Card style={{ padding:24 }}>
        <PageHead eyebrow="Build a view" title="Data Explorer" sub="Query, pivot and visualise QFZ datasets" right={<button className="btn primary"><Icon name="plus" size={13} /> New query</button>} />
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:18 }}>
          <Card style={{ padding:20 }}><div style={{ fontSize:12, fontWeight:600, color:QFZ.textMuted, marginBottom:10 }}>Investors by sector</div><GradientBars data={[{name:'Manufacturing',value:42,color:QFZ.blue},{name:'Logistics',value:28,color:QFZ.green},{name:'Technology',value:19,color:QFZ.burgundy},{name:'Energy',value:14,color:QFZ.warm}]} height={180} max={50} /></Card>
          <Card style={{ padding:20 }}><div style={{ fontSize:12, fontWeight:600, color:QFZ.textMuted, marginBottom:10 }}>Capex trend</div><Sparkline values={CAPEX.actual} color={QFZ.blue} height={180} /></Card>
        </div>
      </Card>
    </div>
  );
}

Object.assign(window, { StrategyPage, FinancePage, ApprovalsPage, ReportsPage, DocumentsPage, DataExplorerPage });
