/* SCATTERED PIECES — Projects upgrade
   Add this script once, after your existing script.js and flow.js, before </body>.
   It updates #projects only; Hero/About/lifecycle scripts remain untouched.
*/
(() => {
  "use strict";
  const script = document.currentScript;
  const root = new URL('./', script?.src || location.href);
  const asset = name => new URL('assets/projects/' + name, root).href;
  const cssUrl = new URL('projects-upgrade.css', root).href;
  if (!document.querySelector('link[data-spx-style]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet'; link.href = cssUrl; link.dataset.spxStyle = 'true';
    document.head.append(link);
  }

  const image = (file, caption, alt = caption) => `
    <figure class="spx-figure">
      <button class="spx-zoom" type="button" data-spx-image="${file}" data-spx-alt="${alt}" aria-label="Enlarge image: ${alt}">
        <img src="${asset(file)}" alt="${alt}" loading="lazy" />
        <span class="spx-expand-label">EXPAND IMAGE ↗</span>
      </button>
      <figcaption>${caption}</figcaption>
    </figure>`;
  const twoImages = (a, captionA, b, captionB) => `<div class="spx-image-pair">${image(a,captionA)}${image(b,captionB)}</div>`;
  const flow = (items) => `<div class="spx-process" aria-label="Process flow">${items.map((x,i) => `<div class="spx-process-unit"><span class="spx-process-no">${String(i+1).padStart(2,'0')}</span><span>${x}</span></div>`).join('')}</div>`;
  const callout = (title, body) => `<div class="spx-note"><strong>${title}</strong><p>${body}</p></div>`;
  const findings = items => `<div class="spx-findings">${items.map(x=>`<div class="spx-finding"><span class="spx-finding-mark">↗</span><div><strong>${x[0]}</strong><p>${x[1]}</p></div></div>`).join('')}</div>`;
  const table = (columns, rows) => `<div class="spx-table-wrap"><table class="spx-table"><thead><tr>${columns.map(c=>`<th scope="col">${c}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(v=>`<td>${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;

  const projects = [
    {
      id:'customer', title:'Customer Behavior & Marketing Analytics',
      category:'DATA ANALYTICS · MACHINE LEARNING', filters:['data'],
      type:'Group Project · Data Analysis & Modeling',
      description:'Analyzed electronic retail purchasing and loyalty patterns, then assessed baseline order-status classifiers.',
      tech:['Python','Pandas','scikit-learn','XGBoost'], tone:'lavender',
      cover:'customer-preview.png', coverAlt:'Customer analytics chart showing loyalty group distributions',
      github:'https://github.com/ayundini586/customer-behavior-marketing-analysis',
      highlights:[['20,000','Transactions'],['19,373','After outlier handling'],['2','ML baseline models']],
      sections:[
        {heading:'Business Problem & Analytical Objectives', html:`
          <p>Electronic retail transactions reveal customer purchasing behavior, loyalty patterns, and order outcomes. The analysis explored spending, product preferences, and how transaction attributes differed between completed and cancelled orders.</p>
          <p>A secondary goal was to test whether available customer and transaction features could reliably classify order status—not to deploy a production-ready prediction system.</p>`},
        {heading:'Dataset & Data Preparation', html:`
          <p>The dataset contains <strong>20,000 electronic sales transactions</strong> with customer demographics, loyalty membership, product type, payment method, total price, ratings, purchase date, shipping information, and order status.</p>
          ${flow(['Data profiling','Missing-value & category checks','Date preparation','IQR-based outlier review','19,373 analysis rows'])}
          <p>For modeling, categorical variables were encoded; numerical features were scaled; calendar features were extracted; and Mutual Information was used to help select candidate predictors.</p>`},
        {heading:'Exploratory Analysis & Customer Insights', html:`
          <p>The notebook examines purchase behavior across loyalty groups, average order values, add-on purchases, product preferences, and transaction trends. These comparisons help connect technical analysis to potential business questions.</p>
          ${image('customer-aov.png','Average order value by loyalty status; values reproduced from the project README.','Bar chart comparing average order value across four loyalty groups')}
          ${findings([
            ['New Member AOV','$3,237.40 — the highest reported average order value among the four loyalty groups.'],
            ['Regular Member AOV','$3,092.65 — lower than the other groups in this descriptive comparison.'],
            ['Interpretation','These are observational patterns in the provided dataset, not evidence of causal effects.']
          ])}`},
        {heading:'Machine Learning Pipeline', html:`
          <p>The team explored <strong>Random Forest</strong> and <strong>XGBoost</strong> classifiers for completed-versus-cancelled order status with an <strong>80/20 train–test split</strong>.</p>
          ${flow(['Encoding + calendar features','Feature selection','80/20 train–test split','Random Forest / XGBoost','Accuracy + ROC-AUC'])}
          <p>Among the features selected for Random Forest were day of week, unit price, customer rating, add-on total, and age.</p>`},
        {heading:'Model Evaluation & Limitations', html:`
          ${image('customer-model-evaluation.png','Reported baseline accuracy and ROC-AUC; higher accuracy did not indicate useful class separation.','Random Forest versus XGBoost model evaluation chart')}
          ${table(['Model','Accuracy','ROC-AUC'],[['Random Forest','62%','0.5107'],['XGBoost','67%','0.5019']])}
          ${callout('Key takeaway','Both ROC-AUC values are close to 0.50. Despite XGBoost’s higher accuracy, these baselines have limited ability to distinguish completed and cancelled orders. Class imbalance, feature quality, and train-only preprocessing are important areas for future improvement.')}`},
        {heading:'My Contribution', html:`
          <p>Contributed to exploratory data analysis, customer behavior interpretation, data preprocessing, model testing, and evaluation discussions within a group project.</p>
          <p>The most valuable lesson was distinguishing a visually promising metric from evidence that a model can actually discriminate between outcomes.</p>`}
      ]
    },
    {
      id:'employee', title:'Employee Attrition HR Analytics',
      category:'DATA ANALYTICS · BUSINESS INTELLIGENCE', filters:['data'],
      type:'Group Project · Tableau Dashboard Co-developer',
      description:'Designed Tableau views to explore workforce attrition, retention patterns, and employee experience.',
      tech:['Tableau','KPI Design','HR Analytics','Data Visualization'], tone:'mint',
      cover:'employee-executive.png',coverAlt:'Executive Tableau HR attrition dashboard',
      github:'https://github.com/ayundini586/employee-attrition-tableau-dashboard',
      live:'https://public.tableau.com/app/profile/ayundini.nursyahrin/viz/Group7HRDashboard_17907712388390/ANALYST?publish=yes',liveLabel:'LIVE DASHBOARD',
      highlights:[['14,900','Employee records'],['40.5%','Attrition rate'],['2','Tableau views']],
      sections:[
        {heading:'Business Context & Objective',html:`<p>This group project analyzes <strong>14,900 employee records</strong> spanning 2015–2024 and five industries. Its core question is which employee characteristics and workplace experiences are associated with attrition.</p><p>The dashboard was designed for exploratory HR decision support rather than causal inference.</p>`},
        {heading:'KPI Development & Audience-Focused Design',html:`
          <p>The Tableau workbook includes calculated workforce measures and two layouts for different audiences. The <strong>Executive Dashboard</strong> prioritizes major KPIs and retention signals; the <strong>Analyst Dashboard</strong> supports more detailed exploration and documents design assumptions.</p>
          ${table(['Key KPI','Reported value'],[['Total workforce','14,900'],['Active employees','8,867'],['Terminated employees','6,033'],['Attrition rate','40.5%']])}
          ${image('employee-analyst.png','Analyst Dashboard: detailed exploration, documented assumptions, and design rationale.','Original Tableau analyst dashboard')}`},
        {heading:'Key Findings & Interpretation',html:`
          <div class="spx-contrast"><div class="spx-contrast-low"><span>LOW SATISFACTION + POOR WORK-LIFE BALANCE</span><strong>95%</strong><small>Observed attrition</small></div><div class="spx-contrast-high"><span>VERY HIGH SATISFACTION + EXCELLENT BALANCE</span><strong>4%</strong><small>Observed attrition</small></div></div>
          ${findings([
            ['Work experience','The combined satisfaction–work-life balance view reveals a pronounced attrition pattern within the dataset.'],
            ['Industry variation','Technology and Retail show comparatively high termination activity in the reported analysis.'],
            ['Trend analysis','Hiring activity was stronger near year-end, while terminations followed a less consistent pattern.']
          ])}`},
        {heading:'Visualization Choices & Limitations',html:`
          <p>Stacked bars were used for workforce composition, heatmaps for ordered category relationships, dumbbell charts for two-group compensation comparisons, and time-series charts for temporal trends.</p>
          ${callout('Analytical boundary','Patterns in this dataset should not be interpreted as proof that job satisfaction, compensation, or any other characteristic causes attrition. Additional analysis would be required to test causal relationships.')}`},
        {heading:'My Contribution',html:`<p>Co-developed and refined Tableau dashboards, contributed to KPI and visual layout decisions, and analyzed employee attrition insights as part of the data visualization project team.</p>`}
      ]
    },
    {
      id:'airline', title:'Airline Flight Performance Data Warehouse',
      category:'DATA ENGINEERING · BUSINESS INTELLIGENCE', filters:['data','engineering'],
      type:'Independent Project · End-to-End',
      description:'Built a January 2015 flight warehouse from raw data through Python, Pentaho ETL, SQL, and Power BI.',
      tech:['Python','SQL','Pentaho','Power BI'], tone:'blue',
      cover:'airline-dashboard.png',coverAlt:'Power BI airline flight performance dashboard',
      github:'https://github.com/ayundini586/airline-flight-performance-data-warehouse',
      live:'https://app.powerbi.com/view?r=eyJrIjoiMDRlNzAwYzEtZTE1Yi00ODE5LWI1N2YtY2E5OTA1NmJhMmYxIiwidCI6IjM0ODViOTYzLTgyYmEtNGE2Zi04MTBmLWI1Y2MyMjZmZjg5OCIsImMiOjEwfQ%3D%3D',liveLabel:'LIVE DASHBOARD',
      highlights:[['469,968','Flight records'],['20.42%','Delay rate'],['2.55%','Cancellation rate']],
      sections:[
        {heading:'Problem & Objective',html:`<p>The original 2015 U.S. flights source contains over <strong>5.8 million records</strong>. To make local processing manageable, this independent project focused on January 2015 and built an analysis-ready dimensional warehouse.</p><p>The goal was to examine airline delays, cancellation patterns, airports, routes, and operational performance through SQL and an interactive Power BI dashboard.</p>`},
        {heading:'Data Preparation & Warehouse Architecture',html:`
          <p>Python and Pandas prepared raw flight files before loading January records into MySQL/MariaDB staging tables. The preparation handled HHMM time formats, cancellation codes, negative values indicating early arrival or departure, and operational flight statuses.</p>
          ${flow(['Raw CSV files','Python / Pandas','stg_flights + stg_airports','Dimension tables','Pentaho ETL','fact_flight','Power BI'])}
          <p>The warehouse grain is <strong>one scheduled domestic flight occurrence per fact row</strong>.</p>`},
        {heading:'Dimensional Modeling',html:`
          <p>The star schema connects <code>fact_flight</code> to <code>dim_date</code>, <code>dim_airline</code>, and <code>dim_airport</code>. Airport is a <strong>role-playing dimension</strong>, referenced separately for origin and destination.</p>
          ${image('airline-star-schema.png','Original star schema from the project repository.','Airline data warehouse ERD with flight fact and dimension tables')}`},
        {heading:'Pentaho ETL Implementation',html:`
          <p>The <code>load_fact.ktr</code> transformation reads prepared staging rows, performs airline, origin airport, destination airport, and date lookups, then selects fact fields, converts types, and writes to the fact table.</p>
          ${image('airline-etl-flow.png','Redesigned diagram based on the actual eight-step Pentaho transformation.','Eight-stage Pentaho flight fact loading process')}
          <p>The <code>airline_dw_etl_job.kjb</code> job orchestrates the fact-loading transformation. The README reports a validated fact row count of <strong>469,968</strong> without duplicate loads.</p>`},
        {heading:'SQL Analysis & Key Insights',html:`
          <p>Five SQL analyses addressed airline arrival delays, airport performance, delay causes, daily variation, and delayed routes. Their KPIs were summarized in Power BI.</p>
          ${findings([
            ['Highest average airline arrival delay','Frontier Airlines — approximately 18.36 minutes.'],
            ['Most delayed departing flights','Chicago O’Hare International Airport (ORD).'],
            ['Largest delay-cause contribution','Late Aircraft Delay, measured by total delay minutes.'],
            ['Weekly and route patterns','Sunday had the highest delay rate; the ORD → LGA route had the most delayed flights in the reported analysis.']
          ])}`},
        {heading:'My Contribution & Technical Challenges',html:`
          <p>Independently handled preprocessing, dimensional design, staging, Pentaho transformations, SQL analyses, KPI definitions, and dashboard development.</p>
          <p>Key challenges included processing millions of source rows on local hardware and mapping operational records to reliable surrogate keys. Chunk-based preprocessing and step-by-step dimensional lookups made the workflow manageable and repeatable.</p>`}
      ]
    },
    {
      id:'equihire',title:'EquiHire Recruitment Platform',
      category:'SOFTWARE TESTING · FULL-STACK WEB',filters:['app'],
      type:'Group Project · Testing, Debugging & Integration Support',
      description:'Validated recruitment workflows and resolved frontend–backend issues across user, company, and admin roles.',
      tech:['React','Express','SQL Server','Manual QA'],tone:'coral',
      cover:'equihire-home.png',coverAlt:'EquiHire job seeker home interface',
      github:'https://github.com/ayundini586/EquiHire',
      sections:[
        {heading:'Platform Objective & Architecture',html:`
          <p>EquiHire is a recruitment platform supporting Job Seekers, Companies, and Administrators. It combines a <strong>React/Vite frontend</strong>, <strong>Express REST API</strong>, and <strong>Microsoft SQL Server</strong>, with JWT-based role access.</p>
          ${flow(['React user interfaces','Express REST endpoints','JWT role checks','SQL Server records'])}`},
        {heading:'Functional Testing Scope',html:`
          <p>My work emphasized verifying complete user journeys rather than testing isolated screens. The project README documents local end-to-end testing of user registration/login, job browsing, job saving, CV upload, admin approval, applications, and applicant tracking.</p>
          ${table(['Role','Scenarios tested locally'],[['Job Seeker','Register / log in, search and save jobs, upload CV, apply, track status'],['Company','Log in, create vacancy, obtain approval, review applicant pipeline'],['Administrator','Review CV submissions and company job postings']])}
          ${image('equihire-applications.png','Application tracking interface used in the recruitment workflow.','EquiHire application status screen')}`},
        {heading:'Bug Investigation & Resolution',html:`
          <p>Functional testing revealed integration issues affecting profile updates, CV upload and approval status handling. The team repository records fixes to frontend request mapping, admin status updates, and the local CV storage directory.</p>
          ${table(['Observed area','Investigation / fix'],[['Profile update','Adjusted the frontend payload to match expected backend fields.'],['CV upload','Resolved the missing local storage directory used by Multer.'],['CV approval','Corrected handling of status updates in the admin workflow.'],['Login & registration','Tested and debugged authentication functionality as part of the application validation work.']])}
          ${callout('QA documentation','These are functional testing and debugging experiences, not claims of an automated test suite or formal Jira/TestRail coverage.')}`},
        {heading:'Recruitment Workflow Validation',html:`
          ${flow(['Company posts a vacancy','Admin approves vacancy','Job Seeker uploads CV','Admin reviews CV','Job Seeker applies','Company reviews applicant'])}
          <p>Cross-role checks mattered because actions taken in one interface must be reflected correctly for users of another role.</p>
          ${twoImages('equihire-admin.png','Admin approval screen.','equihire-company.png','Company dashboard showing recruitment management.')}`},
        {heading:'My Contribution & Technical Learning',html:`
          <p>Conducted end-to-end manual functional testing, investigated and resolved integration issues, validated role-based recruitment journeys, and helped troubleshoot data flow between React, Express, and SQL Server.</p>
          <p>This strengthened practical skills in issue reproduction, API request/response inspection, debugging, retesting, and distinguishing frontend bugs from backend or environment problems.</p>`}
      ]
    },
    {
      id:'myfood',title:'MyFood+ Meal Planning App',
      category:'MOBILE APP · API & DATABASE',filters:['app'],
      type:'Group Project · Testing & Debugging',
      description:'Tested a recipe and meal planning app with TheMealDB, Express Favorites API, and Neon PostgreSQL.',
      tech:['React Native','Express','PostgreSQL','API Testing'],tone:'cream',
      cover:'myfood-preview.png',coverAlt:'MyFood Plus recipe browsing mobile interface',
      github:'https://github.com/ayundini586/myfood-plus',
      live:'https://myfood-plus-mobile.vercel.app/',liveLabel:'LIVE DEMO',
      sections:[
        {heading:'Application Objective & Main Features',html:`<p>MyFood+ helps users browse recipes, search for meals, read preparation instructions, manage favorites, and plan meals using a calendar. It was developed by a five-member team as a mobile application project.</p><p>Recipe discovery uses the public TheMealDB API. The Favorites feature connects the mobile client to the team's own backend and database.</p>`},
        {heading:'System Architecture & Data Integration',html:`
          <p><strong>React Native + Expo</strong> powers the app interface. TheMealDB supplies recipe information; <strong>Express</strong> exposes Favorites endpoints; <strong>Drizzle ORM</strong> stores favorite-recipe data in <strong>Neon PostgreSQL</strong>. A separate Python-based meal classification component is also included.</p>
          <div class="spx-architecture"><div class="spx-architecture-root">React Native / Expo</div><div class="spx-architecture-branches"><div>TheMealDB API<span>Recipe search and details</span></div><div>Express REST API<span>Favorites operations</span><small>↓ Neon PostgreSQL</small></div><div>Python ML Component<span>Meal classification endpoint</span></div></div></div>`},
        {heading:'Testing & Validation',html:`
          <p>Testing covered recipe browsing, search, details, calendar interactions, backend health, and Favorites API behavior. The repository documents successful independent tests for data insertion and retrieval through Neon PostgreSQL.</p>
          ${table(['Feature / interface','Documented testing outcome'],[['Recipe discovery, search & detail','Working'],['Meal calendar','Working'],['Backend health API','Working'],['Neon PostgreSQL connection','Working'],['Favorites REST API','Add and retrieve working independently'],['Favorites in mobile interface','Local integration issue remained']])}`},
        {heading:'Integration Challenges & Limitations',html:`
          <p>A local Python/NumPy compatibility issue in the machine learning environment affected the integrated Favorites flow. This did not invalidate the successful standalone backend and PostgreSQL tests, but it limited the end-to-end mobile experience in the documented environment.</p>
          ${callout('Accurate project status','The database-backed Favorites API was validated separately. It should not be described as a fully verified production-ready mobile feature.')}`},
        {heading:'My Contribution',html:`<p>Focused on manual application testing, backend endpoint checks, PostgreSQL connectivity validation, Favorites data insertion/retrieval tests, and identifying frontend–backend and Python environment compatibility issues.</p>`}
      ]
    },
    {
      id:'shipdeckk', title:'ShipDeCKK Maritime Website',
      category:'FRONTEND DEVELOPMENT · UX', filters:['app'],
      type:'Independent Project · Human–Computer Interaction',
      description:'Designed and developed a responsive, multi-page maritime company profile website independently.',
      tech:['HTML5','CSS3','JavaScript','Responsive UI'],tone:'sky',
      cover:'shipdeckk-preview.png',coverAlt:'ShipDeCKK maritime website homepage',
      github:'https://github.com/ayundini586/ShipdecKK',
      live:'https://ayundini586.github.io/ShipdecKK/',liveLabel:'LIVE WEBSITE',
      sections:[
        {heading:'Project Objective',html:`<p>ShipDeCKK is an independent Human–Computer Interaction course project presenting a fictional maritime vessel dealer. The goal was to turn a company and vessel catalog into a navigable, responsive web experience.</p>`},
        {heading:'UX/UI Design Approach',html:`<p>The site uses a multi-page information structure so visitors can discover featured vessels, explore product details, learn about services, and find company or subscription information.</p><p>Navigation, responsive layout decisions, and consistent visual structure were prioritized across desktop and smaller screens.</p>`},
        {heading:'Features & Frontend Implementation',html:`
          ${flow(['HTML page structure','CSS responsive layouts','JavaScript interactions','Browser-based form checks'])}
          ${table(['Implementation area','Functionality'],[['Five main pages','Home, Gallery, Services, About Us, Subscription'],['Vessel gallery','Product images, descriptions, and prices'],['Responsive navigation','Layouts and navigation adjusted for smaller screens'],['Sign-in / sign-up forms','Client-side JavaScript validation prototype']])}
          <p>Authentication is a <strong>client-side form prototype</strong>; the repository does not implement production authentication or account storage.</p>`},
        {heading:'Independent Development & Learning',html:`<p>Designed and coded the website independently with HTML, CSS, and JavaScript. The project gave practical experience in multi-page routing, responsive interaction patterns, form validation, and applying HCI principles to a complete frontend deliverable.</p>`}
      ]
    }
  ];

  // Sort projects alphabetically (A–Z)
  projects.sort((a, b) =>
    a.title.localeCompare(b.title, "en", {
      sensitivity: "base"
    })
  );

  const esc = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const onReady = () => {
    const section=document.getElementById('projects');
    if(!section) {console.warn('[Projects upgrade] #projects section not found.');return;}
    section.classList.add('spx-section');
    section.innerHTML=`
      <div class="spx-shell">
        <header class="spx-intro"><h2 class="spx-title">BUILT &amp; EXPLORED.</h2></header>
        <div class="spx-filter-bar" role="group" aria-label="Filter projects">
          <button type="button" class="spx-filter is-active" data-spx-filter="all" aria-pressed="true">ALL PROJECTS</button>
          <button type="button" class="spx-filter" data-spx-filter="data" aria-pressed="false">DATA ANALYTICS &amp; BI</button>
          <button type="button" class="spx-filter" data-spx-filter="engineering" aria-pressed="false">DATA ENGINEERING</button>
          <button type="button" class="spx-filter" data-spx-filter="app" aria-pressed="false">WEB &amp; APP DEVELOPMENT</button>
        </div>
        <div id="spxGrid" class="spx-grid"></div>
        <p id="spxCount" class="spx-count" aria-live="polite"></p>
      </div>`;

    let modal=document.getElementById('spxDetailDialog');
    if(modal) modal.remove();
    modal=document.createElement('dialog');modal.id='spxDetailDialog';modal.className='spx-modal';
    modal.setAttribute('aria-labelledby','spxModalTitle');
    modal.innerHTML='<div id="spxDetailContent" class="spx-modal-body"></div>';
    document.body.append(modal);
    let lightbox=document.getElementById('spxImageDialog');
    if(lightbox)lightbox.remove();
    lightbox=document.createElement('dialog');lightbox.id='spxImageDialog';lightbox.className='spx-lightbox';
    lightbox.innerHTML=`<div class="spx-lightbox-inner"><button type="button" data-spx-close-image aria-label="Close enlarged image">✕ CLOSE</button><img id="spxLargeImg" alt="" /><p id="spxLargeCaption"></p></div>`;
    document.body.append(lightbox);

    const grid=section.querySelector('#spxGrid');
    const count=section.querySelector('#spxCount');
    const filters=Array.from(section.querySelectorAll('[data-spx-filter]'));
    function card(p,i){
      const buttons=`<div class="spx-card-actions">
        <button class="spx-detail-button" type="button" data-spx-detail="${p.id}">VIEW DETAILS <span>↗</span></button>
        ${p.live?`<a class="spx-live-button" href="${p.live}" target="_blank" rel="noopener noreferrer">${p.liveLabel || 'LIVE VIEW'} <span>↗</span></a>`:''}
      </div>`;
      return `<article class="spx-card tone-${p.tone}" data-spx-card="${p.id}">
        <div class="spx-card-cover"><img src="${asset(p.cover)}" alt="${esc(p.coverAlt)}" loading="lazy"><span class="spx-cover-index">${String(i+1).padStart(2,'0')}</span></div>
        <div class="spx-card-body"><div class="spx-card-kicker">${p.category}</div><h3>${p.title}</h3><p class="spx-card-summary">${p.description}</p>
        <div class="spx-tags">${p.tech.map(t=>`<span>${esc(t)}</span>`).join('')}</div>
        <div class="spx-card-bottom">${buttons}<a class="spx-repo-link" href="${p.github}" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="currentColor"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.13c-3.12.68-3.78-1.33-3.78-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.15 1.73 1.15 1.01 1.71 2.65 1.22 3.3.93.1-.73.4-1.22.72-1.5-2.49-.28-5.1-1.25-5.1-5.55 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.45.11-3.02 0 0 .95-.3 3.1 1.16A10.8 10.8 0 0 1 12 6a10.8 10.8 0 0 1 2.82.38c2.15-1.46 3.1-1.16 3.1-1.16.61 1.57.23 2.73.11 3.02.72.79 1.16 1.8 1.16 3.03 0 4.31-2.62 5.26-5.12 5.54.41.35.77 1.03.77 2.08v3.2c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z"/></svg> VIEW GITHUB <span>↗</span></a></div>
        </div></article>`;
    }
    function render(filter){
      const filtered=projects.filter(p=>filter==='all'||p.filters.includes(filter));
      grid.innerHTML=filtered.map(p=>card(p,projects.indexOf(p))).join('');
      count.textContent=`SHOWING ${filtered.length} OF ${projects.length} PROJECTS`;
      filters.forEach(btn=>{const active=btn.dataset.spxFilter===filter;btn.classList.toggle('is-active',active);btn.setAttribute('aria-pressed',String(active));});
    }
    function openProject(id){
      const p=projects.find(x=>x.id===id);if(!p)return;
      const label=projects.indexOf(p)+1;
      const detail=modal.querySelector('#spxDetailContent');
      detail.innerHTML=`<div class="spx-modal-header">
        <div class="spx-modal-heading"><span class="spx-modal-kicker">${String(label).padStart(2,'0')} / ${p.category} · ${p.type}</span><h2 id="spxModalTitle">${p.title}</h2></div>
        <button type="button" class="spx-close" data-spx-close aria-label="Close project details">✕ <span>CLOSE</span></button>
        </div><div class="spx-modal-scroll">
        ${p.highlights ? `<div class="spx-highlight-grid">${p.highlights.map(([value,label])=>`<div class="spx-highlight"><strong>${value}</strong><span>${label}</span></div>`).join('')}</div>`:''}
        <div class="spx-sections">${p.sections.map((s,i)=>`<section class="spx-case-section"><div class="spx-case-title"><span>${String(i+1).padStart(2,'0')} /</span><h3>${s.heading}</h3></div><div class="spx-case-content">${s.html}</div></section>`).join('')}</div>
        </div>`;
      modal.showModal();
      document.body.classList.add('spx-modal-open');
      detail.querySelector('.spx-close').focus();
    }
    section.addEventListener('click',e=>{
      const filterBtn=e.target.closest('[data-spx-filter]');
      if(filterBtn){render(filterBtn.dataset.spxFilter);return;}
      const detailBtn=e.target.closest('[data-spx-detail]');
      if(detailBtn)openProject(detailBtn.dataset.spxDetail);
    });
    modal.addEventListener('click',e=>{
      if(e.target===modal){modal.close();return;}
      if(e.target.closest('[data-spx-close]')){modal.close();return;}
      const zoom=e.target.closest('[data-spx-image]');
      if(zoom){
        const f=zoom.dataset.spxImage;
        lightbox.querySelector('#spxLargeImg').src=asset(f);
        lightbox.querySelector('#spxLargeImg').alt=zoom.dataset.spxAlt||'Enlarged project diagram';
        lightbox.querySelector('#spxLargeCaption').textContent=zoom.closest('figure')?.querySelector('figcaption')?.textContent||'';
        lightbox.showModal();
        lightbox.querySelector('[data-spx-close-image]').focus();
      }
    });
    modal.addEventListener('close',()=>{document.body.classList.remove('spx-modal-open');});
    lightbox.addEventListener('click',e=>{if(e.target===lightbox||e.target.closest('[data-spx-close-image]'))lightbox.close();});
    render('all');
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',onReady,{once:true});else onReady();
})();
