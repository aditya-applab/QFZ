// ============================================================
//  QFZ Observatory — data layer (palette, Qatar geo, demo datasets)
// ============================================================

const QFZ = {
  blue: '#2540A3', blueSoft: '#454EA0', blueDeep: '#1A2D75',
  burgundy: '#862041', burgundySoft: '#A44E65',
  green: '#41A256', mint: '#73BF9A',
  warm: '#F4AE69', warmDeep: '#E0913F',
  charcoal: '#404142', gray: '#939192',
  navy: '#393536',
  text: '#393536', textSec: '#5D5A5B', textMuted: '#939192',
  grid: 'rgba(64,65,66,0.08)',
};
const TIER_COLOR = { L1: QFZ.blue, L2: QFZ.burgundy, L3: QFZ.green, L4: QFZ.warm, L5: QFZ.mint };

/* ---------------- Qatar peninsula (hand-traced GeoJSON, [lng,lat]) ---------------- */
const QATAR_OUTLINE = [
  [50.84,24.62],[50.80,24.80],[50.78,25.00],[50.77,25.21],[50.80,25.40],[50.86,25.52],
  [50.79,25.61],[50.83,25.76],[50.93,25.90],[51.02,26.02],[51.11,26.11],[51.205,26.156],
  [51.28,26.13],[51.33,26.04],[51.39,25.95],[51.45,25.85],[51.505,25.74],[51.535,25.66],
  [51.555,25.54],[51.585,25.42],[51.612,25.30],[51.60,25.20],[51.545,25.13],[51.585,25.05],
  [51.612,24.985],[51.60,24.88],[51.55,24.78],[51.475,24.70],[51.40,24.63],[51.30,24.585],
  [51.15,24.565],[51.00,24.572],[50.91,24.59],[50.84,24.62],
];
const QATAR_GEOJSON = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    properties: { name: 'Qatar' },
    geometry: { type: 'Polygon', coordinates: [QATAR_OUTLINE] },
  }],
};

const DOHA = { name: 'Doha', coord: [51.531, 25.285] };

/* ---------------- Free zones (Qatar-at-a-glance markers) ---------------- */
const FREE_ZONES = [
  { id: 'rb', name: 'Ras Bufontas Free Zone', short: 'Ras Bufontas', coord: [51.565, 25.245],
    tagline: 'Tech, light manufacturing & innovation — adjacent to Hamad International Airport.',
    color: QFZ.blue, area: '4.0 km²', investors: 96, plots: 64, occupancy: 78, capex: 'QAR 3.4B',
    anchor: 'Hamad International Airport', sectors: ['Technology', 'Light manufacturing', 'Logistics'],
    badges: ['Adjacent to airport', 'Phase 2 live'] },
  { id: 'ua', name: 'Umm Alhoul Free Zone', short: 'Umm Alhoul', coord: [51.585, 24.99],
    tagline: 'Heavy industry, logistics & energy — integrated with Hamad Port.',
    color: QFZ.burgundy, area: '33.0 km²', investors: 118, plots: 142, occupancy: 71, capex: 'QAR 6.1B',
    anchor: 'Hamad Port', sectors: ['Logistics', 'Energy', 'Maritime', 'Manufacturing'],
    badges: ['Deep-water port', 'Heavy industry'] },
  { id: 'dtp', name: 'Doha Tech Park', short: 'Doha Tech Park', coord: [51.44, 25.32],
    tagline: 'Innovation hub for R&D, startups and digital ventures.',
    color: QFZ.green, area: '0.6 km²', investors: 38, plots: 22, occupancy: 64, capex: 'QAR 0.9B',
    anchor: 'Education City', sectors: ['Technology', 'R&D', 'Fintech'],
    badges: ['Innovation hub'] },
  { id: 'awi', name: 'Al Wakra Industrial', short: 'Al Wakra Ind.', coord: [51.555, 25.135],
    tagline: 'Heavy & downstream manufacturing corridor south of Doha.',
    color: QFZ.warm, area: '5.4 km²', investors: 27, plots: 34, occupancy: 66, capex: 'QAR 1.5B',
    anchor: 'Wakrah Logistics', sectors: ['Manufacturing', 'Downstream'],
    badges: ['Industrial corridor'] },
  { id: 'lhc', name: 'Lusail Healthcare', short: 'Lusail Health', coord: [51.49, 25.42],
    tagline: 'MedTech & life-sciences corridor in Lusail city.',
    color: QFZ.burgundySoft, area: '0.9 km²', investors: 20, plots: 18, occupancy: 72, capex: 'QAR 0.6B',
    anchor: 'Lusail City', sectors: ['Healthcare', 'MedTech', 'Life sciences'],
    badges: ['MedTech corridor'] },
];

