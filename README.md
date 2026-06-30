# 🔗 Secure Product Chain

A professional blockchain-based fake product detection system. Manufacturers register products, product metadata is stored in MongoDB, the product proof is stored on Ethereum smart contract, and customers verify authenticity using Product ID or QR code.

## ✅ Features

- MetaMask wallet connection
- Solidity smart contract with admin and approved manufacturer flow
- MongoDB database for product metadata
- Login and registration with JWT authentication
- Roles: Admin, Manufacturer and Customer
- Manufacturer dashboard to add products
- QR code generation for each registered product
- Customer verification page
- Admin dashboard to view registered products
- Hardhat local blockchain setup
- Test case for smart contract

## 🛠️ Tech Stack

Solidity, Hardhat, Ethers.js, MetaMask, Node.js, Express.js, MongoDB, Mongoose, JWT, HTML, CSS and JavaScript.

## 📂 Project Structure

```text
SecureProductChain/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── contracts/
│   └── ProductVerification.sol
├── frontend/
│   ├── css/
│   ├── js/
│   ├── pages/
│   └── index.html
├── ignition/modules/ProductVerification.js
├── test/ProductVerification.test.js
├── hardhat.config.js
└── README.md
```

## 🚀 Setup Instructions

### 1. Install blockchain dependencies

```bash
npm install
```

### 2. Start Hardhat local blockchain

```bash
npm run node
```

### 3. Deploy smart contract

Open another terminal:

```bash
npm run deploy
```

After deployment, copy the deployed contract address into `frontend/js/app.js` if it is different from the default local Hardhat address.

### 4. Setup backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Make sure MongoDB is running locally.

### 5. Start frontend

```bash
cd frontend
py -m http.server 5500
```

Open `http://localhost:5500`.

## 🧪 Run Tests

```bash
npm test
```

## 🎯 How It Works

1. Admin or manufacturer registers/logs in.
2. Manufacturer adds product details.
3. Product proof is saved on blockchain.
4. Product metadata and QR code are saved in MongoDB.
5. Customer scans QR or enters Product ID.
6. System verifies blockchain data and displays result.

## 👩‍💻 Author

Bency Hanita Angelica K
