const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    caseId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { 
        type: String, 
        enum: ['student', 'medical', 'ration', 'emergency'],
        required: true 
    },
    description: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    raisedAmount: { type: Number, default: 0 },
    image: { type: String },
    documents: [{ type: String }],
    status: { 
        type: String, 
        enum: ['active', 'completed', 'closed'],
        default: 'active' 
    },
    verified: { type: Boolean, default: false },
    verificationDetails: {
        verifiedBy: String,
        verificationDate: Date,
        homeVisit: Boolean,
        documentsChecked: Boolean
    },
    beneficiaryDetails: {
        phone: String,
        address: String,
        cnic: String
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Case', caseSchema);
