const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-nav-toggle]");
const links = document.querySelector("[data-nav-links]");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

toggle.addEventListener("click", () => {
  const isOpen = links.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

links.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    links.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
