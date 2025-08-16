// Grade points mapping as per Anna University
const gradePoints = {
  "O": 10, "A+": 9, "A": 8, "B+": 7, "B": 6, "C": 5, "U": 0
};

// Load JSON and populate semester dropdown
fetch("cse_syllabus.json")
  .then(res => res.json())
  .then(data => {
    const semesterSelect = document.getElementById("semesterSelect");
    data.semesters.forEach(sem => {
      let opt = document.createElement("option");
      opt.value = sem.semester;
      opt.textContent = "Semester " + sem.semester;
      semesterSelect.appendChild(opt);
    });

    // Load subjects when semester changes
    semesterSelect.addEventListener("change", () => {
      const selected = parseInt(semesterSelect.value);
      const semester = data.semesters.find(s => s.semester === selected);
      const tbody = document.querySelector("#subjectsTable tbody");
      tbody.innerHTML = "";
      semester.subjects.forEach(sub => {
        let row = document.createElement("tr");
        row.innerHTML = `
          <td>${sub.code}</td>
          <td>${sub.title}</td>
          <td>${sub.credits}</td>
          <td>
            <select data-credits="${sub.credits}" data-exclude="${sub.excludeFromCGPA}">
              <option value="">Select</option>
              ${Object.keys(gradePoints).map(grade => `<option value="${grade}">${grade}</option>`).join("")}
            </select>
          </td>
        `;
        tbody.appendChild(row);
      });
    });

    // Trigger first load
    semesterSelect.value = data.semesters[0].semester;
    semesterSelect.dispatchEvent(new Event("change"));
  });

// Calculate GPA
document.getElementById("calcGPA").addEventListener("click", () => {
  let totalPoints = 0;
  let totalCredits = 0;

  document.querySelectorAll("#subjectsTable select").forEach(sel => {
    let grade = sel.value;
    let credits = parseFloat(sel.dataset.credits);
    let exclude = sel.dataset.exclude === "true";

    if (grade && !exclude) {
      totalPoints += gradePoints[grade] * credits;
      totalCredits += credits;
    }
  });

  let gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  document.getElementById("gpaResult").textContent = "GPA: " + gpa;
});

// Calculate CGPA
document.getElementById("calcCGPA").addEventListener("click", () => {
  let totalGPA = parseFloat(document.getElementById("totalGPA").value);
  let totalCredits = parseFloat(document.getElementById("totalCredits").value);
  if (!isNaN(totalGPA) && !isNaN(totalCredits) && totalCredits > 0) {
    let cgpa = (totalGPA / totalCredits).toFixed(2);
    document.getElementById("cgpaResult").textContent = "CGPA: " + cgpa;
  } else {
    document.getElementById("cgpaResult").textContent = "Please enter valid numbers.";
  }
});
