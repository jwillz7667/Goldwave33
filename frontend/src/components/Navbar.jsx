import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useUser } from '../context/UserContext'
import CoinBalance from './CoinBalance'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useUser()

  const buyCoinsButton = (
    <Link 
      to="/deposit" 
      className="bg-neon-pink hover:bg-pink-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
    >
      BUY COINS
    </Link>
  )

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-neon-pink">Goldwave</span>
            <span className="text-2xl font-bold text-white">Casino</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/lobby" className="text-gray-300 hover:text-white transition-colors">
              Games
            </Link>
            <Link to="/promotions" className="text-gray-300 hover:text-white transition-colors">
              Promotions
            </Link>
            {user ? (
              <>
                <CoinBalance />
                <div className="flex items-center gap-4">
                  <Link to="/account" className="text-gray-300 hover:text-white transition-colors">
                    My Account
                  </Link>
                  {buyCoinsButton}
                  <button
                    onClick={logout}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                {buyCoinsButton}
                <Link to="/login" className="bg-neon-pink hover:bg-pink-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="bg-cyan-400 hover:bg-cyan-500 text-gray-900 px-3 py-1.5 rounded text-sm font-medium transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/lobby"
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Games
              </Link>
              <Link
                to="/promotions"
                className="text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Promotions
              </Link>
              {user && <CoinBalance />}
              <Link
                to="/deposit"
                className="bg-neon-pink hover:bg-pink-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                BUY COINS
              </Link>
              {user ? (
                <>
                  <Link
                    to="/account"
                    className="text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-neon-pink hover:bg-pink-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors w-full block text-center"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-cyan-400 hover:bg-cyan-500 text-gray-900 px-3 py-1.5 rounded text-sm font-medium transition-colors w-full block text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 