/* ---------------- KPI Performance — 8 L3/L4 result/target cards (per concept doc) ---------------- */
const LICENSE_GROUPS = [
  { key: 'A', icon: 'license', accent: QFZ.green,
    title: 'New Investments Licensed (L3, QAR Bn)', sub: 'L3 · QAR Bn', tier: 'L3',
    cards: [
      { id: 'l3-26-res', label: 'L3 2026 Results', value: 39.5, unit: 'QAR Bn', vs: 'vs 2026 Target 60.00', pct: 66, kind: 'result' },
      { id: 'l3-26-tgt', label: 'L3 2026 Target', value: 60.0, unit: 'QAR Bn', vs: 'Remaining 20.50', pct: 66, kind: 'target' },
      { id: 'l3-267-res', label: 'L3 2026-7 Results', value: 39.5, unit: 'QAR Bn', vs: 'vs 2026-7 Target 60.00', pct: 66, kind: 'result' },
      { id: 'l3-267-tgt', label: 'L3 2026-7 Target', value: 60.0, unit: 'QAR Bn', vs: 'Remaining 20.50', pct: 66, kind: 'target' },
    ] },
  { key: 'B', icon: 'construction', accent: QFZ.burgundy,
    title: 'New Investments Started Construction (L4, QAR Bn)', sub: 'L4 · QAR Bn', tier: 'L4',
    cards: [
      { id: 'l4-26-res', label: 'L4 2026 Results', value: 18.75, unit: 'QAR Bn', vs: 'vs 2026 Target 25.00', pct: 75, kind: 'result' },
      { id: 'l4-26-tgt', label: 'L4 2026 Target', value: 25.0, unit: 'QAR Bn', vs: 'Remaining 6.25', pct: 75, kind: 'target' },
      { id: 'l4-267-res', label: 'L4 2026-7 Results', value: 18.75, unit: 'QAR Bn', vs: 'vs 2026-7 Target 25.00', pct: 75, kind: 'result' },
      { id: 'l4-267-tgt', label: 'L4 2026-7 Target', value: 25.0, unit: 'QAR Bn', vs: 'Remaining 8.25', pct: 75, kind: 'target' },
    ] },
];
const OVERALL_TARGET = 66;

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const CAPEX = {
  actual:   [0.8,1.6,2.5,3.6,4.8,6.0,7.0,8.0,8.8,9.4,9.6,9.6],
  target:   [1.0,2.0,3.0,4.0,5.0,6.5,7.5,8.5,9.5,10.5,11.5,12.0],
  lastYear: [0.6,1.2,1.8,2.5,3.4,4.3,5.2,6.0,6.8,7.4,7.9,8.1],
};
const LEADS = { total: 1247, yoy: '+24%', sources: [
  { src: 'Direct Outreach', val: 412, pct: 33, color: QFZ.blue },
  { src: 'Partner Referrals', val: 289, pct: 23, color: QFZ.burgundy },
  { src: 'Digital Campaigns', val: 248, pct: 20, color: QFZ.warm },
  { src: 'Trade Shows', val: 186, pct: 15, color: QFZ.green },
  { src: 'Other', val: 112, pct: 9, color: QFZ.gray },
]};
const LICENSES_BY_TIER = [
  { tier: 'L1', label: 'Application', count: 24, color: QFZ.blue },
  { tier: 'L2', label: 'Approved', count: 18, color: QFZ.burgundy },
  { tier: 'L3', label: 'Licensed', count: 14, color: QFZ.green },
  { tier: 'L4', label: 'Construction', count: 7, color: QFZ.warm },
];
const ACTIVITY_FEED = [
  { t: '09:15', cat: 'application', who: 'TechVista Solutions', what: 'registered as new investor', color: QFZ.blue, icon: 'user' },
  { t: '08:40', cat: 'license', who: 'Green Manufacturing Co.', what: 'moved to L4 stage', color: QFZ.green, icon: 'check' },
  { t: '08:20', cat: 'license', who: 'BuildTech Industries', what: 'Industrial license issued', color: QFZ.warm, icon: 'license' },
  { t: '07:30', cat: 'report', who: 'Monthly economic report', what: 'published', color: QFZ.blue, icon: 'doc' },
  { t: 'Yesterday', cat: 'risk', who: 'Compliance risk assessment', what: 'completed', color: QFZ.burgundy, icon: 'award' },
  { t: 'Yesterday', cat: 'approval', who: 'Capex disbursement', what: 'Phase 2 · QAR 180M approved', color: QFZ.green, icon: 'wallet' },
];

