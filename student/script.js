document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from reloading page

  // Get input values
  const name = document.getElementById("name").value.trim();
  const rollNo = document.getElementById("rollNo").value.trim();

  // Validate inputs (optional)
  if (name === "" || rollNo === "") {
    alert("Please fill in all fields.");
    return;
  }

  // Add to table
  const table = document.getElementById("studentTable").getElementsByTagName("tbody")[0];
  const newRow = table.insertRow();

  const nameCell = newRow.insertCell(0);
  const rollCell = newRow.insertCell(1);

  nameCell.textContent = name;
  rollCell.textContent = rollNo;

  // Clear form
  document.getElementById("studentForm").reset();
});
