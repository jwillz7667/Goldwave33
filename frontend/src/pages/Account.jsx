import { useUser } from '../context/UserContext';

export default function Account() {
  const { user } = useUser();

  if (!user) return null;

  const totalCoins = (parseFloat(user.sweepcoins) + parseFloat(user.bonusCoins)).toFixed(2);
  const redeemValue = (parseFloat(totalCoins) * 1).toFixed(2); // $1 per coin

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Coin Balance</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src="/icons/sweepcoins.svg" alt="Sweepcoins" className="w-6 h-6" />
                <span>Sweepcoins</span>
              </div>
              <span className="text-xl font-bold">{parseFloat(user.sweepcoins).toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src="/icons/bonus.svg" alt="Bonus Coins" className="w-6 h-6" />
                <span>Bonus Coins</span>
              </div>
              <span className="text-xl font-bold">{parseFloat(user.bonusCoins).toFixed(2)}</span>
            </div>
            
            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between items-center">
                <span>Total Coins</span>
                <span className="text-2xl font-bold">{totalCoins}</span>
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Redeem value: ${redeemValue}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <button className="btn-primary flex items-center justify-center gap-2">
                <img src="/icons/sweepcoins.svg" alt="" className="w-5 h-5" />
                Buy Coins
              </button>
              <button className="btn-secondary">
                Redeem
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="text-gray-400 mb-1">Games Played</div>
              <div className="text-2xl font-bold">25</div>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="text-gray-400 mb-1">Tournaments</div>
              <div className="text-2xl font-bold">12</div>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="text-gray-400 mb-1">Active Bonuses</div>
              <div className="text-2xl font-bold">3</div>
            </div>
            <div className="bg-gray-700/50 p-4 rounded-lg">
              <div className="text-gray-400 mb-1">Total Redeemed</div>
              <div className="text-2xl font-bold">$350</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 