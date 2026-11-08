/* Portfolio content fix — Kandaka as the first native Experience card;
   Phone replaced by GitHub, including the actual icon.
   This file is designed to be loaded AFTER the original site scripts. */
(() => {
  'use strict';

  const GH_URL = 'https://github.com/ayundini586';
  const EXPERIENCE = {
    company: 'Apotek & Klinik Kandaka Abadi',
    role: 'Inventory Data Assistant (Part-Time)',
    date: 'May 2026 – Present',
    description: 'Supported pharmaceutical inventory management through stock monitoring, data updates, and reporting preparation.'
  };

  const clean = element => (element?.textContent || '').replace(/\s+/g, ' ').trim();
  const isSelfEmployed = text => /Self[-– ]Employed/i.test(text) && /Personal Shopper/i.test(text);
  const isOtherExperience = text => /\b(?:Student Support|Freshmen Partner|HIMTI|Smansa|SMATION|Fit Out Cup|Student Council)\b/i.test(text);

  // Choose the outer card wrapper, including its number badge and dashed border.
  // Stop before the parent that contains multiple different Experience cards.
  function findCardWrapper(section) {
    let seed = [...section.querySelectorAll('article, li, [class*="card"], [class*="tile"], [class*="item"]')]
      .filter(el => isSelfEmployed(clean(el)) && !isOtherExperience(clean(el)))
      .sort((a, b) => clean(a).length - clean(b).length)[0];

    if (!seed) {
      const possible = [...section.querySelectorAll('*')]
        .filter(el => !el.children.length && /Self[-– ]Employed/i.test(clean(el)));
      const title = possible[0];
      if (title) {
        for (let el = title.parentElement; el && el !== section; el = el.parentElement) {
          if (isSelfEmployed(clean(el)) && !isOtherExperience(clean(el))) {
            seed = el;
            break;
          }
        }
      }
    }
    if (!seed) return null;

    let wrapper = seed;
    for (let parent = wrapper.parentElement; parent && parent !== section; parent = parent.parentElement) {
      const allText = clean(parent);
      if (!isSelfEmployed(allText) || isOtherExperience(allText) || allText.length > 1200) break;
      // Do not absorb a grid/container holding two or more articles/cards.
      if (parent.querySelectorAll('article').length > 1) break;
      wrapper = parent;
    }
    return wrapper;
  }

  function substituteText(node, before, after) {
    if (node.nodeType === Node.TEXT_NODE && before.test(node.nodeValue)) {
      node.nodeValue = node.nodeValue.replace(before, after);
      return true;
    }
    return false;
  }

  function fillKandaka(wrapper) {
    const walker = document.createTreeWalker(wrapper, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    let titleDone = false, roleDone = false, dateDone = false, descDone = false;
    textNodes.forEach(node => {
      const value = node.nodeValue;
      if (!titleDone && /Self[-– ]Employed/i.test(value)) {
        titleDone = substituteText(node, /Self[-– ]Employed/i, EXPERIENCE.company);
      }
      if (!roleDone && /Personal Shopper/i.test(value)) {
        roleDone = substituteText(node, /Personal Shopper/i, EXPERIENCE.role);
      }
      if (!dateDone && /March\s+2026\s*[-–—]\s*Present/i.test(value)) {
        dateDone = substituteText(node, /March\s+2026\s*[-–—]\s*Present/i, EXPERIENCE.date);
      }
      if (!descDone && /Managed customer orders/i.test(value)) {
        const newValue = value.replace(/Managed customer orders[\s\S]*/i, EXPERIENCE.description);
        node.nodeValue = newValue;
        descDone = true;
      }
    });
    // Fallback for layouts in which descriptions/dates are assembled differently.
    if (!dateDone) {
      const dateEl = [...wrapper.querySelectorAll('time, [class*="date"], [class*="period"]')]
        .find(el => /March\s+2026/i.test(clean(el)));
      if (dateEl) dateEl.textContent = EXPERIENCE.date;
    }
    if (!descDone) {
      const p = [...wrapper.querySelectorAll('p')].find(el => /customer orders|sourcing|payment coordination/i.test(clean(el)));
      if (p) p.textContent = EXPERIENCE.description;
    }

    // Replace any copied ids so there are no duplicate ids in the page.
    wrapper.querySelectorAll('[id]').forEach((el, i) => { el.id = `kandaka-experience-${i + 1}`; });
    if (wrapper.id) wrapper.id = 'kandaka-experience-wrapper';
    wrapper.dataset.kandakaExperience = 'yes';
    wrapper.classList.add('kandaka-native-card');
    wrapper.setAttribute('aria-label', `${EXPERIENCE.company} — ${EXPERIENCE.role}`);
    return wrapper;
  }

  // The site's reveal/scroll animation only observes cards that existed
  // at page initialization. A dynamically cloned card inherits opacity: 0
  // but never receives its visibility class. Make ONLY the new card visible.
  function revealInsertedCard(card) {
    if (!card) return;
    const targets = [card, ...card.querySelectorAll('*')];
    for (const el of targets) {
      if (!(el instanceof HTMLElement)) continue;
      const cl = typeof el.className === 'string' ? el.className : '';
      const isReveal = /(?:^|\s)(?:reveal|fade-in|fade-up|hidden|invisible|aos-init)(?:\s|$)/i.test(cl)
        || el.hasAttribute('data-aos') || el.hasAttribute('data-reveal');
      const style = window.getComputedStyle(el);
      if (el === card || isReveal || style.opacity === '0' || style.visibility === 'hidden') {
        el.style.setProperty('opacity', '1', 'important');
        el.style.setProperty('visibility', 'visible', 'important');
        el.style.setProperty('animation', 'none', 'important');
        if (isReveal || el === card) {
          el.style.setProperty('transform', 'none', 'important');
          el.style.setProperty('clip-path', 'none', 'important');
          el.classList.add('visible', 'is-visible', 'show', 'in-view');
          el.classList.remove('hidden', 'invisible', 'aos-init');
          if (el.hasAttribute('data-aos')) el.classList.add('aos-animate');
        }
      }
    }
  }

  function renumberCards(wrapper) {
    const parent = wrapper.parentElement;
    if (!parent) return;
    const cards = [...parent.children].filter(el => el.nodeType === Node.ELEMENT_NODE);
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT);
      let count = 0;
      while (walker.nextNode()) {
        const node = walker.currentNode;
        const value = node.nodeValue.trim();
        // Number badge should appear early in each card, before title/role.
        if (/^0?[1-9]\d?$/.test(value) && ++count === 1) {
          node.nodeValue = node.nodeValue.replace(value, String(i + 1).padStart(2, '0'));
          break;
        }
      }
    }
  }

  function patchExperience() {
    const section = document.getElementById('experience');
    if (!section) return;

    const oldLarge = [...section.querySelectorAll('.portfolio-kandaka-item, [data-kandaka-experience="true"]')];
    let installed = section.querySelector('.kandaka-native-card');
    if (!installed) {
      const original = findCardWrapper(section);
      if (original && original.parentElement) {
        installed = fillKandaka(original.cloneNode(true));
        original.before(installed);
      }
    }

    // Remove the previous oversized standalone Kandaka card, if it exists.
    if (installed) {
      oldLarge.forEach(item => { if (item !== installed) item.remove(); });
      const original = findCardWrapper(section);
      if (original && installed.parentElement === original.parentElement && installed.nextElementSibling !== original) {
        original.before(installed);
      }
      renumberCards(installed);
      revealInsertedCard(installed);
      // Repeat after layout/transition initialization, if the site's own
      // animation code touches freshly added nodes in a later frame.
      requestAnimationFrame(() => revealInsertedCard(installed));
    }
  }

  function leafElement(container, exact) {
    return [...container.querySelectorAll('*')].find(el => el.children.length === 0 && exact.test(clean(el)));
  }

  function findPhoneCard(section) {
    // Usually a complete contact tile is an anchor. If not, find its outer div.
    const phoneAnchor = [...section.querySelectorAll('a')].find(el => {
      const href = el.getAttribute('href') || '';
      return /^tel:/i.test(href) || /\bPHONE\b/.test(clean(el));
    });
    if (phoneAnchor) return phoneAnchor;

    const text = leafElement(section, /^PHONE$/i);
    if (!text) return null;
    let card = text;
    for (let p = card.parentElement; p && p !== section; p = p.parentElement) {
      if (/\b(?:EMAIL|WHATSAPP|LINKEDIN)\b/i.test(clean(p))) break;
      card = p;
      if (/\+62|0822|7100|0702/.test(clean(card)) && /PHONE/i.test(clean(card))) break;
    }
    return card;
  }

  function addGithubMark(card) {
    const markUrl = 'assets/skill-icons/github.svg';
    if (card.querySelector('img[data-github-contact-mark]')) return;
    const image = document.createElement('img');
    image.src = markUrl;
    image.alt = '';
    image.setAttribute('aria-hidden', 'true');
    image.setAttribute('data-github-contact-mark', 'true');
    image.className = 'portfolio-github-icon';
    image.width = 28;
    image.height = 28;

    const iconSlot = [...card.querySelectorAll('[class]')]
      .find(el => /\b(?:spc-contact-icon|contact-icon|contact-card-icon|ct-icon|icon-box|icon-wrap)\b/i.test(String(el.className || '')))
      || [...card.querySelectorAll('[class]')].find(el => /\bicon\b/i.test(String(el.className || '')) && el !== card);
    if (iconSlot) {
      iconSlot.replaceChildren(image);
      return;
    }
    const oldIcon = card.querySelector('svg');
    if (oldIcon) {
      oldIcon.replaceWith(image);
      return;
    }
    // Previous broken patch inserted the text 'GitHub' into the icon box.
    const textIcon = [...card.querySelectorAll('*')]
      .find(el => !el.children.length && /^(?:GH|GitHub)$/i.test(clean(el)) && !/github\.com/i.test(clean(el)));
    if (textIcon) {
      textIcon.replaceWith(image);
      return;
    }
    // No icon found; do not add a fifth card or change other contact tiles.
  }

  function patchContact() {
    const section = document.getElementById('contact');
    if (!section) return;

    let target = findPhoneCard(section);
    const existing = [...section.querySelectorAll('a')].find(a => /github\.com\/ayundini586/i.test(a.getAttribute('href') || ''));
    if (existing && target && existing !== target) {
      target.remove();
      target = existing;
    } else if (!target) target = existing;
    if (!target) return;

    // Convert Phone card's displayed label and number, not only its icon.
    const labels = [...target.querySelectorAll('*')].filter(el => !el.children.length);
    for (const el of labels) {
      const value = clean(el);
      if (/^PHONE$/i.test(value)) el.textContent = 'GITHUB';
      else if (/^\+?62[\d\s\-()]+$/.test(value) || /^0?822[\d\s\-()]+$/.test(value)) {
        el.textContent = 'ayundini586';
      }
    }
    if (/^tel:/i.test(target.getAttribute('href') || '')) {
      target.href = GH_URL;
    }
    if (target.matches('a')) {
      target.href = GH_URL;
      target.target = '_blank';
      target.rel = 'noopener noreferrer';
      target.setAttribute('aria-label', 'Buka GitHub Ayundini Nursyahrin');
    }
    addGithubMark(target);
  }

  let observer;
  let pending = false;
  const patch = () => {
    // Avoid observer reacting to DOM mutations caused by our own patch.
    observer?.disconnect();
    try {
      patchExperience();
      patchContact();
    } catch (err) {
      console.error('[Portfolio Update] Failed to apply patch:', err);
    }
    observer?.observe(document.body, { childList: true, subtree: true });
  };
  const schedule = () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { pending = false; patch(); });
  };
  const init = () => {
    if (!document.body) return;
    observer = new MutationObserver(schedule);
    patch();
    window.addEventListener('load', schedule, { once: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
