
document.addEventListener("DOMContentLoaded", () => {
  // Highlight active nav link based on body data-page
  const pageName = document.body.dataset.page;
  if (pageName) {
    document
      .querySelectorAll("nav a[data-page]")
      .forEach((link) => {
        if (link.dataset.page === pageName) {
          link.classList.add("active");
        }
      });
  }

  // Scroll reveal
  const fadeEls = document.querySelectorAll(".fade-in-up");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    fadeEls.forEach((el) => observer.observe(el));
  } else {
    fadeEls.forEach((el) => el.classList.add("visible"));
  }

  // Product dropdowns
  document.querySelectorAll("[data-toggle='product']").forEach((card) => {
    card.addEventListener("click", () => {
      const dropdownId = card.getAttribute("data-target");
      const dropdown = document.getElementById(dropdownId);
      if (!dropdown) return;

      const isOpen = dropdown.classList.contains("open");
      // Close others
      document.querySelectorAll(".product-dropdown").forEach((dd) => {
        dd.classList.remove("open");
      });
      document.querySelectorAll(".product-card").forEach((pc) => {
        pc.classList.remove("open");
      });

      if (!isOpen) {
        dropdown.classList.add("open");
        card.classList.add("open");
      }
    });
  });

  // Smooth scroll for hero "Get Quotation" button if present
  document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = btn.getAttribute("data-scroll-to");
      if (target && target.startsWith("#")) {
        const el = document.querySelector(target);
        if (el) {
          e.preventDefault();
          window.scrollTo({
            top: el.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
    });
  });
});
