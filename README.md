# IHStransport

# Cashless Transit (Web App)

A web-based platform for **cashless travel** on **buses, planes, and ships** using **NFC prepaid cards** and **Vodafone M-Vatu** for payments and top-ups. All amounts are in **VUV** (Vanuatu Vatu).

This system supports:
- Card provisioning and management
- M-Vatu-based card top-ups
- Multi-mode fleet (bus, plane, ship) and operator management
- Transaction processing (online & offline sync)
- Reporting and settlements

---

## Quick Start

See [INSTALLATION.md](./INSTALLATION.md) for detailed setup instructions.

### Quick Setup:

```bash
# 1. Install PostgreSQL and create database
sudo -u postgres psql
CREATE DATABASE bus_cashless;
CREATE USER bus_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE bus_cashless TO bus_user;
\q

# 2. Setup Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run migrate
npm run dev

# 3. Setup Frontend (new terminal)
cd frontend
npm install
npm run dev

# 4. Access the app
# Open http://localhost:3000
# Login: use the administrator account. Passwords are not stored in this repository.
```

---

## System Overview

The platform enables passengers to pay for bus, plane, and ship travel using one NFC card, while allowing:
- Customers to top up cards using **Vodafone M-Vatu**
- Operators to track revenue across their fleet
- Administrators to control fares, cards, and settlements

### Key Components
- Web Admin Portal (React.js)
- Backend API (Node.js/Express)
- PostgreSQL Database
- NFC devices (Android app - see `NFC-app/` folder)
- M-Vatu top-up settings (no merchant HTTP API is published yet; see `docs/MVATU_INTEGRATION.md`)

---

## Technology Stack

### Backend
- Node.js with Express.js
- PostgreSQL database
- JWT authentication
- REST API

### Frontend
- React.js with Vite
- React Router
- Axios for API calls

### Payment Integration
- Vodafone M-Vatu. Public docs cover USSD `*120#`, the M-Vatu app, and QR bill pay. There is no published merchant HTTP API, so a top-up stays pending and does not credit the card until Vodafone supplies a contract.

---

## Project Structure

```
bus-cashless-system/
│
├── backend/
│   ├── src/
│   │   ├── auth/          # Authentication routes
│   │   ├── cards/         # Card management
│   │   ├── payments/      # Payment processing & M-Vatu integration
│   │   ├── buses/         # Bus management
│   │   ├── owners/        # Bus owner management
│   │   ├── reports/       # Reporting endpoints
│   │   ├── middleware/    # Auth middleware
│   │   ├── config/        # Configuration files
│   │   └── app.js         # Main application file
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── App.jsx        # Main app component
│   ├── package.json
│   └── vite.config.js
│
├── database/
│   ├── schema.sql         # Database schema
│   └── migrate.js         # Migration script
│
├── NFC-app/               # Android app for NFC devices on buses
│   ├── README.md          # NFC app documentation
│   └── API_INTEGRATION.md # API integration guide
│
├── README.md
└── INSTALLATION.md
```

---

## Core Features

### Admin
- Manage cards and balances
- Manage bus owners and buses
- Configure fares
- View transactions and reports
- Settle payments

### Bus Owners
- View daily/monthly revenue
- Manage buses
- Request payouts

### Agents
- Sell cards
- Assist M-Vatu top-ups

### Customers
- Buy prepaid cards
- Top up cards via M-Vatu
- Use cards on buses

---

## M-Vatu Integration Flow

Passengers choose a card, an amount in VUV, and a Vodafone mobile number. The system records the request. It does not call Digicel and it does not invent a Vodafone endpoint. The card balance increases only after a configured provider returns an approved payment. Fare taps spend the card balance only.

See `docs/MVATU_INTEGRATION.md`.

---

## Environment Configuration

Create a `.env` file in `backend/`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bus_cashless
DB_USER=bus_user
DB_PASSWORD=********

PORT=3001
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here

MVATU_API_URL=
MVATU_API_KEY=
MVATU_USERNAME=
MVATU_PASSWORD=
MVATU_MERCHANT_MOBILE=
MVATU_MERCHANT_CODE=
```

---

## Security Considerations

* M-Vatu credentials must **never** be exposed to frontend
* All M-Vatu API calls must be server-side
* Use HTTPS only in production
* Log all payment transactions
* Prevent duplicate order IDs
* Change default admin password

---

## Offline Bus Payments

Bus NFC devices:
* Deduct fare locally
* Store transactions offline
* Sync with backend when internet is available

The web app handles **reconciliation**.

---

## API Documentation

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register new user
- `GET /api/auth/me` - Get current user

### Cards
- `GET /api/cards` - List cards
- `POST /api/cards` - Create card
- `GET /api/cards/:cardUid` - Get card details
- `PATCH /api/cards/:id/balance` - Update balance
- `PATCH /api/cards/:id/status` - Update status

### Payments
- `POST /api/payments/topup/initiate` - Initiate M-Vatu top-up
- `POST /api/payments/topup/send-otp` - Send OTP
- `POST /api/payments/topup/approve` - Approve payment
- `POST /api/payments/fare` - Process fare payment
- `GET /api/payments/transactions` - Transaction history

### Buses
- `GET /api/buses` - List buses
- `POST /api/buses` - Create bus
- `GET /api/buses/:id/revenue` - Get revenue

### Bus Owners
- `GET /api/owners` - List owners
- `POST /api/owners` - Create owner
- `GET /api/owners/:id/revenue` - Get revenue

### Reports
- `GET /api/reports/dashboard` - Dashboard stats
- `GET /api/reports/transactions` - Transaction report
- `GET /api/reports/mycash` - M-Vatu report

---

## Deployment

Recommended:
* Backend: VPS / Cloud server with PM2
* Database: Managed PostgreSQL
* Frontend: Nginx / Cloud hosting (Vercel, Netlify)

---

## Future Enhancements

* Mobile app for customers
* QR-code payments
* Distance-based fares
* Student / senior cards
* Government reporting integration
* Real-time transaction sync

---

## License & Compliance

This system must comply with:
* Vodafone M-Vatu merchant terms
* Local transport regulations
* Data protection requirements

---

## Status

🚧 Initial Development / Pilot Phase

---

## Support

For integration support:
* Backend team
* Vodafone M-Vatu integration team
* System administrator
