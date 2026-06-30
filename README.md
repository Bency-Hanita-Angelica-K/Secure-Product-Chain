# 🔗 Secure Product Chain

A Blockchain-Based Fake Product Detection System that enables manufacturers to register products on the Ethereum blockchain and allows customers to verify product authenticity using QR codes.

---

## 📖 Project Overview

Counterfeit products are a major issue across industries. This project uses Blockchain technology to create an immutable product registry where manufacturers can securely register products and customers can verify authenticity by scanning a QR code.

---

## ✨ Features

- 👤 User Registration & Login
- 🔐 JWT Authentication
- 👨‍💼 Role-Based Access (Admin, Manufacturer, Customer)
- ⛓ Ethereum Smart Contract
- 🦊 MetaMask Wallet Integration
- 📦 Product Registration
- 📱 QR Code Generation
- ✅ Product Verification
- 🗄 MongoDB Database
- 🌐 REST API using Express.js

---

## 🛠 Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Ethers.js

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

### Blockchain
- Solidity
- Hardhat
- MetaMask
- Ethereum Local Network

---

## 📂 Project Structure

```
SecureProductChain/
│
├── backend/
├── frontend/
├── contracts/
├── ignition/
├── screenshots/
├── test/
├── package.json
├── hardhat.config.js
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/Bency-Hanita-Angelica-K/Secure-Product-Chain.git
```

### Install Dependencies

```bash
npm install
```

```bash
cd backend
npm install
```

### Start Hardhat Node

```bash
npx hardhat node
```

### Deploy Smart Contract

```bash
npx hardhat ignition deploy ./ignition/modules/ProductVerification.js --network localhost
```

### Start Backend

```bash
cd backend
npm start
```

### Start Frontend

Open the `frontend` folder using VS Code Live Server.

---

## 📸 Project Screenshots

### 🏠 Homepage

![Homepage](screenshots/1-homepage.png)

---

## 👨‍🏭 Manufacturer Module

### Manufacturer Login

![Manufacturer Login](screenshots/Manufacturer/manufacturer-login.png)

### Dashboard

![Dashboard](screenshots/Manufacturer/manufacturer-dashboard.png)

### Add Product

![Add Product](screenshots/Manufacturer/add-product-form.png)

### MetaMask Transaction

![MetaMask](screenshots/Manufacturer/metamask-confirmation.png)

### Product Registration & QR Code Generation

![Product Registration and QR Code](screenshots/Manufacturer/product-registration-and-qr.png)

---

## 👤 Customer Module

### Customer Login

![Customer Login](screenshots/Customer/customer-login.png)

### Scan QR Code

![QR Scanner](screenshots/Customer/qr-scanner.png)

### Verify Product

![Verify Product](screenshots/Customer/verify-product-page.png)

### Genuine Product Result

![Verified](screenshots/Customer/product-verified.png)

### Invalid Product Result

![Invalid Product](screenshots/Customer/invalid-product.png)

---

## 👨‍💼 Admin Module

# 👨‍💼 Admin Module

### Admin Registration

![Admin Registration](screenshots/Admin/admin-register.png)

### Admin Login

![Admin Login](screenshots/Admin/admin-login.png)

### Admin Dashboard

![Admin](screenshots/Admin/admin-dashboard.png)

---

## ⚙️ Technical Setup

### MetaMask Connected

![MetaMask](screenshots/Technical/metamask-connected.png)

### Hardhat Local Network

![Hardhat](screenshots/Technical/hardhat-node.png)

### MongoDB Connected

![MongoDB](screenshots/Technical/mongodb-connected.png)
---

## 🔮 Future Enhancements

- Deploy to Ethereum Sepolia Testnet
- Mobile QR Scanner
- Admin Approval Dashboard
- Product History Tracking
- Cloud Deployment
- IPFS Integration

---

## 👨‍💻 Author

**Bency Hanita Angelica K**

Computer Science Engineering Student

Blockchain | Web Development | Cybersecurity Enthusiast

---

## ⭐ If you like this project

Give this repository a ⭐ on GitHub.
