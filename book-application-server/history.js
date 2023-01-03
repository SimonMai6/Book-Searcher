const router = require('express').Router();

// GET /search
router.get('/results', async (req, res) => {
    try {
        const db = req.app.locals.db;
        const collection = db.collection('Search');

        const results = await collection.find({}).toArray();
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

module.exports = router;