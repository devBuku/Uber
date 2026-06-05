# Uber — AGENTS.md

## Quick start

```sh
# Backend
cp backend/.env.example backend/.env
docker compose -f backend/docker-compose.yaml up -d   # start MongoDB
pnpm --prefix backend run dev                          # nodemon on src/server.js

# Frontend (separate terminal)
pnpm --prefix frontend dev                             # Vite dev server
pnpm --prefix frontend build                           # production build
pnpm --prefix frontend lint                            # ESLint
pnpm --prefix frontend preview                         # preview production build
```

## Package manager

**pnpm** (v11.3+). Do not use npm or yarn. Both packages declare `pnpm` in `devEngines`.

## Project layout

```
backend/                          # CommonJS, Express 5, Mongoose 9
├── docker-compose.yaml           # MongoDB on localhost:27017
├── .env.example                  # PORT, NODE_ENV, MONGO_URI, JWT_SECRET
└── src/
    ├── server.js                 # dotenv → connect DB → HTTP server
    ├── app.js                    # Express app (middleware + routes)
    ├── config/db.js              # mongoose.connect(MONGO_URI)
    ├── constants/env.js          # getEnv helper — fails hard if var unset
    ├── models/                   # user.model.js, captain.model.js, blackListToken.model.js
    ├── routes/                   # user.route.js, captain.route.js
    ├── controllers/              # user.controller.js, captain.controller.js
    ├── services/                 # user.service.js, captain.service.js
    └── middlewares/              # auth.middleware.js

frontend/                         # ESM, React 19, Vite 8, Tailwind CSS v4
├── vite.config.js                # React + Tailwind CSS v4 plugins
├── eslint.config.js              # Flat config (ESLint 10)
├── index.html                    # SPA entry
└── src/
    ├── main.jsx                  # createRoot + BrowserRouter
    ├── App.jsx                   # react-router-dom Routes
    └── pages/                    # Home, UserLogin, UserSignup, CaptainLogin, CaptainSignup
```

## Framework & module conventions

- **Backend**: CommonJS (`require`/`module.exports`), Express 5, Mongoose 9, dotenv, cookie-parser
- **Frontend**: ESM (`import`/`export`), React 19, Vite 8, Tailwind CSS v4 (via `@tailwindcss/vite` plugin, no config file needed), react-router-dom v7
- **Validation**: `express-validator` — validation chains defined as arrays in route files, consumed via `validationResult(req)` in controllers
- **No TypeScript, no test suite**
- Model files follow `*.model.js` naming convention

## API routes

| Method | Path                     | Auth       | Description          |
|--------|--------------------------|------------|----------------------|
| GET    | `/`                      | —          | Health check         |
| POST   | `/api/user/register`     | —          | Register user        |
| POST   | `/api/user/login`        | —          | Login user           |
| GET    | `/api/user/profile`      | `authUser` | User profile         |
| GET    | `/api/user/logout`       | `authUser` | Logout (blacklist)   |
| POST   | `/api/captain/register`  | —          | Register captain     |
| POST   | `/api/captain/login`     | —          | Login captain        |
| GET    | `/api/captain/profile`   | `authCaptain` | Captain profile   |
| GET    | `/api/captain/logout`    | `authCaptain` | Logout (blacklist) |

## Auth conventions

- `User.password` has `select: false` — queries that need it must chain `.select("+password")`
- `Captain.password` has `select: false` — same requirement
- Two auth middleware: `authUser` (attaches `req.user`) and `authCaptain` (attaches `req.captain`), both read `req.cookies.token`
- Blacklisted tokens stored in `BlackListToken` model with `createdAt` TTL index (`expires: 86400`)
- JWT secret from `JWT_SECRET` env var, token expires in 24h
- `hashPassword` is a static, `comparePassword` and `generateAuthToken` are instance methods on both models

## Gotchas

- `.env` is gitignored; always copy from `.env.example`. `dotenv.config({ quiet: true })` silently skips missing `.env`.
- `data_mongo/` (MongoDB volume) gitignored via `data_*` rule.
- No Prettier config file despite `prettier` being a dev dependency in both packages — defaults apply.
- `captain.service.js:4` has bug: `if (!fullname || !email || !password || vehicle)` should be `!vehicle` (missing `!`). This causes `createCaptain` to always throw when vehicle is provided.
- `captain.controller.js:43` missing `await`: `captain.comparePassword(password)` should be `await captain.comparePassword(password)`.
