# MY PORTFOLIO

## Deploy notes — injecting API URL for frontend (Render)

This repository serves a static frontend (in `client/`) and an Express backend.
When deploying the frontend as a separate static site (e.g. on Render), you
should inject the backend URL at build time so the frontend knows where to
send API requests.

We provide a small helper script: `scripts/generate-config.js`.

1. Add an environment variable in Render static site settings named `API_BASE_URL`.
	Example value: `https://friendly-backend.onrender.com` (no trailing slash).
2. Set the static site's Build Command to:

```
npm run generate-config
```

3. The script writes `client/config.js` containing `window.__API_BASE_URL__`.
	The frontend loads `client/config.js` before `api-client.js` and the client
	will post to the configured backend origin.

For single-service deployments (backend serves the frontend), you can skip
this step — the frontend will use a relative path to call `/api/submit-form`.

## Mailgun (recommended) — SMTP setup

This project sends contact emails via SMTP. Mailgun is a recommended provider
for transactional email. You can use Mailgun's SMTP relay or its HTTP API. The
server currently uses SMTP (nodemailer), so below are the SMTP instructions.

1. Sign up for Mailgun and add your sending domain. Verify the domain and
	update DNS records as required by Mailgun.
2. In the Mailgun dashboard, find your SMTP credentials (for example the
	`postmaster@YOUR_DOMAIN` user and its password).

Render environment variables to set (Backend service settings):

- `SMTP_HOST` = `smtp.mailgun.org`
- `SMTP_PORT` = `587` (or `465` for SMTPS)
- `SMTP_SECURE` = `false` (use `true` if using port 465)
- `SMTP_USER` = `postmaster@your-domain` (from Mailgun)
- `SMTP_PASS` = `<mailgun-smtp-password>`
- `FROM_EMAIL` = `no-reply@your-domain` (sender shown in email)
- `TO_EMAIL` = `you@yourdomain.com` (recipient for contact messages)

Notes:
- Use port `587` with STARTTLS (SMTP_SECURE=false) unless you prefer
  SMTPS (port 465 and SMTP_SECURE=true).
- In production, protect these secrets in Render's environment settings.

Testing SMTP from the repo (local or Render shell)

I added a small helper script `scripts/send-test-email.js` to verify SMTP
credentials. Example (PowerShell):

```powershell
$env:SMTP_HOST='smtp.mailgun.org'
$env:SMTP_PORT='587'
$env:SMTP_SECURE='false'
$env:SMTP_USER='postmaster@your-domain'
$env:SMTP_PASS='your_smtp_password'
$env:FROM_EMAIL='no-reply@your-domain'
$env:TO_EMAIL='you@yourdomain.com'
node scripts/send-test-email.js
```

If SMTP is configured correctly the script will print a successful send
response. If you see an ECONNREFUSED or authentication error, check the
credentials, port, and that your Mailgun domain is authorized to send.

Optional: Mailgun HTTP API
- You can use Mailgun's HTTP API (recommended for more control and metrics).
  If you want to switch to the HTTP API, I can add an implementation that uses
  the `@mailgun/mailgun-js` package instead of SMTP.
