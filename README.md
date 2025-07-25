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

## 🌐 Live Demo

👉 [**Remova App Live**](https://remova.onrender.com/)

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
VITE_BACKEND_URL=your_backend_url
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
<img width="1729" height="835" alt="Screenshot 2025-07-25 221528" src="https://github.com/user-attachments/assets/dee4e2b4-8b8c-4089-a341-bb1ff6a6e988" />
<img width="1743" height="620" alt="Screenshot 2025-07-25 221533" src="https://github.com/user-attachments/assets/dfd28af2-26d6-4604-8676-1275937766eb" />
<img width="1785" height="869" alt="Screenshot 2025-07-25 221543" src="https://github.com/user-attachments/assets/6625bacd-a092-4369-8018-6984748bb9e9" />
<img width="1812" height="876" alt="Screenshot 2025-07-25 221614" src="https://github.com/user-attachments/assets/95f4b5fd-6305-483b-82ef-f6be6088eedd" />
<img width="1735" height="766" alt="Screenshot 2025-07-25 221636" src="https://github.com/user-attachments/assets/0cb3de8d-c5e5-479e-8d9a-ab10c366c922" />
<img width="1895" height="1012" alt="Screenshot 2025-07-25 221704" src="https://github.com/user-attachments/assets/61ed40d4-0720-4e25-98bb-8c122c06b2cf" />
<img width="1848" height="890" alt="Screenshot 2025-07-25 221718" src="https://github.com/user-attachments/assets/42aa784f-86e6-4451-8259-a9acffe68a3b" />
<img width="1600" height="865" alt="image" src="https://github.com/user-attachments/assets/3e3f3298-ba36-4347-9478-aed55bb55b26" />



---

## 🛠️ To-Do

* [ ] Add drag-and-drop support for image uploads
* [ ] Show credit usage history
* [ ] Dark mode toggle

---

---

## 🤝 Acknowledgements

* [ClipDrop API](https://clipdrop.co/apis)
* [Clerk.dev](https://clerk.dev)
* [Razorpay](https://razorpay.com)

---

## 👨‍💻 Author

Built by [@borugaddaebenezer](https://github.com/borugaddaebenezer)

> [LinkedIn](www.linkedin.com/in/ebenezer-borugadda-5481242b6) • [Portfolio](https://yourportfolio.com)

```
