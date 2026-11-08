
/* ==========================================
   SCATTERED PIECES
   RESTORE + REDESIGN SKILL CARDS
========================================== */

(() => {
  "use strict";

  function initSkillCards() {
    const section = document.getElementById("skills");
    if (!section) return;

    const inner = section.querySelector(".spc-inner") || section;

    const categories = [
      {
        number: "01",
        title: "DATA ANALYTICS & BI",
        icon: "▥",
        color: "purple",
        skills: [
          "Data Cleaning & Preprocessing",
          "Exploratory Data Analysis",
          "Statistical Analysis",
          "Data Visualization",
          "Dashboard Development",
          "Machine Learning Evaluation"
        ]
      },
      {
        number: "02",
        title: "DATABASE & ENGINEERING",
        icon: "▤",
        color: "green",
        skills: [
          "SQL Querying",
          "ETL & Data Pipelines",
          "Data Warehousing",
          "Dimensional Modeling",
          "Data Validation",
          "Pipeline Monitoring"
        ]
      },
      {
        number: "03",
        title: "SOFTWARE TESTING & QA",
        icon: "⌕",
        color: "pink",
        skills: [
          "Manual Functional Testing",
          "Bug Identification & Debugging",
          "API Testing",
          "Integration Testing",
          "Workflow Validation",
          "Retesting"
        ]
      },
      {
        number: "04",
        title: "SOFTWARE DEVELOPMENT",
        icon: "⌘",
        color: "yellow",
        skills: [
          "REST API Integration",
          "Frontend–Backend Integration",
          "Responsive Web Design",
          "Version Control",
          "Technical Documentation",
          "Problem Solving"
        ]
      }
    ];

    const cards = categories.map(category => `
      <article class="spc-c4-card spc-c4-${category.color}">

        <span class="spc-c4-number">
          ${category.number}
        </span>

        <div class="spc-c4-piece" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div class="spc-c4-content">

          <div class="spc-c4-icon" aria-hidden="true">
            ${category.icon}
          </div>

          <h4 class="spc-c4-title">
            ${category.title}
          </h4>

          <div class="spc-c4-line"></div>

          <div class="spc-c4-chips">
            ${category.skills.map(skill => `
              <span class="spc-c4-chip">
                ${skill}
              </span>
            `).join("")}
          </div>

        </div>

      </article>
    `).join("");

    // Reuse the existing capabilities container if present.
    let capabilities = inner.querySelector(".spc-capabilities");

    if (!capabilities) {
      capabilities = document.createElement("div");
      capabilities.className = "spc-capabilities";
      inner.appendChild(capabilities);
    }

    capabilities.innerHTML = `
      <h3 class="spc-c4-heading">
        BEYOND THE TOOLS.
      </h3>

      <div class="spc-c4-grid">
        ${cards}
      </div>
    `;

    document.getElementById("spc-c4-style")?.remove();

    const style = document.createElement("style");
    style.id = "spc-c4-style";

    style.textContent = `
      /* RESTORE HIDDEN CARDS */

      #skills .spc-capabilities {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        width: 100%;
        max-width: 1120px;
        margin: 95px auto 0 !important;
      }

      /* SECTION HEADING */

      #skills .spc-c4-heading {
        margin: 0 0 38px;
        font-family: "Space Mono", monospace;
        font-size: clamp(25px, 3.5vw, 40px);
        font-weight: 700;
        letter-spacing: -1.4px;
        line-height: 1.2;
        text-align: center;
        color: var(--ink, #24324d);
      }

      /* CARD GRID */

      #skills .spc-c4-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 22px;
        width: 100%;
      }

      /* CARD DESIGN */

      #skills .spc-c4-card {
        --card-bg: #eee8fb;
        --card-accent: #b9a4e8;

        position: relative;
        display: flex;
        justify-content: center;
        min-width: 0;
        min-height: 315px;
        overflow: hidden;

        padding: 38px 24px 30px;

        background: var(--card-bg);
        border: 2px solid #2e3a55;
        border-radius: 14px;
        box-shadow: 6px 6px 0 #2e3a55;

        color: #24324d;

        transition:
          transform .25s ease,
          box-shadow .25s ease;
      }

      #skills .spc-c4-purple {
        --card-bg: #eee8fc;
        --card-accent: #bca7ec;
      }

      #skills .spc-c4-green {
        --card-bg: #e2f3e9;
        --card-accent: #9ed4b8;
      }

      #skills .spc-c4-pink {
        --card-bg: #fbe9eb;
        --card-accent: #efaeb9;
      }

      #skills .spc-c4-yellow {
        --card-bg: #fff1d7;
        --card-accent: #ecd18a;
      }

      /* HOVER */

      #skills .spc-c4-card:hover {
        transform: translateY(-6px);
        box-shadow: 6px 12px 0 #2e3a55;
      }

      /* TOP NUMBER */

      #skills .spc-c4-number {
        position: absolute;
        top: 17px;
        left: 20px;

        font: 700 12px "Space Mono", monospace;
        letter-spacing: 1px;
        color: #40506c;
        opacity: .8;
      }

      /* TETRIS CORNER */

      #skills .spc-c4-piece {
        position: absolute;
        top: 17px;
        right: 20px;

        display: grid;
        grid-template-columns: repeat(3, 10px);
        grid-template-rows: repeat(2, 10px);
        gap: 3px;

        opacity: .75;
        transform: rotate(-8deg);
        transition: transform .25s ease;
      }

      #skills .spc-c4-piece span {
        background: var(--card-accent);
        border: 1.5px solid #35415b;
        border-radius: 2px;
      }

      #skills .spc-c4-piece span:nth-child(1) {
        grid-column: 2;
        grid-row: 1;
      }

      #skills .spc-c4-piece span:nth-child(2) {
        grid-column: 1;
        grid-row: 2;
      }

      #skills .spc-c4-piece span:nth-child(3) {
        grid-column: 2;
        grid-row: 2;
      }

      #skills .spc-c4-piece span:nth-child(4) {
        grid-column: 3;
        grid-row: 2;
      }

      #skills .spc-c4-card:hover .spc-c4-piece {
        transform: rotate(0deg) translateY(-2px);
      }

      /* CENTERED CONTENT */

      #skills .spc-c4-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        text-align: center;
      }

      #skills .spc-c4-icon {
        display: grid;
        place-items: center;

        width: 53px;
        height: 53px;
        margin-bottom: 17px;

        background: rgba(255,255,255,.6);
        border: 1.5px solid rgba(46,58,85,.25);
        border-radius: 11px;

        font: 700 28px "Space Mono", monospace;
        color: #26344d;
      }

      #skills .spc-c4-title {
        margin: 0;
        font-family: "Space Mono", monospace;
        font-size: clamp(14px, 1.5vw, 19px);
        line-height: 1.5;
        font-weight: 700;
        letter-spacing: -.5px;
        text-align: center;
        color: #24324d;
      }

      #skills .spc-c4-line {
        width: 45px;
        height: 3px;
        margin: 17px auto 22px;
        border-radius: 3px;
        background: var(--card-accent);
      }

      /* SKILL CHIPS */

      #skills .spc-c4-chips {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 9px;
        width: 100%;
      }

      #skills .spc-c4-chip {
        display: inline-flex;
        align-items: center;
        justify-content: center;

        padding: 8px 12px;
        max-width: 100%;

        background: rgba(255,255,255,.72);
        border: 1px solid rgba(46,58,85,.17);
        border-radius: 7px;

        font-family: "Space Mono", monospace;
        font-size: 12px;
        font-weight: 500;
        line-height: 1.45;
        text-align: center;
        color: #30405b;

        transition:
          background .2s ease,
          transform .2s ease;
      }

      #skills .spc-c4-chip:hover {
        background: #fff;
        transform: translateY(-2px);
      }

      /* TABLET */

      @media (max-width: 850px) {
        #skills .spc-c4-grid {
          grid-template-columns: 1fr;
          gap: 22px;
        }

        #skills .spc-c4-card {
          min-height: 0;
          padding: 38px 22px 30px;
        }

        #skills .spc-c4-title {
          font-size: 18px;
        }
      }

      /* MOBILE */

      @media (max-width: 550px) {
        #skills .spc-capabilities {
          margin-top: 65px !important;
        }

        #skills .spc-c4-heading {
          font-size: 25px;
          margin-bottom: 28px;
        }

        #skills .spc-c4-card {
          padding: 38px 15px 25px;
        }

        #skills .spc-c4-chip {
          font-size: 11px;
          padding: 7px 9px;
        }
      }

      /* DARK MODE */

      body.night #skills .spc-c4-card,
      body.dark-mode #skills .spc-c4-card,
      [data-theme="dark"] #skills .spc-c4-card {
        border-color: #7f91b3;
        box-shadow: 6px 6px 0 #111827;
      }

      /* REDUCED MOTION */

      @media (prefers-reduced-motion: reduce) {
        #skills .spc-c4-card,
        #skills .spc-c4-chip,
        #skills .spc-c4-piece {
          transition: none !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initSkillCards,
      { once: true }
    );
  } else {
    initSkillCards();
  }
})();
