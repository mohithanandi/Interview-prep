# 🎯 InterviewPrep.AI

**InterviewPrep.AI** is a modern web application designed to help users practice for technical interviews through MCQ-style quizzes.  
It provides a clean, minimal interface built with **React (Vite)** and is structured for easy expansion into a full-stack or AI-driven system.

---

## 🚀 Features
- 🧠 Role-based interview question structure (MCQs)
- 🎨 Elegant light-blue themed UI for a professional look
- ⚡ Fast and responsive React frontend (Vite)
- 🔄 Component-based modular design (Home, Quiz, Result)
- 🧩 Scalable project architecture — ready for backend or AI integration

---

## 🧰 Tech Stack
**Frontend**
- React (Vite)
- React Router DOM
- CSS Modules / Custom Styles

**Backend (Planned for v2)**
- Node.js + Express.js
- REST API endpoints for question generation and evaluation

**AI Integration (Planned for v3)**
- OpenAI / Hugging Face / OpenRouter APIs
- LangChain for question retrieval and contextual analysis (RAG)
- Vector database (FAISS / Pinecone) for semantic search

---

## 📂 Project Structure
InterviewPrep.AI/
├─ backend/
│ ├─ routes/
│ │ ├─ questions.js
│ │ └─ evaluate.js
│ └─ data/
│ └─ roles.json
│
├─ frontend/
│ ├─ src/
│ │ ├─ components/
│ │ │ ├─ Home.jsx
│ │ │ ├─ Quiz.jsx
│ │ │ └─ Result.jsx
│ │ ├─ styles/
│ │ │ └─ index.css
│ │ └─ App.jsx
│ └─ vite.config.js
│
└─ README.md


---

## 🖥️ Getting Started

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/InterviewPrep.AI.git
cd InterviewPrep.AI/frontend

2️⃣ Install Dependencies
npm install

3️⃣ Run the App
npm run dev


Now open http://localhost:5173
 in your browser.

🌱 Future Scope

Add backend (Express + Node.js)

Integrate OpenAI or Hugging Face APIs to dynamically generate interview questions

Implement RAG using LangChain for context-based Q&A

Include login/signup and performance tracking

Deploy the full-stack app on Render / Vercel / Netlify

📜 License

This project is licensed under the MIT License — feel free to use, modify, and share with proper credit.

💼 Author

Mohitha Nandi
Artificial Intelligence & Machine Learning