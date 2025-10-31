import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Quiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { id: selectedIndex }
  const [timeStart, setTimeStart] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('interview_questions');
    if (!stored) {
      navigate('/');
      return;
    }
    const qs = JSON.parse(stored);
    setQuestions(qs);
    setTimeStart(Date.now());
  }, []);

  const handleSelect = (qId, idx) => {
    setAnswers(prev => ({ ...prev, [qId]: Number(idx) }));
  };

  const handleSubmit = async () => {
    // prepare payload
    const ansArray = questions.map(q => ({ id: q.id, selectedIndex: typeof answers[q.id] === 'number' ? answers[q.id] : -1 }));
    // For MVP we post both questions (including correctIndex) and answers; backend will score.
    try {
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: ansArray, questions })
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Evaluation failed');
        return;
      }
      // store result and navigate
      sessionStorage.setItem('interview_result', JSON.stringify(data));
      sessionStorage.setItem('interview_duration', JSON.stringify(Math.round((Date.now() - timeStart) / 1000)));
      navigate('/result');
    } catch (err) {
      console.error(err);
      alert('Network error during evaluation');
    }
  };

  return (
    <div className="card">
      <h2>Mock Interview</h2>
      <p className="sub">Answer the MCQs below. Select one option per question.</p>

      {questions.map((q, qi) => (
        <div key={q.id} className="question-block">
          <div className="q-stem"><strong>Q{qi + 1}.</strong> {q.stem}</div>
          <div className="options">
            {q.options.map((opt, i) => (
              <label key={i} className={`option ${answers[q.id] === i ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name={q.id}
                  checked={answers[q.id] === i}
                  onChange={() => handleSelect(q.id, i)}
                />
                <span className="opt-label">{String.fromCharCode(65 + i)}. {opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div style={{ marginTop: 14 }}>
        <button className="primary" onClick={handleSubmit}>Submit Answers</button>
        <button className="secondary" style={{ marginLeft: 8 }} onClick={() => navigate('/')}>Back</button>
      </div>
    </div>
  );
}
