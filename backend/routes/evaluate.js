// backend/routes/evaluate.js
const express = require('express');
const router = express.Router();

/**
 * Expected body:
 * {
 *   answers: [{ id: "q1", selectedIndex: 2 }, ...],
 *   questions: [{ id: "q1", correctIndex: 1, stem: "...", options: [...] }, ...]
 * }
 *
 * For MVP we accept the questions array sent back from client (with correctIndex),
 * compare and return score and per-question feedback.
 *
 * NOTE: In production you'd store correct answers server-side or use a session token.
 */

router.post('/', (req, res) => {
  try {
    const { answers = [], questions = [] } = req.body;
    if (!Array.isArray(answers) || !Array.isArray(questions)) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const qMap = {};
    questions.forEach(q => {
      qMap[q.id] = q;
    });

    let correct = 0;
    const feedback = answers.map(ans => {
      const q = qMap[ans.id];
      if (!q) {
        return { id: ans.id, correct: false, message: 'Question not found' };
      }
      const isCorrect = Number(ans.selectedIndex) === Number(q.correctIndex);
      if (isCorrect) correct += 1;
      return {
        id: ans.id,
        correct: isCorrect,
        selectedIndex: Number(ans.selectedIndex),
        correctIndex: Number(q.correctIndex),
        stem: q.stem,
        options: q.options
      };
    });

    const score = {
      total: questions.length,
      correct,
      percentage: questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0
    };

    res.json({ score, feedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
