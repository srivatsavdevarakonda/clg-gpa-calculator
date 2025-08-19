document.addEventListener('DOMContentLoaded', function () {
    const gpaForm = document.getElementById('gpa-form');
    const addCourseBtn = document.getElementById('add-course-btn');
    const clearDataBtn = document.getElementById('clear-data-btn');
    const courseList = document.getElementById('course-list');
    const semesterInput = document.getElementById('semester-input');
    const previousSgpaContainer = document.getElementById('previous-sgpa-container');
    
    // --- DATA HANDLING ---

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

    // Unchanged from previous version
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

    // Save data on any input change
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

    // --- INITIALIZATION ---
    loadData();
});