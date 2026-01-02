📌 Project Overview

This repository contains the frontend of the Assignment Workflow Portal, built using React.js.

The frontend provides:

A single login screen for both roles

Role-based dashboards (Teacher / Student)

Assignment creation, listing, filtering, and submission

Clean, responsive UI with proper error handling

🛠️ Tech Stack

React.js

React Router

Context API (State Management)

Axios (API calls)

Tailwind CSS

JWT-based authentication

⚙️ Setup & Run Locally
1️⃣ Clone the Repository
git clone https://github.com/your-username/assignment-workflow-portal-frontend.git
cd assignment-workflow-portal-frontend

2️⃣ Install Dependencies
npm install

3️⃣ Environment Configuration

Create a .env file:

VITE_API_BASE_URL=http://localhost:8800/api


Ensure backend is running before starting frontend.

4️⃣ Start the Application
npm run dev


The application will run on:

http://localhost:3000

🎯 Application Flow
Login

Single login page for both teachers and students

Backend returns JWT token + role

Automatic redirection:

Teacher → Teacher Dashboard

Student → Student Dashboard

Teacher Dashboard

Create and manage assignments

Assignment states:

Draft (editable, deletable)

Published (visible to students)

Completed (locked)

View all student submissions per assignment

Student Dashboard

View only Published assignments

Submit one answer per assignment

View submitted answer (read-only)

🧠 Assumptions & Notes

JWT token is stored securely (localStorage/context).

UI is role-aware and hides unauthorized actions.

Students cannot see draft or completed assignments.

Teachers cannot modify completed assignments.

🎨 UI & UX Notes

Responsive layout for desktop and tablet

Clear validation and error messages

Simple, clean dashboard-focused design

📌 Additional Notes

Designed to match real-world role-based systems

Emphasis on workflow, security, and usability

Easily extendable for analytics, pagination, and notifications