/* ---------------- Application Tracker — status pipeline (L1..L5) ---------------- */
const APP_STAGES = [
  { id: 'L1', label: 'Application submission', count: 48, amount: 6.2, color: QFZ.blue, icon: 'doc' },
  { id: 'L2', label: 'Application approved', count: 32, amount: 9.8, color: QFZ.burgundy, icon: 'check' },
  { id: 'L3', label: 'License granted', count: 21, amount: 14.5, color: QFZ.green, icon: 'license' },
  { id: 'L4', label: 'Construction started', count: 14, amount: 11.2, color: QFZ.warm, icon: 'construction' },
  { id: 'L5', label: 'Construction completed', count: 9, amount: 7.6, color: QFZ.mint, icon: 'industry' },
];

/* ---------------- Deal Pipeline (L0 / L3 / L4) ---------------- */
const SECTOR_COLOR = {
  Aerospace: QFZ.blue, Energy: QFZ.warm, Maritime: QFZ.mint, Healthcare: QFZ.burgundy,
  Logistics: QFZ.green, Technology: QFZ.blue, Manufacturing: QFZ.blueSoft, 'Food & Bev': QFZ.green,
};
const FLAG = { UAE: '🇦🇪', UK: '🇬🇧', Norway: '🇳🇴', India: '🇮🇳', Singapore: '🇸🇬', Taiwan: '🇹🇼',
  Germany: '🇩🇪', France: '🇫🇷', USA: '🇺🇸', Japan: '🇯🇵', Canada: '🇨🇦', China: '🇨🇳', Qatar: '🇶🇦' };

