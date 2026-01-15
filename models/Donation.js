const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donorName: { type: String, required: true },
    donorEmail: { type: String },
    donorPhone: { type: String, required: true },
    amount: { type: Number, required: true },
    donationType: { 
        type: String, 
        enum: ['zakat', 'sadaqah', 'general'],
        required: true 
    },
    paymentMethod: { 
        type: String, 
        enum: ['bank', 'jazzcash', 'easypaisa', 'cash', 'hand'],
        required: true 
    },
    caseId: { type: String },
    transactionId: { type: String },
    screenshot: { type: String },
    status: { 
        type: String, 
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending' 
    },
    receiptNumber: { type: String, unique: true },
    receiptSent: { type: Boolean, default: false },
    notes: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', donationSchema);
