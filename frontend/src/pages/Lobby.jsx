import { useState } from 'react'
import { Link } from 'react-router-dom'

const GAME_CATEGORIES = ['All Games', 'Slots', 'Table Games', 'Live Casino', 'Poker', 'Specialty']

const GAMES = [
  {
    id: 1,
    name: 'Mega Fortune Slots',
    category: 'Slots',
    image: '/placeholder-slot.jpg',
    description: 'Progressive jackpot slot with luxury theme',
    rtp: '96.6%',
    minBet: 0.20,
    maxBet: 100,
  },
  {
    id: 2,
    name: 'Blackjack Pro',
    category: 'Table Games',
    image: '/placeholder-blackjack.jpg',
    description: 'Professional blackjack with side bets',
    rtp: '99.5%',
    minBet: 1,
    maxBet: 1000,
  },
  {
    id: 3,
    name: 'European Roulette',
    category: 'Table Games',
    image: '/placeholder-roulette.jpg',
    description: 'Classic European roulette with racetrack',
    rtp: '97.3%',
    minBet: 0.50,
    maxBet: 500,
  },
  {
    id: 4,
    name: 'Live Dealer Baccarat',
    category: 'Live Casino',
    image: '/placeholder-baccarat.jpg',
    description: 'Real-time baccarat with professional dealers',
    rtp: '98.9%',
    minBet: 5,
    maxBet: 2000,
  },
  {
    id: 5,
    name: 'Texas Hold\'em',
    category: 'Poker',
    image: '/placeholder-poker.jpg',
    description: 'Multiplayer poker room with tournaments',
    minBet: 1,
    maxBet: 1000,
  },
  {
    id: 6,
    name: 'Starburst Deluxe',
    category: 'Slots',
    image: '/placeholder-starburst.jpg',
    description: 'Popular slot with expanding wilds',
    rtp: '96.1%',
    minBet: 0.10,
    maxBet: 100,
  },
]

export default function Lobby() {
  const [selectedCategory, setSelectedCategory] = useState('All Games')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredGames = GAMES.filter(game => {
    const matchesCategory = selectedCategory === 'All Games' || game.category === selectedCategory
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Game Lobby</h1>
        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="Search games..."
            className="input w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {GAME_CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-neon-pink text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGames.map(game => (
          <div key={game.id} className="card group hover:border-neon-pink transition-colors">
            {/* Game Image */}
            <div className="aspect-video bg-gray-700 rounded-lg mb-4 overflow-hidden relative group-hover:ring-2 ring-neon-pink transition-all">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="bg-black/50 px-2 py-1 rounded">
                    {game.rtp && `RTP: ${game.rtp}`}
                  </span>
                  <span className="bg-black/50 px-2 py-1 rounded">
                    ${game.minBet} - ${game.maxBet}
                  </span>
                </div>
              </div>
            </div>

            {/* Game Info */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold">{game.name}</h3>
                <span className="text-sm text-gray-400">{game.category}</span>
              </div>
              <p className="text-gray-400 mb-4">{game.description}</p>
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <button className="btn-primary flex-1">Play Now</button>
                <button className="btn-secondary px-4">
                  <span className="sr-only">Demo</span>
                  🎮
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-bold mb-2">No Games Found</h3>
          <p className="text-gray-400">
            Try adjusting your search or category filter to find more games.
          </p>
        </div>
      )}
    </div>
  )
} 