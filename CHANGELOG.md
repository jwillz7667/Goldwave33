# Goldwave Casino Development Changelog

## Database Models
- `User.js`
  - Basic user authentication fields (username, email, password)
  - Decimal support for sweepcoins (5.00 default) and bonusCoins (2.50 default)
  - Password hashing with bcryptjs
  - JWT token generation
  - Public JSON transformation

- `UserProfile.js`
  - Extended user details (firstName, lastName, dateOfBirth)
  - KYC status tracking
  - Address information
  - Phone number

- `Game.js`
  - Game information (name, category, description)
  - RTP (Return to Player) rates
  - Min/max bet limits
  - Game status and features
  - Popularity tracking

- `Transaction.js`
  - Transaction tracking (deposits, withdrawals, bets)
  - Balance before/after tracking
  - Reference IDs for external systems
  - Transaction status management

- `Promotion.js`
  - Promotional offers management
  - Start/end dates
  - Bonus amount calculations
  - Promo code system

- `PromotionClaim.js`
  - User promotion tracking
  - Claim timestamps
  - Usage status

- `PaymentMethod.js`
  - Stored payment methods
  - Provider tokens
  - Last four digits storage
  - Payment type categorization

- `AuditLog.js`
  - System event tracking
  - User action logging
  - Security event recording

- `CoinPackage.js`
  - Sweepcoins package definitions
  - Price tiers ($4.99 - $99.99)
  - Bonus amounts
  - Package tags

## Backend Components

### Controllers
- `authController.js`
  - User registration with profile creation
  - Login with JWT token generation
  - Profile retrieval
  - Session management

- `gameController.js`
  - Game listing and filtering
  - Bet placement
  - Game state management
  - Win/loss processing

- `packageController.js`
  - Coin package listing
  - Purchase processing
  - Bonus calculation

### Middleware
- `auth.js`
  - JWT token verification
  - User session management
  - Route protection

### Routes
- `auth.js` - Authentication endpoints
- `games.js` - Game management
- `packages.js` - Coin package endpoints
- `promotions.js` - Promotional offers
- `transactions.js` - Financial operations

## Frontend Components

### Pages
- `Register.jsx`
  - User registration form
  - Age verification (18+)
  - Field validation
  - Terms acceptance

- `Login.jsx`
  - User authentication
  - Remember me functionality
  - Password reset link

- `Deposit.jsx`
  - Coin package display
  - Payment method selection
  - Purchase flow
  - Bonus display

### Components
- `Navbar.jsx`
  - User navigation
  - Balance display
  - Buy coins button
  - Authentication state

- `CoinBalance.jsx`
  - Sweepcoins display
  - Bonus coins display
  - Balance formatting

### Context
- `UserContext.jsx`
  - Global user state
  - Authentication state
  - Balance management

## Features Implemented
1. User Authentication
   - JWT-based sessions
   - Password hashing
   - Profile management

2. Currency System
   - Decimal support (2 decimal places)
   - Bonus coins tracking
   - Package tiers:
     * $4.99 = 5.00 coins
     * $9.99 = 10.00 coins
     * $19.99 = 20.00 coins + 2.00 bonus
     * $49.99 = 50.00 coins + 5.00 bonus
     * $99.99 = 100.00 coins + 10.00 bonus

3. Security Features
   - Password encryption
   - Token-based authentication
   - Route protection
   - Input validation

4. Database
   - PostgreSQL integration
   - Transaction support
   - Data validation
   - Relationship management

## Configuration
- Environment variables
- Database configuration
- JWT secret management
- CORS settings
- Security headers 