function mkDeal(o) {
  return {
    detail: {
      companyOverview: `${o.name} is a ${o.sector.toLowerCase()} group headquartered in ${o.country}, evaluating Qatar Free Zones for regional expansion.`,
      projectOverview: `Establish a ${o.sector.toLowerCase()} operation within ${o.zone}, creating skilled jobs and anchoring supply-chain partners locally.`,
      situation: o.situation || 'Commercial terms aligned; awaiting board sign-off on land allocation and incentive package.',
      nextSteps: o.nextSteps || 'Issue draft lease, confirm power allocation, schedule executive site visit.',
      nextDate: o.nextDate || '14 Jun 2026',
      status: o.statusTone || 'Active', dealOwner: o.owner, assetType: o.assetType || 'Greenfield',
      zone: o.zone, stakeholder: o.stakeholder || '—',
      dealCapex: o.dealCapex, qfzCapex: o.qfzCapex, landSize: o.landSize, power: o.power,
      lastContact: o.lastContact || '02 May 2026', nextContact: o.nextContact || '03 Jun 2026',
      prevStageDate: o.prevStageDate || '18 Apr 2026', targetNext: o.targetNext || '30 Jun 2026',
      targetL3L4: o.targetL3L4 || '30 Sep 2026',
    }, ...o,
  };
}
const DEALS_L0 = [
  mkDeal({ id:'fa', name:'Falcon Aerospace LLC', country:'UAE', sector:'Aerospace', value:320, stage:'Initial Contact', stageTone:'info', score:78, owner:'Ahmed Al-H', zone:'Ras Bufontas', dealCapex:320, qfzCapex:48, landSize:'14,000', power:'1.2 MW' }),
  mkDeal({ id:'nr', name:'NorthLight Renewables', country:'UK', sector:'Energy', value:210, stage:'Qualified', stageTone:'success', score:85, owner:'Fatima Al-K', zone:'Umm Alhoul', dealCapex:210, qfzCapex:36, landSize:'22,500', power:'4.1 MW' }),
  mkDeal({ id:'om', name:'OceanTech Marine Sys', country:'Norway', sector:'Maritime', value:150, stage:'Discovery', stageTone:'warning', score:62, owner:'Khalid M.', zone:'Umm Alhoul', dealCapex:150, qfzCapex:22, landSize:'18,000', power:'0.9 MW' }),
  mkDeal({ id:'ph', name:'Pulse Healthcare', country:'India', sector:'Healthcare', value:95, stage:'Initial Contact', stageTone:'info', score:54, owner:'Noora Al-M', zone:'Lusail Healthcare', dealCapex:95, qfzCapex:14, landSize:'6,500', power:'0.6 MW' }),
  mkDeal({ id:'ql', name:'Quantum Logistics', country:'Singapore', sector:'Logistics', value:180, stage:'Qualified', stageTone:'success', score:81, owner:'Omar A.', zone:'Umm Alhoul', dealCapex:180, qfzCapex:30, landSize:'40,000', power:'2.0 MW' }),
  mkDeal({ id:'ss', name:'Stellar Semiconductors', country:'Taiwan', sector:'Technology', value:480, stage:'Qualified', stageTone:'success', score:88, owner:'Layla H.', zone:'Ras Bufontas', dealCapex:480, qfzCapex:72, landSize:'20,000', power:'5.5 MW' }),
];
const DEALS_L3 = [
  mkDeal({ id:'gt', name:'GreenTech Industries', country:'Germany', sector:'Manufacturing', value:2450, stage:'L3 Converted', stageTone:'success', score:92, owner:'Ahmed Al-H', zone:'Ras Bufontas', dealCapex:2450, qfzCapex:310, landSize:'350,000', power:'33 kV' }),
  mkDeal({ id:'fl', name:'Future Logistics Co.', country:'UAE', sector:'Logistics', value:1800, stage:'L3 Converted', stageTone:'success', score:88, owner:'Fatima Al-K', zone:'Umm Alhoul', dealCapex:1800, qfzCapex:240, landSize:'500,000', power:'18 kV' }),
  mkDeal({ id:'mc', name:'MedCare Solutions', country:'USA', sector:'Healthcare', value:750, stage:'L3 Converted', stageTone:'success', score:84, owner:'Khalid M.', zone:'Lusail Healthcare', dealCapex:750, qfzCapex:110, landSize:'120,000', power:'9 kV' }),
  mkDeal({ id:'nf', name:'NutriFoods Global', country:'Canada', sector:'Food & Bev', value:1250, stage:'L3 Converted', stageTone:'success', score:80, owner:'Noora Al-M', zone:'Al Wakra Ind.', dealCapex:1250, qfzCapex:160, landSize:'180,000', power:'12 kV' }),
  mkDeal({ id:'sg', name:'SolarGen Power', country:'China', sector:'Energy', value:3200, stage:'L3 Converted', stageTone:'success', score:90, owner:'Omar A.', zone:'Umm Alhoul', dealCapex:3200, qfzCapex:420, landSize:'620,000', power:'45 kV' }),
  mkDeal({ id:'at', name:'AeroTech Systems', country:'France', sector:'Aerospace', value:2100, stage:'L3 Converted', stageTone:'success', score:86, owner:'Layla H.', zone:'Ras Bufontas', dealCapex:2100, qfzCapex:280, landSize:'240,000', power:'22 kV' }),
];
const DEALS_L4 = [
  mkDeal({ id:'bt', name:'BuildTech Industries', country:'Germany', sector:'Manufacturing', value:1650, stage:'L4 Construction', stageTone:'warning', score:83, owner:'Ahmed Al-H', zone:'Ras Bufontas', dealCapex:1650, qfzCapex:210, landSize:'280,000', power:'28 kV' }),
  mkDeal({ id:'hp', name:'Hamad Petrochem', country:'Qatar', sector:'Energy', value:4200, stage:'L4 Construction', stageTone:'warning', score:94, owner:'Omar A.', zone:'Umm Alhoul', dealCapex:4200, qfzCapex:560, landSize:'820,000', power:'60 kV' }),
  mkDeal({ id:'jm', name:'Jade Maritime', country:'Japan', sector:'Maritime', value:980, stage:'L4 Construction', stageTone:'warning', score:79, owner:'Khalid M.', zone:'Umm Alhoul', dealCapex:980, qfzCapex:130, landSize:'160,000', power:'10 kV' }),
  mkDeal({ id:'vt', name:'VistaTech Fabrication', country:'Taiwan', sector:'Technology', value:1450, stage:'L4 Construction', stageTone:'warning', score:87, owner:'Layla H.', zone:'Ras Bufontas', dealCapex:1450, qfzCapex:190, landSize:'200,000', power:'24 kV' }),
];
const PIPELINE = {
  L0: { funnel: [
      { id:'inq', label:'Inquiry', count:124, color:QFZ.blue, icon:'search' },
      { id:'eval', label:'Evaluation', count:86, color:QFZ.blueSoft, icon:'eye' },
      { id:'rev', label:'Business Review', count:52, color:QFZ.mint, icon:'briefcase' },
      { id:'neg', label:'Negotiation', count:31, color:QFZ.warm, icon:'pulse' },
      { id:'rdy', label:'Ready for Approval', count:18, color:QFZ.green, icon:'check' },
    ], totalValue:'QAR 12.7B', conversion:'14.5%', deals: DEALS_L0 },
  L3: { rail:[{id:'L1',label:'Leads',count:245,color:QFZ.blue},{id:'L2',label:'Applications',count:162,color:QFZ.warm},{id:'L3',label:'Converted',count:89,color:QFZ.green}],
        cards:[{label:'L3 pipeline (L1 & L2 deals)',value:'407',sub:'active deals feeding L3'},{label:'L3 target',value:'95',sub:'FY2026-7 cumulative'},{label:'Progress against L3 target',value:'82%',sub:'78 of 95 secured',pct:82}],
        deals: DEALS_L3 },
  L4: { rail:[{id:'L2',label:'Approved',count:162,color:QFZ.warm},{id:'L3',label:'Licensed',count:89,color:QFZ.green},{id:'L4',label:'Construction',count:52,color:QFZ.burgundy}],
        cards:[{label:'L4 pipeline (L3 deals)',value:'89',sub:'licensed deals feeding L4'},{label:'L4 target',value:'68',sub:'FY2026-7 cumulative'},{label:'Progress against L4 target',value:'76%',sub:'52 of 68 in construction',pct:76}],
        deals: DEALS_L4 },
};

