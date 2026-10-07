// ============================================================
// BEYOND THE EDGE — NAVBAR INTERACTIONS
// ============================================================

(function () {
  "use strict";

  /* ---------- Desktop dropdowns (Products / Partnership) ---------- */
  const dropdowns = document.querySelectorAll(".nav-dropdown");

  function closeAllDropdowns(except) {
    dropdowns.forEach((dd) => {
      if (dd !== except) {
        dd.classList.remove("is-open");
        dd.querySelector(".nav-item-btn").setAttribute("aria-expanded", "false");
      }
    });
  }

  dropdowns.forEach((dd) => {
    const btn = dd.querySelector(".nav-item-btn");
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = dd.classList.contains("is-open");
      closeAllDropdowns(dd);
      dd.classList.toggle("is-open", !isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  document.addEventListener("click", () => closeAllDropdowns());
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllDropdowns();
  });

  /* ---------- Mobile burger menu ---------- */
  const burger = document.getElementById("navBurger");
  const mobileMenu = document.getElementById("mobileMenu");

  burger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  /* ---------- Mobile submenu accordions ---------- */
  document.querySelectorAll(".mobile-group-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const targetId = toggle.getAttribute("data-group");
      const panel = document.getElementById(targetId);
      const isOpen = panel.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  });

  /* Close mobile menu when a link is tapped */
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  /* ---------- Lightweight reveal effects while scrolling ---------- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealSections = document.querySelectorAll("main > section:not(:first-child), footer");
  const revealItems = document.querySelectorAll([
    "main article",
    "main [class$='-card']",
    "main [class*='-card ' ]",
    "main [class$='-step']",
    "main [class*='-step ' ]"
  ].join(","));

  if (!reduceMotion && "IntersectionObserver" in window) {
    revealSections.forEach((element) => element.classList.add("scroll-reveal"));

    revealItems.forEach((element, index) => {
      element.classList.add("scroll-reveal-item");
      element.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -36px"
    });

    [...revealSections, ...revealItems].forEach((element) => revealObserver.observe(element));
  }
})();
