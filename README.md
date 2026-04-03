# OSIYO XALQARO MAKTABI Platform

OSIYO XALQARO MAKTABI uchun production-style full-stack maktab veb-platformasi. Loyiha premium school branding, ko‘p tillilik, public school website, admin panel, REST API, JWT auth va PostgreSQL bilan qurilgan.

## Tech Stack

- Backend: Java 21, Spring Boot, Spring Security, JWT, Spring Data JPA, Hibernate
- Frontend: React, JavaScript, Vite, Tailwind CSS
- Database: PostgreSQL
- API: REST
- Build tools: Maven, npm

## Folder Structure

```text
.
|-- backend
|   |-- pom.xml
|   `-- src/main
|       |-- java/com/osiyo/school
|       |   |-- config
|       |   |-- controller
|       |   |-- dto
|       |   |-- entity
|       |   |-- exception
|       |   |-- mapper
|       |   |-- repository
|       |   |-- security
|       |   |-- service
|       |   `-- util
|       `-- resources
|           |-- application.yml
|           |-- db/schema.sql
|           `-- static/placeholders
|-- frontend
|   |-- package.json
|   |-- vite.config.js
|   |-- tailwind.config.js
|   |-- .env.example
|   `-- src
|       |-- components
|       |-- context
|       |-- data
|       |-- hooks
|       |-- layouts
|       |-- pages
|       |-- router
|       |-- services
|       `-- utils
`-- README.md
```

## Main Features

- Uzbek default public website with English and Russian switcher
- Home, About, Admissions, Academics, Student Life, News, Events, Gallery, FAQ, Contact pages
- Admin login/logout with JWT authentication
- CRUD for news, events, gallery, FAQ, teachers
- Homepage section management and settings management
- Admission form submission to PostgreSQL
- Contact form submission to PostgreSQL
- Image upload support for admin content
- Seed/demo data for homepage, teachers, news, events, FAQ, gallery, and admin user

## PostgreSQL Setup

1. PostgreSQL o‘rnating.
2. Yangi database yarating:

```sql
CREATE DATABASE osiyo_school;
```

3. `backend/src/main/resources/application.yml` ichidagi env qiymatlari orqali database ulanishini sozlang yoki shell environment yarating.

## Backend Environment

Backend `application.yml` env fallback qiymatlari bilan keladi:

- `DB_URL=jdbc:postgresql://localhost:5432/osiyo_school`
- `DB_USERNAME=postgres`
- `DB_PASSWORD=postgres`
- `SERVER_PORT=8080`
- `APP_CORS_ALLOWED_ORIGINS=http://localhost:5173`
- `APP_JWT_SECRET=<base64-secret>`
- `APP_JWT_EXPIRATION_MS=86400000`
- `APP_UPLOAD_DIR=uploads`

## Frontend Environment

`frontend/.env.example` faylidan foydalaning:

```bash
VITE_API_URL=http://localhost:8080/api
VITE_BACKEND_URL=http://localhost:8080
```

## Run Backend

```bash
cd backend
mvn spring-boot:run
```

Backend ishga tushganda:

- `db/schema.sql` PostgreSQL schema yaratadi
- `DataSeeder` demo ma’lumotlarni seed qiladi
- upload fayllar `uploads/` katalogida saqlanadi

## Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend default manzili:

- `http://localhost:5173`

## Deployment Notes

### GitHub

- Repo monorepo ko'rinishida: `backend/` va `frontend/`
- Push qilganda ikkala qism ham bitta GitHub repository ichida bo'lishi mumkin

### Vercel

- Vercel uchun `frontend/` papkani project root sifatida tanlang
- Framework preset: `Vite`
- `frontend/vercel.json` client-side routing uchun qo'shilgan
- Environment variables:

```bash
VITE_API_URL=https://your-backend-domain.com/api
VITE_BACKEND_URL=https://your-backend-domain.com
```

### Backend Hosting

- Joriy Spring Boot backend'ni Vercel'da native tarzda ishga tushirmaymiz
- Backend'ni alohida hostga joylash tavsiya etiladi: `Render`, `Railway`, `Fly.io`, yoki VPS
- PostgreSQL ulanib bo'lgach frontend Vercel'dan shu backend URL'ga murojaat qiladi

## Default Admin Credentials

- Username: `admin`
- Password: `Admin123!`

## API Overview

### Auth

- `POST /api/auth/login`
- `GET /api/auth/me`

### Public

- `GET /api/news`
- `GET /api/news/{slug}`
- `GET /api/events`
- `GET /api/events/{slug}`
- `GET /api/gallery`
- `GET /api/faqs`
- `GET /api/teachers`
- `GET /api/homepage/sections`
- `GET /api/settings/public`
- `POST /api/admissions`
- `POST /api/contact`

### Admin

- `GET /api/admin/dashboard`
- `GET/POST/PUT/DELETE /api/admin/news`
- `GET/POST/PUT/DELETE /api/admin/events`
- `GET/POST/DELETE /api/admin/gallery`
- `GET/POST/PUT/DELETE /api/admin/faqs`
- `GET/POST/PUT/DELETE /api/admin/teachers`
- `GET /api/admin/admissions`
- `GET /api/admin/messages`
- `GET/PUT /api/admin/homepage/sections`
- `GET/PUT /api/admin/settings`
- `POST /api/admin/uploads`

## Notes

- Public site Uzbek-first placeholder kontent bilan to‘ldirilgan.
- English va Russian uchun static kontent tarjimalari qo‘shilgan.
- Dynamic CRUD kontentlar seed bosqichida Uzbek placeholderlar bilan keladi.
- News, events, gallery va teacher rasmlari uchun backend placeholder SVG assetlar qo‘shilgan.

## Suggested Production Next Steps

- Refresh token flow qo‘shish
- Rich text editor va slug preview qo‘shish
- Audit log va admin activity history
- Real map embed va CDN/file storage integratsiyasi
- E2E tests va CI pipeline
