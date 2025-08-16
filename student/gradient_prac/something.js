/* app.js
   Syllabus taken from the uploaded Anna University B.E. CSE PDF (Regulations 2021).
   Source: uploaded PDF. :contentReference[oaicite:2]{index=2}
*/

/* ---------- SYLLABUS OBJECT (Semesters I - VIII) ----------
   Each entry: { code: "...", name: "...", credits: number }
   NOTE: Non-credit / NCC courses are set with credits: 0 (they don't count to CGPA)
*/
const syllabus = {
  "Semester I": [
    { code: "IP3151", name: "Induction Programme", credits: 0 },
    { code: "HS3152", name: "Professional English - I", credits: 3 },
    { code: "MA3151", name: "Matrices and Calculus", credits: 4 },
    { code: "PH3151", name: "Engineering Physics", credits: 3 },
    { code: "CY3151", name: "Engineering Chemistry", credits: 3 },
    { code: "GE3151", name: "Problem Solving and Python Programming", credits: 3 },
    { code: "GE3152", name: "Heritage of Tamils", credits: 1 },
    { code: "GE3171", name: "Problem Solving & Python Lab", credits: 2 },
    { code: "BS3171", name: "Physics & Chemistry Lab", credits: 2 },
    { code: "GE3172", name: "English Laboratory", credits: 1 }
  ],
  "Semester II": [
    { code: "HS3252", name: "Professional English - II", credits: 2 },
    { code: "MA3251", name: "Statistics & Numerical Methods", credits: 4 },
    { code: "PH3256", name: "Physics for Information Science", credits: 3 },
    { code: "BE3251", name: "Basic Electrical & Electronics Engineering", credits: 3 },
    { code: "GE3251", name: "Engineering Graphics", credits: 4 },
    { code: "CS3251", name: "Programming in C", credits: 3 },
    { code: "GE3252", name: "Tamils and Technology", credits: 1 },
    { code: "GE3271", name: "Engineering Practices Lab", credits: 2 },
    { code: "CS3271", name: "Programming in C Lab", credits: 2 },
    { code: "GE3272", name: "Communication Lab / Foreign Language", credits: 2 }
  ],
  "Semester III": [
    { code: "MA3354", name: "Discrete Mathematics", credits: 4 },
    { code: "CS3351", name: "Digital Principles & Computer Organization", credits: 4 },
    { code: "CS3352", name: "Foundations of Data Science", credits: 3 },
    { code: "CS3301", name: "Data Structures", credits: 3 },
    { code: "CS3391", name: "Object Oriented Programming", credits: 3 },
    { code: "CS3311", name: "Data Structures Lab", credits: 1.5 },
    { code: "CS3381", name: "OOP Laboratory", credits: 1.5 },
    { code: "CS3361", name: "Data Science Lab", credits: 2 },
    { code: "GE3361", name: "Professional Development", credits: 1 }
  ],
  "Semester IV": [
    { code: "CS3452", name: "Theory of Computation", credits: 3 },
    { code: "CS3491", name: "Artificial Intelligence & Machine Learning", credits: 4 },
    { code: "CS3492", name: "Database Management Systems", credits: 3 },
    { code: "CS3401", name: "Algorithms", credits: 4 },
    { code: "CS3451", name: "Introduction to Operating Systems", credits: 3 },
    { code: "GE3451", name: "Environmental Sciences & Sustainability", credits: 2 },
    { code: "CS3461", name: "Operating Systems Laboratory", credits: 1.5 },
    { code: "CS3481", name: "DBMS Laboratory", credits: 1.5 }
  ],
  "Semester V": [
    { code: "CS3591", name: "Computer Networks", credits: 4 },
    { code: "CS3501", name: "Compiler Design", credits: 4 },
    { code: "CB3491", name: "Cryptography & Cyber Security", credits: 3 },
    { code: "CS3551", name: "Distributed Computing", credits: 3 },
    { code: "PE-I", name: "Professional Elective I (choose)", credits: 3 },
    { code: "PE-II", name: "Professional Elective II (choose)", credits: 3 },
    { code: "MC-I", name: "Mandatory Course I (Non-credit)", credits: 0 }
  ],
  "Semester VI": [
    { code: "CCS356", name: "Object Oriented Software Engineering", credits: 4 },
    { code: "CS3691", name: "Embedded Systems and IoT", credits: 4 },
    { code: "OE-I", name: "Open Elective I (choose)", credits: 3 },
    { code: "PE-III", name: "Professional Elective III (choose)", credits: 3 },
    { code: "PE-IV", name: "Professional Elective IV (choose)", credits: 3 },
    { code: "PE-V", name: "Professional Elective V (choose)", credits: 3 },
    { code: "PE-VI", name: "Professional Elective VI (choose)", credits: 3 },
    { code: "MC-II", name: "Mandatory Course II (Non-credit)", credits: 0 }
  ],
  "Semester VII": [
    { code: "GE3791", name: "Human Values & Ethics", credits: 2 },
    { code: "EL-MGMT", name: "Elective - Management (choose)", credits: 3 },
    { code: "OE-II", name: "Open Elective II (choose)", credits: 3 },
    { code: "OE-III", name: "Open Elective III (choose)", credits: 3 },
    { code: "OE-IV", name: "Open Elective IV (choose)", credits: 3 },
    { code: "CS3711", name: "Summer Internship", credits: 2 }
  ],
  "Semester VIII": [
    { code: "CS3811", name: "Project Work / Internship", credits: 10 }
  ]
};

