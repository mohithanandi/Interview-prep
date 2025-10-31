import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';

export default function App() {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>InterviewPrep.AI</h1>
        <p className="sub">Career-focused mock interviews — get ready, confidently.</p>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <small>© InterviewPrep.AI • Built by Momo</small>
      </footer>
    </div>
  );
}
