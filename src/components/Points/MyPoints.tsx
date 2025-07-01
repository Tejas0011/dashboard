import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockTransactions } from '../../data/mockData';
import { 
  Coins, 
  TrendingUp, 
  Users, 
  Plane, 
  Download,
  Filter,
  Search,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const MyPoints: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  if (!user) return null;

  const userTransactions = mockTransactions
    .filter(t => t.userId === user.id)
    .filter(t => {
      const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || t.type === filterType;
      const matchesStatus = filterStatus === 'all' || t.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const pointsBreakdown = [
    {
      label: 'Referral Points',
      value: user.referralPoints,
      icon: Users,
      color: 'green',
      description: 'Points earned from successful referrals'
    },
    {
      label: 'Performance Points',
      value: user.performancePoints,
      icon: TrendingUp,
      color: 'purple',
      description: 'Recognition and performance bonuses'
    },
    {
      label: 'Travel Miles',
      value: user.travelMiles,
      icon: Plane,
      color: 'orange',
      description: 'Business travel and client meetings'
    }
  ];

  const handleExportCSV = () => {
    const csvContent = [
      ['Date', 'Type', 'Description', 'Amount', 'Status'],
      ...userTransactions.map(t => [
        new Date(t.date).toLocaleDateString(),
        t.type,
        t.description,
        t.amount,
        t.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-points-history.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Points</h1>
          <p className="text-gray-600 mt-1">Track and manage your benefit points</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Total Points Display */}
      <div className="bg-gradient-to-r from-blue-600 to-orange-600 rounded-lg shadow-lg text-white p-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Total Points Balance</h2>
          <div className="text-6xl font-bold mb-4">{user.totalPoints}</div>
          <p className="text-blue-100">Available for redemption</p>
        </div>
      </div>

      {/* Points Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pointsBreakdown.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg bg-${item.color}-50`}>
                <item.icon className={`h-6 w-6 text-${item.color}-600`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.label}</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{item.value}</p>
                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Transaction History</h2>
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="referral">Referral</option>
              <option value="performance">Performance</option>
              <option value="travel">Travel</option>
              <option value="redemption">Redemption</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Points</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {userTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className={`p-1 rounded ${
                        transaction.type === 'referral' ? 'bg-green-100' :
                        transaction.type === 'performance' ? 'bg-purple-100' :
                        transaction.type === 'travel' ? 'bg-orange-100' :
                        'bg-red-100'
                      }`}>
                        {transaction.type === 'referral' && <Users className="h-3 w-3 text-green-600" />}
                        {transaction.type === 'performance' && <TrendingUp className="h-3 w-3 text-purple-600" />}
                        {transaction.type === 'travel' && <Plane className="h-3 w-3 text-orange-600" />}
                        {transaction.type === 'redemption' && <Coins className="h-3 w-3 text-red-600" />}
                      </div>
                      <span className="capitalize text-sm font-medium">{transaction.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-900">{transaction.description}</p>
                    {transaction.referenceNumber && (
                      <p className="text-xs text-gray-500">Ref: {transaction.referenceNumber}</p>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center">
                      {transaction.amount > 0 ? (
                        <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`font-semibold ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'approved' 
                        ? 'bg-green-100 text-green-800'
                        : transaction.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {userTransactions.length === 0 && (
          <div className="text-center py-8">
            <Coins className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No transactions found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPoints;