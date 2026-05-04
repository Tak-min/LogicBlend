document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 20);
};

window.addEventListener("scroll", updateHeader);
updateHeader();

const year = document.querySelector("[data-year]");
if (year) {
  year.textContent = String(new Date().getFullYear());
}

const revealItems = document.querySelectorAll("[data-reveal]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 },
  );

  revealItems.forEach((item) => observer.observe(item));
}

const form = document.querySelector("[data-contact-form]");
const successPanel = document.querySelector("[data-form-success]");
const resetButton = document.querySelector("[data-form-reset]");

if (form && successPanel && resetButton) {
  const submitButton = form.querySelector("button[type='submit']");
  const buttonText = form.querySelector(".button-text");
  let isSubmitting = false;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (isSubmitting || !submitButton || !buttonText) return;

    isSubmitting = true;
    submitButton.classList.add("is-loading");
    submitButton.setAttribute("disabled", "disabled");
    buttonText.textContent = "送信中...";

    window.setTimeout(() => {
      form.classList.add("is-hidden");
      successPanel.classList.remove("is-hidden");
      submitButton.classList.remove("is-loading");
      submitButton.removeAttribute("disabled");
      buttonText.textContent = "送信する";
      form.reset();
      isSubmitting = false;
    }, 1200);
  });

  resetButton.addEventListener("click", () => {
    successPanel.classList.add("is-hidden");
    form.classList.remove("is-hidden");
  });
}
