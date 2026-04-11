const express = require('express');
const router = express.Router();
const supabase = require('../db/supabase');
const { sendWelcomeEmail } = require('../services/email');
const adminAuth = require('../middleware/adminAuth');

// POST /api/leads — capture a new lead
router.post('/', async (req, res) => {
  const { first_name, email, country, phone, interest } = req.body;

  if (!first_name || !email || !country) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  try {
    // Upsert — if email already exists, just return success so they can still access the ebook
    const { data, error } = await supabase
      .from('leads')
      .upsert({ first_name, email, country, phone: phone || null, interest: interest || null }, { onConflict: 'email', ignoreDuplicates: false })
      .select()
      .single();

    if (error) throw error;

    // Send welcome email (non-blocking — don't fail the request if email fails)
    sendWelcomeEmail(first_name, email).catch(err =>
      console.error('Welcome email failed:', err.message)
    );

    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('Lead capture error:', err.message);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// GET /api/leads/admin — list all leads (password protected)
router.get('/admin', adminAuth, async (req, res) => {
  const format = req.query.format; // ?format=csv

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  if (format === 'csv') {
    const csv = [
      'id,first_name,email,country,phone,interest,created_at,has_downloaded',
      ...data.map(r =>
        `${r.id},"${r.first_name}","${r.email}","${r.country}","${r.phone || ''}","${r.interest || ''}",${r.created_at},${r.has_downloaded}`
      ),
    ].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="leads.csv"');
    return res.send(csv);
  }

  return res.json(data);
});

module.exports = router;
