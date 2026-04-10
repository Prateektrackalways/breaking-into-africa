const express = require('express');
const router = express.Router();
const supabase = require('../db/supabase');
const { generateEbookPdf } = require('../services/pdfGenerator');

// GET /api/pdf/download
router.get('/download', async (req, res) => {
  try {
    const pdfBuffer = await generateEbookPdf();

    // Mark lead as downloaded if email provided via query param
    const { email } = req.query;
    if (email) {
      await supabase
        .from('leads')
        .update({ has_downloaded: true })
        .eq('email', email);
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="Breaking-Into-Africa-by-Prateek-Jain.pdf"'
    );
    return res.send(pdfBuffer);
  } catch (err) {
    console.error('PDF generation error:', err.message);
    return res.status(500).json({ error: 'PDF generation failed. Please try again.' });
  }
});

module.exports = router;
