/* Scattered Pieces — Skills + Contact section, standalone safe upgrade.
   Only updates #skills and the placeholder #contact section. */
(() => {
  'use strict';
  const scriptTag = document.currentScript;
  const root = new URL('./', scriptTag?.src || location.href);
  const localAsset = file => new URL(`assets/skill-icons/${file}`, root).href;
  const cssHref = new URL('skills-contact-upgrade.css', root).href;
  const logoOnlyCssHref = new URL('skills-logo-only.css', root).href;

  if (!document.querySelector('link[data-spc-css]')) {
    const sheet = document.createElement('link');
    sheet.rel = 'stylesheet';
    sheet.href = cssHref;
    sheet.dataset.spcCss = 'true';
    document.head.appendChild(sheet);
  }

  if (!document.querySelector('link[data-spc-logo-only-css]')) {
    const sheet = document.createElement('link');
    sheet.rel = 'stylesheet';
    sheet.href = logoOnlyCssHref;
    sheet.dataset.spcLogoOnlyCss = 'true';
    document.head.appendChild(sheet);
  }

  const devicon = (folder, file) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${folder}/${file}.svg`;
  const simpleIcon = (slug, color) => `https://cdn.simpleicons.org/${slug}/${color}`;
  // Each tile uses a recognizable tool logo. If a CDN icon is temporarily
  // unavailable, a compact text fallback appears instead of a broken image.
  const tools = [
    { name: 'Python', abbr: 'Py', icon: localAsset('python.svg'), tint: '#E3F1FF' },
    { name: 'C', abbr: 'C', icon: devicon('c', 'c-original'), tint: '#E7EEFF' },
    { name: 'C++', abbr: 'C++', icon: devicon('cplusplus', 'cplusplus-original'), tint: '#E3F0FF' },
    { name: 'Java', abbr: 'Ja', icon: devicon('java', 'java-original'), tint: '#FFF0E6' },
    { name: 'R', abbr: 'R', icon: devicon('r', 'r-original'), tint: '#E5EDFF' },
    { name: 'JavaScript', abbr: 'JS', icon: localAsset('javascript.svg'), tint: '#FFF5D5' },
    { name: 'HTML5', abbr: 'HTML', icon: devicon('html5', 'html5-original'), tint: '#FFE9DF' },
    { name: 'CSS3', abbr: 'CSS', icon: devicon('css3', 'css3-original'), tint: '#E4F0FF' },
    { name: 'React', abbr: 'Re', icon: localAsset('react.svg'), tint: '#E7F9FE' },
    { name: 'Express.js', abbr: 'Ex', icon: devicon('express', 'express-original'), tint: '#F1F1F5' },
    { name: 'Django', abbr: 'Dj', icon: devicon('django', 'django-plain'), tint: '#E7F4EA' },
    { name: 'MySQL', abbr: 'My', icon: devicon('mysql', 'mysql-original'), tint: '#EAF4FF' },
    { name: 'MariaDB', abbr: 'Ma', icon: devicon('mariadb', 'mariadb-original'), tint: '#EDF7EF' },
    { name: 'PostgreSQL', abbr: 'Pg', icon: devicon('postgresql', 'postgresql-original'), tint: '#E9F0FD' },
    { name: 'SQL Server', abbr: 'SQL', icon: devicon('microsoftsqlserver', 'microsoftsqlserver-plain'), tint: '#FFECEC' },
    { name: 'Pandas', abbr: 'pd', icon: devicon('pandas', 'pandas-original'), tint: '#F0EAFE' },
    { name: 'Scikit-learn', abbr: 'sk', icon: devicon('scikitlearn', 'scikitlearn-original'), tint: '#FFEADC' },
    { name: 'Power BI', abbr: 'BI', icon: localAsset('powerbi.svg'), tint: '#FFF3D7' },
    { name: 'Tableau', abbr: 'Ta', icon: localAsset('tableau.svg'), tint: '#EBF1FC' },
    { name: 'Pentaho PDI', abbr: 'PDI', icon: localAsset('pentaho.svg'), tint: '#EEF1FF' },
    { name: 'Apache Airflow', abbr: 'Af', icon: devicon('apacheairflow', 'apacheairflow-original'), tint: '#E9F7EF' },
    { name: 'Apache Spark / PySpark', abbr: 'Sp', icon: localAsset('apachespark.svg'), tint: '#E6F1FF' },
    { name: 'Jupyter', abbr: 'Ju', icon: devicon('jupyter', 'jupyter-original'), tint: '#FFF0E5' },
    { name: 'Google Colab', abbr: 'Co', icon: devicon('googlecolab', 'googlecolab-original'), tint: '#FFF1DE' },
    { name: 'RStudio', abbr: 'Rs', icon: devicon('rstudio', 'rstudio-original'), tint: '#E7EFFF' },
    { name: 'VS Code', abbr: 'VS', icon: devicon('vscode', 'vscode-original'), tint: '#E3F2FF' },
    { name: 'Git', abbr: 'Git', icon: devicon('git', 'git-original'), tint: '#FFE9E1' },
    { name: 'GitHub', abbr: 'GH', icon: localAsset('github.svg'), tint: '#EDEBF6' },
    { name: 'Microsoft Excel', abbr: 'XL', icon: localAsset('excel.svg'), tint: '#E5F4E9' },
    { name: 'Microsoft Office', abbr: 'MS', icon: localAsset('office.svg'), tint: '#FFF0E5' }
  ];

  const skillCategories = [
    {
      title: 'DATA ANALYTICS & BI', symbol: '▥', color: '#EBE7FD',
      skills: [
        'Data Cleaning & Preprocessing',
        'Exploratory Data Analysis',
        'Statistical Analysis',
        'Data Visualization',
        'Dashboard Development',
        'Machine Learning Evaluation'
      ]
    },
    {
      title: 'DATABASE & ENGINEERING', symbol: '▤', color: '#DFF4EA',
      skills: [
        'SQL Querying',
        'ETL & Data Pipelines',
        'Data Warehousing',
        'Dimensional Modeling',
        'Data Validation',
        'Pipeline Monitoring'
      ]
    },
    {
      title: 'SOFTWARE TESTING & QA', symbol: '⌕', color: '#FCE9EB',
      skills: [
        'Manual Functional Testing',
        'Bug Identification & Debugging',
        'API Testing',
        'Integration Testing',
        'Workflow Validation',
        'Retesting'
      ]
    },
    {
      title: 'SOFTWARE DEVELOPMENT', symbol: '⌘', color: '#FFF1D9',
      skills: [
        'REST API Integration',
        'Frontend–Backend Integration',
        'Responsive Web Design',
        'Version Control',
        'Technical Documentation',
        'Problem Solving'
      ]
    }
  ];

  const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);

  function renderSkills() {
    const section = document.getElementById('skills');
    if (!section) {
      console.warn('[Skills Upgrade] Missing #skills section');
      return;
    }
    if (section.dataset.spcReady === 'true') return;
    section.dataset.spcReady = 'true';
    section.classList.add('spc-skills');

    const logoItems = tools.map(tool => `
      <li class="spc-logo-item">
        <div class="spc-logo-tile" tabindex="0" role="img" aria-label="${escapeHTML(tool.name)}"
             style="--spc-logo-tint:${tool.tint}">
          <span class="spc-logo-fallback" aria-hidden="true">${escapeHTML(tool.abbr)}</span>
          <img class="spc-logo-image" src="${tool.icon}" alt="" aria-hidden="true"
               loading="lazy" decoding="async" />
          <span class="spc-logo-label" aria-hidden="true">${escapeHTML(tool.name)}</span>
        </div>
      </li>`).join('');

    
section.innerHTML = `
  <div class="spc-inner">

    <header class="spc-heading-wrap">
      <h2 class="spc-section-title">
        TOOLS OF THE TRADE.
      </h2>
    </header>

    <ul class="spc-logo-list" aria-label="Tools and technologies">
      ${logoItems}
    </ul>

    <div class="spc-capabilities">

      <h3 class="spc-capabilities-title">
        BEYOND THE TOOLS.
      </h3>

      <div class="spc-skills-grid">

        ${skillCategories.map(category => `
          <article
            class="spc-skill-card"
            style="--spc-card-tint:${category.color}"
          >

            <span class="spc-skill-symbol" aria-hidden="true">
              ${escapeHTML(category.symbol)}
            </span>

            <h3>
              ${escapeHTML(category.title)}
            </h3>

            <div class="spc-chip-list">
              ${category.skills.map(skill => `
                <span class="spc-chip">
                  ${escapeHTML(skill)}
                </span>
              `).join('')}
            </div>

          </article>
        `).join('')}

      </div>
    </div>

  </div>
`;


    for (const img of section.querySelectorAll('.spc-logo-image')) {
      img.addEventListener('load', () => img.parentElement?.classList.add('spc-logo-loaded'), { once: true });
      img.addEventListener('error', () => img.parentElement?.classList.add('spc-logo-failed'), { once: true });
      if (img.complete && img.naturalWidth) img.parentElement?.classList.add('spc-logo-loaded');
    }
    section.querySelectorAll('.spc-logo-tile').forEach(tile => {
      tile.addEventListener('click', () => tile.focus());
    });
  }

  function renderContact() {
    // Respect any contact section already fully written by the user.
    let current = document.getElementById('contact');
    if (current && !current.classList.contains('footer') && !current.textContent.includes('hello@example.com')) {
      return;
    }
    const main = document.querySelector('main');
    if (!main) return;

    // Keep the existing #contact DOM node. The legacy navbar scrollspy caches
    // this node; replacing it made 'Contact' appear selected everywhere.
    const newSection = current || document.createElement('section');
    newSection.id = 'contact';
    newSection.className = 'section spc-contact';
    newSection.setAttribute('aria-labelledby', 'spcContactTitle');
    newSection.innerHTML = `
      <div class="spc-contact-layout">
        <div class="spc-contact-intro">
          <span class="spc-contact-eyebrow">OPEN TO INTERNSHIP OPPORTUNITIES</span>
          <h2 id="spcContactTitle" class="spc-section-title">LET'S CONNECT.</h2>
          <p>Interested in working together or discussing an internship opportunity? I'd love to hear from you.</p>
          <span class="spc-contact-deco" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
        </div>
        <div class="spc-contact-links" aria-label="Contact methods">
          <a href="mailto:ayundinin0508@gmail.com" class="spc-contact-link">
            <span class="spc-contact-icon" aria-hidden="true">@</span><span class="spc-link-content"><small>EMAIL</small><strong>ayundinin0508@gmail.com</strong></span><span aria-hidden="true">↗</span>
          </a>
          <a href="https://www.linkedin.com/in/ayundini-nursyahrin/" target="_blank" rel="noopener noreferrer" class="spc-contact-link">
            <span class="spc-contact-icon" aria-hidden="true">in</span><span class="spc-link-content"><small>LINKEDIN</small><strong>Ayundini Nursyahrin</strong></span><span aria-hidden="true">↗</span>
          </a>
          <a href="https://github.com/ayundini586" target="_blank" rel="noopener noreferrer" class="spc-contact-link">
            <span class="spc-contact-icon" aria-hidden="true">GH</span><span class="spc-link-content"><small>GITHUB</small><strong>github.com/ayundini586</strong></span><span aria-hidden="true">↗</span>
          </a>
          <a href="https://wa.me/6282271000702" target="_blank" rel="noopener noreferrer" class="spc-contact-link">
            <span class="spc-contact-icon" aria-hidden="true">WA</span><span class="spc-link-content"><small>WHATSAPP</small><strong>+62 822 7100 0702</strong></span><span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <footer class="spc-footnote">SCATTERED PIECES <span aria-hidden="true">✦</span> © ${new Date().getFullYear()}</footer>`;

    if (!current) main.append(newSection);
  }

  // Keep active navbar item in sync even when a section is inserted dynamically.
  // Registered after legacy script.js, this pass uses current DOM nodes rather
  // than a stale cached list of sections.
  function installNavFix() {
    let pending = false;
    const update = () => {
      pending = false;
      const links = [...document.querySelectorAll('.navlinks a[href^="#"]')];
      if (!links.length) return;
      const nav = document.querySelector('.nav');
      const line = (nav ? nav.getBoundingClientRect().height : 0) + 48;
      let active = links[0]?.getAttribute('href');
      for (const link of links) {
        const id = link.getAttribute('href').slice(1);
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= line) {
          active = '#' + id;
        }
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 3) {
        const last = links.findLast(link => document.getElementById(link.hash.slice(1)));
        if (last) active = last.hash;
      }
      links.forEach(link => {
        const selected = link.getAttribute('href') === active;
        link.classList.toggle('active', selected);
        if (selected) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };
    const schedule = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.querySelectorAll('.navlinks a[href^="#"]').forEach(link =>
      link.addEventListener('click', () => requestAnimationFrame(schedule))
    );
    update();
  }

  const run = () => { renderSkills(); renderContact(); installNavFix(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();
})();
