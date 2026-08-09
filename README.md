 # SecureVault - Password Vault & Credential Management System

SecureVault is a full-stack Password Vault application built using React, Spring Boot, and PostgreSQL. It allows users to securely store, manage, and organize their credentials with OTP-based password recovery, AES encryption, password generation, password strength checking, and secure credential sharing.

---

## Features

### Authentication

- User Registration
- Secure Login
- Forgot Password
- OTP Verification
- Reset Password
- Logout
- Protected Routes

### Credential Management

- Add Credentials
- View Credentials
- Update Credentials
- Delete Credentials
- Search Credentials
- Favourite Credentials
- Show / Hide Password
- Copy Password
- AES Password Encryption
- Password Generator
- Password Strength Checker
- Secure Credential Sharing

### Dashboard

- Total Credentials
- Favourite Credentials
- Categories Count
- Recent Credentials

### Profile

- View Username
- View Email

---

## Technology Stack

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

## Project Structure

```text
SecureVault
│
├── frontend
├── backend
├── screenshots
└── README.md
```

---

## Screenshots

### Login

![Login](./screenshots/login.png)

---

### Register

![Register](./screenshots/register.png)

---

### Forgot Password

![Forgot Password](./screenshots/forgotpassword.png)

---

### Verify OTP

![Verify OTP](./screenshots/verifyOtp.png)

---

### Reset Password

![Reset Password](./screenshots/resetPassword.png)

---

### Dashboard

![Dashboard](./screenshots/dashboard.png)

---

### Add Credential

![Add Credential](./screenshots/AddCredentials.png)

---
### Share Credential

![Share Credential](./screenshots/sharedCredential.png)

---
### Saved Credentials

![Credentials](./screenshots/Credentials.png)

---

### Profile

![Profile](./screenshots/profile.png)

---

## Installation

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

## Future Enhancements

- Website URL Support
- Notes for Credentials
- Import Credentials
- Export Credentials
- Dark Mode

---

## Author

**Dhulipudi Lakshman**

GitHub:  
https://github.com/lakshmandhulipudi 



