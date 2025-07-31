# JobTrackr – Job Application Tracker

A full-stack web app for managing job applications, built with:
- React + Vite + Tailwind (Frontend)
- Node.js + Express + MongoDB (Backend)
- JWT Auth, Chart.js, Axios

---

## 🔐 Environment Variables

### Backend (.env)

```
PORT=4000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
```

### Frontend (.env for Vercel if needed)

If using Vercel, set `VITE_API_URL=https://your-backend-render-url.onrender.com/api` in project settings.

---

## 🚀 Deployment Instructions

### 🖥 Backend (Render)

1. Push `/backend` to a GitHub repo.
2. Go to https://render.com and click "New Web Service".
3. Connect to your GitHub repo.
4. Set:
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Environment**:
     - `NODE_VERSION=18`
     - `PORT=4000`
     - `MONGO_URI`
     - `JWT_SECRET`

---

### 🌐 Frontend (Vercel)

1. Push `/frontend` to another GitHub repo.
2. Go to https://vercel.com and import the repo.
3. Set:
   - **Framework**: Vite
   - **Environment Variable**:
     - `VITE_API_URL=https://your-backend-url.onrender.com/api`

---

## 🧪 Testing (Optional)

- Frontend: `Vitest`
- Backend: `Jest`

---

✅ Project Complete! Visit `/login`, `/register`, and track your jobs via dashboard.