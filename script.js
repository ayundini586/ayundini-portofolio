/* NAVBAR */
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("[data-nav-menu]");

const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 20);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuToggle?.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  navMenu?.classList.toggle("open", !open);
  document.body.style.overflow = open ? "" : "hidden";
});

navMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    navMenu.classList.remove("open");
    document.body.style.overflow = "";
  });
});

document.querySelectorAll('[aria-disabled="true"]').forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});

/* PROJECTS */
const projects = Array.isArray(window.portfolioProjects) ? window.portfolioProjects : [];
const featuredProject = projects.find((project) => project.featured);
const projectGrid = document.querySelector("#project-grid");
const featuredContainer = document.querySelector("#featured-project");

const escapeHTML = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
}[character]));

const renderProjectLink = (project) => {
  const href = project.demo || project.repository;
  const label = project.demo ? (project.demoLabel || "Open live website") : "View repository";
  return `<a class="project-source-link" href="${escapeHTML(href)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)} <span aria-hidden="true">↗</span></a>`;
};

const renderDetailButton = (project) => `
  <button class="project-detail-button" type="button" data-project-preview="${escapeHTML(project.slug)}">View project details <span aria-hidden="true">↗</span></button>`;

if (featuredProject && featuredContainer) {
  featuredContainer.innerHTML = `
    <article class="featured-project reveal">
      <div class="featured-copy">
        <div class="project-kicker"><span>Featured / 01</span><span>${escapeHTML(featuredProject.type)}</span></div>
        <h3 class="project-title">${escapeHTML(featuredProject.title)}</h3>
        <p class="project-description">${escapeHTML(featuredProject.description)}</p>
        <div class="project-actions">${renderDetailButton(featuredProject)}${renderProjectLink(featuredProject)}</div>
      </div>
      <div class="featured-visual">
        <div class="featured-image-wrap">
          <img src="${escapeHTML(featuredProject.image)}" alt="${escapeHTML(featuredProject.imageAlt)}" loading="lazy" width="1425" height="800" />
        </div>
      </div>
    </article>`;
}

if (projectGrid) {
  projectGrid.innerHTML = projects.filter((project) => !project.featured).map((project, index) => `
    <article class="project-card reveal" data-theme="${escapeHTML(project.theme)}">
      <div class="project-media">
        <img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.imageAlt)}" loading="lazy" width="1600" height="900" />
      </div>
      <div class="project-card-body">
        <div class="project-kicker"><span>0${index + 2}</span><span>${escapeHTML(project.type)}</span></div>
        <h3 class="project-title">${escapeHTML(project.title)}</h3>
        <p class="project-description">${escapeHTML(project.description)}</p>
        <div class="project-actions">${renderDetailButton(project)}${renderProjectLink(project)}</div>
      </div>
    </article>`).join("");
}

const projectDialog = document.querySelector("#project-dialog");
const projectDialogContent = document.querySelector("#project-dialog-content");

const openProjectPreview = (slug) => {
  const project = projects.find((item) => item.slug === slug);
  if (!project || !projectDialog || !projectDialogContent) return;

  projectDialogContent.innerHTML = `
    <button class="project-dialog-close" type="button" data-project-dialog-close aria-label="Close project preview">×</button>
    <div class="project-dialog-image"><img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.imageAlt)}" /></div>
    <div class="project-dialog-copy">
      <p class="project-dialog-category">${escapeHTML(project.category)}</p>
      <h2 id="project-dialog-title">${escapeHTML(project.title)}</h2>
      <p>${escapeHTML(project.description)}</p>
      <div class="project-dialog-details">
        <p><strong>My contribution</strong>${escapeHTML(project.contribution)}</p>
        <p><strong>Tools used</strong>${project.technologies.map(escapeHTML).join(" · ")}</p>
      </div>
      <div class="project-dialog-actions"><a class="project-live-link" href="${escapeHTML(project.demo || project.repository)}" target="_blank" rel="noopener noreferrer">${escapeHTML(project.demo ? (project.demoLabel || "Open live website") : "View repository")} <span aria-hidden="true">↗</span></a></div>
    </div>`;
  projectDialog.showModal();
};

document.addEventListener("click", (event) => {
  const previewButton = event.target.closest("[data-project-preview]");
  if (previewButton) openProjectPreview(previewButton.dataset.projectPreview);
  if (event.target.closest("[data-project-dialog-close]")) projectDialog?.close();
});

projectDialog?.addEventListener("click", (event) => {
  if (event.target === projectDialog) projectDialog.close();
});

/* HERO */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && window.gsap) {
  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
  intro
    .from(".eyebrow", { y: 18, opacity: 0, duration: 0.5 })
    .from(".hero-title .word", { yPercent: 115, opacity: 0, duration: 0.78, stagger: 0.09 }, "-=0.28")
    .from(".hero-intro", { y: 18, opacity: 0, duration: 0.5 }, "-=0.45")
    .from(".hero-actions", { y: 16, opacity: 0, duration: 0.45 }, "-=0.3")
    .from(".availability", { y: 12, opacity: 0, duration: 0.4 }, "-=0.25")
    .from(".data-stage", { scale: 0.94, x: 24, opacity: 0, duration: 0.8 }, 0.18)
    .from(".data-node, .warehouse", { scale: 0.7, opacity: 0, duration: 0.45, stagger: 0.08 }, 0.55)
    .from(".connection-path", { strokeDashoffset: 70, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.5)
    .from(".blob", { scale: 0.8, opacity: 0, duration: 1 }, 0);

  gsap.to(".blob-blue", { x: 18, y: -12, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".blob-lavender", { x: 14, y: -8, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });
  gsap.to(".orbit-one", { rotate: 360, duration: 26, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
  gsap.to(".orbit-two", { rotate: -360, duration: 34, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
  gsap.to(".connection-path", { strokeDashoffset: -26, duration: 3.2, repeat: -1, ease: "none", stagger: 0.3 });

  /* SCROLL REVEALS */
  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".reveal").forEach((element) => {
      gsap.from(element, {
        y: 28,
        opacity: 0,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 84%", once: true }
      });
    });

    gsap.fromTo(".about-glow-blue", { x: 0, y: 0 }, {
      x: -35,
      y: 18,
      ease: "none",
      scrollTrigger: { trigger: ".about-section", start: "top bottom", end: "bottom top", scrub: 1.1 }
    });
  }
}

/* DATABASE VISUAL */
const dataStage = document.querySelector("[data-data-stage]");
const depthItems = dataStage?.querySelectorAll("[data-depth]") ?? [];

if (!reduceMotion && dataStage && window.matchMedia("(pointer: fine)").matches) {
  dataStage.addEventListener("pointermove", (event) => {
    const bounds = dataStage.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    depthItems.forEach((item) => {
      const depth = Number(item.dataset.depth || 10);
      item.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
    });
  });

  dataStage.addEventListener("pointerleave", () => {
    depthItems.forEach((item) => { item.style.transform = "translate3d(0, 0, 0)"; });
  });
}
