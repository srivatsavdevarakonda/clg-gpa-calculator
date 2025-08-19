document.addEventListener('DOMContentLoaded', function () {
    // --- Element Selections ---
    const gpaForm = document.getElementById('gpa-form');
    const addCourseBtn = document.getElementById('add-course-btn');
    const clearDataBtn = document.getElementById('clear-data-btn');
    const courseList = document.getElementById('course-list');
    const semesterInput = document.getElementById('semester-input');
    const previousSgpaContainer = document.getElementById('previous-sgpa-container');
    const whatIfBtn = document.getElementById('what-if-btn');
    const whatIfResultEl = document.getElementById('what-if-result');

    // --- DATA HANDLING (localStorage) ---

    // Function to save all form data to localStorage
    const saveData = () => {
        const courses = [];
        document.querySelectorAll('#course-list tr').forEach(row => {
            const course = {
                name: row.querySelector('input[name="course_name"]').value,
                credit: row.querySelector('input[name="credit"]').value,
                grade: row.querySelector('select[name="grade"]').value
            };
            courses.push(course);
        });

        const previousSgpas = [];
        document.querySelectorAll('input[name="previous_sgpa"]').forEach(input => {
            previousSgpas.push(input.value);
        });

        const data = {
            semester: semesterInput.value,
            courses: courses,
            previousSgpas: previousSgpas
        };

        localStorage.setItem('gpaData', JSON.stringify(data));
    };

    // Function to load data from localStorage and populate the form
    const loadData = () => {
        const data = JSON.parse(localStorage.getItem('gpaData'));
        if (!data) {
            // If no data, add 5 default rows and return
            for (let i = 0; i < 5; i++) {
                addCourseRow();
            }
            return;
        }

        semesterInput.value = data.semester || 1;
        updatePreviousSgpaFields(); // Create the fields first

        // Populate course rows
        courseList.innerHTML = ''; // Clear default rows
        if (data.courses && data.courses.length > 0) {
            data.courses.forEach(course => addCourseRow(course));
        } else {
            // Add default rows if no courses were saved
            for (let i = 0; i < 5; i++) {
                addCourseRow();
            }
        }

        // Populate previous SGPA fields after they've been created
        const prevSgpaInputs = document.querySelectorAll('input[name="previous_sgpa"]');
        if (data.previousSgpas) {
            prevSgpaInputs.forEach((input, index) => {
                input.value = data.previousSgpas[index] || '';
            });
        }
    };

    // --- UI FUNCTIONS ---

    // Modified to accept course data for populating from localStorage
    const addCourseRow = (course = null) => {
        const row = document.createElement('tr');
        const courseCount = courseList.children.length + 1;

        const courseName = course ? course.name : `Course ${courseCount}`;
        const credit = course ? course.credit : '3';
        const selectedGrade = course ? course.grade : 'A+';

        row.innerHTML = `
            <td><input type="text" name="course_name" value="${courseName}" placeholder="e.g., Data Structures"></td>
            <td><input type="number" name="credit" value="${credit}" step="0.5" min="0" required></td>
            <td>
                <select name="grade">
                    ${['A+', 'A', 'B', 'C', 'D', 'E', 'F', 'Ab'].map(g => `<option value="${g}" ${g === selectedGrade ? 'selected' : ''}>${g}</option>`).join('')}
                </select>
            </td>
            <td><button type="button" class="remove-btn">Remove</button></td>
        `;
        
        row.querySelector('.remove-btn').addEventListener('click', () => {
            row.remove();
            saveData(); // Save after removing a row
        });

        courseList.appendChild(row);
    };

    // Generates the input fields for previous semester SGPAs
    const updatePreviousSgpaFields = () => {
        const semester = parseInt(semesterInput.value, 10);
        previousSgpaContainer.innerHTML = ''; 
        if (semester > 1) {
            const title = document.createElement('h3');
            title.textContent = 'Enter Previous Semester GPAs';
            title.style.gridColumn = '1 / -1';
            previousSgpaContainer.appendChild(title);
            for (let i = 1; i < semester; i++) {
                const fieldGroup = document.createElement('div');
                fieldGroup.className = 'form-group';
                fieldGroup.innerHTML = `
                    <label>Semester ${i} SGPA</label>
                    <input type="number" name="previous_sgpa" placeholder="e.g., 8.9" step="0.01" min="0" max="10" required>
                `;
                previousSgpaContainer.appendChild(fieldGroup);
            }
        }
    };

    // --- EVENT LISTENERS ---

    // Save data on any input change in the main form
    gpaForm.addEventListener('input', saveData);
    
    // Add course button
    addCourseBtn.addEventListener('click', addCourseRow);

    // Clear data button
    clearDataBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            localStorage.removeItem('gpaData');
            location.reload(); // Reload the page to reset the form
        }
    });

    // "What If" calculation logic
    whatIfBtn.addEventListener('click', () => {
        const totalSemesters = parseInt(document.getElementById('total-semesters').value);
        const targetCgpa = parseFloat(document.getElementById('target-cgpa').value);
        const currentSemester = parseInt(semesterInput.value);

        if (isNaN(totalSemesters) || isNaN(targetCgpa)) {
            whatIfResultEl.textContent = "Please enter valid numbers for total semesters and target CGPA.";
            whatIfResultEl.style.color = "#e74c3c"; // Red color for error
            return;
        }

        const previousSgpas = [];
        document.querySelectorAll('input[name="previous_sgpa"]').forEach(input => {
            if (input.value) { // only consider filled inputs
                previousSgpas.push(parseFloat(input.value));
            }
        });

        // Validate if all previous SGPA fields are filled
        if (previousSgpas.length !== currentSemester - 1) {
            whatIfResultEl.textContent = "Please fill in all previous semester SGPAs.";
            whatIfResultEl.style.color = "#e74c3c";
            return;
        }

        const completedSgpaSum = previousSgpas.reduce((sum, gpa) => sum + gpa, 0);
        const remainingSems = totalSemesters - (currentSemester - 1);

        if (remainingSems <= 0) {
            whatIfResultEl.textContent = "You have already completed all semesters.";
            whatIfResultEl.style.color = "#34495e"; // Neutral color
            return;
        }

        const requiredTotalPoints = targetCgpa * totalSemesters;
        const pointsNeeded = requiredTotalPoints - completedSgpaSum;
        const requiredAvgSgpa = pointsNeeded / remainingSems;

        if (requiredAvgSgpa > 10.0) {
            whatIfResultEl.innerHTML = `To reach <strong>${targetCgpa}</strong> is not possible. You would need an average SGPA of <strong style="color: #e74c3c;">${requiredAvgSgpa.toFixed(2)}</strong>.`;
        } else if (requiredAvgSgpa < 0) {
            whatIfResultEl.innerHTML = `You have already surpassed your target CGPA of <strong>${targetCgpa}</strong>! Keep up the good work.`;
        } else {
            whatIfResultEl.innerHTML = `To reach a CGPA of <strong>${targetCgpa}</strong>, you need an average SGPA of <strong style="color: #2ecc71;">${requiredAvgSgpa.toFixed(2)}</strong> over the next ${remainingSems} semester(s).`;
        }
    });

    // --- INITIALIZATION ---
    loadData();
});