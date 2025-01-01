# Goldwave Casino

A modern sweepstakes casino platform built with Node.js, React, and PostgreSQL.

## Features

- User authentication with JWT
- Decimal-based sweepcoins system
- Promotional system with bonus coins
- Real-time balance updates
- Secure payment processing
- Game integration ready
- Mobile-responsive design

## Tech Stack

### Backend
- Node.js
- Express
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- Winston Logger

### Frontend
- React
- Vite
- TailwindCSS
- React Router
- Context API

## Prerequisites

- Node.js >= 18
- PostgreSQL >= 14
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/goldwave-casino.git
cd goldwave-casino
```

2. Install dependencies:
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Set up environment variables:
```bash
# Backend
cp .env.example .env
# Edit .env with your configuration
```

4. Create database:
```bash
createdb goldwave_casino
```

5. Run migrations and seeds:
```bash
cd backend
npm run migrate
npm run seed
```

## Development

Start the backend server:
```bash
cd backend
npm run dev
```

Start the frontend development server:
```bash
cd frontend
npm run dev
```

## Testing

Run backend tests:
```bash
cd backend
npm test
```

## Production Deployment

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Set production environment variables
3. Start the server:
```bash
cd backend
npm start
```

## API Documentation

API endpoints are documented in the [API.md](./API.md) file.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.

## Security

Please report any security issues to security@example.com 