import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative h-[500px] -mt-8 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-pink via-purple-600 to-neon-teal opacity-20"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-neon-pink">Goldwave</span> Casino
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Experience the thrill of premium online gaming
          </p>
          <Link
            to="/lobby"
            className="btn-primary text-lg px-8 py-3"
          >
            Play Now
          </Link>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Game Card 1 */}
          <div className="card group hover:border-neon-pink transition-colors">
            <div className="aspect-video bg-gray-700 rounded-lg mb-4"></div>
            <h3 className="text-xl font-bold mb-2">Mega Slots</h3>
            <p className="text-gray-400 mb-4">Experience the excitement of our premium slot machine with massive jackpots!</p>
            <button className="btn-primary w-full">Play Now</button>
          </div>

          {/* Game Card 2 */}
          <div className="card group hover:border-neon-pink transition-colors">
            <div className="aspect-video bg-gray-700 rounded-lg mb-4"></div>
            <h3 className="text-xl font-bold mb-2">Blackjack Pro</h3>
            <p className="text-gray-400 mb-4">Test your skills against our professional dealers in this classic card game.</p>
            <button className="btn-primary w-full">Play Now</button>
          </div>

          {/* Game Card 3 */}
          <div className="card group hover:border-neon-pink transition-colors">
            <div className="aspect-video bg-gray-700 rounded-lg mb-4"></div>
            <h3 className="text-xl font-bold mb-2">Roulette Royale</h3>
            <p className="text-gray-400 mb-4">Place your bets and watch the wheel spin in our premium roulette experience.</p>
            <button className="btn-primary w-full">Play Now</button>
          </div>
        </div>
      </section>

      {/* Promotions Preview */}
      <section className="py-12 bg-gray-800 -mx-4 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Latest Promotions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Welcome Bonus */}
            <div className="card bg-gradient-to-r from-purple-900 to-gray-800">
              <h3 className="text-2xl font-bold mb-4">Welcome Bonus</h3>
              <p className="text-gray-300 mb-4">Get up to $1,000 + 100 Free Spins on your first deposit!</p>
              <Link to="/promotions" className="btn-primary inline-block">
                Claim Now
              </Link>
            </div>

            {/* Weekly Cashback */}
            <div className="card bg-gradient-to-r from-gray-800 to-purple-900">
              <h3 className="text-2xl font-bold mb-4">Weekly Cashback</h3>
              <p className="text-gray-300 mb-4">Get 10% cashback on all your losses, every week!</p>
              <Link to="/promotions" className="btn-primary inline-block">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8">Why Choose Goldwave Casino</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="text-neon-pink text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-bold mb-2">Secure Gaming</h3>
            <p className="text-gray-400">Your security is our top priority. Play with peace of mind.</p>
          </div>
          <div className="card text-center">
            <div className="text-neon-teal text-4xl mb-4">🎮</div>
            <h3 className="text-xl font-bold mb-2">Premium Games</h3>
            <p className="text-gray-400">Enjoy our selection of high-quality casino games.</p>
          </div>
          <div className="card text-center">
            <div className="text-neon-yellow text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2">Fast Payouts</h3>
            <p className="text-gray-400">Quick and hassle-free withdrawals of your winnings.</p>
          </div>
        </div>
      </section>
    </div>
  )
} 