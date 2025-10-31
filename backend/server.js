// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const questionsRouter = require('./routes/questions');
const evaluateRouter = require('./routes/evaluate');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/questions', questionsRouter);
app.use('/api/evaluate', evaluateRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`InterviewPrep.AI backend running on port ${PORT}`);
});
