# Reading this project as a beginner

This document uses **simple words** to explain how the pieces fit together.

## Frontend and backend

- **Frontend (`frontend/`):** the website in the browser (buttons, pages, colors). Uses **React with `.jsx` files** (HTML-like syntax in JavaScript).
- **Backend (`backend/`):** a small program that answers requests and talks to the database.

They are two separate apps. In development they run on two ports (for example `5177` and `5000`).

## Backend MVC (how the API code is organized)

**MVC** = **Model**, **View**, **Controller**. It splits responsibilities so each file has one clear job.

| Part | Folder | What it does |
|------|--------|----------------|
| **Model** | `backend/models/` | Describes data in MongoDB (schemas). |
| **View** | `backend/views/` | Shapes **JSON** sent to the browser (same idea as a “page,” but for APIs). |
| **Controller** | `backend/controllers/` | Reads the HTTP request, calls a **service**, sends the **view** response. |
| **Service** | `backend/services/` | Business rules and database calls (optional in tiny apps; we use it for clarity). |

**Typical request path:**  
`routes` → `controller` → `service` (uses `model`) → `view` (json helpers) → browser.

**Routes** (`backend/routes/`) map URLs like `/api/courses` to a controller function — like a table of contents.

## HTTP and API

When the user clicks “Book”, the frontend sends an **HTTP request** to the backend, for example:

`POST /api/appointments`

The backend saves the booking in MongoDB and sends back **JSON** (data as text).

## MongoDB and Mongoose

**MongoDB** stores documents (like rows, but flexible).

**Mongoose** lets us define a **schema** (shape of data) in `backend/models/`.

## Login (JWT)

1. User sends email + password to `POST /api/auth/login`.
2. Backend checks the password hash.
3. Backend returns a **token** (a long string).
4. The frontend saves the token and sends it on later requests:

`Authorization: Bearer <token>`

The backend **verifies** the token to know who is logged in.

## Admin vs student

The **role** field on the user (`admin` or `student`) decides which API routes are allowed.  
Admin routes use middleware `requireAdmin` in `backend/routes/index.js`.

## Where to change things

| You want to…              | Look at…                          |
|---------------------------|-----------------------------------|
| Change API URLs           | `backend/routes/index.js`      |
| Change database fields    | `backend/models/`              |
| Change a page on the site | `frontend/src/pages/`               |
| Change phone, address, email | `frontend/src/config/siteInfo.js` |
| Change colors / fonts     | `frontend/src/styles/` and `tailwind.config.js` |

## Try one small change

1. Run the backend and frontend (see `README.md`).
2. Open `GET /api/courses` in the browser or a REST client — you should see JSON.
3. Change a string in a React page, save, and watch the browser update.

Small experiments build confidence faster than reading everything at once.
