# Marketing

Helix Prime Solutions marketing site: **Django** backend and **Next.js 15** (App Router) frontend. Most marketing copy lives in the frontend (`frontend/src/lib/siteContent.ts`); **services**, **portfolio projects**, and **blog posts** are loaded from Django Admin via `/api/cms/`.

**Repository:** [github.com/HammadAli64/Marketing](https://github.com/HammadAli64/Marketing)

## Project layout

| Path | Description |
|------|-------------|
| `backend/` | Django project (`helix_backend`), `cms` app, REST-style JSON endpoints under `/api/cms/` |
| `frontend/` | Next.js app (TypeScript, Tailwind) |

## Prerequisites

- **Python** 3.11+ (recommended)
- **Node.js** 20+
- **npm**

## Backend (Django)

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
copy .env.example .env   # Windows — or cp on Unix; edit values
python manage.py migrate
python manage.py createsuperuser   # optional, for admin
python manage.py seed_cms        # optional: starter rows in SQLite (visible in admin)
python manage.py runserver
```

- API base: `http://127.0.0.1:8000`
- Admin: `http://127.0.0.1:8000/admin/` — on the index page, open the **CMS** section (not “Authentication and Authorization” only). Contact form messages: **Inquiries** → **Inquiries**.

### Seed sample CMS data (SQLite)

After migrate, run:

```bash
python manage.py seed_cms
```

This fills **empty** tables only (home hero, about page, stats, pillars, showcase, testimonials, six services, two blog posts, six social links). Content is **professional Helix Prime** copy, not lorem ipsum.

To **replace** existing marketing data in the database with that same professional set (deletes current hero, about, home blocks, services, blogs, social links; **does not** delete portfolio projects or contact inquiries):

```bash
python manage.py seed_cms --reset-professional --yes
```

After a reset, upload hero/showcase images in admin and set a real **WhatsApp** number if you use that link.

**Cloned from GitHub?** `backend/db.sqlite3` is not in the repo (`.gitignore`). You must run `migrate`, `createsuperuser`, and `seed_cms` or the admin lists will be empty.

Check your setup anytime:

```bash
python manage.py cms_status
```

- Example API: `GET http://127.0.0.1:8000/api/cms/home/`

Configure CORS and hosts in `.env` (see `backend/.env.example`). Contact form email uses Gmail SMTP settings when configured.

## Frontend (Next.js)

```bash
cd frontend
copy .env.example .env.local   # Windows — edit NEXT_PUBLIC_API_URL if needed
npm install
npm run dev
```

- App: `http://localhost:3000`
- `NEXT_PUBLIC_API_URL` must match your Django origin (no trailing slash).
- For Docker or SSR-only API hostname, set `CMS_API_URL` (see `frontend/.env.example`).

### npm scripts

- `npm run dev` — clean `.next` then `next dev` (helps avoid stale chunks on Windows)
- `npm run dev:quick` — `next dev` only
- `npm run build` / `npm start` — production build and server

## CMS content checklist

**Django Admin** (CMS section) is used for:

- **Services** (home grid, `/services`, contact form dropdown)
- **Projects** (home portfolio strip, `/portfolio`)
- **Blog posts** (home preview, `/blogs`)

**Frontend-only** (edit `frontend/src/lib/siteContent.ts` and redeploy): home hero, impact stats, showcase blocks, testimonials, about page story/mission, and most section copy. **Footer social icons** use `NEXT_PUBLIC_SOCIAL_*` in `frontend/.env.local` (see `constants.ts`).

### Wrong or “missing” text on the site

Most public copy is in **`frontend/src/lib/siteContent.ts`** (redeploy after edits). For **services / projects / blogs**, confirm `NEXT_PUBLIC_API_URL` points at your Django server and check Django Admin.

Backend **`content_defaults.py`** still fills the **JSON API** when tables are empty (useful for API-only consumers or `seed_cms`). To reset DB marketing rows:

```bash
cd backend
python manage.py seed_cms --reset-professional --yes
```

Confirm the API URL in `frontend/.env.local` (`NEXT_PUBLIC_API_URL` / `CMS_API_URL`) points at the **same** `runserver` instance where you edit admin. In development, CMS fetches skip Next.js caching by default so a normal refresh should reflect admin saves.

## Production notes

- Set `DJANGO_DEBUG=false`, a strong `DJANGO_SECRET_KEY`, and real `DJANGO_ALLOWED_HOSTS` / `CORS_ALLOWED_ORIGINS`.
- Serve `MEDIA_URL` for uploaded images (or use object storage).
- Build the frontend with `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SITE_URL` pointing at production.
- Run database migrations on deploy: `python manage.py migrate`.

## License

Proprietary — Helix Prime Solutions / project owners unless stated otherwise.
