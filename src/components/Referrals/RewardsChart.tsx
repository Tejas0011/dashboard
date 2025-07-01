import React from 'react';
import { Plane, Laptop, MapPin, Dumbbell, Shirt, ShoppingBag, TrendingUp, UtensilsCrossed, Sparkles } from 'lucide-react';

const RewardsChart: React.FC = () => {
  const rewardTiers = [
    {
      points: 50,
      title: 'International Trip',
      subtitle: 'Up to ₹100,000',
      description: 'Dream international vacation with flights, accommodation, and experiences',
      icon: Plane,
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      iconColor: 'text-purple-600'
    },
    {
      points: 40,
      title: 'Premium Tech',
      subtitle: 'MacBook Air/PS5/Xbox (Up to ₹49,999)',
      description: 'Latest gadgets and technology products',
      icon: Laptop,
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      iconColor: 'text-blue-600'
    },
    {
      points: 30,
      title: 'Travacation Package',
      subtitle: 'Domestic premium travel',
      description: 'Curated domestic travel experiences across India',
      icon: MapPin,
      gradient: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      iconColor: 'text-green-600'
    },
    {
      points: 20,
      title: 'Annual Gym Membership',
      subtitle: 'Up to ₹19,999',
      description: 'Premium fitness center membership for one year',
      icon: Dumbbell,
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      iconColor: 'text-orange-600'
    },
    {
      points: 12,
      title: 'Designer Items',
      subtitle: 'Up to ₹14,999',
      description: 'Premium fashion and lifestyle accessories',
      icon: Shirt,
      gradient: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-700',
      iconColor: 'text-pink-600'
    },
    {
      points: 8,
      title: 'Amazon Voucher',
      subtitle: '₹5,000',
      description: 'Shopping voucher for anything you want',
      icon: ShoppingBag,
      gradient: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      iconColor: 'text-indigo-600'
    },
    {
      points: 4,
      title: 'Monthly Mutual Fund',
      subtitle: '₹1,000',
      description: 'Investment in mutual funds for your future',
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      iconColor: 'text-emerald-600'
    },
    {
      points: 2,
      title: 'Restaurant Vouchers',
      subtitle: '₹1,999',
      description: 'Dine at premium restaurants and cafes',
      icon: UtensilsCrossed,
      gradient: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700',
      iconColor: 'text-yellow-600'
    },
    {
      points: 1,
      title: 'Spa Vouchers',
      subtitle: '₹500',
      description: 'Relaxing spa and wellness treatments',
      icon: Sparkles,
      gradient: 'from-teal-500 to-cyan-500',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-700',
      iconColor: 'text-teal-600'
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Rewards Chart</h2>
        <p className="text-gray-600">
          Discover amazing rewards you can earn with your points
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewardTiers.map((tier, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className={`bg-gradient-to-r ${tier.gradient} p-1`}>
              <div className="bg-white p-4 rounded-t-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className={`${tier.bgColor} p-3 rounded-lg`}>
                    <tier.icon className={`h-6 w-6 ${tier.iconColor}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{tier.points}</div>
                    <div className="text-xs text-gray-500">POINTS</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{tier.title}</h3>
                  <p className={`text-sm font-medium ${tier.textColor} mb-2`}>{tier.subtitle}</p>
                  <p className="text-sm text-gray-600">{tier.description}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  Tier {9 - index}
                </span>
                <button className={`px-3 py-1 text-xs font-medium rounded-full ${tier.bgColor} ${tier.textColor} hover:opacity-80 transition-opacity`}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-600 to-orange-600 rounded-xl text-white p-6">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Start Earning Points Today!</h3>
          <p className="text-blue-100 mb-4">
            Refer talented candidates, excel in performance, and travel for business to earn points
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Submit Referral
            </button>
            <button className="border border-white text-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">
              View Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsChart;