const express = require('express');
const bodyParser = require('body-parser');
const { setupHelmet } = require('./middlewares/helmetSetup');
const { setupCsrf } = require('./middlewares/csrfProtection');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const sanitizeInputs = require('./middlewares/inputSanitizer');

const { ipBlacklist } = require('./middlewares/ipBlacklist');


// Import routes
const publicRoutes = require('./routes/publicRoutes');
const submitRoutes = require('./routes/submitRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');
const app = express();

// Setup security headers
setupCsrf(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(ipBlacklist); // Apply to all routes
app.use(sanitizeInputs);  // sanitize before CSRF

// CSRF protection middleware
setupCsrf(app);
app.use(cookieParser());
app.use(csrf({ cookie: true }));

app.use('/api/form', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.json({ csrfToken: req.csrfToken() });
});

// Routes
app.use('/api', publicRoutes);
app.use('/api', submitRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', contactRoutes);

// Global error handler for CSRF errors
app.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        return res.status(403).json({ error: 'Invalid or missing CSRF token' });
    }
    next(err);
});

module.exports = app;