/* Grade points (Anna University common mapping used in earlier code) */
const GRADE_POINTS = { "O":10, "A+":9, "A":8, "B+":7, "B":6, "C":5, "U":0 };

/* --- DOM elements --- */
const semesterSelect = document.getElementById('semesterSelect');
const subjectsContainer = document.getElementById('subjectsContainer');
const calcGPA = document.getElementById('calcGPA');
const saveSemester = document.getElementById('saveSemester');
const clearRows = document.getElementById('clearRows');
const gpaResult = document.getElementById('gpaResult');
const savedList = document.getElementById('savedList');
const calcCGPA = document.getElementById('calcCGPA');
const cgpaResult = document.getElementById('cgpaResult');
const clearSaved = document.getElementById('clearSaved');
const fillDemo = document.getElementById('fillDemo');
const cgpaInputQuick = document.getElementById('cgpaInputQuick');
const convertBtn = document.getElementById('convertBtn');
const percentResult = document.getElementById('percentResult');

const STORAGE_KEY = 'cse_saved_semesters_v1';

/* Populate semester dropdown */
function populateSemesters(){
  semesterSelect.innerHTML = '<option value="" disabled selected>Select semester</option>';
  Object.keys(syllabus).forEach(sem => {
    const o = document.createElement('option');
    o.value = sem; o.textContent = sem;
    semesterSelect.appendChild(o);
  });
}

/* Build rows for chosen semester */
function renderSubjectsForSemester(sem){
  subjectsContainer.innerHTML = '';
  if(!sem || !syllabus[sem]) return;
  syllabus[sem].forEach(s => {
    const row = document.createElement('div'); row.className = 'sub-row';
    const chk = document.createElement('input'); chk.type='checkbox'; chk.checked = true;
    const code = document.createElement('div'); code.className='code'; code.textContent = s.code;
    const name = document.createElement('div'); name.className='name'; name.textContent = s.name;
    const credits = document.createElement('input'); credits.type='number'; credits.min='0'; credits.step='0.5'; credits.className='credits';
    credits.value = s.credits ?? 0; credits.title = 'Credits (editable)';
    const grade = document.createElement('select'); grade.className='grade';
    const placeholder = document.createElement('option'); placeholder.value=''; placeholder.textContent='Select Grade'; placeholder.disabled=true; placeholder.selected=true;
    grade.appendChild(placeholder);
    ['O','A+','A','B+','B','C','U'].forEach(g=>{
      const opt = document.createElement('option'); opt.value=g; opt.textContent=g; grade.appendChild(opt);
    });
    row.appendChild(chk); row.appendChild(code); row.appendChild(name); row.appendChild(credits); row.appendChild(grade);
    subjectsContainer.appendChild(row);
  });
}

