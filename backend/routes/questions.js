// backend/routes/questions.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const rolesPath = path.join(__dirname, '..', 'data', 'roles.json');

function readRoles() {
  const raw = fs.readFileSync(rolesPath, 'utf-8');
  return JSON.parse(raw);
}

function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}

router.post('/', (req, res) => {
  try {
    const { role = '', numQuestions = 5, difficulty = 'mixed' } = req.body;
    const roles = readRoles();
    const key = role.trim().toLowerCase();

    // find best match (simple)
    const roleKey = Object.keys(roles).find(k => k.toLowerCase() === key) || null;

    if (!roleKey) {
      return res.status(400).json({ error: 'Role not found. Try: Machine Learning Engineer, Data Scientist, AI Product Manager' });
    }

    let bank = roles[roleKey].filter(q => {
      if (difficulty === 'mixed') return true;
      return q.difficulty === difficulty;
    });

    if (bank.length === 0) bank = roles[roleKey];

    shuffleArray(bank);
    const selected = bank.slice(0, Math.min(Number(numQuestions) || 5, bank.length)).map(q => {
      // return a shallow copy to avoid mutation
      return {
        id: q.id,
        stem: q.stem,
        options: [...q.options],
        correctIndex: q.correctIndex // client should not trust this for display, but we'll keep for evaluation
      };
    });

    // hide correctIndex from client by default — but we'll send it so the evaluate endpoint can score.
    // If you prefer not to send correctIndex, backend should store session; for MVP it's acceptable.
    res.json({ role: roleKey, questions: selected });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