/* ---------------- Development & Operations — master plan plots ---------------- */
const PLOTS = [
  { id:'P-A12', block:'A', sector:'Manufacturing', status:'Built', size:43500, color:QFZ.blue, investor:'Qatar Advanced Mfg.', power:'High (33kV)', util:88 },
  { id:'P-A13', block:'A', sector:'Logistics', status:'Built', size:28400, color:QFZ.green, investor:'Future Logistics Co.', power:'Medium (18kV)', util:74 },
  { id:'P-A14', block:'A', sector:'—', status:'Open', size:31000, color:QFZ.gray, investor:'Available', power:'Phase 2', util:0 },
  { id:'P-B21', block:'B', sector:'Technology', status:'Built', size:36200, color:QFZ.burgundy, investor:'Stellar Semiconductors', power:'High (33kV)', util:81 },
  { id:'P-B22', block:'B', sector:'Energy', status:'Under Dev.', size:58600, color:QFZ.warm, investor:'Solar Future FZ', power:'Phase 2', util:45 },
  { id:'P-B23', block:'B', sector:'—', status:'Open', size:42000, color:QFZ.gray, investor:'Available', power:'Phase 2', util:0 },
  { id:'P-C31', block:'C', sector:'Healthcare', status:'Built', size:68200, color:QFZ.burgundySoft, investor:'MedCare Solutions', power:'High (33kV)', util:79 },
  { id:'P-C32', block:'C', sector:'Manufacturing', status:'Under Dev.', size:52100, color:QFZ.blueSoft, investor:'BuildTech Industries', power:'Medium (18kV)', util:52 },
  { id:'P-D41', block:'D', sector:'Logistics', status:'Built', size:94600, color:QFZ.green, investor:'Quantum Logistics', power:'High (33kV)', util:91 },
];
const ZONE_SUMMARY = [
  { label:'Total land area', value:'25.68M', unit:'m²', sub:'100% of master plan', icon:'map', color:QFZ.blue },
  { label:'Allocated', value:'16.25M', unit:'m²', sub:'63.3% of total', icon:'check', color:QFZ.green },
  { label:'Available', value:'9.43M', unit:'m²', sub:'36.7% of total', icon:'layers', color:QFZ.warm },
  { label:'Free zone utilization', value:'63.3', unit:'%', sub:'+2.8% vs last month', icon:'pulse', color:QFZ.burgundy },
  { label:'Pending allocations', value:'18', unit:'', sub:'requests in pipeline', icon:'clock', color:QFZ.blueSoft },
  { label:'Under development', value:'3.24M', unit:'m²', sub:'12.6% of total', icon:'construction', color:QFZ.mint },
];
const LAND_BY_TYPE = [
  { type:'Industrial', value:12.45, color:QFZ.blue },
  { type:'Logistics', value:6.52, color:QFZ.green },
  { type:'Commercial', value:3.25, color:QFZ.burgundy },
  { type:'Mixed use', value:2.68, color:QFZ.warm },
  { type:'Infrastructure', value:0.78, color:QFZ.mint },
];

