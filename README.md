# Marketing

Helix Prime Solutions marketing site: **Django CMS** backend and **Next.js 15** (App Router) frontend. Content (home hero, pillars, stats, showcases, services, portfolio, blog, about, social links) is managed in Django Admin and consumed by the frontend over a JSON API.

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
python manage.py runserver
```

- API base: `http://127.0.0.1:8000`
- Admin: `http://127.0.0.1:8000/admin/`
- Example: home bundle `GET http://127.0.0.1:8000/api/cms/home/`

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

Add and publish in **Django Admin** (CMS section):

- **Home — Hero**, **Pillar cards**, **Stats**, **Showcase blocks**, **Testimonials**
- **Services**, **Projects**, **Blog posts**, **About**
- **Social links** (footer; optional env fallbacks in `frontend/.env.local`)

The home page renders pillars, stats, and showcases from these models.

## Production notes

- Set `DJANGO_DEBUG=false`, a strong `DJANGO_SECRET_KEY`, and real `DJANGO_ALLOWED_HOSTS` / `CORS_ALLOWED_ORIGINS`.
- Serve `MEDIA_URL` for uploaded images (or use object storage).
- Build the frontend with `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_SITE_URL` pointing at production.
- Run database migrations on deploy: `python manage.py migrate`.

## License

Proprietary — Helix Prime Solutions / project owners unless stated otherwise.
