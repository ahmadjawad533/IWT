const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../utils/email');

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        
        await sendContactEmail({ name, email, phone, message });
        
        res.json({ 
            success: true, 
            message: 'Thank you for contacting us. We will respond soon.' 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
