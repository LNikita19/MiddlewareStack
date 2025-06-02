Setup: Clone repo, install dependencies, configure .env, run npm run dev command

API Endpoints:

GET /api/public - public access

POST /api/submit - protected by CSRF, rate limiter, input sanitization

GET /api/blacklisted - protected by API key and IP blacklist

POST /api/blacklisted/add - add IP to blacklist

POST /api/blacklist/remove - remove IP from blacklist

POST /api/contact - protected by CSRF, rate limiter, input sanitization

Middleware Explanation:

Rate Limiter: Limits requests per IP to 100 per 15 minutes using express-rate-limit.

IP Blacklist: Blocks requests from banned IPs with 403.

CSRF Protection: Uses csurf with cookie tokens on unsafe HTTP methods.

Input Sanitization: Prevents NoSQL injection and XSS using mongo-sanitize and xss-clean is deprecated and problematic because it tries to overwrite req.query (which is a getter-only property in Express), causing runtime errors. It is no longer maintained and can break your app.

Instead, sanitize-html is used as a reliable alternative for XSS sanitization. It provides configurable, robust HTML sanitization without mutating request objects, making it safer and more stable for production use.

Helmet: Secures HTTP headers.

Testing: Use provided cURL commands or Postman to test endpoints.

Generate the API_KEY USING THIS COMMAND - node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

Generate CSRF_TOKEN USING THIS COMMAND - node -e "console.log(require('crypto').randomBytes(24).toString('hex'))"


