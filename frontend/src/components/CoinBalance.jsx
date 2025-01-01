import { useUser } from '../context/UserContext';

export default function CoinBalance() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <img src="/icons/sweepcoins.svg" alt="Sweepcoins" className="w-5 h-5" />
        <span className="text-white">
          {parseFloat(user.sweepcoins).toFixed(2)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <img src="/icons/bonus.svg" alt="Bonus Coins" className="w-5 h-5" />
        <span className="text-white">
          {parseFloat(user.bonusCoins).toFixed(2)}
        </span>
      </div>
    </div>
  );
} 