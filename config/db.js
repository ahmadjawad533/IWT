const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    // ✅ If no MongoDB yet, SKIP safely
    if (!process.env.MONGODB_URI) {
        console.warn('MongoDB not configured. Skipping DB connection.');
        return;
    }

    if (isConnected) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        // ❌ DO NOT throw
    }
};

module.exports = connectDB;
