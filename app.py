from flask import Flask, render_template, request

# Initialize the Flask application
app = Flask(__name__)

# Grade points dictionary
GRADE_POINTS = {
    'A+': 10, 'A': 9, 'B': 8, 'C': 7,
    'D': 6, 'E': 5, 'F': 0, 'Ab': 0
}

@app.route('/', methods=['GET', 'POST'])
def index():
    # This block runs when the user submits the form
    if request.method == 'POST':
        # --- SGPA Calculation ---
        total_credit_points = 0
        total_credits = 0
        
        credits = request.form.getlist('credit')
        grades = request.form.getlist('grade')

        for i in range(len(credits)):
            if credits[i]:
                try:
                    credit = float(credits[i])
                    grade = grades[i]
                    grade_point = GRADE_POINTS.get(grade, 0)
                    
                    total_credit_points += credit * grade_point
                    total_credits += credit
                except ValueError:
                    # Ignore if credit is not a valid number
                    pass

        # Calculate SGPA, handle division by zero
        sgpa = (total_credit_points / total_credits) if total_credits > 0 else 0

        # --- CGPA Calculation ---
        semester = int(request.form.get('semester', 1))
        previous_sgpas_str = request.form.getlist('previous_sgpa')
        
        # Convert previous SGPA strings to floats, ignoring empty ones
        previous_sgpas = [float(s) for s in previous_sgpas_str if s]

        if semester == 1:
            cgpa = sgpa
        else:
            if len(previous_sgpas) == semester - 1:
                total_sgpa_sum = sum(previous_sgpas) + sgpa
                cgpa = total_sgpa_sum / semester
            else:
                # Handle error case where previous SGPA count is wrong
                cgpa = 0 

        # --- Determine GPA Color Class ---
        gpa_color_class = ''
        if cgpa >= 9.2:
            gpa_color_class = 'gpa-green'
        elif cgpa >= 8.5:
            gpa_color_class = 'gpa-yellow'
        else:
            gpa_color_class = 'gpa-red'

        # Render the page with all calculated results
        return render_template('index.html',
                               sgpa=f"{sgpa:.2f}",
                               cgpa=f"{cgpa:.2f}",
                               total_credits=total_credits,
                               total_credit_points=f"{total_credit_points:.2f}",
                               results_exist=True,
                               gpa_color_class=gpa_color_class)

    # This runs on the initial page load (GET request)
    return render_template('index.html', results_exist=False)

if __name__ == '__main__':
    app.run(debug=True)