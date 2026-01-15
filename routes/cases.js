const express = require('express');
const router = express.Router();
const Case = require('../models/Case');
const auth = require('../middleware/auth');

// Get all active cases
router.get('/', async (req, res) => {
    try {
        const { category, status = 'active' } = req.query;
        const filter = { status };
        if (category) filter.category = category;
        
        const cases = await Case.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, data: cases });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get single case
router.get('/:id', async (req, res) => {
    try {
        const caseData = await Case.findOne({ caseId: req.params.id });
        if (!caseData) {
            return res.status(404).json({ success: false, message: 'Case not found' });
        }
        res.json({ success: true, data: caseData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Create new case (admin only)
router.post('/', auth, async (req, res) => {
    try {
        const newCase = new Case(req.body);
        await newCase.save();
        res.status(201).json({ success: true, data: newCase });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Update case (admin only)
router.put('/:id', auth, async (req, res) => {
    try {
        const caseData = await Case.findOneAndUpdate(
            { caseId: req.params.id },
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );
        res.json({ success: true, data: caseData });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Get stats
router.get('/stats/summary', async (req, res) => {
    try {
        const totalCases = await Case.countDocuments();
        const activeCases = await Case.countDocuments({ status: 'active' });
        const completedCases = await Case.countDocuments({ status: 'completed' });
        
        const totalRaised = await Case.aggregate([
            { $group: { _id: null, total: { $sum: '$raisedAmount' } } }
        ]);

        res.json({
            success: true,
            data: {
                totalCases,
                activeCases,
                completedCases,
                totalRaised: totalRaised[0]?.total || 0
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
