
/* ===== THEME ===== */

const body = document.body;
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  body.classList.toggle("night");

  const night = body.classList.contains("night");

  document.documentElement.style.setProperty(
    "--paper", night ? "#0e1520" : "#f1eee6"
  );
  document.documentElement.style.setProperty(
    "--panel", night ? "#151e2b" : "#fbfaf6"
  );
  document.documentElement.style.setProperty(
    "--ink", night ? "#f7f6f0" : "#101827"
  );
  document.documentElement.style.setProperty(
    "--line", night ? "#2d3949" : "#d9d5ca"
  );

  themeBtn.textContent = night ? "☾" : "☼";
  themeBtn.setAttribute(
    "aria-label",
    night ? "Switch to light mode" : "Switch to dark mode"
  );
});


/* ===== ACTIVE NAVIGATION ===== */

const navLinks = [
  ...document.querySelectorAll('.navlinks a[href^="#"]')
];

const sections = navLinks
  .map(link => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateActiveNav() {
  const marker = window.scrollY + 140;
  let current = sections[0];

  sections.forEach(section => {
    if (section.offsetTop <= marker) current = section;
  });

  if (!current) return;

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current.id}`
    );
  });
}

window.addEventListener("scroll", updateActiveNav, {
  passive: true
});

updateActiveNav();


/* ===== BLOCK BLAST PHOTO REVEAL ===== */

(() => {
  const about = document.getElementById("about");
  const frame = document.getElementById("photoReveal");
  const overlay = document.getElementById("tetrominoBuild");
  const photo = frame?.querySelector(".about-photo-img");

  if (!about || !frame || !overlay || !photo) return;

  const COLORS = [
    "#E28B82",
    "#E8D37A",
    "#95B2DE",
    "#9FCBBD",
    "#AD98D8"
  ];

  const pieces = [];

  // Dua bentuk L saling mengunci dalam area 4x2
  function addLPair(x, y) {
    pieces.push(
      [
        [x, y], [x + 1, y],
        [x + 2, y], [x, y + 1]
      ],
      [
        [x + 3, y], [x + 1, y + 1],
        [x + 2, y + 1], [x + 3, y + 1]
      ]
    );
  }

  // Dua bentuk I mengisi area 4x2
  function addIPair(x, y) {
    pieces.push(
      [
        [x, y], [x + 1, y],
        [x + 2, y], [x + 3, y]
      ],
      [
        [x, y + 1], [x + 1, y + 1],
        [x + 2, y + 1], [x + 3, y + 1]
      ]
    );
  }

  // Empat bentuk T saling mengunci dalam area 4x4
  function addTGroup(x) {
    pieces.push(
      [
        [x, 0], [x + 1, 0],
        [x + 2, 0], [x + 1, 1]
      ],
      [
        [x + 3, 0], [x + 2, 1],
        [x + 3, 1], [x + 3, 2]
      ],
      [
        [x, 1], [x, 2],
        [x + 1, 2], [x, 3]
      ],
      [
        [x + 2, 2], [x + 1, 3],
        [x + 2, 3], [x + 3, 3]
      ]
    );
  }

  // Susunan bawah dulu, seperti permainan Tetris
  addLPair(0, 8);
  addIPair(4, 8);

  addIPair(0, 6);
  addLPair(4, 6);

  addLPair(0, 4);
  addIPair(4, 4);

  addTGroup(0);
  addTGroup(4);

  // 20 tetromino, 80 kotak, tanpa celah
  
/* URUTAN TETRIS: L -> T -> I */

function getPieceType(cells) {
  const xs = cells.map(([x]) => x);
  const ys = cells.map(([, y]) => y);

  // Bentuk I: empat kotak lurus
  if (
    Math.max(...xs) - Math.min(...xs) === 3 ||
    Math.max(...ys) - Math.min(...ys) === 3
  ) {
    return "I";
  }

  // Bentuk T: tiga kotak sejajar, satu di tengah
  const row = [...new Set(ys)].find(y =>
    cells.filter(cell => cell[1] === y).length === 3
  );

  if (row !== undefined) {
    const trio = cells
      .filter(cell => cell[1] === row)
      .map(cell => cell[0])
      .sort((a, b) => a - b);

    const stem = cells.find(cell => cell[1] !== row);

    if (stem && stem[0] === trio[1]) {
      return "T";
    }
  }

  return "L";
}

const DROP_MS = 460;

// L muncul terlebih dahulu, baru T, lalu I
const phaseStart = {
  L: 0,
  T: 460,
  I: 820
};

const withinPhase = { L: 0, T: 0, I: 0 };

const timeline = ["L", "T", "I"].flatMap(type =>
  pieces
    .filter(cells => getPieceType(cells) === type)
    .map(cells => ({
      cells,
      delay: phaseStart[type] +
        (withinPhase[type]++) * 28
    }))
);

const REVEAL_MS =
  Math.max(...timeline.map(piece => piece.delay)) +
  DROP_MS;


  let timers = [];
  let wasVisible = false;

  function play() {
    if (!photo.complete || !photo.naturalWidth) return;

    timers.forEach(clearTimeout);
    timers = [];

    frame.classList.remove("revealed", "clearing");
    overlay.replaceChildren();

    timeline.forEach(({ cells, delay }, index) => {
      const piece = document.createElement("div");
      piece.className = "blast-piece";

      piece.style.setProperty("--delay", `${delay}ms`);

      piece.style.setProperty(
        "--piece-color",
        COLORS[index % COLORS.length]
      );

      cells.forEach(([x, y]) => {
        const cell = document.createElement("span");
        cell.className = "blast-cell";

        cell.style.left = `${x * 12.5}%`;
        cell.style.top = `${y * 10}%`;

        piece.appendChild(cell);
      });

      overlay.appendChild(piece);
    });

    // Semua blok sudah rapat: langsung reveal foto
    timers.push(setTimeout(() => {
      frame.classList.add("revealed", "clearing");
    }, REVEAL_MS));

    
/* Bersihkan blok setelah crossfade selesai */
timers.push(setTimeout(() => {
  overlay.replaceChildren();
  frame.classList.remove("clearing");
}, REVEAL_MS + 700));

  }

  function start() {
    if (photo.complete && photo.naturalWidth) {
      play();
    } else if (!photo.complete) {
      photo.addEventListener("load", play, { once: true });
    }
  }

  if (window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches) {
    frame.classList.add("revealed");
    return;
  }

  // Otomatis saat About terlihat
  const observer = new IntersectionObserver(([entry]) => {
    const visible =
      entry.isIntersecting &&
      entry.intersectionRatio >= 0.3;

    if (visible && !wasVisible) {
      wasVisible = true;
      start();
    }

    
if (!visible) {
  wasVisible = false;

  // Siapkan frame untuk kunjungan About berikutnya
  timers.forEach(clearTimeout);
  timers = [];

  frame.classList.remove("revealed", "clearing");
  overlay.replaceChildren();
}

  }, {
    threshold: [0, 0.3, 0.55]
  });

  observer.observe(about);

  // Klik About lagi saat sudah di About = replay
  document.querySelectorAll('a[href="#about"]').forEach(link => {
    link.addEventListener("click", () => {
      if (wasVisible) start();
    });
  });
})();