/* ---------------- Human Capital ---------------- */
const HC = {
  departments: [
    { name:'Corporate Services', value:312, color:QFZ.blue },
    { name:'Finance & Business Support', value:220, color:QFZ.green },
    { name:'Development & Operations', value:198, color:QFZ.burgundy },
    { name:'Investment Development', value:176, color:QFZ.warm },
    { name:'Strategy & Transformation', value:142, color:QFZ.mint },
    { name:'Other Departments', value:160, color:QFZ.gray },
  ],
  nationalities: [
    { name:'Qatar', value:564, color:QFZ.blue }, { name:'India', value:233, color:QFZ.blueSoft },
    { name:'Egypt', value:124, color:QFZ.green }, { name:'Philippines', value:97, color:QFZ.warm },
    { name:'Others', value:230, color:QFZ.gray },
  ],
  totalHeadcount: 1248,
  employmentType: [ {name:'Permanent',value:82,color:QFZ.blue},{name:'Contract',value:12,color:QFZ.green},{name:'Temporary',value:4,color:QFZ.warm},{name:'Intern',value:2,color:QFZ.mint} ],
  ageGroups: [ {g:'<25',v:112},{g:'25-34',v:456},{g:'35-44',v:378},{g:'45-54',v:220},{g:'55+',v:82} ],
  orgStats: [ {label:'Average Age',value:'34.7',unit:'Years',icon:'user'},{label:'Average Tenure',value:'3.6',unit:'Years',icon:'clock'},{label:'Span of Control',value:'8.4',unit:'Employees',icon:'users'},{label:'Internal Mobility',value:'34',unit:'Transfers',icon:'refresh'} ],
  trendMonths: ['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'],
  hires:   [12,13,14,17,16,24,26,23,21,22,28,33],
  attrition:[8,9,9,11,12,11,10,9,9,8,7,6],
  monthlyTarget:[20,20,22,22,23,24,24,25,25,26,26,27],
};

