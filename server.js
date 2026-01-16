const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Try DB connection (won't crash)
connectDB();

// ✅ HEALTH CHECK (ALWAYS WORKS)
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'IWT API is running (MongoDB not connected yet)'
    });
});

/*
🚧 MongoDB ROUTES DISABLED FOR NOW
Enable them AFTER MongoDB is ready
*/
// app.use('/api/cases', require('./routes/cases'));
// app.use('/api/donations', require('./routes/donations'));
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/contact', require('./routes/contact'));
// app.use('/api/newsletter', require('./routes/newsletter'));

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'Server Error'
    });
});

module.exports = app;
