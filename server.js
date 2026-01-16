const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect DB (safe for serverless)
connectDB().catch(console.error);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/cases', require('./routes/cases'));
app.use('/api/donations', require('./routes/donations'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/newsletter', require('./routes/newsletter'));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'IWT API is running' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'Server Error'
    });
});

// ✅ EXPORT — DO NOT LISTEN
module.exports = app;
