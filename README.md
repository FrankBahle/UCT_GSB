# Game Testing - GLA

GRIT Lab Africa game testing session platform: the session landing page, two
interactive AI games with accounts and per-question points, and an admin score
monitor. Styled in the GRIT Lab poster look (cream dotted canvas, gold and
charcoal, Montserrat).

| Page | What it is |
| --- | --- |
| `index.html` | Landing page: the **GAME TESTING SESSION** poster (sign-up link + QR code, date, time, venue, who, certificate) plus a "Play the games" panel |
| `game.html` | The games: Game 1 (15 questions x 5 points = **75**) and Game 2 (10 rounds x 10 points = **100**), **175 points** in total per player |
| `login.html` | Player sign in |
| `register.html` | Player registration |
| `admin.html` | Score monitor: every registered player, their points and each question they answered |

## Administrators (already created)

The admin logins are stored in **`data/admins.json`** - open the file and edit
them whenever you like, or add more entries to the list.

| Username | Password | Name |
| --- | --- | --- |
| `admin` | `GLA@2026` | GRIT Lab Africa Administrator |
| `mbofhenijunior7@gmail.com` | `GRIT@2026` | Makhavhu MJ |

Sign in at `admin.html` with either username (or the email address). The seeded
list also lives in `lib/admin-seed.mjs`, which is what fills the file on the
first run and what seeds the hosted store when the site is deployed.

Changing a password from the score monitor replaces the readable `password`
field in the file with a `passwordHash`, so once the site is live only the hash
is stored.

## The JSON database (no database server needed)

```bash
npm install
npm start            # = node server.mjs  →  http://localhost:5500
```

| File | Contents |
| --- | --- |
| `data/users.json` | Every player account, with the points they earned question by question |
| `data/admins.json` | The admin logins (above) |
| `data/sessions.json` | Active sign-in sessions (ignored by git) |
| `data/runtime.json` | Failed-login counters (ignored by git) |

Register on the site and open `data/users.json` - the player and their points
appear there immediately. Deleting a player from the file removes their account.
The server binds to `0.0.0.0`, so phones on the same Wi-Fi can join the session
through `http://<your-laptop-ip>:5500`.

### Working without the server

Every page also runs **without** the game server: if `/api` cannot be reached
(for example opening the site from a static host, or a Vercel preview before
the hosted store is connected) the pages automatically switch to the browser
database in `assets/js/local-db.js`, which keeps accounts and points in
`localStorage` for that one browser. A small gold note at the top of each page
says which mode is active, and the score monitor then lists the players saved
in that browser (with CSV export). Run `node server.mjs` whenever you want the
shared JSON database.

## Points

For every player the server keeps one record per question (or per Game 2
round):

- `points` - the best score that player reached for that question
- `maximum` - what the question is worth
- `correct` / `correctEver` - whether the last answer, and any answer, was right
- `plays` and `lastAt` - how often it was tried and when

A player's total is the sum of those best scores, so replaying can only improve
the total. Answers are scored on the server, so they cannot be faked from the
browser console.

## Deploying to Vercel

1. Put the project on GitHub (or run `npx vercel` in this folder) and import it
   in the Vercel dashboard - Vercel detects the static site plus the `api/`
   function.
2. Add the free key/value store so accounts and points survive on Vercel:
   project → **Storage → Create Database → Upstash Redis (Vercel KV)** →
   connect it. Vercel injects `KV_REST_API_URL` and `KV_REST_API_TOKEN`.
3. Redeploy. The admin logins above are seeded into the store automatically.

Optional: `ADMIN_USERNAME` / `ADMIN_PASSWORD` environment variables for an extra
admin login. Without the store the site still works (browser database per
device).

### If Vercel shows "404 NOT_FOUND"

That page comes from Vercel's router, not from this project: the deployment is
looking for files where it does not find them. Check, in order, in
**Project → Settings → Build and Deployment**:

1. **Root Directory** - empty when `index.html` sits at the top of the
   repository; otherwise the sub-folder that contains `index.html`
   (for example `GLA-GAME-PUZZLE-APPLICATION`).
2. **Framework Preset** - `Other` (this project also forces it with
   `"framework": null` in `vercel.json`).
3. **Build Command** - empty. **Output Directory** - empty: a value such as
   `public`, `dist` or `build` is the most common cause of this 404.
4. **Install Command** - default (`npm install`).
5. Change anything, then **Redeploy** the latest commit and open the `/` URL.

Deploying with the CLI avoids the problem completely - run it *inside* the
folder that contains `index.html`:

```bash
cd C:\Users\mbofh\2026-PROJECTS\GLA-GAME-PUZZLE-APPLICATION
npx vercel login
npx vercel --prod
```

`npx vercel --prod` prints the production link, for example
`https://gla-game-puzzle-application.vercel.app`.

### If `/api/...` returns 500

A 500 means the Function itself did not finish. Two things to check:

1. **Open `/api/health`.** It returns JSON (the two games and 175 points) as soon
   as the function loads - it does not need any store. If it works but
   `/api/register` still returns 500, the function is fine and the *store* is
   missing: add the Upstash Redis (Vercel KV) integration as described above and
   redeploy.
2. **Redeploy the latest commit** if `/api/health` also fails. Older deployments
   bundled the game data through JSON imports; the data now lives in
   `lib/game-data.mjs` (generated by `npm run data:build`) and every request goes
   to `api/handler.mjs` through an explicit rewrite in `vercel.json`.

While the store is missing, the pages automatically continue on the browser
database, so registration, signing in and playing still work (per device) and
the gold note at the top of the page says so.

## API

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/api/register` | Create an account and start a session |
| POST | `/api/login` | Sign in |
| POST | `/api/logout` | Sign out |
| GET | `/api/me` | Current account and points |
| GET | `/api/health` | Service check (games and points available) |
| POST | `/api/answers` | Score one question or one Game 2 round |
| POST | `/api/admin/login` | Admin sign in (username or email) |
| POST | `/api/admin/logout` | Admin sign out |
| GET | `/api/admin/me` | Current admin + the admin logins |
| POST | `/api/admin/password` | Change the signed-in admin password |
| GET | `/api/admin/users` | Every registered player with points |
| GET | `/api/admin/users/:id` | One player with per-question detail |
| GET | `/api/admin/users.csv` | CSV export (`?view=summary` or `?view=questions`) |

## Checks

```bash
npm run check        # syntax check of every server, function and browser script
npm test             # API test suite (also verifies the generated game data)
npm run test:http    # boots server.mjs, tests pages, accounts and the JSON files
npm run test:local   # tests the browser database used without the server
npm run test:vercel  # bundles the Vercel function and drives it against a mock store
npm run data:build   # regenerate lib/game-data.mjs after editing assets/data/*.json
```

## Game data

The questions live in `assets/data/*.json` (the browser downloads them) and are
mirrored into `lib/game-data.mjs` for the API, so no host has to support JSON
imports. After editing the JSON files run:

```bash
npm run data:build
```

## Theme

The poster palette lives in `assets/css/theme.css` (and `:root` in
`assets/css/style.css`): cream `#f2f0ea` with a `#d8d3c5` dot pattern, gold
`#d9a634` / `#c99a2e`, ink `#161616`, Montserrat 400-900, white cards with soft
shadows. The GRIT Lab Africa logo (header, footer, favicon) comes from
`https://showroom.gritlabafrica.org/assets/images/logo.png`.

## Netlify (still supported)

`netlify.toml` and `netlify/functions/api.mjs` are kept, so the same project
can also deploy to Netlify with Netlify Blobs as the store.
