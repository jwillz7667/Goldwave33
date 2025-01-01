# Frontend Guidelines

This document provides a comprehensive roadmap for building the frontend of the premiere online casino web app. All features, buttons, and links must be fully functional—no placeholders or dead links are allowed.

The design and user flow should take strong inspiration from mcluck.com. You will have access to screenshots from mcluck.com’s interface (e.g., screenshot-lobby.png, screenshot-promotions.png, screenshot-account.png). Refer to them for visual cues, color palettes, and layout ideas.

---

## 1. Environment & Project Setup

1. **Install Node.js (LTS)**: Verify that Node.js is correctly installed on your system.  
2. **Create the Project Folder**:  
   - Example: `mkdir my-casino-frontend && cd my-casino-frontend`.  
3. **Initialize a New React App**:  
   - Using Create React App:  
     ```bash
     npx create-react-app .
     ```  
   - Or using Vite (Recommended for performance):  
     ```bash
     npm create vite@latest . -- --template react
     ```  
   - Install dependencies: `npm install` or `yarn install`.

4. **Set Up Tailwind CSS**:  
   - Install dependencies:  
     ```bash
     npm install -D tailwindcss postcss autoprefixer
     npx tailwindcss init -p
     ```  
   - Update `tailwind.config.js` to include all relevant file paths (e.g., `./index.html`, `./src/**/*.{js,ts,jsx,tsx}`).
   - Import Tailwind directives in your main CSS (e.g., `src/index.css`):
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

---

## 2. Overall Visual & Thematic Reference

1. **Color Palette & Layout**:  
   - Consult the provided screenshots of mcluck.com (screenshot-home.png, screenshot-lobby.png) to match the dark-themed background with vibrant accent colors.  
   - Use neon highlights (pink, yellow, teal) for CTA buttons or icons.  
2. **Fonts & Typography**:  
   - Consider a modern sans-serif like Poppins, Roboto, or a similar Google Font.  
   - Ensure headings and button text are high-contrast and legible.

---

## 3. Folder Structure

A recommended structure for clarity:
frontend/
├─ public/
│ └─ (assets, icons, etc. if needed)
├─ src/
│ ├─ components/
│ │ ├─ Navbar.jsx
│ │ ├─ Footer.jsx
│ │ ├─ AuthModal.jsx
│ │ └─ ...
│ ├─ pages/
│ │ ├─ Home.jsx
│ │ ├─ Lobby.jsx
│ │ ├─ Promotions.jsx
│ │ ├─ Account.jsx
│ │ ├─ Deposit.jsx
│ │ └─ ...
│ ├─ routes/
│ │ └─ index.jsx (or AppRoutes.jsx)
│ ├─ hooks/
│ ├─ utils/
│ ├─ App.jsx
│ ├─ index.js
│ └─ index.css
├─ tailwind.config.js
├─ package.json
└─ ...

---

## 4. Main Pages & Their Functionality

All pages must be fully functional. Do not leave any placeholder buttons.

1. **Home Page**  
   - Display a hero/banner referencing the mcluck.com screenshot. Show the welcome bonus or top promotion.  
   - Include a “Play Now” button that either takes users to “Lobby” if already logged in or triggers a login/signup modal if not authenticated.

2. **Lobby / Games Page**  
   - Showcase available games (slots, table games, etc.) as seen in mcluck.com’s lobby screenshot.  
   - Each game card must have:  
     - Game image  
     - Short description or RTP info  
     - “Play Now” button that leads to the game’s detail or game-play screen (if the game is run client-side).  
   - No inactive or placeholder game links—each must lead somewhere meaningful.

3. **Promotions Page**  
   - List current promotions, free spins, welcome bonuses, etc.  
   - Each promotion has a “Claim Now” or “Learn More” button.  
   - If user is not logged in, prompt them to sign in. If logged in, properly call the backend to claim the promo.

