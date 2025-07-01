import React, { useState } from 'react';
import { mockRewards } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import { Search, Gift, Star, Tag, Coins, ExternalLink } from 'lucide-react';

const RewardsCatalog: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [pointsRange, setPointsRange] = useState('all');

  if (!user) return null;

  const categories = ['all', ...new Set(mockRewards.map(reward => reward.category))];
  
  const filteredRewards = mockRewards.filter(reward => {
    const matchesSearch = reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reward.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || reward.category === selectedCategory;
    const matchesPoints = pointsRange === 'all' || 
                         (pointsRange === 'low' && reward.pointsCost <= 10) ||
                         (pointsRange === 'medium' && reward.pointsCost > 10 && reward.pointsCost <= 30) ||
                         (pointsRange === 'high' && reward.pointsCost > 30);
    return matchesSearch && matchesCategory && matchesPoints && reward.available;
  });

  const canAfford = (pointsCost: number) => user.totalPoints >= pointsCost;

  const handleRedeem = (reward: any) => {
    // Open Google Form with pre-filled data
    const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSe_EXAMPLE_FORM_ID/viewform';
    const params = new URLSearchParams({
      'entry.123456789': user.name, // Employee Name field
      'entry.987654321': user.email, // Employee Email field
      'entry.456789123': reward.name, // Reward Name field
      'entry.789123456': reward.pointsCost.toString(), // Points Cost field
      'entry.321654987': user.id, // Employee ID field
    });
    
    const formUrlWithParams = `${googleFormUrl}?${params.toString()}`;
    window.open(formUrlWithParams, '_blank');
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'travel': return '✈️';
      case 'technology': return '💻';
      case 'health': return '🏃‍♂️';
      case 'fashion': return '👕';
      case 'shopping': return '🛍️';
      default: return '🎁';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rewards Catalog</h1>
          <p className="text-gray-600 mt-1">Redeem your points for amazing rewards</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
          <div className="flex items-center space-x-2">
            <Coins className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-gray-900">{user.totalPoints} points</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search rewards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>
                  {getCategoryIcon(category)} {category}
                </option>
              ))}
            </select>

            <select
              value={pointsRange}
              onChange={(e) => setPointsRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Points</option>
              <option value="low">1-10 Points</option>
              <option value="medium">11-30 Points</option>
              <option value="high">31+ Points</option>
            </select>
          </div>

          <div className="text-sm text-gray-500">
            Showing {filteredRewards.length} of {mockRewards.length} rewards
          </div>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRewards.map((reward) => {
          const affordable = canAfford(reward.pointsCost);

          return (
            <div key={reward.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src={reward.image}
                  alt={reward.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-2 py-1 rounded-full text-xs font-medium">
                    {getCategoryIcon(reward.category)} {reward.category}
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-bold">
                    {reward.pointsCost} pts
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{reward.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{reward.description}</p>
                
                {reward.maxValue && (
                  <div className="flex items-center space-x-1 mb-3">
                    <Tag className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">
                      Up to ₹{reward.maxValue.toLocaleString()}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  {affordable ? (
                    <span className="text-green-600 text-sm font-medium flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Available
                    </span>
                  ) : (
                    <span className="text-red-500 text-sm font-medium">
                      Need {reward.pointsCost - user.totalPoints} more points
                    </span>
                  )}

                  <button
                    onClick={() => handleRedeem(reward)}
                    disabled={!affordable}
                    className="flex items-center space-x-1 bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    <span>Redeem</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRewards.length === 0 && (
        <div className="text-center py-12">
          <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No rewards found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">How to Redeem</h3>
        <div className="text-sm text-blue-700 space-y-2">
          <p>• Click "Redeem" on any reward you can afford</p>
          <p>• Fill out the Google Form that opens with your details</p>
          <p>• Your redemption request will be processed by the admin team</p>
          <p>• Track your redemption status on your dashboard</p>
          <p>• Points will be deducted once your request is approved</p>
        </div>
      </div>
    </div>
  );
};

export default RewardsCatalog;