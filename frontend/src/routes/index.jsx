import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Home from '../pages/Home'
import Lobby from '../pages/Lobby'
import Promotions from '../pages/Promotions'
import Account from '../pages/Account'
import Deposit from '../pages/Deposit'
import Withdraw from '../pages/Withdraw'
import SignIn from '../pages/SignIn'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'
import PrivateRoute from '../components/PrivateRoute'

export default function AppRoutes() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/promotions" element={<Promotions />} />

          {/* Protected Routes */}
          <Route path="/lobby" element={
            <PrivateRoute>
              <Lobby />
            </PrivateRoute>
          } />
          <Route path="/account" element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          } />
          <Route path="/deposit" element={
            <PrivateRoute>
              <Deposit />
            </PrivateRoute>
          } />
          <Route path="/withdraw" element={
            <PrivateRoute>
              <Withdraw />
            </PrivateRoute>
          } />

          {/* 404 Route */}
          <Route path="*" element={<div className="text-center">404 - Page Not Found</div>} />
        </Routes>
      </main>
      <Footer />
    </>
  )
} 