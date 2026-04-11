const express = require('express');
const router = express.Router();
const supabase = require('../db/supabase');
const adminAuth = require('../middleware/adminAuth');

// POST /api/analytics/pageview — log a page view (no auth required)
router.post('/pageview', async (req, res) => {
  const { path, referrer } = req.body;
  const user_agent = req.headers['user-agent'] || null;

  if (!path) {
    return res.status(400).json({ error: 'path is required' });
  }

  try {
    const { error } = await supabase
      .from('page_views')
      .insert({ path, referrer: referrer || null, user_agent });

    if (error) throw error;
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Pageview log error:', err.message);
    return res.status(500).json({ error: 'Failed to log pageview' });
  }
});

// GET /api/analytics/stats — return aggregate stats (admin protected)
router.get('/stats', adminAuth, async (req, res) => {
  try {
    // Total pageviews
    const { count: total_pageviews, error: totalErr } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true });

    if (totalErr) throw totalErr;

    // Today's pageviews
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const { count: today_pageviews, error: todayErr } = await supabase
      .from('page_views')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', todayStart.toISOString());

    if (todayErr) throw todayErr;

    // Views by path (aggregate)
    const { data: allViews, error: pathErr } = await supabase
      .from('page_views')
      .select('path');

    if (pathErr) throw pathErr;

    // Count manually since Supabase JS client doesn't support GROUP BY directly
    const pathCounts = {};
    for (const row of allViews) {
      pathCounts[row.path] = (pathCounts[row.path] || 0) + 1;
    }

    const views_by_path = Object.entries(pathCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count);

    return res.json({
      total_pageviews: total_pageviews || 0,
      today_pageviews: today_pageviews || 0,
      views_by_path,
    });
  } catch (err) {
    console.error('Analytics stats error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch analytics stats' });
  }
});

module.exports = router;
