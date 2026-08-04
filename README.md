# 🔐 SecureVault - Password Vault & Credential Management System

A secure Password Vault application built using **React, Spring Boot, and PostgreSQL**. The application allows users to securely manage their credentials with authentication, OTP-based password reset, and a modern dashboard.

---

## 🚀 Features

### 🔑 Authentication
- User Registration
- User Login
- BCrypt Password Encryption
- Forgot Password
- OTP Verification via Email
- Reset Password
- Logout
- Protected Routes

### 🔒 Credential Management
- Add Credential
- View Credentials
- Update Credential
- Delete Credential
- Search Credentials
- Favourite Credentials
- Show / Hide Password
- Copy Password

### 📊 Dashboard
- Total Credentials
- Favourite Credentials Count
- Categories Count
- Recent Credentials

### 👤 Profile
- View Username
- View Email

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Bootstrap 5

### Backend
- Spring Boot
- Spring Security
- Spring Data JPA
- Java Mail Sender

### Database
- PostgreSQL

---

## 📂 Project Structure

```
SecureVault
│
├── frontend
│   ├── Components
│   ├── Pages
│   ├── Services
│   └── App.jsx
│
├── backend
│   ├── Controller
│   ├── Service
│   ├── Repository
│   ├── Entity
│   ├── DTO
│   └── Config
│
└── PostgreSQL
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/lakshmandhulipudi/SecureVault.git
```

### Backend

```bash
cd backend
mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📸 Screenshots

- Login Page
- Registration Page
- Forgot Password
- OTP Verification
- Reset Password
- Dashboard
- Add Credential
- View Credentials
- Profile Page

(Add screenshots later)

---

## 📌 Future Enhancements

- Password Generator
- Password Strength Meter
- Website URL Support
- Notes for Credentials
- Export Credentials
- Import Credentials
- Dark Mode
- AES Password Encryption

---

## 👨‍💻 Author

**Dhulipudi Lakshman**

GitHub:
https://github.com/lakshmandhulipudi
