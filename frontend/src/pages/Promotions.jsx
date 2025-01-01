import { useState } from 'react'

const PROMOTIONS = [
  {
    id: 1,
    title: 'Welcome Package',
    description: 'Get up to $1,000 + 100 Free Spins on your first deposit!',
    terms: 'Min deposit $20. 40x wagering requirement. Free spins valid for 7 days.',
    type: 'New Players',
    gradient: 'from-purple-900 to-gray-800',
    icon: '🎁',
  },
  {
    id: 2,
    title: 'Weekly Cashback',
    description: 'Get 10% cashback on all your losses, every week!',
    terms: 'Min loss $50. Cashback credited every Monday. Max cashback $1,000.',
    type: 'Regular',
    gradient: 'from-gray-800 to-purple-900',
    icon: '💰',
  },
  {
    id: 3,
    title: 'Weekend Reload',
    description: '50% bonus up to $500 on weekend deposits',
    terms: 'Valid Friday to Sunday. Min deposit $50. 35x wagering requirement.',
    type: 'Regular',
    gradient: 'from-blue-900 to-gray-800',
    icon: '🔄',
  },
  {
    id: 4,
    title: 'VIP Program',
    description: 'Exclusive rewards, personal account manager, and special events',
    terms: 'By invitation only. Based on player activity and loyalty.',
    type: 'VIP',
    gradient: 'from-yellow-900 to-gray-800',
    icon: '👑',
  },
  {
    id: 5,
    title: 'Refer a Friend',
    description: 'Get $50 for each friend you refer',
    terms: 'Friend must make min deposit of $20. Bonus subject to 30x wagering.',
    type: 'Regular',
    gradient: 'from-green-900 to-gray-800',
    icon: '👥',
  },
  {
    id: 6,
    title: 'Daily Drops & Wins',
    description: 'Win a share of $1,000,000 in monthly prizes',
    terms: 'Participate in selected games. Min bet $0.50. Daily tournaments.',
    type: 'Tournament',
    gradient: 'from-red-900 to-gray-800',
    icon: '🏆',
  },
]

export default function Promotions() {
  const [activePromo, setActivePromo] = useState(null)

  return (
    <div className="min-h-screen space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Casino Promotions</h1>
        <p className="text-gray-400">
          Boost your gameplay with our exciting promotions and bonuses. New offers added regularly!
        </p>
      </div>

      {/* Promotions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROMOTIONS.map(promo => (
          <div
            key={promo.id}
            className={`card bg-gradient-to-r ${promo.gradient} group hover:scale-[1.02] transition-transform cursor-pointer`}
            onClick={() => setActivePromo(activePromo === promo.id ? null : promo.id)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-4xl mb-2 block">{promo.icon}</span>
                <h3 className="text-2xl font-bold">{promo.title}</h3>
              </div>
              <span className="px-3 py-1 bg-black/30 rounded-full text-sm">
                {promo.type}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-4">{promo.description}</p>

            {/* Terms (expandable) */}
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activePromo === promo.id ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <div className="bg-black/20 p-4 rounded-lg mb-4">
                <h4 className="font-bold mb-2">Terms & Conditions:</h4>
                <p className="text-sm text-gray-300">{promo.terms}</p>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex items-center gap-4">
              <button className="btn-primary flex-1">
                Claim Now
              </button>
              <button
                className={`btn-secondary p-2 transition-transform ${
                  activePromo === promo.id ? 'rotate-180' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation()
                  setActivePromo(activePromo === promo.id ? null : promo.id)
                }}
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="bg-gray-800/50 rounded-lg p-6 mt-8">
        <h2 className="text-xl font-bold mb-4">Important Information</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li>All bonuses are subject to wagering requirements</li>
          <li>Only one bonus can be active at a time</li>
          <li>The casino reserves the right to modify or cancel promotions</li>
          <li>Players must be 18+ to participate</li>
          <li>Please gamble responsibly</li>
        </ul>
      </div>
    </div>
  )
} 