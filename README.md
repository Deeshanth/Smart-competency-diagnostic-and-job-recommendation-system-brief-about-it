# 🎯 AI Competency Diagnostic & Job Recommendation System

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built with HTML5/CSS3/JS](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20ES6%20JS-brightgreen)](https://github.com/Deeshanth/Smart-competency-diagnostic-and-job-recommendation-system-brief-about-it)
[![Radar Diagnostics](https://img.shields.io/badge/AI%20Engine-Spider%20Radar%20%26%20Jaccard%20Matching-cyan)](https://github.com/Deeshanth/Smart-competency-diagnostic-and-job-recommendation-system-brief-about-it)

An intelligent, interactive AI system that evaluates a candidate's technical skills, knowledge, interests, background, and competency levels, and recommends suitable job roles, identifies critical skill gaps, and provides step-by-step career improvement roadmaps.

---

## 🚀 Key System Workflow & Features

### 1. 📝 User Assessment & Skill Evaluation
- **Categorized Skill Palette**: 50+ tech skills (Backend, Cloud, Data/AI, Frontend, Security, Soft Skills).
- **Interactive 5-Star Proficiency Rating**: Self-rate competency level from Beginner (1) to Expert (5).
- **Domain Diagnostic Verification Quiz**: Interactive 3-question quizzes for Cloud, Backend, Data, and Frontend to objectively verify self-assessment ratings.
- **Background & Project Logging**: Log education level, experience band, work style preference (Remote/Hybrid/Onsite), and project exposure tags.
- **1-Click Demo Profiles**: Test instantly with pre-loaded profiles (e.g. *Student with Python + SQL + Cloud + Problem Solving*).

### 2. 🕸️ Competency Analysis & Spider Radar
- **HTML5 Canvas Spider/Radar Chart**: Dynamic 8-axis competency matrix visualization.
- **Overall Readiness Index**: 0-100% readiness score with status badges (*High Proficiency*, *Developing Level*, *Foundation Stage*).
- **Strengths & Gaps Matrix**: Classifies user superpowers and flags missing core tech requirements.

### 3. 🤖 AI Job Matching & Recommendation Engine
- **Weighted Role Matching Algorithm**: Compares candidate competency profiles against 12+ tech roles:
  - ☁️ **Cloud Engineer**
  - 💻 **Backend Developer**
  - 📊 **Data Analyst**
  - 🤖 **AI / Machine Learning Engineer**
  - ⚡ **Fullstack Developer**
  - 🎨 **UI/UX Product Designer**
  - 🛠️ **DevOps & SRE Specialist**
  - 🛡️ **Cybersecurity Analyst**
- **Match Cards**: Match percentage ring, salary ranges ($k/yr), market demand rating, matched core skills, and skills to learn.

### 4. 🗺️ Personalized Skill Gap & Career Roadmap
- **Step-by-Step Action Roadmap**: Phased plan to bridge missing core & bonus skill requirements for any selected target role.
- **Industry Certifications**: Recommended certifications (AWS Certified Solutions Architect, Docker DCA, Google Data Analytics, Meta Front-End, CKA).
- **Curated Learning Resources**: Handpicked course recommendations and time-to-readiness estimates.

### 5. 📄 Exportable Diagnostic Report
- **Official Candidate Diagnostic Report**: Printable summary report modal ready for PDF export or printing.

---

## 🛠️ Project Structure

```
competency-diagnostic-app/
├── index.html       # Semantic HTML5 UI layout, navigation tabs & modals
├── index.css        # Cyber Dark Glassmorphism design system & CSS variables
├── app.js           # Core state engine, skill taxonomy, job match algorithm & spider canvas
└── README.md        # Comprehensive documentation
```

---

## 💻 Quick Start & Local Setup

### Option 1: Run with Python HTTP Server
```bash
# Clone the repository
git clone https://github.com/Deeshanth/Smart-competency-diagnostic-and-job-recommendation-system-brief-about-it.git

# Navigate into project folder
cd Smart-competency-diagnostic-and-job-recommendation-system-brief-about-it

# Start local server
python -m http.server 8080
```
Open **[http://localhost:8080](http://localhost:8080)** in your browser.

---

## 💡 Example Scenario

If a student enters:
`Python` + `SQL` + `Cloud Fundamentals` + `Problem Solving`

The system recommends:
- ☁️ **Cloud Engineer** (High Match %)
- 💻 **Backend Developer** (High Match %)
- 📊 **Data Analyst** (High Match %)

And recommends:
> *"Learn AWS, Docker, and Linux to improve your suitability for Cloud Engineer roles."*

---

## 📜 License
Licensed under the [MIT License](LICENSE).
