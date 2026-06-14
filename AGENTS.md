# Uber — AGENTS.md

## Quick start

```sh
pnpm install --prefix backend
pnpm install --prefix frontend

# Backend
cp backend/.env.example backend/.env
docker compose -f backend/docker-compose.yaml up -d   # MongoDB on localhost:27017
pnpm --prefix backend run dev                          # nodemon on src/server.js

# Frontend (separate terminal)
pnpm --prefix frontend dev                             # Vite dev server on :5173
pnpm --prefix frontend lint                            # ESLint
pnpm --prefix frontend build                           # production build
pnpm --prefix frontend preview                         # preview production build
```

## Package manager

**pnpm** (v11.3+). Both packages declare it in `devEngines`. Do not use npm or yarn.

## Architecture

```
backend/                                   # CommonJS, Express 5, Mongoose 9
├── docker-compose.yaml                    # MongoDB on port 27017
├── .env.example                           # PORT, NODE_ENV, MONGO_URI, JWT_SECRET
└── src/
    ├── server.js                          # dotenv({quiet:true}) → DB → HTTP
    ├── app.js                             # middleware + routes, NO error handler
    ├── config/db.js                       # mongoose.connect(MONGO_URI)
    ├── constants/env.js                   # getEnv — fails hard if var unset
    ├── models/                            # *.model.js naming
    ├── routes/                            # express-validator chains as arrays
    ├── controllers/                       # consume validationResult(req)
    ├── services/                          # business logic, throws on missing fields
    └── middlewares/                       # authUser, authCaptain

frontend/                                  # ESM, React 19, Vite 8, Tailwind CSS v4
├── vite.config.js                         # @vitejs/plugin-react + @tailwindcss/vite
├── eslint.config.js                       # Flat config (ESLint 10)
└── src/
    ├── main.jsx                           # CaptainContext → UserContext → BrowserRouter
    ├── App.jsx                            # react-router-dom v7 Routes
    ├── context/                           # UserContext (user+setUser), CaptainContext (captain, isLoading, error, updateCaptain)
    └── pages/                             # Start, UserLogin, UserSignup, CaptainLogin, CaptainSignup,
                                           # Home, CaptainHome, UserLogout, CaptainLogout, *ProtectWrapper
```

## Model & auth conventions

- `User.password` and `Captain.password` both `select: false` — chain `.select("+password")` when querying for login
- `hashPassword` is a **static** method; `comparePassword` and `generateAuthToken` are **instance methods** on both models
- **Auth middleware** reads `req.cookies.token`, checks `BlackListToken`, verifies JWT, attaches `req.user` / `req.captain`
- `BlackListToken` has TTL index (`expires: 86400`) — auto-deletes after 24h
- JWT secret from `JWT_SECRET`, token expires in `24h`
- Token lives in **both** `localStorage` (key: `"token"`) and an httpOnly cookie. Protect wrappers check localStorage first, then validate via `/profile`. Logout pages clear localStorage and call the logout API.
- **Context naming convention**: default export = provider (`UserContext`, `CaptainContext`); named export = React context object (`UserDataContext`, `CaptainDataContext`)
- All frontend axios calls use `{ withCredentials: true }` and `import.meta.env.VITE_BASE_URL`

## API

| Method | Path                     | Auth          | Response shape                            |
|--------|--------------------------|---------------|-------------------------------------------|
| GET    | `/`                      | —             | `{ message: "Healthy" }`                  |
| POST   | `/api/user/register`     | —             | `{ token, user }`                         |
| POST   | `/api/user/login`        | —             | `{ token, user }`                         |
| GET    | `/api/user/profile`      | `authUser`    | `req.user` (flat, not wrapped)            |
| GET    | `/api/user/logout`       | `authUser`    | Blacklists cookie token, clears cookie    |
| POST   | `/api/captain/register`  | —             | `{ token, captain }`                      |
| POST   | `/api/captain/login`     | —             | `{ token, captain }`                      |
| GET    | `/api/captain/profile`   | `authCaptain` | `{ captain: req.captain }` (wrapped)      |
| GET    | `/api/captain/logout`    | `authCaptain` | Blacklists cookie token, clears cookie    |

## Gotchas

- `.env` is gitignored; always copy from `.env.example`. `dotenv.config({ quiet: true })` silently skips missing `.env` — `constants/env.js` will then throw at startup for missing vars.
- `frontend/.env` is also gitignored (root `.gitignore`). No `.env.example` exists; create it with `VITE_BASE_URL=http://localhost:3000` if missing.
- Backend CORS only allows `http://localhost:5173` with credentials.
- `data_mongo/` (MongoDB volume) gitignored via root `data_*` rule.
- No Prettier config file exists despite `prettier` being a devDependency — defaults apply.
- No TypeScript, no test suite. Both packages.
- **`moto` vs `motorcycle` bug**: Frontend CaptainSignup dropdown sends `"moto"`, but the backend route validates against `["car", "motorcycle", "auto"]`. Selecting "Moto" will always 400.
- **Profile response shapes differ**: `getUserProfile` returns `req.user` directly (flat), while `getCaptainProfile` returns `{ captain: req.captain }` (wrapped). `UserProtectWrapper` reads `response.data`, `CaptainProtectWrapper` reads `response.data.captain`.
- **No custom Express error handler** — service-layer throws crash to Express default error handler.
- **Captain signup route** validates `fullname.lastname` (min 3), but the model does **not** require it — a 400 here is a route validation rejection, not a schema error.
