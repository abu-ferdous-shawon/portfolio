// ============================================
// DATA — edit this array to add/remove/update projects
// ============================================
const PROJECTS = [
  {
    name: "BRACU Tutor",
    tag: "web",
    desc: "Online tutoring platform connecting BRAC University students with tutors for course-specific help.",
    link: "https://github.com/abu-ferdous-shawon/BRACU_TUTOR"
  },
  {
    name: "Pet House",
    tag: "web",
    desc: "Web application for pet adoption and management — listings, profiles, and adoption workflow.",
    link: "https://github.com/abu-ferdous-shawon/PET_HOUSE"
  },
  {
    name: "Dental Disease Diagnosis",
    tag: "ml",
    desc: "ML-based diagnostic system that detects dental disease from CBCT (3D scan) images.",
    link: "https://github.com/abu-ferdous-shawon/CSE437/tree/main/Integrating%20CBCT%20imaging%20%26%20Clinical%20Records%20for%20Automated%20Dental%20Disease%20Diagnosis"
  },
  {
    name: "Heart Disease Prediction",
    tag: "ml",
    desc: "Machine learning model for cardiac risk assessment from patient health indicators.",
    link: "https://github.com/abu-ferdous-shawon/cse422-project/blob/main/cse422_project.ipynb"
  },
  {
    name: "Personality Tester",
    tag: "ml",
    desc: "Predicts user personality traits from response patterns using a trained classification model."
  },
  {
    name: "Criminal Case Mystery",
    tag: "ml",
    desc: "Interactive, story-driven application built around branching mystery-solving logic.",
    link: "https://github.com/abu-ferdous-shawon/cse422-project/blob/main/cse422_project.ipynb"
  },
  {
    name: "3D Maze Game",
    tag: "ml",
    desc: "Interactive 3D maze built using OpenGL, with real-time rendering and navigation.",
    link: "https://github.com/abu-ferdous-shawon/CSE423/blob/main/3D%20maze%20solver%20project.py"
  },
  {
    name: "4-bit Adder",
    tag: "hw",
    desc: "Functional 4-bit binary adder circuit built from first-principles digital logic."
  },
  {
    name: "Automated Plant Watering",
    tag: "hw",
    desc: "Sensor-driven system that detects soil temperature and moisture, watering automatically when needed."
  },
  {
    name: "Automated Bird Feeding",
    tag: "hw",
    desc: "Detects food weight and water level in a feeder, dispensing food twice daily and topping up water automatically to keep the bird safe and fed."
  }
];

const TAG_LABEL = { web: "Web App", ml: "ML / Software", hw: "Hardware" };

// ============================================
// RENDER PROJECTS
// ============================================
function renderProjects() {
  const grid = document.getElementById("projectGrid");
  grid.innerHTML = PROJECTS.map((p, i) => `
    <article class="project-card" data-tag="${p.tag}" style="animation-delay:${i * 0.06}s">
      <span class="project-tag">${TAG_LABEL[p.tag]}</span>
      <h3 class="project-name">${p.name}</h3>
      <p class="project-desc">${p.desc}</p>
      ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="project-link">View on GitHub →</a>` : ''}
    </article>
  `).join("");
}
function setupFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = () => document.querySelectorAll(".project-card");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;

      cards().forEach(card => {
        const show = filter === "all" || card.dataset.tag === filter;
        card.hidden = !show;
      });
    });
  });
}

// ============================================
// HOVER TILT — subtle 3D tilt toward cursor on project + ref cards
// ============================================
function setupTilt(selector, maxTilt) {
  document.querySelectorAll(selector).forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (0.5 - y) * maxTilt * 2;
      const tiltY = (x - 0.5) * maxTilt * 2;
      card.style.transform = `translateY(-4px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) rotateX(0) rotateY(0)";
    });
  });
}

// ============================================
// HERO READOUT — typewriter effect
// ============================================
function buildReadoutLines() {
  return [
    `<span class="c">$ query analytics.skills --validate</span>`,
    ``,
    `<span class="k">[core]</span> data analysis &amp; BI`,
    `  tools ............. <span class="v">Power BI, SQL, Excel</span>`,
    `  domain ............ <span class="v">predictive analytics</span>`,
    ``,
    `<span class="k">[proof]</span> thesis: multimodal depression detection`,
    `  fer_ensemble ...... <span class="v">93.13% acc</span>`,
    `  final_model ....... <span class="v">71.81% acc</span>`,
    `  auc_roc ........... <span class="v">0.7722</span>`,
    `  dep_recall ........ <span class="v">0.7529</span>`,
    ``,
    `<span class="c">test fold: 149 videos / 667 filtered</span>`,
    `<span class="c">status: significance confirmed (McNemar's, z-test)</span>`
  ];
}

function typeReadout() {
  const el = document.getElementById("readoutBody");
  if (!el) return;
  const lines = buildReadoutLines();
  let i = 0;

  function nextLine() {
    if (i >= lines.length) return;
    const lineEl = document.createElement("div");
    el.appendChild(lineEl);
    lineEl.innerHTML = lines[i];
    lineEl.style.opacity = 0;
    requestAnimationFrame(() => {
      lineEl.style.transition = "opacity 0.25s ease";
      lineEl.style.opacity = 1;
    });
    i++;
    setTimeout(nextLine, 130);
  }
  nextLine();
}

// ============================================
// NAV: mobile toggle
// ============================================
function setupNav() {
  const toggle = document.getElementById("navToggle");
  const links = document.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    links.classList.toggle("open");
  });

  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => links.classList.remove("open"));
  });
}

// ============================================
// SCROLL REVEAL — IntersectionObserver fade/rise
// ============================================
function setupReveal() {
  const els = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  els.forEach(el => observer.observe(el));
}

// ============================================
// INIT
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  setupFilter();
  setupTilt(".project-card", 6);
  setupTilt(".ref-card", 4);
  typeReadout();
  setupNav();
  setupReveal();
  document.getElementById("year").textContent = new Date().getFullYear();
});