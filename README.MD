<h1 align="center">✨ Full-Stack Chat App with Auth & Emails ✨</h1>

Highlights:
🔥 Chat App – Key Features
🔐 Custom JWT Authentication (no third-party auth)
⚡ Real-time messaging with Socket.io
🟢 Online / offline user presence
🔔 Typing & notification sounds (toggleable)
📨 Email notifications on signup (Resend)
🗂️ Image upload support (Cloudinary)
🧰 REST API built with Node.js & Express
🧱 MongoDB database for persistence
🚦 API rate limiting (Arcjet protection)
🎨 Modern UI with React, Tailwind CSS & DaisyUI
🧠 Zustand for lightweight state management
🧑‍💻 Git/GitHub workflow (branches, PRs, merges)
🚀 Production-ready deployment (free-tier friendly hosting)

---

## 🧪 .env Setup

### Backend (`/backend`)

```bash
PORT=3000
MONGO_URI=your_mongo_uri_here

NODE_ENV=development

JWT_SECRET=your_jwt_secret

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_email_from_address
EMAIL_FROM_NAME=your_email_from_name

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

---

## 🔧 Run the Backend

```bash
cd backend
npm install
npm run dev
```

## 💻 Run the Frontend

```bash
cd frontend
npm install
npm run dev
```
