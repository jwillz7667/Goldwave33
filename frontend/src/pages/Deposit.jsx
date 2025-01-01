import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Deposit() {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/packages');
      const data = await response.json();
      setPackages(data);
    } catch (error) {
      setError('Failed to load packages');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading packages...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Buy Sweepcoins</h1>
      <p className="text-center text-gray-400 mb-8">
        Purchase Sweepcoins to play your favorite games. Larger packages come with bonus coins!
      </p>

      {!selectedPackage ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Select Coin Package</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-gray-800 rounded-lg p-6 flex flex-col relative overflow-hidden"
              >
                {pkg.tag && (
                  <div className="absolute top-0 right-0 bg-neon-pink text-white text-sm px-3 py-1 rounded-bl">
                    {pkg.tag}
                  </div>
                )}
                <div className="flex justify-center mb-4">
                  <img src="/icons/sweepcoins.svg" alt="Sweepcoins" className="w-16 h-16" />
                </div>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold mb-1">
                    {pkg.sweepcoinsAmount.toFixed(2)} Coins
                  </div>
                  {pkg.bonusAmount > 0 && (
                    <div className="text-neon-teal text-sm">
                      +{pkg.bonusAmount.toFixed(2)} Bonus Coins
                    </div>
                  )}
                </div>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold mb-1">${pkg.priceUSD.toFixed(2)}</div>
                  <div className="text-sm text-gray-400">
                    ${(pkg.priceUSD / pkg.sweepcoinsAmount).toFixed(3)} per coin
                  </div>
                </div>
                <button
                  onClick={() => handleSelectPackage(pkg)}
                  className="btn-primary w-full"
                >
                  Select Package
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">About Sweepcoins</h2>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-neon-pink">•</span>
                Sweepcoins can be used to play any game on our platform
              </li>
              <li className="flex items-center gap-2">
                <span className="text-neon-pink">•</span>
                Win more coins by playing games and participating in tournaments
              </li>
              <li className="flex items-center gap-2">
                <span className="text-neon-pink">•</span>
                Redeem your winnings for real cash through our secure withdrawal system
              </li>
              <li className="flex items-center gap-2">
                <span className="text-neon-pink">•</span>
                Bonus coins have the same value as regular coins
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="font-bold">{selectedPackage.sweepcoinsAmount.toFixed(2)} Coins</div>
                {selectedPackage.bonusAmount > 0 && (
                  <div className="text-neon-teal text-sm">
                    +{selectedPackage.bonusAmount.toFixed(2)} Bonus Coins
                  </div>
                )}
              </div>
              <div className="text-xl font-bold">${selectedPackage.priceUSD.toFixed(2)}</div>
            </div>
            
            <div className="flex justify-between text-sm text-gray-400 mb-4">
              <span>Price per Coin</span>
              <span>${(selectedPackage.priceUSD / selectedPackage.sweepcoinsAmount).toFixed(3)}</span>
            </div>

            <div className="border-t border-gray-700 pt-4 mb-6">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${selectedPackage.priceUSD.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold mb-2">Select Payment Method</h3>
              <button className="w-full bg-gray-700 hover:bg-gray-600 p-4 rounded-lg flex items-center gap-4 transition-colors">
                <span className="text-2xl">💳</span>
                <div className="text-left">
                  <div className="font-bold">Credit Card</div>
                  <div className="text-sm text-gray-400">Instant deposit with Visa, Mastercard, or American Express</div>
                  <div className="text-sm text-gray-400">Fee: 2.5%</div>
                </div>
              </button>

              <button className="w-full bg-gray-700 hover:bg-gray-600 p-4 rounded-lg flex items-center gap-4 transition-colors">
                <span className="text-2xl">₿</span>
                <div className="text-left">
                  <div className="font-bold">Cryptocurrency</div>
                  <div className="text-sm text-gray-400">Deposit using Bitcoin, Ethereum, or USDT</div>
                  <div className="text-sm text-gray-400">Fee: 0%</div>
                </div>
              </button>

              <button className="w-full bg-gray-700 hover:bg-gray-600 p-4 rounded-lg flex items-center gap-4 transition-colors">
                <span className="text-2xl">🏦</span>
                <div className="text-left">
                  <div className="font-bold">Bank Transfer</div>
                  <div className="text-sm text-gray-400">Direct bank transfer (ACH/Wire)</div>
                </div>
              </button>

              <button className="w-full bg-gray-700 hover:bg-gray-600 p-4 rounded-lg flex items-center gap-4 transition-colors">
                <span className="text-2xl">👛</span>
                <div className="text-left">
                  <div className="font-bold">E-Wallet</div>
                  <div className="text-sm text-gray-400">PayPal, Skrill, or Neteller</div>
                </div>
              </button>
            </div>

            <button
              onClick={() => setSelectedPackage(null)}
              className="w-full mt-6 text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Packages
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 