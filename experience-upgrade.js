
/* ==========================================
   SCATTERED PIECES — EXPERIENCE SECTION
   Beyond the Code
   ========================================== */

(() => {
  "use strict";

  function initExperience() {
    if (document.getElementById("sp-exp-styles")) return;

    const contact = document.getElementById("contact");
    if (!contact) return;

    /* ========================================
       EXPERIENCE DATA — BASED ON CV
    ======================================== */

    const experiences = [
      {
        number: "01",
        category: "WORK",
        color: "pink",
        icon: "bag",
        organization: "Self-Employed",
        position: "Personal Shopper",
        date: "March 2026 – Present",
        description:
          "Managed customer orders end to end, including sourcing, payment coordination, communication, and delivery."
      },
      {
        number: "02",
        category: "VOLUNTEER",
        color: "yellow",
        icon: "users",
        organization: "Student Support, BINUS University",
        position: "Freshmen Partner, Volunteer",
        date: "September 2026 – Present",
        description:
          "Mentored first-semester students in adapting to university life and academic activities."
      },
      {
        number: "03",
        category: "ORGANIZATION",
        color: "purple",
        icon: "megaphone",
        organization: "HIMTI, BINUS University",
        position: "Member, Publication & Marketing Division",
        date: "June 2025 – November 2025",
        description:
          "Supported promotional content and communication for HIMTI student organization events."
      },
      {
        number: "04",
        category: "EVENT",
        color: "blue",
        icon: "trophy",
        organization: "Smansa Smart Competition (SMATION) 2023",
        position: "Secretary",
        date: "November 2023",
        description:
          "Prepared event documentation and coordinated with the event division and participating schools."
      },
      {
        number: "05",
        category: "EVENT",
        color: "green",
        icon: "trophy",
        organization: "Fit Out Cup Vol. 1 & Vol. 2",
        position: "Event Committee, Program Division",
        date: "May 2023 & November 2023",
        description:
          "Planned the concept and rundown of a futsal tournament involving 31 schools and coordinated across divisions."
      },
      {
        number: "06",
        category: "ORGANIZATION",
        color: "lavender",
        icon: "building",
        organization: "Student Council, SMAN 1 Kendari",
        position: "Secretary, Media & Publication Division",
        date: "March 2023 – February 2024",
        description:
          "Prepared proposals, reports, and administrative documents while supporting event documentation and publication."
      }
    ];

    /* ========================================
       ICONS
    ======================================== */

    const icons = {
      bag: `
        <svg viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round">
          <rect x="4" y="7" width="16" height="14" rx="2"/>
          <path d="M9 7V5a3 3 0 0 1 6 0v2"/>
        </svg>
      `,

      users: `
        <svg viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="8" r="3"/>
          <path d="M3 20v-2a6 6 0 0 1 12 0v2"/>
          <path d="M17 5a3 3 0 0 1 0 6"/>
          <path d="M18 15a5 5 0 0 1 3 5"/>
        </svg>
      `,

      megaphone: `
        <svg viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="m3 11 14-6v14L3 13z"/>
          <path d="M7 14l2 6h3l-2-5"/>
          <path d="M20 9a4 4 0 0 1 0 6"/>
        </svg>
      `,

      trophy: `
        <svg viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="M7 3h10v8a5 5 0 0 1-10 0z"/>
          <path d="M7 5H4v3a4 4 0 0 0 4 4"/>
          <path d="M17 5h3v3a4 4 0 0 1-4 4"/>
          <path d="M12 16v4M8 21h8"/>
        </svg>
      `,

      building: `
        <svg viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="m3 10 9-7 9 7"/>
          <path d="M5 10h14M6 10v10M10 10v10M14 10v10M18 10v10"/>
          <path d="M3 21h18"/>
        </svg>
      `,

      calendar: `
        <svg viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="5" width="18" height="16" rx="2"/>
          <path d="M7 3v4M17 3v4M3 10h18"/>
        </svg>
      `
    };

    /* ========================================
       STYLES
    ======================================== */

    const style = document.createElement("style");
    style.id = "sp-exp-styles";

    style.textContent = `
      /* SECTION */

      #experience.sp-exp {
        --exp-ink: #1b2742;
        --exp-muted: #64718a;
        --exp-card: #ffffff;

        position: relative;
        width: 100%;
        padding: 110px 24px 100px;
        background: transparent;
        color: var(--exp-ink);
        scroll-margin-top: 105px;
        overflow: hidden;
      }

      #experience.sp-exp *,
      #experience.sp-exp *::before,
      #experience.sp-exp *::after {
        box-sizing: border-box;
      }

      .sp-exp-inner {
        width: min(1320px, 100%);
        margin: 0 auto;
        position: relative;
        z-index: 1;
      }

      /* HEADER */

      .sp-exp-header {
        margin-bottom: 54px;
        max-width: 850px;
      }

      #experience .sp-exp-title {
        margin: 0 0 16px;
        font-family: "Space Mono", monospace;
        font-size: clamp(34px, 4vw, 62px);
        font-weight: 700;
        line-height: 1.15;
        letter-spacing: -2px;
        text-transform: uppercase;
        color: var(--exp-ink);
      }

      .sp-exp-subtitle {
        margin: 0;
        max-width: 720px;
        font-family: "Space Mono", monospace;
        font-size: clamp(13px, 1.15vw, 16px);
        line-height: 1.9;
        color: var(--exp-muted);
      }

      /* GRID */

      .sp-exp-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 46px 30px;
        padding: 18px 12px 20px 18px;
      }

      /* INDIVIDUAL ITEM */

      .sp-exp-item {
        --exp-accent: #f5d7d6;
        position: relative;
        min-width: 0;
        isolation: isolate;
        opacity: 0;
        transform: translateY(25px);
        transition:
          opacity .6s ease,
          transform .6s cubic-bezier(.2,.75,.3,1);
      }

      .sp-exp-item.is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      .sp-exp-item.pink {
        --exp-accent: #f3d4d3;
      }

      .sp-exp-item.yellow {
        --exp-accent: #f9e9b4;
      }

      .sp-exp-item.purple {
        --exp-accent: #e7dafa;
      }

      .sp-exp-item.blue {
        --exp-accent: #d8e5fd;
      }

      .sp-exp-item.green {
        --exp-accent: #d8eee2;
      }

      .sp-exp-item.lavender {
        --exp-accent: #e4e4fa;
      }

      /* DASHED TETRIS-LIKE CONNECTORS */

      .sp-exp-item::before {
        content: "";
        position: absolute;
        top: -25px;
        left: -16px;
        width: 68%;
        height: calc(100% + 50px);
        border: 2px dashed #475779;
        border-radius: 24px;
        opacity: .75;
        z-index: -1;
        pointer-events: none;
      }

      /* INDEX NUMBER */

      .sp-exp-number {
        position: absolute;
        top: -33px;
        left: 10px;
        z-index: 3;

        width: 45px;
        height: 43px;

        display: flex;
        align-items: center;
        justify-content: center;

        border: 2px solid #293853;
        border-radius: 8px;
        background: var(--exp-accent);
        box-shadow: 3px 3px 0 #293853;

        font-family: "Space Mono", monospace;
        font-weight: 700;
        font-size: 15px;
        color: #1b2742;
      }

      /* CARD */

      .sp-exp-card {
        position: relative;
        z-index: 1;
        height: 100%;
        min-height: 257px;

        display: flex;
        flex-direction: column;
        padding: 22px;

        background: var(--exp-card);
        border: 2px solid #293853;
        border-radius: 13px;
        box-shadow: 6px 7px 0 #293853;

        transition:
          transform .22s ease,
          box-shadow .22s ease;
      }

      .sp-exp-card:hover {
        transform: translateY(-5px);
        box-shadow: 6px 12px 0 #293853;
      }

      .sp-exp-card-top {
        display: flex;
        align-items: flex-start;
        gap: 14px;
        min-width: 0;
      }

      /* ICON */

      .sp-exp-icon {
        width: 52px;
        height: 52px;
        flex: 0 0 52px;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 10px;
        background: var(--exp-accent);
        color: #202c48;
      }

      .sp-exp-icon svg {
        width: 28px;
        height: 28px;
      }

      /* CARD TEXT */

      .sp-exp-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
        min-width: 0;
      }

      .sp-exp-category {
        display: inline-block;
        padding: 5px 10px;

        border-radius: 7px;
        background: var(--exp-accent);

        font-family: "Space Mono", monospace;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .5px;
        color: #24324b;
      }

      .sp-exp-org {
        margin: 4px 0 0;

        font-family: "Space Mono", monospace;
        font-size: clamp(12px, 1.05vw, 15px);
        font-weight: 700;
        line-height: 1.45;
        letter-spacing: -.3px;

        color: var(--exp-ink);
        overflow-wrap: anywhere;
      }

      .sp-exp-role {
        margin: 0;
        font-family: "Space Mono", monospace;
        font-size: 12px;
        line-height: 1.5;
        color: var(--exp-muted);
      }

      /* DATE */

      .sp-exp-date {
        display: flex;
        align-items: center;
        gap: 9px;

        margin-top: 22px;

        font-family: "Space Mono", monospace;
        font-size: 12px;
        line-height: 1.5;
        color: var(--exp-muted);
      }

      .sp-exp-date svg {
        width: 17px;
        height: 17px;
        flex-shrink: 0;
      }

      .sp-exp-divider {
        margin: 13px 0 13px;
        height: 1px;
        background: #d7dce4;
      }

      .sp-exp-desc {
        margin: 0;

        font-family: "Space Mono", monospace;
        font-size: 12px;
        line-height: 1.75;
        color: var(--exp-muted);
      }

      /* SMALL TETRIS CORNER DECORATION */

      .sp-exp-decoration {
        position: absolute;
        display: grid;
        grid-template-columns: repeat(3, 22px);
        grid-template-rows: repeat(3, 22px);
        gap: 3px;
        pointer-events: none;
        opacity: .85;
      }

      .sp-exp-decoration.left {
        bottom: 32px;
        left: -7px;
      }

      .sp-exp-decoration.right {
        bottom: 35px;
        right: -7px;
      }

      .sp-exp-pixel {
        border: 2px solid #34415b;
        border-radius: 3px;
        background: #e6b1b0;
      }

      .sp-exp-decoration.left .sp-exp-pixel:nth-child(1) {
        grid-column: 1;
        grid-row: 1;
      }

      .sp-exp-decoration.left .sp-exp-pixel:nth-child(2) {
        grid-column: 1;
        grid-row: 2;
      }

      .sp-exp-decoration.left .sp-exp-pixel:nth-child(3) {
        grid-column: 2;
        grid-row: 2;
      }

      .sp-exp-decoration.left .sp-exp-pixel:nth-child(4) {
        grid-column: 3;
        grid-row: 2;
        background: #abc7ec;
      }

      .sp-exp-decoration.right .sp-exp-pixel {
        background: #b3dccc;
      }

      .sp-exp-decoration.right .sp-exp-pixel:nth-child(1) {
        grid-column: 3;
        grid-row: 1;
      }

      .sp-exp-decoration.right .sp-exp-pixel:nth-child(2) {
        grid-column: 3;
        grid-row: 2;
      }

      .sp-exp-decoration.right .sp-exp-pixel:nth-child(3) {
        grid-column: 3;
        grid-row: 3;
      }

      .sp-exp-decoration.right .sp-exp-pixel:nth-child(4) {
        grid-column: 2;
        grid-row: 3;
        background: #f5e397;
      }

      /* TABLET */

      @media (max-width: 1050px) {
        .sp-exp-grid {
          grid-template-columns: repeat(2, minmax(0,1fr));
          gap: 46px 28px;
        }

        .sp-exp-org {
          font-size: 14px;
        }
      }

      /* MOBILE */

      @media (max-width: 650px) {
        #experience.sp-exp {
          padding: 75px 18px 80px;
        }

        .sp-exp-header {
          margin-bottom: 44px;
        }

        #experience .sp-exp-title {
          font-size: clamp(31px, 8vw, 43px);
          letter-spacing: -1.4px;
        }

        .sp-exp-subtitle {
          font-size: 13px;
        }

        .sp-exp-grid {
          grid-template-columns: 1fr;
          gap: 46px;
          padding: 16px 12px 12px 14px;
        }

        .sp-exp-card {
          min-height: 0;
          padding: 19px;
        }

        .sp-exp-org {
          font-size: 13px;
        }

        .sp-exp-role,
        .sp-exp-desc {
          font-size: 12px;
        }

        .sp-exp-decoration {
          display: none;
        }
      }

      /* DARK MODE */

      body.night #experience.sp-exp,
      body.dark-mode #experience.sp-exp,
      [data-theme="dark"] #experience.sp-exp {
        --exp-ink: #f3f5fc;
        --exp-muted: #c1cadf;
        --exp-card: #253149;
      }

      body.night .sp-exp-card,
      body.dark-mode .sp-exp-card,
      [data-theme="dark"] .sp-exp-card {
        border-color: #8292b3;
        box-shadow: 6px 7px 0 #111a2a;
      }

      body.night .sp-exp-item::before,
      body.dark-mode .sp-exp-item::before,
      [data-theme="dark"] .sp-exp-item::before {
        border-color: #7e91b3;
      }

      body.night .sp-exp-divider,
      body.dark-mode .sp-exp-divider,
      [data-theme="dark"] .sp-exp-divider {
        background: #485873;
      }

      @media (prefers-reduced-motion: reduce) {
        .sp-exp-item {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
        }

        .sp-exp-card {
          transition: none !important;
        }
      }
    `;

    document.head.appendChild(style);

    /* ========================================
       CREATE CARDS
    ======================================== */

    const cardsHTML = experiences.map(exp => `
      <div class="sp-exp-item ${exp.color}">

        <div class="sp-exp-number">
          ${exp.number}
        </div>

        <article class="sp-exp-card">

          <div class="sp-exp-card-top">

            <div class="sp-exp-icon" aria-hidden="true">
              ${icons[exp.icon]}
            </div>

            <div class="sp-exp-info">

              <span class="sp-exp-category">
                ${exp.category}
              </span>

              <h3 class="sp-exp-org">
                ${exp.organization}
              </h3>

              <p class="sp-exp-role">
                ${exp.position}
              </p>

            </div>
          </div>

          <div class="sp-exp-date">
            ${icons.calendar}
            <span>${exp.date}</span>
          </div>

          <div class="sp-exp-divider"></div>

          <p class="sp-exp-desc">
            ${exp.description}
          </p>

        </article>

      </div>
    `).join("");

    /* ========================================
       CREATE EXPERIENCE SECTION
    ======================================== */

    let section = document.getElementById("experience");

    if (!section) {
      section = document.createElement("section");
      section.id = "experience";
    }

    section.className = "sp-exp";
    section.setAttribute("aria-labelledby", "sp-exp-title");

    section.innerHTML = `
      <div class="sp-exp-inner">

        <div class="sp-exp-header">

          <h2 class="sp-exp-title" id="sp-exp-title">
            BEYOND THE CODE.
          </h2>

          <p class="sp-exp-subtitle">
            Work, campus, and organization experiences
            that shaped how I collaborate, organize,
            and solve problems.
          </p>

        </div>

        <div class="sp-exp-grid">
          ${cardsHTML}
        </div>

      </div>

      <div class="sp-exp-decoration left" aria-hidden="true">
        <span class="sp-exp-pixel"></span>
        <span class="sp-exp-pixel"></span>
        <span class="sp-exp-pixel"></span>
        <span class="sp-exp-pixel"></span>
      </div>

      <div class="sp-exp-decoration right" aria-hidden="true">
        <span class="sp-exp-pixel"></span>
        <span class="sp-exp-pixel"></span>
        <span class="sp-exp-pixel"></span>
        <span class="sp-exp-pixel"></span>
      </div>
    `;

    // Experience appears immediately before Contact.
    contact.parentNode.insertBefore(section, contact);

    /* ========================================
       ADD EXPERIENCE TO NAVBAR
    ======================================== */

    const contactLink = document.querySelector(
      '.navlinks a[href="#contact"], nav a[href="#contact"]'
    );

    const existingExperienceLink = document.querySelector(
      'nav a[href="#experience"], .navlinks a[href="#experience"]'
    );

    if (contactLink && !existingExperienceLink) {
      if (contactLink.parentElement?.tagName === "LI") {
        const navItem = contactLink.parentElement.cloneNode(true);
        const link = navItem.querySelector("a");

        if (link) {
          link.href = "#experience";
          link.textContent = "Experience";
          link.classList.remove("active", "is-active", "selected");
          link.removeAttribute("aria-current");
          link.removeAttribute("id");
          contactLink.parentElement.before(navItem);
        }
      } else {
        const link = contactLink.cloneNode(false);
        link.href = "#experience";
        link.textContent = "Experience";
        link.classList.remove("active", "is-active", "selected");
        link.removeAttribute("aria-current");
        link.removeAttribute("id");
        contactLink.before(link);
      }
    }

    /* ========================================
       SCROLL REVEAL ANIMATION
    ======================================== */

    const items = section.querySelectorAll(".sp-exp-item");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
      prefersReducedMotion ||
      !("IntersectionObserver" in window)
    ) {
      items.forEach(item => {
        item.classList.add("is-visible");
      });
    } else {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );

      items.forEach(item => observer.observe(item));
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initExperience,
      { once: true }
    );
  } else {
    initExperience();
  }
})();
