/**
 * Main JavaScript: Site-wide UI behaviors and interactions (plain JS, no frameworks).
 */

/* Form Submission Script: Handles contact form submission via API */
document
  .getElementById("contact-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        alert(
          "Thank you! Your quote request has been sent successfully. We will respond within 24 hours.",
        );
        this.reset();
      } else {
        alert(
          "Sorry, there was an error sending your request. Please try again or contact us directly.",
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Sorry, there was an error sending your request. Please try again or contact us directly.",
      );
    }
  });

(function () {
  "use strict";

  // Configuration constants for header behavior
  var SCROLL_THRESHOLD_PX = 10; // Scroll distance before header changes
  var HEADER_SCROLLED_CLASSES = ["shadow-sm", "bg-white/90"]; // Classes added when scrolled

  // Initialize sticky header behavior with scroll-based styling changes
  function initStickyHeader() {
    var header = document.getElementById("site-header");
    if (!header) return;

    // Sync header shadow and background based on scroll position
    function syncShadow() {
      var pastThreshold = window.scrollY > SCROLL_THRESHOLD_PX;
      HEADER_SCROLLED_CLASSES.forEach(function (cls) {
        header.classList.toggle(cls, pastThreshold);
      });
    }

    window.addEventListener("scroll", syncShadow, { passive: true });
    syncShadow();
  }

  // Initialize mobile navigation toggle functionality
  function initMobileNav() {
    var toggle = document.getElementById("nav-toggle");
    var panel = document.getElementById("mobile-nav");
    if (!toggle || !panel) return;

    var openIcon = toggle.querySelector(".open-icon");
    var closeIcon = toggle.querySelector(".close-icon");

    // Set mobile menu visibility and update accessibility attributes
    function setMenuHidden(hidden) {
      panel.classList.toggle("hidden", hidden);
      toggle.setAttribute("aria-expanded", hidden ? "false" : "true");
      toggle.setAttribute("aria-label", hidden ? "Open menu" : "Close menu");
      if (openIcon && closeIcon) {
        openIcon.classList.toggle("hidden", !hidden);
        closeIcon.classList.toggle("hidden", hidden);
      }
    }

    // Toggle menu on button click
    toggle.addEventListener("click", function () {
      var isOpen = !panel.classList.contains("hidden");
      setMenuHidden(isOpen);
    });

    // Close menu when navigation links are clicked
    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenuHidden(true);
      });
    });
  }
});