/* ---------------- Client-spec L3/L4 list view (wide columns per shared sheet) ---------------- */
const CLIENT_COLS = [
  { key: 'name', label: 'Name', strong: true },
  { key: 'capex', label: 'CAPEX (QAR mn)', num: true },
  { key: 'owner', label: 'Deal Owner (L0–L3)' },
  { key: 'gate', label: 'Current stage gate' },
  { key: 'forecast', label: 'L4 forecast date', num: true },
  { key: 'status', label: 'Deal status', badge: true },
  { key: 'zone', label: 'Zone' },
  { key: 'land', label: 'Land size (sqm)', num: true },
  { key: 'power', label: 'Power rem. (MW)', num: true },
  { key: 'sector', label: 'Sector' },
  { key: 'hq', label: "Owner HQ int'l" },
  { key: 'planning', label: 'Planning summary' },
  { key: 'landmark', label: 'Landmark' },
];
const _OWNERS = ['Ahmed Al-Hajri', 'Fatima Al-Kuwari', 'Khalid Mansoori', 'Noora Al-Marri', 'Omar Abdullah', 'Layla Hassan'];
const _ZONES = ['Ras Bufontas', 'Umm Alhoul', 'Al Wakra Ind.', 'Lusail Healthcare', 'Doha Tech Park'];
const _SECTORS = ['Biomedical Sciences', 'Maritime', 'Downstream Manufacturing', 'Heavy Manufacturing', 'Food & Agriculture', 'Logistics & Trading', 'Advanced Materials', 'Aerospace', 'Energy & Power', 'Petrochemicals'];
const _NAMES_L3 = ['GreenTech Industries', 'Future Logistics Co.', 'MedCare Solutions', 'NutriFoods Global', 'SolarGen Power', 'AeroTech Systems', 'Gulf Biopharma', 'Marine Yards LLC', 'Cedar Downstream', 'Falcon Foods', 'Pearl Logistics', 'Atlas Materials', 'Doha Robotics', 'Qatari Steelworks'];
const _NAMES_L4 = ['BuildTech Industries', 'Hamad Petrochem', 'Jade Maritime', 'VistaTech Fabrication', 'Orbit Aerospace', 'NovaPharma Labs', 'Delta Foods Mfg.', 'Summit Logistics', 'Apex Energy', 'Lumen Materials'];
function _mkClientRow(name, i, tier) {
  const seed = (name.length * 7 + i * 13) % 100;
  const capex = 60 + (seed * 38) % 3200;
  const land = 6000 + (seed * 911) % 620000;
  const gate = tier === 'L3' ? 'L3 (License granted)' : 'L4 (Construction started)';
  const months = ['Mar', 'Jun', 'Sep', 'Dec'];
  const forecast = `${months[i % 4]} ${(2026 + i % 2)}`;
  return {
    name, capex: fmt.int(capex), owner: _OWNERS[i % _OWNERS.length],
    gate, forecast: `31 ${forecast}`, status: i % 7 === 0 ? 'At risk' : i % 5 === 0 ? 'On hold' : 'Active',
    statusTone: i % 7 === 0 ? 'danger' : i % 5 === 0 ? 'warning' : 'success',
    zone: _ZONES[i % _ZONES.length], land: fmt.int(land), power: fmt.dec(0.4 + (seed % 60) / 10, 2),
    sector: _SECTORS[i % _SECTORS.length], hq: i % 3 === 0 ? 'Yes' : 'No',
    planning: i % 6 === 0 ? 'Under review' : 'On plan', landmark: i % 4 === 0 ? 'Yes' : 'No',
  };
}
const CLIENT_L3 = _NAMES_L3.map((n, i) => _mkClientRow(n, i, 'L3'));
const CLIENT_L4 = _NAMES_L4.map((n, i) => _mkClientRow(n, i, 'L4'));

