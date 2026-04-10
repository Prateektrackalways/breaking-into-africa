# Breaking Into Africa — Interactive Ebook

**Author:** Prateek Jain, Co-Founder at Trackalways  
**Domain:** guide.prateek.africa

## Stack
- Frontend: React 18 + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: Supabase (PostgreSQL)
- Email: Resend
- PDF: Puppeteer
- Hosting: Render

## Local Development

### 1. Clone and install

```bash
# Install server deps
cd server && npm install

# Install client deps
cd ../client && npm install
```

### 2. Set up environment

```bash
cp .env.example server/.env
# Fill in your Supabase, Resend, and admin password values
```

### 3. Set up database

Run `server/db/schema.sql` in your Supabase SQL Editor.

### 4. Run locally

```bash
# Terminal 1 — start backend
cd server && npm run dev

# Terminal 2 — start frontend
cd client && npm run dev
```

App runs at http://localhost:5173

## Deployment (Render)

See the step-by-step deployment guide provided separately.

## Admin

Access leads at: `GET /api/leads/admin`  
Set `Authorization: Bearer YOUR_ADMIN_PASSWORD` header.

Export CSV: `GET /api/leads/admin?format=csv`
