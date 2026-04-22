# The Plectrum Institute of Music — Full Stack App

A learning-friendly project: **simple code**, **lots of comments**, and clear folder names.

## How this repo is organized (for beginners)

| Folder | What it does |
|--------|----------------|
| `backend/` | Backend: API, database, login tokens, emails |
| `frontend/` | Frontend: website pages users see in the browser |

**Flow:** The browser loads the React app (`frontend`). When you click “Book” or “Login”, the app sends HTTP requests to the **backend**. The backend reads/writes MongoDB and sends JSON back.

## Run everything (one command)

From the **project root** (folder that contains `backend/` and `frontend/`):

```bash
npm install
npm run install:all
npm run dev
```

Then open **http://localhost:5177** (or the URL Vite prints). The API is proxied to the backend — keep `VITE_BACKEND_ORIGIN` in `frontend/.env` equal to `http://localhost:<PORT>` where the API runs (`PORT` in `backend/.env`).

---

## Quick start

### 1. MongoDB

Use [MongoDB Atlas](https://www.mongodb.com/atlas) (free tier) and copy your connection string.

### 2. Backend

```bash
cd backend
cp .env.example .env
# Edit .env — set JWT_SECRET; see Mongo options below
npm install
npm run dev
```

**MongoDB options**

- **Easiest (no install):** in `.env` set `MONGODB_URI=memory`. The API auto-loads demo data on startup.
- **Docker:** from the project root, `docker compose up -d`, then use `MONGODB_URI=mongodb://127.0.0.1:27017/plectrum` and run `npm run seed` once.
- **Atlas:** paste your `mongodb+srv://...` string as `MONGODB_URI`.

The server URL is `http://localhost:PORT` (see `PORT` in `backend/.env`, often **5000** or **5050**).

### 3. Frontend

```bash
cd frontend
cp .env.example .env
# Set VITE_BACKEND_ORIGIN to match the backend, e.g. http://localhost:5000
npm install
npm run dev
```

In **development**, the app calls **`/api`** on the same host as Vite (no CORS). Vite **proxies** `/api` to your backend — keep `VITE_BACKEND_ORIGIN` in `frontend/.env` equal to `http://localhost:<PORT>` where the API runs.

### 4. Run both from the project root (optional)

```bash
npm install
npm run install:all
npm run dev
```

This starts the API (`npm run start` in `backend/`) and Vite (`npm run dev` in `frontend/`) together.

Open the URL Vite prints (usually `http://localhost:5177`).

## Learn the code (reading order)

1. `backend/index.js` — how the server starts  
2. `backend/models/` — **Model** (database shape)  
3. `backend/services/` — business logic (between controller and model)  
4. `backend/views/` — **View** (JSON response helpers)  
5. `backend/controllers/` — **Controller** (HTTP in/out)  
6. `backend/routes/` — which URL runs which controller  
7. `frontend/src/main.jsx` — React entry (`.jsx` = JavaScript + HTML-like tags)  
8. `frontend/src/App.jsx` — page routes  
9. `frontend/src/pages/` — each screen  

See **LEARNING.md** for a beginner-friendly MVC explanation.

## Deployment

See **DEPLOYMENT.md**.

## Default admin (after seed)

Check `backend/.env.example` for `ADMIN_EMAIL` / `ADMIN_PASSWORD` — change these in production.