/* ---------------- Plots within each free zone (map drill-down) ---------------- */
const _PLOT_STATUS = { Allocated: QFZ.blue, Available: QFZ.green, 'Under development': QFZ.warm, 'Reserved': QFZ.burgundySoft };
function _mkPlot(zoneId, zoneShort, block, n, sector, status, area, investor) {
  const id = `${block}-${String(n).padStart(2, '0')}`;
  const allocated = status === 'Available' ? 0 : status === 'Under development' ? Math.round(area * 0.6) : area;
  return {
    id, zoneId, zoneShort, block, status, color: _PLOT_STATUS[status],
    totalArea: area, allocated, available: area - allocated,
    zoneType: sector === 'Logistics' ? 'Logistics' : sector === 'Technology' ? 'Commercial' : 'Industrial',
    sector, subSector: { Manufacturing: 'Advanced Materials', Logistics: 'Distribution', Technology: 'R&D / Digital', Healthcare: 'MedTech', Energy: 'Downstream', Maritime: 'Marine services' }[sector] || 'General',
    landUse: 'Industrial Plot', buildingStatus: status === 'Available' ? 'Vacant land' : status === 'Under development' ? 'Under construction' : 'Constructed',
    power: status === 'Available' ? 'Phase 2 (planned)' : 'High (33kV)', water: 'Available',
    roadAccess: 'Direct access', landStatus: status,
    investor: status === 'Available' ? '—' : investor,
    leaseType: status === 'Available' ? '—' : 'Long Term Lease (30 years)',
    allocationDate: status === 'Available' ? '—' : '15 Oct 2023', leaseEnd: status === 'Available' ? '—' : '14 Oct 2053',
    util: status === 'Available' ? 0 : status === 'Under development' ? 55 : 80 + n % 15,
  };
}
const ZONE_PLOTS = {
  rb: [
    _mkPlot('rb', 'Ras Bufontas', 'A', 1, 'Technology', 'Allocated', 36200, 'Stellar Semiconductors'),
    _mkPlot('rb', 'Ras Bufontas', 'A', 2, 'Manufacturing', 'Allocated', 43500, 'Qatar Advanced Mfg.'),
    _mkPlot('rb', 'Ras Bufontas', 'B', 1, 'Technology', 'Under development', 28800, 'Doha Robotics'),
    _mkPlot('rb', 'Ras Bufontas', 'B', 2, 'Logistics', 'Available', 31000, ''),
    _mkPlot('rb', 'Ras Bufontas', 'C', 1, 'Manufacturing', 'Allocated', 52100, 'BuildTech Industries'),
    _mkPlot('rb', 'Ras Bufontas', 'C', 2, 'Technology', 'Available', 24000, ''),
  ],
  ua: [
    _mkPlot('ua', 'Umm Alhoul', 'D', 1, 'Logistics', 'Allocated', 94600, 'Quantum Logistics'),
    _mkPlot('ua', 'Umm Alhoul', 'D', 2, 'Energy', 'Under development', 58600, 'SolarGen Power'),
    _mkPlot('ua', 'Umm Alhoul', 'E', 1, 'Maritime', 'Allocated', 72000, 'Jade Maritime'),
    _mkPlot('ua', 'Umm Alhoul', 'E', 2, 'Energy', 'Available', 88000, ''),
    _mkPlot('ua', 'Umm Alhoul', 'F', 1, 'Logistics', 'Reserved', 64000, 'Future Logistics Co.'),
  ],
  dtp: [
    _mkPlot('dtp', 'Doha Tech Park', 'T', 1, 'Technology', 'Allocated', 12000, 'AeroTech Systems'),
    _mkPlot('dtp', 'Doha Tech Park', 'T', 2, 'Technology', 'Available', 9500, ''),
    _mkPlot('dtp', 'Doha Tech Park', 'T', 3, 'Technology', 'Under development', 11000, 'Doha Robotics'),
  ],
  awi: [
    _mkPlot('awi', 'Al Wakra Ind.', 'W', 1, 'Manufacturing', 'Allocated', 48000, 'NutriFoods Global'),
    _mkPlot('awi', 'Al Wakra Ind.', 'W', 2, 'Manufacturing', 'Available', 36000, ''),
    _mkPlot('awi', 'Al Wakra Ind.', 'W', 3, 'Logistics', 'Under development', 42000, 'Pearl Logistics'),
  ],
  lhc: [
    _mkPlot('lhc', 'Lusail Healthcare', 'H', 1, 'Healthcare', 'Allocated', 16000, 'MedCare Solutions'),
    _mkPlot('lhc', 'Lusail Healthcare', 'H', 2, 'Healthcare', 'Available', 9000, ''),
    _mkPlot('lhc', 'Lusail Healthcare', 'H', 3, 'Healthcare', 'Reserved', 12000, 'Gulf Biopharma'),
  ],
};

Object.assign(window, { QFZ, TIER_COLOR, QATAR_GEOJSON, QATAR_OUTLINE, DOHA, FREE_ZONES, LICENSE_GROUPS, OVERALL_TARGET,
  MONTHS, CAPEX, LEADS, LICENSES_BY_TIER, ACTIVITY_FEED, APP_STAGES, SECTOR_COLOR, FLAG,
  DEALS_L0, DEALS_L3, DEALS_L4, PIPELINE, PLOTS, ZONE_SUMMARY, LAND_BY_TYPE, HC,
  CLIENT_COLS, CLIENT_L3, CLIENT_L4, ZONE_PLOTS });
