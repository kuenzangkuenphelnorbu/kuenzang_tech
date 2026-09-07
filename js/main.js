// 1. Student Skills Data Array (Students can edit or add items)
const skillsData = [
  { name: "HTML5", category: "frontend" },
  { name: "CSS3 / Flexbox", category: "frontend" },
  { name: "JavaScript (ES6)", category: "frontend" },
  { name: "VS Code", category: "tools" },
  { name: "Git & GitHub", category: "tools" },
  { name: "Vercel Deployment", category: "tools" },
  { name: "SQL Syntax", category: "database" },
  { name: "Relational Tables", category: "database" },
];

// 2. Dynamic Skills Rendering Function
function renderSkills(category = "all") {
  const container = document.getElementById("skills-container");
  if (!container) return;

  const filteredSkills =
    category === "all"
      ? skillsData
      : skillsData.filter((skill) => skill.category === category);

  container.innerHTML = filteredSkills
    .map(
      (skill) => `
    <span class="skill-badge">${skill.name}</span>
  `,
    )
    .join("");
}

// 3. Category Filter Click Handlers
function setupFilterButtons() {
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      buttons.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");
      // Render filtered skills
      renderSkills(btn.dataset.category);
    });
  });
}

// 4. Light/Dark Theme Switcher Logic
function setupThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.body.setAttribute("data-theme", newTheme);
    toggleBtn.textContent = newTheme === "dark" ? "☀️" : "🌙";
  });
}

// 5. Initialize Interactive Components on Load
document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  setupFilterButtons();
  setupThemeToggle();
});
