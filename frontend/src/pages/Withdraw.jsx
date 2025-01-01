import { useState } from 'react'

const WITHDRAWAL_METHODS = [
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    icon: '🏦',
    description: 'Direct bank transfer (ACH/Wire)',
    fees: '0%',
    minCoins: 5000,
    maxCoins: 500000,
    processingTime: '2-5 business days',
  },
  {
    id: 'crypto',
    name: 'Cryptocurrency',
    icon: '₿',
    description: 'Withdraw to your crypto wallet',
    fees: '0%',
    minCoins: 10000,
    maxCoins: 1000000,
    processingTime: '10-30 minutes',
  },
  {
    id: 'e-wallet',
    name: 'E-Wallet',
    icon: '📱',
    description: 'PayPal, Skrill, or Neteller',
    fees: '1%',
    minCoins: 5000,
    maxCoins: 100000,
    processingTime: '24 hours',
  },
]

const MOCK_USER = {
  sweepcoins: 25000,
  bonusCoins: 2500,
  pendingWithdrawals: [
    {
      id: 1,
      coins: 10000,
      cashValue: 100,
      method: 'Bank Transfer',
      status: 'pending',
      requestedAt: '2024-01-15T10:30:00Z',
    },
  ],
}

// Conversion rate: 1000 coins = $1
const CONVERSION_RATE = 0.001