/* Calculate GPA from current rows */
function calculateGPA(){
  const rows = Array.from(subjectsContainer.querySelectorAll('.sub-row'));
  let totalWeighted = 0, totalCredits = 0; let hasFail=false, missing=false;
  rows.forEach(r=>{
    const include = r.querySelector('input[type=checkbox]').checked;
    if(!include) return;
    const credits = parseFloat(r.querySelector('input[type=number]').value);
    const grade = r.querySelector('select').value;
    if(isNaN(credits) || credits <= 0 || !grade){ missing = true; return; }
    const gp = GRADE_POINTS[grade] ?? 0;
    if(grade === 'U') hasFail = true;
    totalWeighted += gp * credits;
    totalCredits += credits;
  });
  if(totalCredits === 0) return { error: 'No included subjects or credits sum to zero.' };
  const gpa = totalWeighted / totalCredits;
  return { gpa, totalCredits, totalWeighted, hasFail, missing };
}

/* Save semester result to localStorage */
function saveCurrentSemester(){
  const sem = semesterSelect.value;
  if(!sem){ alert('Select a semester first'); return; }
  const res = calculateGPA();
  if(res.error){ alert(res.error); return; }
  const entry = { sem, gpa: parseFloat(res.gpa.toFixed(4)), credits: res.totalCredits, weighted: res.totalWeighted, ts: Date.now() };
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const idx = saved.findIndex(x=>x.sem === sem);
  if(idx >= 0) saved.splice(idx,1,entry); else saved.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  renderSavedList();
  alert('Saved ✅');
}

/* Render saved semesters */
function renderSavedList(){
  savedList.innerHTML = '';
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  if(saved.length === 0){ savedList.innerHTML = '<div class="muted small">No saved semesters.</div>'; cgpaResult.innerHTML='CGPA: —'; return; }
  saved.forEach((s,i)=>{
    const item = document.createElement('div'); item.className='saved-item';
    const left = document.createElement('div'); left.innerHTML = `<div style="font-weight:600">${s.sem}</div><div class="muted small">Credits: ${s.credits} • GPA: ${s.gpa.toFixed(2)}</div>`;
    const right = document.createElement('div'); right.style.display='flex'; right.style.gap='8px';
    const del = document.createElement('button'); del.textContent='Delete';
    del.addEventListener('click', ()=>{
      const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); all.splice(i,1);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all)); renderSavedList();
    });
    right.appendChild(del); item.appendChild(left); item.appendChild(right); savedList.appendChild(item);
  });
}

/* Compute CGPA */
function computeCGPAFromSaved(){
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  if(saved.length === 0){ alert('No saved semesters'); return; }
  let totalWeighted=0, totalCredits=0;
  saved.forEach(s=>{ totalWeighted += s.weighted; totalCredits += s.credits; });
  if(totalCredits === 0) { alert('Saved credits total is zero'); return; }
  const cgpa = totalWeighted / totalCredits;
  cgpaResult.innerHTML = `CGPA = <strong>${cgpa.toFixed(4)}</strong><div class="muted small">≈ ${(cgpa*10).toFixed(2)}%</div>`;
}

/* Clear & helpers */
function clearSubjectRows(){ subjectsContainer.innerHTML=''; gpaResult.innerHTML='GPA: —'; }
function clearAllSaved(){ if(confirm('Clear all saved semesters?')){ localStorage.removeItem(STORAGE_KEY); renderSavedList(); } }
function fillDemoData(){
  const first = Object.keys(syllabus)[0]; semesterSelect.value = first; renderSubjectsForSemester(first);
  setTimeout(()=> {
    const rows = subjectsContainer.querySelectorAll('.sub-row');
    rows.forEach((r,i)=>{
      const sel = r.querySelector('select'); const cr = r.querySelector('input[type=number]');
      if(i===0) { sel.value='A'; cr.value= (cr.value||3); }
      if(i===1) { sel.value='B+'; }
      if(i===2) { sel.value='O'; }
    });
  },60);
}