4. **Account Page**  
   - Display user info (username, email, current balance).  
   - Provide links to deposit, withdraw, transaction history, and personal details (updatable).  
   - Showcase any active promotions or bonuses.  
   - Must be fully interactive. For example, the “Withdraw” button triggers the withdrawal flow, not a dead link.

5. **Deposit & Withdraw Pages** (or Modals)  
   - For deposit, let the user select or add a payment method, enter deposit amount, and confirm.  
   - For withdraw, show current balance, allow them to select a payment method or method of withdrawal, confirm.  
   - All form fields must be validated and integrated with the backend.

6. **Authentication Flow**  
   - Provide a “Sign In” / “Sign Up” modal or page.  
   - Fields: email, password, username (on sign-up).  
   - On success, store token (JWT) or session info securely (e.g., HTTP-only cookies or short-term memory).  
   - Display appropriate error messages (e.g., “Invalid credentials”).

---

## 5. Navigation & Global Components

1. **Navbar**  
   - Logo on the left, main links (Home, Lobby, Promotions, Account) in the middle, sign in/up on the right.  
   - Use a responsive menu or hamburger icon for mobile.  
   - As soon as a user logs in, replace “Sign In” with “Account” or the user’s name, and a logout button.

2. **Footer**  
   - Basic links: Terms & Conditions, Security & Privacy, Contact Us.  
   - Reflect the style from mcluck.com’s screenshot—dark background, minimal text, some disclaimers if required by compliance.

3. **Reusable Buttons & Forms**  
   - Use Tailwind utility classes for consistency (e.g., `bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded`).  
   - Build form components that handle validation feedback, placeholders, error states, etc.

---

## 6. Routing Strategy

- Use a routing library such as React Router.  
- Example route structure in `src/routes/index.jsx`:
  ```jsx
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Home from '../pages/Home';
  import Lobby from '../pages/Lobby';
  import Promotions from '../pages/Promotions';
  import Account from '../pages/Account';
  import Deposit from '../pages/Deposit';
  import Withdraw from '../pages/Withdraw';

  export default function AppRoutes() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/account" element={<Account />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          {/* Add NotFound or 404 route if desired */}
        </Routes>
      </Router>
    );
  }
  ```
- All routes should be implemented, and no link should lead to a 404 or placeholder.  

---

## 7. State Management & Data Flow

1. **User Auth State**  
   - Keep track of whether the user is logged in globally. Possibly use Context API or Redux for large-scale.  
   - On page load, validate token or session info with the backend to keep the user logged in.

2. **Balance & Promotions**  
   - Store the user’s balance in a global state to update in real-time after deposits, withdrawals, or bet results.  
   - When a promotion is claimed, reflect it immediately in the user’s state (e.g., bonus balance).

3. **Error Handling & Notifications**  
   - Show user-friendly messages for errors, successes, or warnings (e.g., “Insufficient funds” or “Deposit successful!”).

---

## 8. Testing & Validation

1. **Unit Tests**  
   - Use React Testing Library or Jest for components. e.g., test the sign-up form’s validation.  
2. **Integration & E2E**  
   - Tools like Cypress for simulating real user flows: signing up, logging in, depositing, placing a bet.  

---

## 9. Deployment & Optimizations

1. **Production Build**  
   - Run `npm run build` or `yarn build` to produce the final optimized build.  
2. **Assets Optimization**  
   - Make sure images are optimized (use modern formats like WebP or AVIF).  
3. **Hosting**  
   - Deploy your build to Netlify, Vercel, or AWS S3 for speedy global delivery.  

---

## 10. Final Notes

- Refer to screenshots from mcluck.com for layout, color scheme, and user flow.  
- No unused pages or dead-end routes: each button triggers real functionality (e.g., deposit, claim promotion, start game).  
- Maintain consistency in design, interactions, and error handling across all pages.  
- Consult the “Backend Guidelines” for endpoint references and ensure full integration for a seamless project.
