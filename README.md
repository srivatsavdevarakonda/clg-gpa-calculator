## 🎓 GPA Calculator
A simple, intuitive, and dynamic web application for calculating Semester Grade Point Average (SGPA) and Cumulative Grade Point Average (CGPA). Built with Flask and vanilla JavaScript, this tool is designed to help students track their academic progress and plan for the future.

Live Demo: https://clg-gpa-calculator.onrender.com

## ✨ Features
Dynamic SGPA & CGPA Calculation: Instantly calculate your SGPA for the current semester and your overall CGPA.

Editable Course Details: Add, remove, or edit course names and their corresponding credits.

Visual Feedback: The final CGPA is color-coded (green, yellow, red) to provide immediate visual feedback on performance.

Data Persistence: Your course data and semester details are automatically saved in your browser's local storage. No need to re-enter everything every time you visit!

Responsive Design: Fully functional on both desktop and mobile devices.

## 🛠️ Tech Stack
Frontend: HTML5, CSS3, JavaScript

Backend: Python 3

Framework: Flask

Production Server: Gunicorn

Deployment: Render

## 🚀 Local Installation and Setup
To run this project on your local machine, follow these steps:

1. Prerequisites:

Python 3.6+

pip

2. Clone the Repository:

Bash

git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
3. Create a Virtual Environment (Recommended):

Bash

# For Windows
python -m venv venv
venv\Scripts\activate

# For macOS/Linux
python3 -m venv venv
source venv/bin/activate
4. Install Dependencies:

Bash

pip install -r requirements.txt
5. Run the Application:

Bash

flask run
The application will be available at http://127.0.0.1:5000.

## 📝 How to Use
Enter your Current Semester number.

If you are in semester 2 or higher, input the SGPA for all previous semesters.

For the current semester, add or remove courses as needed.

Update the Course Name, Credit, and your expected Grade for each course.

Click Calculate GPA to see your results. All data is saved as you type.

To start over, click the Clear All Data button.