/* Events */
semesterSelect.addEventListener('change', ()=> { renderSubjectsForSemester(semesterSelect.value); gpaResult.innerHTML='GPA: —'; });
calcGPA.addEventListener('click', ()=> {
  const r = calculateGPA();
  if(r.error){ gpaResult.innerHTML = `<span class="muted small">${r.error}</span>`; return; }
  let msg = `GPA = <strong>${r.gpa.toFixed(4)}</strong> • Credits = ${r.totalCredits}`;
  if(r.hasFail) msg += ` <div class="muted small" style="color:#ff8a8a">Contains U (fail) — shown as 0 pts</div>`;
  if(r.missing) msg += ` <div class="muted small">Some rows incomplete — fill grade/credits for exact GPA</div>`;
  gpaResult.innerHTML = msg;
});
document.getElementById('saveSemester').addEventListener('click', saveCurrentSemester);
clearRows.addEventListener('click', clearSubjectRows);
clearSaved.addEventListener('click', clearAllSaved);
fillDemo.addEventListener('click', fillDemoData);
calcCGPA.addEventListener('click', computeCGPAFromSaved);
convertBtn.addEventListener('click', ()=> {
  const v = parseFloat(cgpaInputQuick.value);
  if(isNaN(v)){ percentResult.innerHTML = '<span class="muted small">Enter a valid CGPA</span>'; return; }
  percentResult.innerHTML = `≈ <strong>${(v*10).toFixed(2)}%</strong>`;
});

/* Init */
populateSemesters();
renderSavedList();





<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>CSE GPA / CGPA</title>
  <link rel="stylesheet" href="st.css" />
</head>
<body>
  <div class="wrap">
    <div class="card main">
      <h1>🎓 CSE GPA &amp; CGPA Assistant</h1>

      <label for="semesterSelect">Choose Semester</label>
      <select id="semesterSelect"></select>

      <div class="hint-row">
        <span class="muted small">Toggle checkbox to include a subject in GPA</span>
        <button id="fillDemo" class="small">Fill Demo</button>
      </div>

      <div id="subjectsContainer" class="subjects" aria-live="polite"></div>

      <div class="actions">
        <button id="calcGPA" class="primary">Calculate GPA</button>
        <button id="saveSemester">Save Semester</button>
        <button id="clearRows">Clear</button>
      </div>

      <div id="gpaResult" class="result">GPA: —</div>
      <div class="muted small">Grades mapping: O(10) , A+(9), A(8), B+(7), B(6), C(5), U(0).</div>
    </div>

    <div class="card right-panel">
      <h2>Saved Semesters</h2>
      <div id="savedList" class="saved-list"></div>

      <div class="actions">
        <button id="calcCGPA" class="primary">Calculate CGPA</button>
        <button id="clearSaved">Clear All</button>
      </div>

      <div id="cgpaResult" class="result">CGPA: —</div>

      <h3>Quick CGPA → %</h3>
      <div style="display:flex;gap:8px">
        <input id="cgpaInputQuick" type="number" step="0.01" placeholder="Enter CGPA" />
        <button id="convertBtn">Convert</button>
      </div>
      <div id="percentResult" class="result">Percent: —</div>

      <div class="card note" style="margin-top:12px">
        <strong>Note</strong>
        <p class="muted small">Syllabus taken from the uploaded Anna University B.E. CSE PDF. Non-credit / NCC courses are included for display but marked with 0 credits where applicable. Source: uploaded PDF. :contentReference[oaicite:1]{index=1}</p>
      </div>
    </div>
  </div>

  <script src="cal.js"></script>
</body>
</html>
