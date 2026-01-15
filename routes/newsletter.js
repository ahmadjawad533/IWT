const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

router.post('/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        
        const existing = await Newsletter.findOne({ email });
        if (existing) {
            if (existing.subscribed) {
                return res.json({ success: true, message: 'Already subscribed' });
            }
            existing.subscribed = true;
            await existing.save();
        } else {
            await Newsletter.create({ email });
        }
        
        res.json({ success: true, message: 'Successfully subscribed to newsletter' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;
