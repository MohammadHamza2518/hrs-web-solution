const { MongoClient } = require('mongodb');

const _FALLBACK = Buffer.from('bW9uZ29kYitzcnY6Ly9tb2hhbW1hZGhhbXphMjUxOF9kYl91c2VyOkg2dDdqaTZpSVFPb080TUVAY2x1c3RlcjAueGZqcDR5NS5tb25nb2RiLm5ldC9ocnNfY3JtP3JldHJ5V3JpdGVzPXRydWUmdz1tYWpvcml0eSZhcHBOYW1lPUNsdXN0ZXIw', 'base64').toString('utf8');
const MONGODB_URI = process.env.MONGODB_URI || _FALLBACK;

let cachedClient = null;

async function getMongoClient() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000
  });
  await client.connect();
  cachedClient = client;
  return client;
}

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const client = await getMongoClient();
    const db = client.db('hrs_crm');
    const syncCol = db.collection('user_sync');

    // -------------------------------------------------------------
    // GET: FETCH SCRAPER AUDIT LOGS FOR ADMIN PANEL
    // -------------------------------------------------------------
    if (req.method === 'GET' && req.query.action === 'get_scraper_logs') {
      const scraperCol = db.collection('scraper_logs');
      const logs = await scraperCol.find({}).sort({ timestamp: -1 }).limit(100).toArray();
      const totalDoc = await scraperCol.aggregate([
        { $group: { _id: null, totalLeads: { $sum: "$count" }, totalSearches: { $sum: 1 } } }
      ]).toArray();
      const stats = totalDoc[0] || { totalLeads: 0, totalSearches: 0 };
      return res.status(200).json({ success: true, logs, stats });
    }

    // -------------------------------------------------------------
    // GET: FETCH USER CLOUD CRM DATA
    // -------------------------------------------------------------
    if (req.method === 'GET') {
      const phone = (req.query.phone || '').replace(/\D/g, '');
      const email = (req.query.email || '').toLowerCase().trim();
      const licenseKey = (req.query.licenseKey || '').toUpperCase().trim();

      const orClauses = [];
      if (phone && phone.length >= 10) orClauses.push({ phone });
      if (email && email.includes('@')) orClauses.push({ email });
      if (licenseKey) orClauses.push({ licenseKey });

      if (orClauses.length === 0) {
        return res.status(400).json({ success: false, message: "Missing identifier (phone, email, or licenseKey)" });
      }

      const doc = await syncCol.findOne({ $or: orClauses });
      if (!doc) {
        return res.status(200).json({ success: true, exists: false, leads: [], settings: {} });
      }

      return res.status(200).json({
        success: true,
        exists: true,
        leads: doc.leads || [],
        settings: doc.settings || {},
        updatedAt: doc.updatedAt
      });
    }

    // -------------------------------------------------------------
    // POST: SYNC & PERSIST USER CRM DATA TO CLOUD OR LOG SCRAPE
    // -------------------------------------------------------------
    if (req.method === 'POST') {
      const data = req.body || {};

      // 1. Scraper Activity Audit Log (for Admin Monitoring)
      if (data.action === 'log_scrape') {
        const scraperCol = db.collection('scraper_logs');
        const logEntry = {
          userName: data.userName || 'Anonymous Client',
          phone: (data.phone || '').trim(),
          email: (data.email || '').toLowerCase().trim(),
          tier: data.tier || 'Specialist',
          country: data.country || 'Global',
          category: data.category || 'Web Design',
          niche: data.niche || '',
          location: data.location || '',
          query: data.query || '',
          count: Number(data.count) || 0,
          timestamp: new Date()
        };
        await scraperCol.insertOne(logEntry);
        return res.status(200).json({ success: true, message: "Scraper activity logged" });
      }

      // 2. User CRM Pipeline & Settings Sync
      const phone = (data.phone || '').replace(/\D/g, '');
      const email = (data.email || '').toLowerCase().trim();
      const licenseKey = (data.licenseKey || '').toUpperCase().trim();
      const leads = data.leads || [];
      const settings = data.settings || {};

      const orClauses = [];
      if (phone && phone.length >= 10) orClauses.push({ phone });
      if (email && email.includes('@')) orClauses.push({ email });
      if (licenseKey) orClauses.push({ licenseKey });

      if (orClauses.length === 0) {
        return res.status(400).json({ success: false, message: "Missing user identifier for cloud sync" });
      }

      await syncCol.updateOne(
        { $or: orClauses },
        {
          $set: {
            phone: phone || undefined,
            email: email || undefined,
            licenseKey: licenseKey || undefined,
            leads,
            settings,
            updatedAt: new Date()
          },
          $setOnInsert: { createdAt: new Date() }
        },
        { upsert: true }
      );

      return res.status(200).json({ success: true, message: "Cloud sync completed successfully!" });
    }

    return res.status(405).json({ success: false, message: "Method not allowed" });
  } catch (err) {
    console.error("Cloud Sync Error:", err);
    return res.status(500).json({ success: false, message: "Cloud sync error: " + err.message });
  }
};
