
/* ==========================================
   SCATTERED PIECES — CONTACT REDESIGN
   Balanced layout + repeatable typing
   ========================================== */

(() => {
  "use strict";

  function initContact() {
    const section = document.getElementById("contact");
    if (!section || section.dataset.ct2Ready === "true") return;

    section.dataset.ct2Ready = "true";

    // Keep the original element so navbar navigation works.
    section.className = "section ct2";

    // Remove any previous Contact redesign styles.
    document.getElementById("ct2-styles")?.remove();

    const style = document.createElement("style");
    style.id = "ct2-styles";

    style.textContent = `
      /* MAIN CONTACT SECTION */

      #contact.ct2 {
        position: relative;
        padding: 90px 24px 70px;
        color: var(--ink, #24324d);
        scroll-margin-top: 110px;
      }

      #contact.ct2 *,
      #contact.ct2 *::before,
      #contact.ct2 *::after {
        box-sizing: border-box;
      }

      .ct2-inner {
        width: min(1100px, 100%);
        margin: 0 auto;
      }

      .ct2-layout {
        display: grid;
        grid-template-columns:
          minmax(0, 1fr)
          minmax(0, 1fr);
        align-items: center;
        gap: 36px;
      }

      /* LEFT — CONTACT CARDS */

      .ct2-left {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 0;
      }

      .ct2-cards {
        display: grid;
        grid-template-columns:
          repeat(2, minmax(0, 1fr));
        gap: 16px;
        width: 100%;
      }

      .ct2-card {
        display: flex;
        align-items: center;
        gap: 11px;

        min-width: 0;
        min-height: 110px;
        padding: 15px 13px;

        background: #ffffff;
        border: 2px solid #34415b;
        border-radius: 10px;
        box-shadow: 5px 5px 0 #34415b;

        color: #24324d;
        text-decoration: none;

        transition:
          transform .2s ease,
          box-shadow .2s ease;
      }

      .ct2-card:hover,
      .ct2-card:focus-visible {
        transform: translateY(-5px);
        box-shadow: 5px 10px 0 #34415b;
      }

      .ct2-icon {
        width: 43px;
        height: 43px;
        flex: 0 0 43px;

        display: grid;
        place-items: center;

        border-radius: 9px;
        color: #24324d;
      }

      .ct2-icon svg {
        width: 24px;
        height: 24px;
      }

      .ct2-email .ct2-icon {
        background: #f7dfdf;
      }

      .ct2-whatsapp .ct2-icon {
        background: #dcf3e5;
      }

      .ct2-phone .ct2-icon {
        background: #fff0bf;
      }

      .ct2-linkedin .ct2-icon {
        background: #e0eafd;
      }

      .ct2-card-text {
        display: flex;
        flex-direction: column;
        gap: 5px;
        min-width: 0;
      }

      .ct2-card-text small {
        font-family: 'Space Mono', monospace;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: .5px;
        color: #24324d;
      }

      .ct2-card-text span {
        font-family: 'DM Mono', monospace;
        font-size: 12px;
        line-height: 1.5;
        color: #64718a;
        overflow-wrap: anywhere;
      }

      /* RIGHT — HEADING & DESCRIPTION */

      .ct2-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 19px;
        min-width: 0;
        padding: 0 4px;
      }

      #contact .ct2-title {
        margin: 0;
        max-width: 14ch;
        min-height: 2.2em;

        font-family: 'Space Mono', monospace;
        font-size: clamp(34px, 3.4vw, 54px);
        font-weight: 700;
        line-height: 1.1;
        letter-spacing: -1.8px;
        text-transform: uppercase;

        color: var(--ink, #24324d);
      }

      .ct2-typed {
        white-space: pre-wrap;
      }

      /* TYPING CURSOR */

      .ct2-cursor {
        display: inline-block;
        width: 3px;
        height: .82em;
        margin-left: 5px;
        vertical-align: -0.04em;
        background: currentColor;

        animation:
          ct2-cursor-blink .8s step-end infinite;
      }

      @keyframes ct2-cursor-blink {
        50% {
          opacity: 0;
        }
      }

      .ct2-description {
        max-width: 480px;
        margin: 0;

        font-size: 15px;
        line-height: 1.85;
        color: var(--ink, #24324d);
        opacity: .75;
      }

      .ct2-cta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 14px;

        width: fit-content;
        margin-top: 4px;
        padding: 14px 22px;

        background: #25324d;
        color: #ffffff;
        border: 2px solid #25324d;
        box-shadow: 5px 5px 0 #96a7c6;

        font-family: 'Space Mono', monospace;
        font-size: 13px;
        font-weight: 700;
        text-decoration: none;

        transition:
          transform .2s ease,
          box-shadow .2s ease;
      }

      .ct2-cta:hover,
      .ct2-cta:focus-visible {
        transform: translate(-3px, -3px);
        box-shadow: 8px 8px 0 #96a7c6;
      }

      /* BOTTOM FOOTER */

      .ct2-bottom {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;

        margin-top: 65px;
        padding-top: 20px;

        border-top: 1px solid var(--line, #d7d8d1);

        font-family: 'Space Mono', monospace;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .8px;

        opacity: .55;
      }

      /* DARK MODE */

      body.night .ct2-card {
        background: #26324a;
        color: #f5f5f5;
        border-color: #94a3be;
        box-shadow: 5px 5px 0 #101827;
      }

      body.night .ct2-card-text small {
        color: #ffffff;
      }

      body.night .ct2-card-text span {
        color: #d5dbea;
      }

      /* TABLET */

      @media (max-width: 950px) {
        .ct2-layout {
          grid-template-columns: 1fr;
          gap: 36px;
        }

        .ct2-right {
          order: -1;
          padding: 0;
        }

        #contact .ct2-title {
          font-size: clamp(34px, 6vw, 54px);
          min-height: 0;
        }

        .ct2-left {
          width: 100%;
        }

        .ct2-cards {
          max-width: 650px;
        }

        .ct2-bottom {
          margin-top: 42px;
        }
      }

      /* MOBILE */

      @media (max-width: 560px) {
        #contact.ct2 {
          padding: 70px 18px 45px;
        }

        #contact .ct2-title {
          font-size: clamp(29px, 8.5vw, 42px);
          letter-spacing: -1.3px;
        }

        .ct2-description {
          font-size: 14px;
          line-height: 1.75;
        }

        .ct2-cards {
          grid-template-columns: 1fr;
          gap: 13px;
        }

        .ct2-card {
          min-height: 82px;
        }

        .ct2-card-text span {
          font-size: 13px;
        }

        .ct2-cta {
          width: 100%;
        }

        .ct2-bottom {
          flex-direction: column;
          align-items: flex-start;
        }
      }

      /* ACCESSIBILITY */

      @media (prefers-reduced-motion: reduce) {
        .ct2 *,
        .ct2 *::before,
        .ct2 *::after {
          animation: none !important;
          transition: none !important;
        }
      }
    `;

    document.head.appendChild(style);

    /* CONTACT ICONS */

    const icons = {
      mail: `
        <svg viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="1.8"
             stroke-linecap="round"
             stroke-linejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2"/>
          <path d="m3 7 9 6 9-6"/>
        </svg>
      `,

      whatsapp: `
        <svg viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="1.8"
             stroke-linecap="round"
             stroke-linejoin="round">
          <path d="M20 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4.3A8 8 0 1 1 20 11.5Z"/>
          <path d="M9 8.7c.5 3 2.4 5 5.4 6l1.6-1.5"/>
        </svg>
      `,

      phone: `
        <svg viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="1.8"
             stroke-linecap="round"
             stroke-linejoin="round">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2
                   19.8 19.8 0 0 1-8.6-3.1
                   19.4 19.4 0 0 1-6-6
                   A19.8 19.8 0 0 1 2.1 4.1
                   2 2 0 0 1 4.1 2h3
                   a2 2 0 0 1 2 1.7
                   c.1.9.3 1.8.6 2.6
                   a2 2 0 0 1-.4 2.1L8 9.9
                   a16 16 0 0 0 6.1 6.1l1.5-1.3
                   a2 2 0 0 1 2.1-.4
                   c.8.3 1.7.5 2.6.6
                   A2 2 0 0 1 22 16.9z"/>
        </svg>
      `,

      linkedin: `
        <svg viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="1.8"
             stroke-linecap="round"
             stroke-linejoin="round">
          <rect x="2.5" y="2.5" width="19" height="19" rx="2"/>
          <path d="M7.5 10v7
                   M7.5 7v.2
                   M12 17v-7
                   M12 13a3 3 0 0 1 6 0v4"/>
        </svg>
      `
    };

    /* CONTACT CARD DATA */

    const cards = [
      {
        key: "email",
        label: "EMAIL",
        value: "ayundinin0508@gmail.com",
        href: "mailto:ayundinin0508@gmail.com",
        icon: icons.mail
      },
      {
        key: "whatsapp",
        label: "WHATSAPP",
        value: "+62 822-7100-0702",
        href: "https://wa.me/6282271000702",
        icon: icons.whatsapp
      },
      {
        key: "phone",
        label: "PHONE",
        value: "+62 822-7100-0702",
        href: "tel:+6282271000702",
        icon: icons.phone
      },
      {
        key: "linkedin",
        label: "LINKEDIN",
        value: "Ayundini Nursyahrin",
        href: "https://www.linkedin.com/in/ayundini-nursyahrin/",
        icon: icons.linkedin
      }
    ];

    const cardsHTML = cards.map(card => `
      <a
        class="ct2-card ct2-${card.key}"
        href="${card.href}"
        ${
          card.key === "email" || card.key === "phone"
            ? ""
            : 'target="_blank" rel="noopener noreferrer"'
        }
      >
        <span class="ct2-icon" aria-hidden="true">
          ${card.icon}
        </span>

        <span class="ct2-card-text">
          <small>${card.label}</small>
          <span>${card.value}</span>
        </span>
      </a>
    `).join("");

    /* NEW CONTACT LAYOUT */

    section.innerHTML = `
      <div class="ct2-inner">

        <div class="ct2-layout">

          <!-- LEFT: CONTACT CARDS -->
          <div class="ct2-left">
            <div class="ct2-cards">
              ${cardsHTML}
            </div>
          </div>

          <!-- RIGHT: HEADING AND CTA -->
          <div class="ct2-right">

            <h2
              class="ct2-title"
              aria-label="OPEN FOR WHAT'S NEXT."
            >
              <span class="ct2-typed" aria-hidden="true"></span><span
                class="ct2-cursor"
                aria-hidden="true"
              ></span>
            </h2>

            <p class="ct2-description">
              Open to internship opportunities,
              collaborations, and meaningful new ideas.
              If you have something in mind,
              feel free to reach out.
            </p>

            <a
              class="ct2-cta"
              href="mailto:ayundinin0508@gmail.com"
            >
              SAY HELLO
              <span aria-hidden="true">↗</span>
            </a>

          </div>

        </div>

        
<div class="ct2-bottom">
  <span>© 2026 AYUNDINI NURSYAHRIN</span>
</div>


      </div>
    `;

    /* REPEATABLE TYPING ANIMATION */

    const typed = section.querySelector(".ct2-typed");
    const finalText = "OPEN FOR WHAT'S NEXT.";

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let typingTimer = null;
    let wasVisible = false;

    function stopTyping() {
      if (typingTimer !== null) {
        clearTimeout(typingTimer);
        typingTimer = null;
      }
    }

    function playTyping() {
      stopTyping();

      if (reducedMotion.matches) {
        typed.textContent = finalText;
        return;
      }

      typed.textContent = "";

      let index = 0;

      function typeNextCharacter() {
        index++;

        typed.textContent = finalText.slice(0, index);

        if (index < finalText.length) {
          typingTimer = setTimeout(
            typeNextCharacter,
            65
          );
        } else {
          typingTimer = null;
        }
      }

      typingTimer = setTimeout(
        typeNextCharacter,
        180
      );
    }

    // Replay whenever Contact becomes visible again.
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        entries => {
          const visible = entries[0].isIntersecting;

          if (visible && !wasVisible) {
            wasVisible = true;
            playTyping();
          }

          if (!visible && wasVisible) {
            wasVisible = false;
            stopTyping();
            typed.textContent = finalText;
          }
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -8% 0px"
        }
      );

      observer.observe(section);
    } else {
      playTyping();
    }

    // Also replay when the Contact nav link is clicked.
    const contactNav = document.querySelector(
      '.navlinks a[href="#contact"]'
    );

    if (contactNav) {
      contactNav.addEventListener("click", () => {
        requestAnimationFrame(() => {
          if (wasVisible) {
            playTyping();
          }
        });
      });
    }

    // Make sure text is visible when animation is disabled.
    if (reducedMotion.matches) {
      typed.textContent = finalText;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initContact,
      { once: true }
    );
  } else {
    initContact();
  }
})();
