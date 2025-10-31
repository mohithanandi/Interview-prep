import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [role, setRole] = useState('Machine Learning Engineer');
  const [num, setNum] = useState(5);
  const [difficulty, setDifficulty] = useState('mixed');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, numQuestions: Number(num), difficulty })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to generate questions');
        setLoading(false);
        return;
      }
      // store in sessionStorage for Quiz page
      sessionStorage.setItem('interview_questions', JSON.stringify(data.questions));
      sessionStorage.setItem('interview_role', JSON.stringify(data.role));
      navigate('/quiz');
    } catch (err) {
      console.error(err);
      alert('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Set up your mock interview</h2>

      <label>Role</label>
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option>Machine Learning Engineer</option>
        <option>Data Scientist</option>
        <option>AI Product Manager</option>
      </select>

      <label>Number of questions</label>
      <input type="number" min="1" max="20" value={num} onChange={e => setNum(e.target.value)} />

      <label>Difficulty</label>
      <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
        <option value="mixed">Mixed</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <div style={{ marginTop: 12 }}>
        <button className="primary" onClick={handleGenerate} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Questions'}
        </button>
      </div>

      <p className="hint">Tip: Start with 5 questions. You can export results after the quiz.</p>
    </div>
  );
}
