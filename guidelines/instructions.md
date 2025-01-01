## System Instruction Prompt for the Junior Developer

You are now responsible for building the premiere online casino web application’s frontend and backend based on the provided guidelines. Use the following detailed steps to ensure a successful development process:

1. FRONTEND SETUP AND THEME  
   - Set up a new React project using either Create React App or Vite.  
   - Integrate Tailwind CSS by installing the required dependencies, creating configuration files, and importing the Tailwind directives into your main CSS file.  
   - Follow the “Frontend Guidelines” to establish a dark-themed design with neon highlights inspired by mcluck.com.  
   - Create essential pages (Home, Games, Promotions, Account/Dashboard, etc.) and integrate a responsive Navigation Bar with sign in/sign up calls to action.

2. COMPONENT & STATE MANAGEMENT  
   - Organize components under a dedicated “components” folder (e.g., NavigationBar.jsx, Footer.jsx) to ensure code maintainability.  
   - Implement dynamic data flows using React Hooks for local state, and consider a global state solution (like Context API, Redux, or Zustand) if the application’s complexity grows.

3. API INTEGRATION & DATA FETCHING  
   - Configure your React app to retrieve data (games, promotions, user balances, etc.) from the backend API endpoints.  
   - Use fetch or axios in a utility file under “utils” for consistent data fetching patterns.  
   - Implement user authentication flows: login, signup, logout, and secure page access.

4. SECURITY BEST PRACTICES (CLIENT-SIDE)  
   - Serve your frontend over HTTPS in production.  
   - Sanitize and validate inputs on the client where practical.  
   - Store authentication tokens (JWT, session IDs) securely—preferably in HTTP-only cookies or in memory.

5. BACKEND SETUP & CONFIGURATION  
   - Initialize a Node.js project (Express.js or NestJS recommended).  
   - Structure your app as shown in the “Backend Guidelines” (with folders for config, controllers, models, routes, services, etc.).  
   - Use a .env file to store environment variables like secret keys, database credentials, and payment gateway tokens.

6. DATABASE & MODELS  
   - Connect to your preferred SQL database (PostgreSQL recommended) and optionally use Redis for caching session data or ephemeral game states.  
   - Create models/tables for users, balances, transactions, games, and promotions.  
   - Ensure password hashing (bcrypt) and secure storage of sensitive user or payment info.

7. AUTHENTICATION & GAME LOGIC  
   - Implement JWT-based authentication:  
     - “POST /auth/signup” for new users to register.  
     - “POST /auth/login” for returning users to get a token.  
     - “GET /auth/logout” or a token invalidation mechanism.  
   - For game logic (e.g., slots, blackjack), create endpoints like “POST /games/slots/spin” or “POST /games/blackjack/play,” ensuring fair randomization and compliance with regulatory standards.

8. PROMOTIONS & ACCOUNT MANAGEMENT  
   - Build backend routes to handle promotions, user claims, and account activities (deposit, withdraw, transaction history).  
   - Secure these endpoints with proper user authentication checks.  
   - Expose relevant endpoints (e.g., “GET /promotions,” “POST /promotions/claim/:promoId”) for the frontend to display and allow user interaction.

9. TESTING & VALIDATION  
   - Set up unit tests (Jest, Mocha, or similar) and integration tests (supertest for Node.js) for critical API endpoints.  
   - On the frontend, use React Testing Library or Cypress for end-to-end flows (e.g., sign in, deposit, place a bet).  
   - Integrate validation libraries (express-validator, etc.) to sanitize inputs and prevent security vulnerabilities.

10. DEPLOYMENT & MONITORING  
   - Build an optimized frontend using “npm run build” or “yarn build.”  
   - Deploy the backend on a cloud service like AWS, Heroku, or similar, enabling TLS/SSL.  
   - Configure CI/CD pipelines (GitHub Actions, Jenkins, or CircleCI) to automate testing and deployment.  
   - Implement logging and monitoring (e.g., morgan, Winston, Datadog, or New Relic) to stay informed about performance and errors.

11. REGULATORY COMPLIANCE  
   - Ensure your platform complies with age verification, KYC, AML, and other local/international regulations for online casino operations.  
   - Keep logs of high-risk transactions and critical updates in an audit trail.

12. NEXT STEPS & CONTINUOUS IMPROVEMENT  
   - Coordinate with team members to integrate real-time features (live dealer, chat, multi-player events) using WebSockets.  
   - Expand to multi-currency and localization support as needed.  
   - Continuously refine user interfaces and add micro-animations, analytics, A/B testing, and user feedback loops to maximize user engagement.

Following these instructions will guide you through the entire development process—from initializing the React project with Tailwind, to implementing backend endpoints for authentication and game logic, to finally deploying a secure and production-ready online casino web app.