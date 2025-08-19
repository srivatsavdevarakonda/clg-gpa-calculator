# 🎓 GPA Calculator

**GPA Calculator** is a simple, intuitive, and dynamic web app for calculating **Semester GPA (SGPA)** and **Cumulative GPA (CGPA)**. Add or edit courses, assign credits and grades, and get instant results with helpful color-coded feedback. Built with **Flask** and **vanilla JavaScript**, it helps students track progress and plan ahead.

---

## 📌 Features

* ⚡ **Dynamic SGPA & CGPA:** Calculate the current semester SGPA and overall CGPA instantly.
* 📝 **Editable Courses:** Add, remove, or edit course names, credits, and grades.
* 🎯 **Visual Feedback:** CGPA is color-coded (green / yellow / red) for quick performance insight.
* 💾 **Auto Save:** All data persists in **Local Storage**—no re-entry on return visits.
* 📱 **Responsive UI:** Works smoothly on desktop and mobile screens.

---

## 🚀 Live Demo

Try it here:

🔗 **[https://clg-gpa-calculator.onrender.com](https://clg-gpa-calculator.onrender.com)**

---

## 🖼️ Screenshots *(optional placeholders)*

**Dashboard / Calculator:**

<img width="752" height="776" alt="image" src="https://github.com/user-attachments/assets/3948525c-3220-4d90-a3ed-c1a817a8033a" />

**Course Editor and what-if:**

<img width="602" height="789" alt="image" src="https://github.com/user-attachments/assets/ea2a2124-d9b3-4dc0-916c-887291c7c7a6" />

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Backend:** Python 3
* **Framework:** Flask
* **Production Server:** Gunicorn
* **Deployment:** Render

---

## 💡 How to Use (Online)

1. **Enter Semester:** Provide your **current semester number**.
2. **Previous SGPAs:** If you’re in **sem 2+**, enter SGPA for **all previous semesters**.
3. **Manage Courses:** Add or remove courses for the current semester.
4. **Fill Details:** Update **Course Name**, **Credits**, and your **Grade**.
5. **Calculate:** Click **“Calculate GPA”** to view SGPA/CGPA with color feedback.
6. **Reset:** Use **“Clear All Data”** to start fresh anytime.

> All inputs are automatically saved as you type.

---

## 🖥️ How to Run Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Create & activate a virtual environment (recommended)**

   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the app**

   ```bash
   flask run
   ```

   Open **[http://127.0.0.1:5000](http://127.0.0.1:5000)** in your browser.

---

## 📂 Suggested Project Structure

```
your-repo-name/
├─ app.py
├─ requirements.txt
├─ templates/
│  └─ index.html
├─ static/
│  ├─ css/
│  │  └─ styles.css
│  └─ js/
│     └─ app.js
└─ README.md
```

---

## 👨‍💻 Author Info

**Developed by:** (SRIVATSAV D)
📧 [devarakondasrivatsav@gmail.com](mailto:devarakondasrivatsav@gmail.com)
🌐 [GitHub](https://github.com/srivatsavdevarakonda) | [LinkedIn](https://www.linkedin.com/in/d-srivatsav-2a7a90247/)

---

## 📝 License

This project is licensed under the **MIT License**.

---

## 🙌 Contributing

Contributions are welcome!

```bash
git fork
git clone [your forked repo]
git checkout -b feature-branch
# Make your changes and commit
git push origin feature-branch
```

Then open a **Pull Request** from your fork. Let’s build it better together!

---

## 🔮 Future Improvements

* Export results to **PDF/CSV**.
* Support **custom grading scales** (e.g., 10-point / 4-point).
* Add **dark mode** toggle.
* Optional **login** for cloud sync (besides Local Storage).

---

## 💬 A Final Note

> Study smart, not just hard. May your SGPAs climb and your CGPA shine! 📈✨