export default function Withdraw() {
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [coins, setCoins] = useState('')
  const [step, setStep] = useState(1)
  const [withdrawalAddress, setWithdrawalAddress] = useState('')

  const totalAvailableCoins = MOCK_USER.sweepcoins + MOCK_USER.bonusCoins
  const cashValue = coins ? Number(coins) * CONVERSION_RATE : 0

  const handleSubmit = (e) => {
    e.preventDefault()
    setStep(2)
  }

  const renderMethodSelection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {WITHDRAWAL_METHODS.map(method => (
        <div
          key={method.id}
          className={`card cursor-pointer transition-all ${
            selectedMethod?.id === method.id
              ? 'ring-2 ring-neon-pink'
              : 'hover:border-neon-pink'
          }`}
          onClick={() => setSelectedMethod(method)}
        >
          <div className="flex items-start gap-4">
            <span className="text-3xl">{method.icon}</span>
            <div className="flex-1">
              <h3 className="font-bold mb-1">{method.name}</h3>
              <p className="text-sm text-gray-400 mb-2">{method.description}</p>
              <div className="space-y-1 text-sm text-gray-400">
                <div className="flex items-center justify-between">
                  <span>Fee:</span>
                  <span>{method.fees}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Min Coins:</span>
                  <span>{method.minCoins.toLocaleString()} 🪙</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Max Coins:</span>
                  <span>{method.maxCoins.toLocaleString()} 🪙</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Processing Time:</span>
                  <span>{method.processingTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  const renderWithdrawalForm = () => (
    <div className="card max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-6">Redemption Details</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Available Balance */}
        <div className="p-4 bg-gray-800 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Available Coins</span>
            <div className="flex items-center gap-2">
              <span className="text-xl">🪙</span>
              <span className="text-xl font-bold text-neon-pink">
                {totalAvailableCoins.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>Conversion Rate</span>
            <span>1000 coins = $1.00</span>
          </div>
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Coins to Redeem
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🪙</span>
            <input
              type="number"
              className="input w-full pl-8"
              placeholder="Enter amount of coins"
              value={coins}
              onChange={(e) => setCoins(e.target.value)}
              min={selectedMethod?.minCoins}
              max={Math.min(selectedMethod?.maxCoins, totalAvailableCoins)}
              required
            />
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-400">
              Min: {selectedMethod?.minCoins.toLocaleString()} coins
            </span>
            <span className="text-gray-400">
              Max: {Math.min(selectedMethod?.maxCoins, totalAvailableCoins).toLocaleString()} coins
            </span>
          </div>
        </div>

        {/* Withdrawal Address/Details */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {selectedMethod?.id === 'crypto' ? 'Wallet Address' : 'Account Details'}
          </label>
          <textarea
            className="input w-full h-24 resize-none"
            placeholder={
              selectedMethod?.id === 'crypto'
                ? 'Enter your cryptocurrency wallet address'
                : selectedMethod?.id === 'bank-transfer'
                ? 'Enter your bank account details (Account number, routing number, etc.)'
                : 'Enter your e-wallet account email/ID'
            }
            value={withdrawalAddress}
            onChange={(e) => setWithdrawalAddress(e.target.value)}
            required
          />
        </div>

        {/* Summary */}
        <div className="p-4 bg-gray-800 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Withdrawal Method</span>
            <div className="flex items-center gap-2">
              <span>{selectedMethod?.icon}</span>
              <span>{selectedMethod?.name}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Fee</span>
            <span>{selectedMethod?.fees}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Processing Time</span>
            <span>{selectedMethod?.processingTime}</span>
          </div>
          <div className="flex items-center justify-between font-bold pt-2 border-t border-gray-700">
            <span>Coins to Redeem</span>
            <span>{coins ? Number(coins).toLocaleString() : 0} 🪙</span>
          </div>
          <div className="flex items-center justify-between text-neon-teal font-bold">
            <span>Cash Value</span>
            <span>${cashValue.toFixed(2)}</span>
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full"
          disabled={!coins || !withdrawalAddress || coins > totalAvailableCoins || coins < selectedMethod?.minCoins}
        >
          Request Redemption
        </button>
      </form>
    </div>
  )

  const renderConfirmation = () => (
    <div className="card max-w-md mx-auto text-center">
      <div className="text-6xl mb-4">✅</div>
      <h3 className="text-2xl font-bold mb-2">Redemption Requested</h3>
      <div className="space-y-2 mb-6">
        <div className="text-2xl font-bold text-neon-pink">
          {Number(coins).toLocaleString()} 🪙
        </div>
        <div className="text-xl font-bold text-neon-teal">
          ${cashValue.toFixed(2)}
        </div>
      </div>
      <p className="text-gray-400 mb-6">
        Your redemption request has been submitted. You will be notified once it's processed.
      </p>
      <div className="p-4 bg-gray-800 rounded-lg text-left space-y-2 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Coins</span>
          <span>{Number(coins).toLocaleString()} 🪙</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Cash Value</span>
          <span>${cashValue.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Method</span>
          <span>{selectedMethod?.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Processing Time</span>
          <span>{selectedMethod?.processingTime}</span>
        </div>
      </div>
      <button
        onClick={() => {
          setStep(1)
          setSelectedMethod(null)
          setCoins('')
          setWithdrawalAddress('')
        }}
        className="btn-primary"
      >
        Make Another Redemption
      </button>
    </div>
  )

  return (
    <div className="min-h-screen space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Redeem Sweepcoins</h1>
        <p className="text-gray-400">
          Convert your Sweepcoins to real cash. Choose your preferred withdrawal method and amount.
        </p>
      </div>

      {/* Pending Withdrawals */}
      {MOCK_USER.pendingWithdrawals.length > 0 && (
        <div className="max-w-2xl mx-auto">
          <div className="card bg-yellow-900/20 border-yellow-900">
            <h3 className="text-lg font-bold mb-4">Pending Redemptions</h3>
            {MOCK_USER.pendingWithdrawals.map(withdrawal => (
              <div key={withdrawal.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium flex items-center gap-2">
                    <span>{withdrawal.coins.toLocaleString()} 🪙</span>
                    <span className="text-sm text-gray-400">≈ ${withdrawal.cashValue}</span>
                  </div>
                  <p className="text-sm text-gray-400">{withdrawal.method}</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 bg-yellow-900/50 text-yellow-400 rounded-full text-sm">
                    {withdrawal.status}
                  </span>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(withdrawal.requestedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Steps */}
      {step === 1 && (
        <div className="space-y-8">
          {!selectedMethod ? (
            <>
              <h2 className="text-xl font-bold">Select Withdrawal Method</h2>
              {renderMethodSelection()}
            </>
          ) : (
            renderWithdrawalForm()
          )}
        </div>
      )}

      {step === 2 && renderConfirmation()}

      {/* Information */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800/50 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">About Redemptions</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Conversion rate: 1000 Sweepcoins = $1.00</li>
            <li>Both regular and bonus coins have the same redemption value</li>
            <li>Minimum redemption amounts vary by withdrawal method</li>
            <li>Processing times are estimates and may vary</li>
            <li>All redemptions are subject to verification</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 