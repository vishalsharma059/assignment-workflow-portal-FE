# 📘 Assignment Workflow Portal – Frontend

A role-based assignment management frontend built with **React.js**, designed for teachers and students to manage assignments through a clean, secure, and responsive interface.

---

## 🚀 Project Overview

This repository contains the frontend of the Assignment Workflow Portal.  
It supports a **single login system** with **automatic role-based dashboards**, ensuring a smooth and structured academic workflow.

---

## ✨ Features

- Single login for Teachers and Students  
- JWT-based authentication  
- Role-based redirection after login  

Teacher Dashboard  
- Create, edit, publish, and complete assignments  
- Assignment states: Draft, Published, Completed  
- View student submissions per assignment  

Student Dashboard  
- View only published assignments  
- Submit one response per assignment  
- View submitted answers (read-only)  

- Clean, responsive UI  
- Form validation and error handling  

---

## 🛠 Tech Stack

- React.js  
- React Router  
- Context API  
- Axios  
- Tailwind CSS  
- JWT Authentication  

---

## ⚙️ Setup, Configuration & Application Flow

```bash
git clone [https://github.com/vishalsharma059/assignment-workflow-portal-FE.git]
cd assignment-workflow-portal-frontend
npm install

# create .env file in root directory
VITE_API_BASE_URL=http://localhost:8800/api

# make sure backend server is running
npm run dev

# application runs on
http://localhost:3000

```

## 🔄 Application Flow

- User logs in using a single login page  
- Backend returns JWT token and user role  
- Automatic redirection based on role:
  - Teacher → Teacher Dashboard  
  - Student → Student Dashboard  

---

## 🧠 Notes

- JWT is stored using Context API / localStorage  
- UI is strictly role-aware and hides unauthorized actions  
- Students cannot access draft or completed assignments  
- Completed assignments are locked for editing  

---

## 🙋‍♂️ Author

**Vishal Sharma**  
Full Stack MERN Developer  

🔗 LinkedIn: https://www.linkedin.com/in/vishalsharma2003  

⭐ If this project helps you, please consider giving it a star!
