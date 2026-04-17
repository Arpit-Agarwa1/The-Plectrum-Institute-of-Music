# Deployment (Vercel + Render)

## Big picture

- **Frontend (Vercel):** hosts the React static files. Users visit your domain here.
- **Backend (Render):** runs Node + Express 24/7. It talks to MongoDB.
- **MongoDB Atlas:** your database in the cloud.

Set the frontend `VITE_API_URL` to your Render API URL, e.g. `https://your-api.onrender.com/api`.

## Render (backend)

1. New **Web Service** → connect your Git repo (or upload).
2. **Root directory:** `backend`
3. **Build command:** `npm install`
4. **Start command:** `npm start`
5. Add environment variables from `backend/.env.example` (production values).

## Vercel (frontend)

1. New project → import repo.
2. **Root directory:** `frontend`
3. **Framework:** Vite  
4. **Build:** `npm run build`  
5. **Output:** `dist`
6. Add `VITE_API_URL` = your Render API URL.

## CORS

In Render, set `CLIENT_URL` to your Vercel site URL (e.g. `https://your-app.vercel.app`) so only your site can call the API.

## Stripe (optional)

Add `STRIPE_SECRET_KEY` and webhook URL on Stripe dashboard pointing to `https://your-api.onrender.com/api/stripe/webhook`.
