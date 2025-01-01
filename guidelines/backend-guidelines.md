# Backend Guidelines

This document outlines how to build the backend of the premiere online casino web app so that the frontend guidelines can be fully realized. Every API endpoint must integrate seamlessly with the UI to ensure no dead or placeholder features.

---

## 1. Technology & Setup

1. **Choose a Server-Side Framework** (e.g., Node.js with Express/NestJS, Python Flask/Django, etc.)  
2. **Project Initialization**  
   - Example (Node + Express):  
     ```bash
     npm init -y
     npm install express body-parser cors helmet bcrypt jsonwebtoken
     ```
   - Create a source folder (`/src`); structure your project to separate concerns (models, controllers, routes).

---

## 2. Database & ORM

1. **Database**  
   - Preferably SQL (PostgreSQL) with an ORM like Sequelize or TypeORM for Node.  
   - Refer to “database-guidelines.md” for recommended tables (users, balances, transactions, bets, promotions, etc.).  

2. **Migrations & Seeding**  
   - Set up migrations to version-control schema changes.  
   - Seed the database with sample data (games, promotions, etc.) to allow quick local testing.

---

## 3. Authentication & Authorization

1. **JWT or Session**  
   - Issue JWT upon successful login (`POST /auth/login`).  
   - Validate JWT for all protected routes.  
2. **Password Security**  
   - Use `bcrypt` to hash passwords.  
   - Provide a “forgot password” or “reset password” mechanism if required.

---

## 4. Core Endpoints

Below is a high-level summary of essential endpoints. For a more exhaustive list, see “API-guidelines.md.”

1. **Auth**  
   - `POST /auth/signup`  
   - `POST /auth/login`  
   - `GET /auth/logout`  
   - `GET /auth/me` (retrieve user info)
2. **Account Management**  
   - `GET /account/balance`: Return user’s available balances (cash, bonus, etc.).  
   - `POST /account/deposit`: Add funds.  
   - `POST /account/withdraw`: Withdraw funds.  
   - `GET /account/transactions`: List past deposits, withdrawals, bets, wins.
3. **Games**  
   - `GET /games`: Retrieve all available games.  
   - `GET /games/:gameId`: Specific game details.  
   - `POST /games/:gameId/play`: Place a bet or start a game round. Must link to real bet logic, no placeholders.
4. **Promotions**  
   - `GET /promotions`: Fetch all promotions.  
   - `POST /promotions/claim/:promoId`: Claim a specific promotion; must update bonus balance or transaction logs.  
5. **Payment Methods** (Optional)  
   - `POST /payments`: Create or store a new payment method.  
   - `DELETE /payments/:paymentMethodId`: Remove a stored method.

---

## 5. Game Mechanics & Logic

1. **Slots / Table Games**  
   - For each game type, ensure you have legitimate logic or tie-in to an RNG.  
   - On every bet, update the user’s transaction history, reflect the new balance, and log bet/payout.  
2. **Real-Time (Optional)**  
   - Consider websockets if you add live dealers or real-time betting events.

---

## 6. Security & Compliance

1. **Helmet & CORS**  
   - Add the `helmet` middleware for secure HTTP headers.  
   - Restrict CORS to your frontend’s domain in production.  
2. **Rate Limiting**  
   - For login or deposit endpoints to prevent brute force or abuse.  
3. **Audit Trails**  
   - Log critical events (login attempts, suspicious transactions) in an “audit logs” table.  
4. **Gambling Regulations**  
   - Age verification, KYC checks if required.  
   - Review relevant local or international compliance for real-money gaming.

---

## 7. Testing

1. **Unit Tests**  
   - Write tests for each controller and service method.  
2. **Integration Tests**  
   - Use a tool like `supertest` with Node/Express to verify endpoints’ behavior end-to-end.  
3. **Staging Environment**  
   - Deploy a staging version of the backend. Connect it to the staging frontend for QA tests.

---

## 8. Deployment & Monitoring

1. **Continuous Integration/Deployment**  
   - Set up pipelines (GitHub Actions, Jenkins, or CircleCI) to automatically run tests on every commit.  
2. **Cloud Hosting**  
   - Node-based apps can run on AWS EC2, AWS Elastic Beanstalk, Heroku, etc.  
   - Use a managed PostgreSQL service for the database (AWS RDS, Azure DB, etc.).  
3. **Monitoring & Logs**  
   - Use a logging library (Winston or pino) and a monitoring service (Datadog, New Relic, or AWS CloudWatch).  

---

## 9. Ensuring Full Feature Completion

- All frontend calls to deposit, withdraw, or claim promotions must hit fully implemented backend endpoints.  
- No stubs: If a “Play Now” button triggers a game flow, the backend route that processes bets needs real logic and returns real results.  
- Maintain open communication with frontend developers to ensure consistency in request/response structures.

---

## Conclusion

By following these backend guidelines in tandem with the “frontend-guidelines.md”, every link, button, and feature from the user interface will be backed by real functionality. Ensure that every route is tested, no placeholders remain, and the complete casino experience matches or surpasses the reference layout and user flow of mcluck.com. All code should be secure, efficient, and ready for production deployment.