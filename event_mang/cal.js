// Auto add 3 subjects on load
window.onload = () => {
  for (let i = 0; i < 3; i++) addSubjectRow();
};
// Theme Switcher
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("change", () => {
  const theme = toggle.checked ? "dark" : "light";
  document.body.className = theme;
  localStorage.setItem("theme", theme);
});
function addSubjectRow(data = {}) {
  const row = document.createElement("div");
  row.className = "subjectRow";
  row.innerHTML = `
    <input type="text" placeholder="Subject" value="${data.name || ''}" />
    <input type="number" placeholder="Credits" min="1" value="${data.credits || ''}" required />
    <select required>
      <option value="">Grade</option>
      <option value="10" ${data.grade == 10 ? 'selected' : ''}>O</option>
      <option value="9" ${data.grade == 9 ? 'selected' : ''}>A+</option>
      <option value="8" ${data.grade == 8 ? 'selected' : ''}>A</option>
      <option value="7" ${data.grade == 7 ? 'selected' : ''}>B+</option>
      <option value="6" ${data.grade == 6 ? 'selected' : ''}>B</option>
      <option value="0" ${data.grade == 0 ? 'selected' : ''}>RA (Fail)</option>
    </select>
    <button type="button" class="removeBtn">❌</button>
  `;
  document.getElementById("subjectsContainer").appendChild(row);
  saveSubjectsToLocalStorage();
}
// Save subjects
function saveSubjectsToLocalStorage() {
  const rows = document.querySelectorAll(".subjectRow");
  const subjects = [];

  rows.forEach(row => {
    subjects.push({
      name: row.children[0].value,
      credits: row.children[1].value,
      grade: row.children[2].value
    });
  });

  localStorage.setItem("subjects", JSON.stringify(subjects));
}

// Call after change
document.addEventListener("input", e => {
  if (e.target.closest(".subjectRow")) {
    saveSubjectsToLocalStorage();
  }
});

document.addEventListener("click", e => {
  if (e.target.classList.contains("removeBtn")) {
    e.target.parentElement.remove();
    saveSubjectsToLocalStorage();
  }
});

// Load saved theme
window.onload = () => {
  const theme = localStorage.getItem("theme") || "dark";
  document.body.className = theme;
  toggle.checked = theme === "dark";

  // Auto add saved subjects or new ones
  const saved = JSON.parse(localStorage.getItem("subjects") || "[]");
  if (saved.length > 0) {
    saved.forEach(sub => addSubjectRow(sub));
  } else {
    for (let i = 0; i < 3; i++) addSubjectRow();
  }
};


// Add Subject Button
document.getElementById("addSubject").addEventListener("click", addSubjectRow);

function addSubjectRow() {
  const row = document.createElement("div");
  row.className = "subjectRow";
  row.innerHTML = `
    <input type="text" placeholder="Subject" />
    <input type="number" placeholder="Credits" min="1" required />
    <select required>
      <option value="">Grade</option>
      <option value="10">O</option>
      <option value="9">A+</option>
      <option value="8">A</option>
      <option value="7">B+</option>
      <option value="6">B</option>
      <option value="0">RA (Fail)</option>
    </select>
    <button type="button" class="removeBtn">❌</button>
  `;
  document.getElementById("subjectsContainer").appendChild(row);
}

// Remove subject
document.addEventListener("click", e => {
  if (e.target.classList.contains("removeBtn")) {
    e.target.parentElement.remove();
  }
});

// GPA Calculator
document.getElementById("gpaForm").addEventListener("submit", function (e) {
  e.preventDefault();
  let totalCredits = 0, totalPoints = 0;
  const rows = document.querySelectorAll(".subjectRow");

  rows.forEach(row => {
    const credit = parseFloat(row.children[1].value);
    const grade = parseFloat(row.children[2].value);
    if (!isNaN(credit) && !isNaN(grade)) {
      totalCredits += credit;
      totalPoints += credit * grade;
    }
  });

  const gpa = (totalPoints / totalCredits).toFixed(2);
  document.getElementById("gpaResult").textContent = `🎓 GPA: ${gpa}`;
});

// CGPA Calculator
document.getElementById("cgpaForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const totalGPA = parseFloat(document.getElementById("totalGPA").value);
  const totalCredits = parseFloat(document.getElementById("totalCredits").value);
  const cgpa = (totalGPA / totalCredits).toFixed(2);
  document.getElementById("cgpaResult").textContent = `📘 CGPA: ${cgpa}`;
});

// CGPA to Percentile
function convertToPercentile() {
  const cgpa = parseFloat(document.getElementById("cgpaInput").value);
  if (!isNaN(cgpa)) {
    let percentile = (cgpa * 9.5).toFixed(2);
    if (percentile > 100) percentile = 100;
    document.getElementById("percentileResult").textContent = `🎯 Percentile: ${percentile}%`;
  }
}
