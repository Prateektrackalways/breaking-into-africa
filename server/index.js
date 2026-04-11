require('dotenv').config();
const express = require('express');
const cors = require('cors');
const leadsRouter = require('./routes/leads');
const pdfRouter = require('./routes/pdf');

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  process.env.CLIENT_URL,
  'https://guide.prateek.africa',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());

app.use('/api/leads', leadsRouter);
app.use('/api/pdf', pdfRouter);
app.use('/api/analytics', require('./routes/analytics'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
