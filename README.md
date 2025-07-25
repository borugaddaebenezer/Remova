# 🎨 Remova — AI Background Remover App

Remova is a full-stack web application that allows users to remove image backgrounds using AI. It features secure authentication, image processing via an external API, and payment integration for purchasing credits.

---

## 🚀 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Clerk, React Router, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: Clerk
- **Payments**: Razorpay
- **Image Processing API**: ClipDrop

---

## 📁 Project Structure

```

Remova/
├── client/             # Frontend - React + Vite
│   ├── public/
│   ├── src/
│   └── .env            # Environment variables for frontend
│
├── server/             # Backend - Express + MongoDB
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   └── .env            # Environment variables for backend
│
├── .gitignore
├── README.md
└── package.json        # Root scripts

````

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/remova.git
cd remova
````

### 2. Install Dependencies

```bash
# From root
npm install

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

---

## 🧪 Running the App

### Development

**Run backend and frontend separately:**

```bash
# Backend
cd server
npm run dev

# Frontend (in a separate terminal)
cd client
npm run dev
```

---

### Production Build

```bash
# Build frontend and install everything
npm run build

# Start backend server (serves frontend too)
npm start
```

---

## 📦 Environment Variables

### Client (`client/.env`)

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:4000
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

### Server (`server/.env`)

```env
MONGODB_URL=your_mongodb_connection_string
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
CLIPDROP_API=your_clipdrop_api_key
RAZORPAY_KEY_ID=your_razorpay_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
CURRENCY=INR
NODE_ENV=production
```

> **Note:** Never commit `.env` files to version control.

---

## 💡 Features

* 🔐 Clerk-based authentication
* ✂️ Background removal via ClipDrop API
* 💳 Razorpay integration for payments
* 🧾 Credit system with balance tracking
* 📦 Protected routes and image upload
* 🧼 Clean, responsive UI built with Tailwind CSS

---

## 📸 Screenshots

> *(Add screenshots of your homepage, result page, and credit page here for better showcase)*

---

## 🛠️ To-Do

* [ ] Add drag-and-drop support for image uploads
* [ ] Show credit usage history
* [ ] Dark mode toggle
* [ ] Deploy to Render / Vercel / Railway

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Acknowledgements

* [ClipDrop API](https://clipdrop.co/apis)
* [Clerk.dev](https://clerk.dev)
* [Razorpay](https://razorpay.com)

---

## 👨‍💻 Author

Built with ❤️ by **\[Your Name Here]**

> [LinkedIn](www.linkedin.com/in/ebenezer-borugadda-5481242b6) • [Portfolio](https://yourportfolio.com)

```
