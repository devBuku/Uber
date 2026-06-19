# Uber — AGENTS.md

## Quick start

```sh
pnpm install --prefix backend
pnpm install --prefix frontend

# Backend
cp backend/.env.example backend/.env
docker compose -f backend/docker-compose.yaml up -d   # MongoDB on localhost:27017
pnpm --prefix backend run dev                          # docker compose up -d && nodemon src/server.js

# Frontend (separate terminal)
pnpm --prefix frontend dev                             # Vite on :5173
pnpm --prefix frontend lint                            # ESLint
pnpm --prefix frontend build                           # vite build
pnpm --prefix frontend preview                         # vite preview
```

## Package manager

**pnpm** (v11.3+ declared in `devEngines`). Do not use npm or yarn.

## Architecture

```
backend/                        # CommonJS, Express 5, Mongoose 9
├── docker-compose.yaml         # mongo:latest on 27017
├── .env.example                # PORT, NODE_ENV, MONGO_URI, JWT_SECRET
└── src/
    ├── server.js               # dotenv → DB → HTTP
    ├── app.js                  # middleware + routes (no error handler)
    ├── config/db.js            # mongoose.connect(MONGO_URI)
    ├── constants/env.js        # getEnv — throws if var unset
    ├── models/                 # *.model.js naming
    ├── routes/                 # express-validator chains as arrays
    ├── controllers/            # consume validationResult(req)
    ├── services/               # business logic, throws on missing fields
    └── middlewares/auth.middleware.js   # exports { authUser, authCaptain }

frontend/                       # ESM, React 19, Vite 8, Tailwind CSS v4
├── vite.config.js              # @vitejs/plugin-react + @tailwindcss/vite
├── eslint.config.js            # Flat config (ESLint 10)
└── src/
    ├── main.jsx                # CaptainContext → UserContext → BrowserRouter
    ├── App.jsx                 # react-router-dom v7 Routes
    ├── context/                # UserContext, CaptainContext
    ├── components/             # LocationSearchPanel, VehiclePanel, ConfirmRide
    └── pages/                  # Start, UserLogin, UserSignup, CaptainLogin,
                                # CaptainSignup, Home, CaptainHome, UserLogout,
                                # CaptainLogout, *ProtectWrapper
```

## Context conventions

- **Default export** = provider (`UserContext`, `CaptainContext`); **named export** = context object (`UserDataContext`, `CaptainDataContext`)
- **`UserContext`** shape: `{ user, setUser }` (initialized with empty email/fullname)
- **`CaptainContext`** shape: `{ captain, setCaptain, isLoading, setIsLoading, error, setError, updateCaptain }`
- Provider nesting: `CaptainContext > UserContext > BrowserRouter > App`

## Model & auth conventions

- `User.password` and `Captain.password` both `select: false` — chain `.select("+password")` for login queries
- `hashPassword` is a **static** method; `comparePassword` and `generateAuthToken` are **instance methods** on both models
- JWT: `JWT_SECRET`, expires `24h`, stored in **both** `localStorage` (key `"token"`) and httpOnly cookie
- `authUser`/`authCaptain`: read `req.cookies.token`, check `BlackListToken`, verify JWT, attach `req.user` / `req.captain`
- `BlackListToken` has TTL index (`expires: 86400`) — auto-deletes after 24h
- All frontend axios calls use `{ withCredentials: true }` and `import.meta.env.VITE_BASE_URL`

## API

| Method | Path | Auth | Response shape |
|--------|------|------|----------------|
| GET | `/` | — | `{ message: "Healthy" }` |
| POST | `/api/user/register` | — | `{ token, user }` (201) |
| POST | `/api/user/login` | — | `{ token, user }` |
| GET | `/api/user/profile` | `authUser` | `req.user` (flat, not wrapped) |
| GET | `/api/user/logout` | `authUser` | Blacklists token, clears cookie |
| POST | `/api/captain/register` | — | `{ token, captain }` (201) |
| POST | `/api/captain/login` | — | `{ token, captain }` |
| GET | `/api/captain/profile` | `authCaptain` | `{ captain: req.captain }` (wrapped) |
| GET | `/api/captain/logout` | `authCaptain` | Blacklists token, clears cookie |

**Response shape asymmetry**: user profile returns flat `req.user`; captain profile returns `{ captain: req.captain }`. `UserProtectWrapper` reads `response.data`, `CaptainProtectWrapper` reads `response.data.captain`.

## Gotchas

- `.env` is gitignored; copy from `.env.example`. No `frontend/.env.example` exists — create with `VITE_BASE_URL=http://localhost:3000`.
- Backend CORS only allows `http://localhost:5173` with credentials.
- **No test suite or TypeScript** in either package. Backend test is a placeholder that exits 1.
- **No custom Express error handler** — service-layer throws crash to Express default error handler.
- **`moto` vs `motorcycle` bug**: Route validation (`captain.route.js:39`) checks `["car", "motorcycle", "auto"]`, but model enum (`captain.model.js:57`) is `["car", "moto", "auto"]`. Frontend sends `"moto"` → route rejects with 400.
- **Captain `lastname`**: Route validates `min 3` and `required`, but the model does **not** require `lastname`.
- **Backend `dev` script** chains `docker compose up -d && nodemon` — if Docker fails, nodemon never starts.
