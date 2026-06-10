const modal = document.querySelector("#requestModal");
const openButtons = document.querySelectorAll("[data-open-modal]");
const closeButtons = document.querySelectorAll("[data-close-modal]");
const planSelect = document.querySelector("#planSelect");
const requestForm = document.querySelector("#requestForm");
const formStatus = document.querySelector("#formStatus");
const accordions = document.querySelectorAll(".accordion-toggle");

function openModal(plan) {
  if (plan && planSelect) {
    planSelect.value = plan;
  }

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modal.querySelector("input")?.focus();
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

openButtons.forEach((button) => {
  button.addEventListener("click", () => openModal(button.dataset.plan));
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
});

requestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(requestForm);
  const name = formData.get("name");

  formStatus.textContent = `${name}, заявка подготовлена. В реальном проекте здесь подключается отправка.`;
  requestForm.reset();
  planSelect.value = "Пока не знаю";
});

accordions.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const panel = toggle.nextElementSibling;
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute("aria-expanded", String(!isOpen));
    panel.hidden = isOpen;
  });
});
