/* GPROKEG EUROPE — Main Application Script */

(function () {
  "use strict";

  /* ============================================
     THEME TOGGLE
     ============================================ */
  var toggle = document.querySelector("[data-theme-toggle]");
  var root = document.documentElement;
  var theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  root.setAttribute("data-theme", theme);
  updateToggleIcon();

  if (toggle) {
    toggle.addEventListener("click", function () {
      theme = theme === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", theme);
      toggle.setAttribute(
        "aria-label",
        "Switch to " + (theme === "dark" ? "light" : "dark") + " mode"
      );
      updateToggleIcon();
    });
  }

  function updateToggleIcon() {
    if (!toggle) return;
    toggle.innerHTML =
      theme === "dark"
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  /* ============================================
     HEADER SCROLL STATE
     ============================================ */
  var header = document.getElementById("header");
  var scrolled = false;

  function onScroll() {
    var isScrolled = window.scrollY > 10;
    if (isScrolled !== scrolled) {
      scrolled = isScrolled;
      if (scrolled) {
        header.classList.add("header--scrolled");
      } else {
        header.classList.remove("header--scrolled");
      }
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ============================================
     MOBILE NAVIGATION
     ============================================ */
  var mobileNav = document.getElementById("mobile-nav");
  var openBtn = document.querySelector("[data-mobile-menu-open]");
  var closeBtn = document.querySelector("[data-mobile-menu-close]");
  var mobileLinks = document.querySelectorAll("[data-mobile-nav-link]");

  function openMobileNav() {
    mobileNav.classList.add("is-open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeMobileNav() {
    mobileNav.classList.remove("is-open");
    document.body.style.overflow = "";
    openBtn.focus();
  }

  if (openBtn) {
    openBtn.addEventListener("click", openMobileNav);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeMobileNav);
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      closeMobileNav();
    });
  });

  /* Close on Escape */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mobileNav.classList.contains("is-open")) {
      closeMobileNav();
    }
  });

  /* ============================================
     FAQ ACCORDION
     ============================================ */
  var faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    var questionBtn = item.querySelector(".faq-item__question");
    var answer = item.querySelector(".faq-item__answer");

    questionBtn.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");

      /* Close all other items */
      faqItems.forEach(function (otherItem) {
        if (otherItem !== item && otherItem.classList.contains("is-open")) {
          otherItem.classList.remove("is-open");
          var otherAnswer = otherItem.querySelector(".faq-item__answer");
          otherAnswer.style.maxHeight = "0";
          otherItem
            .querySelector(".faq-item__question")
            .setAttribute("aria-expanded", "false");
        }
      });

      if (isOpen) {
        item.classList.remove("is-open");
        answer.style.maxHeight = "0";
        questionBtn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("is-open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        questionBtn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ============================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ============================================ */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href");
      if (targetId === "#") return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ============================================
     ACTIVE NAV HIGHLIGHT ON SCROLL
     ============================================ */
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".header__nav a");

  function highlightNav() {
    var scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.style.color = "";
          if (
            link.getAttribute("href") === "#" + sectionId ||
            (sectionId === "home" && link.getAttribute("href") === "#home") ||
            (sectionId === "benefits" && link.getAttribute("href") === "#home")
          ) {
            link.style.color = "var(--color-primary)";
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNav, { passive: true });
  highlightNav();
})();
