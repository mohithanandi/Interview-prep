import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Result() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const stored = sessionStorage.getItem('interview_result');
    const dur = sessionStorage.getItem('interview_duration');
    if (!stored) {
      navigate('/');
      return;
    }
    setResult(JSON.parse(stored));
    setDuration(dur || 0);
  }, []);

  const handleExportCSV = () => {
    if (!result) return;
    const rows = [
      ['Question', 'Selected', 'Correct', 'IsCorrect']
    ];
    result.feedback.forEach(f => {
      const selected = f.selectedIndex >= 0 ? f.options[f.selectedIndex] : 'No answer';
      const correct = f.options[f.correctIndex];
      rows.push([f.stem, selected, correct, f.correct ? 'Yes' : 'No']);
    });
    const csv = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'interviewprep_result.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!result) return null;

  return (
    <div className="card">
      <h2>Results</h2>
      <p className="sub">Score: {result.score.correct} / {result.score.total} • {result.score.percentage}%</p>
      <p className="sub">Time taken: {duration} seconds</p>

      <div className="result-list">
        {result.feedback.map((f, i) => (
          <div key={f.id} className={`result-item ${f.correct ? 'correct' : 'incorrect'}`}>
            <div className="r-stem"><strong>Q{i + 1}.</strong> {f.stem}</div>
            <div className="r-details">
              <div><strong>Your answer:</strong> {f.selectedIndex >= 0 ? f.options[f.selectedIndex] : 'No answer'}</div>
              <div><strong>Correct:</strong> {f.options[f.correctIndex]}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        <button className="primary" onClick={handleExportCSV}>Export CSV</button>
        <button className="secondary" style={{ marginLeft: 8 }} onClick={() => { sessionStorage.removeItem('interview_questions'); sessionStorage.removeItem('interview_result'); navigate('/'); }}>Take another</button>
      </div>
    </div>
  );
}
