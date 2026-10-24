/**
 * A real, directional, continuous data lifecycle.
 * The connector SVG is re-calculated from card bounds on every resize, so
 * arrows and the moving pixel stay attached even when the layout changes.
 */
(() => {
  'use strict';

  const steps = [
    { id: 1, title: 'RAW DATA', theme: 'red', html: '<div class="flow-step__lines"><i></i><i></i><i></i></div>' },
    { id: 2, title: 'ETL', theme: 'yellow', html: '<div class="flow-step__checks"><span>✓ EXTRACT</span><span>✓ TRANSFORM</span><span>✓ LOAD</span></div>' },
    
{ id: 3, title: 'DATA WAREHOUSE', theme: 'teal', html: `
  <svg class="flow-warehouse-icon" viewBox="0 0 180 110" aria-hidden="true">
    <g stroke="#243448" stroke-width="2" stroke-linejoin="round">
      <path d="M38 68 V82 C38 100 142 100 142 82 V68"
            fill="#80afa6"/>
      <ellipse cx="90" cy="68" rx="52" ry="12"
               fill="#a7d5cc"/>

      <path d="M38 45 V59 C38 77 142 77 142 59 V45"
            fill="#80afa6"/>
      <ellipse cx="90" cy="45" rx="52" ry="12"
               fill="#a7d5cc"/>

      <path d="M38 22 V36 C38 54 142 54 142 36 V22"
            fill="#80afa6"/>
      <ellipse cx="90" cy="22" rx="52" ry="12"
               fill="#bce5dc"/>
    </g>
  </svg>
` },

    { id: 4, title: 'QUERY', theme: 'dark', html: '<div class="flow-query-code"><span>SELECT</span> insights<br><span>FROM</span> warehouse;</div>' },
    { id: 5, title: 'INSIGHT', theme: 'blue', html: '<div class="flow-bars"><i></i><i></i><i></i></div>' },
    { id: 6, title: 'NEW QUESTION', theme: 'purple', html: '<div class="flow-step__desc">What should we<br>investigate next?</div>' },
    { id: 7, title: 'NEW DATA', theme: 'red', html: '<div class="flow-step__desc">Gather new records<br>and begin again.</div>' },
  ];
  const svgNS = 'http://www.w3.org/2000/svg';
  const createSvg = (tag, attributes = {}) => {
    const element = document.createElementNS(svgNS, tag);
    Object.entries(attributes).forEach(([k, v]) => element.setAttribute(k, String(v)));
    return element;
  };
  const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EDGE_MS = 1500;
  const HOLD_MS = 500;
  const TOTAL_MS = steps.length * EDGE_MS + HOLD_MS;

  class FlowScene {
    constructor(stage, status) {
      this.stage = stage;
      this.status = status;
      this.wide = stage.classList.contains('flow-stage-wide');
      this.playing = false;
      this.elapsed = 0;
      this.raf = null;
      this.routes = [];
      this.lastActiveIndex = -1;
      this.arrowID = `arrow-${stage.id}`;
      this.render();
      this.resizeObserver = new ResizeObserver(() => this.rebuild());
      this.resizeObserver.observe(stage);
    }
    render() {
      this.svg = createSvg('svg', { class: 'flow-svg', 'aria-hidden': 'true' });
      const defs = createSvg('defs');
      const marker = createSvg('marker', { id: this.arrowID, markerWidth: '9', markerHeight: '9', refX: '7', refY: '4.5', orient: 'auto', markerUnits: 'userSpaceOnUse' });
      marker.appendChild(createSvg('path', { d: 'M 0 0 L 8 4.5 L 0 9 Z', class: 'flow-route-arrow' }));
      defs.appendChild(marker);
      this.svg.appendChild(defs);
      this.stage.appendChild(this.svg);
      this.cards = steps.map((step) => {
        const card = document.createElement('div');
        card.className = `flow-step flow-step--${step.theme}`;
        card.dataset.step = step.id;
        card.innerHTML = `<div class="flow-step__title">${String(step.id).padStart(2, '0')} / ${step.title}</div>${step.html}`;
        this.stage.appendChild(card);
        return card;
      });
      this.particle = createSvg('rect', { class: 'flow-particle', width: '10', height: '10', rx: '1.2', 'aria-hidden': 'true' });
      this.svg.appendChild(this.particle);
      // Routes are constructed after layout is calculated (including font loading).
      requestAnimationFrame(() => this.rebuild());
    }
    box(index) {
      const el = this.cards[index];
      return { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight };
    }
    routeD(index) {
      const a = this.box(index);
      const b = this.box((index + 1) % steps.length);
      const acx = a.x + a.w / 2;
      const acy = a.y + a.h / 2;
      const bcx = b.x + b.w / 2;
      const bcy = b.y + b.h / 2;
      const space = 9;
      const desktop = window.matchMedia('(min-width: 621px)').matches;

      // APPROVED COMPOSITION (both hero and expanded diagram):
      // 01 -> 02 -> 03        (top row, left-to-right)
      // 07             04    (middle row)
      //       06   <-   05   (bottom row)
      // 04→05: DOWN, then LEFT; 06→07: LEFT, then UP.
      // Connectors finish outside cards, rather than cutting through their text.
      if (desktop) {
        switch (index) {
          case 0: // RAW DATA → ETL
          case 1: // ETL → DATA WAREHOUSE
            return `M${a.x + a.w + 2},${acy} H${b.x - space}`;
          case 2: // WAREHOUSE → QUERY
            return `M${acx},${a.y + a.h + 2} V${b.y - space}`;
          case 3: // QUERY → INSIGHT: vertical down, precise right-angle turn left
            return `M${acx},${a.y + a.h + 2} V${bcy} H${b.x + b.w + space}`;
          case 4: // INSIGHT → NEW QUESTION: straight left
            return `M${a.x - 2},${acy} H${b.x + b.w + space}`;
          case 5: // NEW QUESTION → NEW DATA: left, precise right-angle turn up
            return `M${a.x - 2},${acy} H${bcx} V${b.y + b.h + space}`;
          case 6: // NEW DATA → RAW DATA: straight up
            return `M${acx},${a.y - 2} V${b.y + b.h + space}`;
        }
      }

      // Two-column responsive layout, without curved or overlapping arrows.
      if (index === 0) return `M${a.x + a.w + 2},${acy} H${b.x - space}`;
      if ([1, 2].includes(index)) return `M${acx},${a.y + a.h + 2} V${b.y - space}`;
      if (index === 3) {
        const corridorY = (a.y + a.h + b.y) / 2;
        return `M${acx},${a.y + a.h + 2} V${corridorY} H${bcx} V${b.y - space}`;
      }
      // 05→06→07→01 rise through the left column.
      return `M${acx},${a.y - 2} V${b.y + b.h + space}`;
    }
    rebuild() {
      if (!this.stage.clientWidth || !this.stage.clientHeight) return;
      this.svg.setAttribute('viewBox', `0 0 ${this.stage.clientWidth} ${this.stage.clientHeight}`);
      this.routes.forEach((route) => {
        route.line.remove();
        route.progress.remove();
      });
      this.routes = [];
      for (let i = 0; i < steps.length; i++) {
        const d = this.routeD(i);
        const line = createSvg('path', { class: 'flow-route', d, 'marker-end': `url(#${this.arrowID})` });
        const progress = createSvg('path', { class: 'flow-route-progress', d });
        progress.style.opacity = '0';
        this.svg.insertBefore(line, this.particle);
        this.svg.insertBefore(progress, this.particle);
        this.routes.push({ line, progress, length: Math.max(1, line.getTotalLength()) });
      }
      this.paint();
    }
    paint() {
      if (!this.routes.length) return;
      const t = ((this.elapsed % TOTAL_MS) + TOTAL_MS) % TOTAL_MS;
      const atHold = t >= steps.length * EDGE_MS;
      const active = atHold ? steps.length - 1 : Math.min(steps.length - 1, Math.max(0, Math.floor(t / EDGE_MS)));
      const progressFraction = atHold ? 1 : (t % EDGE_MS) / EDGE_MS;
      if (active !== this.lastActiveIndex) {
        this.cards.forEach((el, j) => {
          el.classList.toggle('is-active', j === active);
          el.classList.toggle('is-visited', j < active);
        });
        this.lastActiveIndex = active;
        if (this.status) {
          const from = steps[active];
          const to = steps[(active + 1) % steps.length];
          this.status.textContent = `${String(from.id).padStart(2, '0')} → ${String(to.id).padStart(2, '0')} · ${from.title} → ${to.title}`;
        }
      }
      this.routes.forEach((route, j) => {
        const highlighted = j === active;
        route.progress.style.opacity = highlighted && !motionReduced ? '1' : '0';
        if (highlighted && !motionReduced) {
          route.progress.style.strokeDasharray = `${route.length} ${route.length + 2}`;
          route.progress.style.strokeDashoffset = String(route.length * (1 - progressFraction));
        }
      });
      if (!motionReduced) {
        const route = this.routes[active];
        const point = route.line.getPointAtLength(route.length * progressFraction);
        this.particle.setAttribute('x', (point.x - 5).toFixed(2));
        this.particle.setAttribute('y', (point.y - 5).toFixed(2));
        this.particle.style.opacity = atHold ? '0' : '1';
      } else {
        this.particle.style.opacity = '0';
        this.cards.forEach((card) => card.classList.remove('is-active'));
      }
    }
    tick = (now) => {
      if (!this.playing) return;
      this.elapsed = Math.max(0, now - this.startedAt) % TOTAL_MS;
      this.paint();
      this.raf = requestAnimationFrame(this.tick);
    };
    play() {
      if (motionReduced || this.playing) return;
      this.playing = true;
      this.startedAt = performance.now() - this.elapsed;
      this.raf = requestAnimationFrame(this.tick);
    }
    pause() {
      if (!this.playing) return;
      this.playing = false;
      cancelAnimationFrame(this.raf);
    }
    restart() {
      this.elapsed = 0;
      this.lastActiveIndex = -1;
      this.paint();
      if (this.playing) this.startedAt = performance.now();
    }
  }

  const compact = new FlowScene(document.getElementById('flowCompact'), document.getElementById('flowStatus'));
  const expanded = new FlowScene(document.getElementById('flowExpanded'), null);
  const dialog = document.getElementById('flowDialog');
  const compactButton = document.getElementById('flowPause');
  const modalButton = document.getElementById('flowModalPause');
  let userPaused = motionReduced;
  let modalPaused = motionReduced;
  let inView = true;

  const updateButton = (button, stopped) => {
    if (motionReduced) {
      button.textContent = 'MOTION OFF';
      button.setAttribute('aria-label', 'Animation disabled by reduced motion preference');
      button.disabled = true;
      return;
    }
    button.textContent = stopped ? '▶ PLAY' : 'Ⅱ PAUSE';
    button.setAttribute('aria-label', stopped ? 'Play data flow animation' : 'Pause data flow animation');
  };
  const updateCompact = () => {
    if (!dialog.open && inView && !userPaused) compact.play();
    else compact.pause();
    updateButton(compactButton, userPaused || motionReduced);
  };
  compactButton.addEventListener('click', () => { userPaused = !userPaused; updateCompact(); });
  document.getElementById('flowExpand').addEventListener('click', () => {
    compact.pause();
    dialog.showModal();
    modalPaused = motionReduced;
    expanded.restart();
    requestAnimationFrame(() => {
      expanded.rebuild();
      if (!modalPaused) expanded.play();
      updateButton(modalButton, modalPaused);
    });
  });
  const closeDialog = () => dialog.close();
  document.getElementById('flowClose').addEventListener('click', closeDialog);
  dialog.addEventListener('click', (event) => { if (event.target === dialog) closeDialog(); });
  dialog.addEventListener('close', () => { expanded.pause(); updateCompact(); });
  document.getElementById('flowReplay').addEventListener('click', () => expanded.restart());
  modalButton.addEventListener('click', () => {
    modalPaused = !modalPaused;
    if (modalPaused) expanded.pause(); else expanded.play();
    updateButton(modalButton, modalPaused);
  });
  const observer = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    updateCompact();
  }, { threshold: 0.06 });
  observer.observe(document.getElementById('flowCompact'));
  window.addEventListener('resize', () => {compact.rebuild();if(dialog.open)expanded.rebuild();}, { passive:true });
  document.fonts?.ready.then(() => {compact.rebuild();if(dialog.open)expanded.rebuild();});
  updateCompact();
})();
