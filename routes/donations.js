const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const Case = require('../models/Case');
const auth = require('../middleware/auth');
const { sendReceiptEmail } = require('../utils/email');

// Submit donation
router.post('/', async (req, res) => {
    try {
        const receiptNumber = `IWT-${Date.now()}`;
        const donation = new Donation({
            ...req.body,
            receiptNumber
        });
        
        await donation.save();
        
        res.status(201).json({ 
            success: true, 
            message: 'Donation submitted. We will verify and send receipt soon.',
            data: { receiptNumber }
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Get all donations (admin only)
router.get('/', auth, async (req, res) => {
    try {
        const { status, donationType } = req.query;
        const filter = {};
        if (status) filter.status = status;
        if (donationType) filter.donationType = donationType;
        
        const donations = await Donation.find(filter).sort({ createdAt: -1 });
        res.json({ success: true, data: donations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Verify donation (admin only)
router.put('/:id/verify', auth, async (req, res) => {
    try {
        const donation = await Donation.findByIdAndUpdate(
            req.params.id,
            { status: 'verified' },
            { new: true }
        );

        // Update case raised amount if donation is for specific case
        if (donation.caseId) {
            await Case.findOneAndUpdate(
                { caseId: donation.caseId },
                { $inc: { raisedAmount: donation.amount } }
            );
        }

        // Send receipt email
        if (donation.donorEmail) {
            await sendReceiptEmail(donation);
            donation.receiptSent = true;
            await donation.save();
        }

        res.json({ success: true, data: donation });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Get donation stats
router.get('/stats/summary', async (req, res) => {
    try {
        const totalDonations = await Donation.countDocuments({ status: 'verified' });
        
        const totalAmount = await Donation.aggregate([
            { $match: { status: 'verified' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const byType = await Donation.aggregate([
            { $match: { status: 'verified' } },
            { $group: { _id: '$donationType', total: { $sum: '$amount' }, count: { $sum: 1 } } }
        ]);

        res.json({
            success: true,
            data: {
                totalDonations,
                totalAmount: totalAmount[0]?.total || 0,
                byType
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
