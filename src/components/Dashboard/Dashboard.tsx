import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockTransactions, mockRedemptions, mockReferrals } from '../../data/mockData';
import { 
  Coins, 
  TrendingUp, 
  Users, 
  Plane, 
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Award,
  Gift,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  const userTransactions = mockTransactions
    .filter(t => t.userId === user.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const userRedemptions = mockRedemptions
    .filter(r => r.userId === user.id)
    .sort((a, b) => new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime())
    .slice(0, 3);

  const userReferrals = mockReferrals
    .filter(r => r.referrerId === user.id)
    .sort((a, b) => new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime())
    .slice(0, 3);

  const stats = [
    {
      label: 'Total Points',
      value: user.totalPoints,
      icon: Coins,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      label: 'Referral Points',
      value: user.referralPoints,
      icon: Users,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      label: 'Performance Points',
      value: user.performancePoints,
      icon: TrendingUp,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      label: 'Travel Miles',
      value: user.travelMiles,
      icon: Plane,
      color: 'orange',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'Hired':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
      case 'Interview':
      case 'Applied':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'rejected':
      case 'Rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'Hired':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'Interview':
      case 'Applied':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="text-gray-600 mt-1">Here's your benefits overview</p>
      </div>

      {/* Points Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span>+12% from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {userTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      transaction.amount > 0 ? 'bg-green-50' : 'bg-red-50'
                    }`}>
                      {transaction.amount > 0 ? (
                        <ArrowUpRight className={`h-4 w-4 ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`} />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount} pts
                    </p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'approved' 
                        ? 'bg-green-100 text-green-800'
                        : transaction.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Redemptions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Gift className="h-5 w-5 mr-2" />
              Recent Redemptions
            </h2>
          </div>
          <div className="p-6">
            {userRedemptions.length === 0 ? (
              <div className="text-center py-8">
                <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No redemptions yet</p>
                <p className="text-sm text-gray-400">Start redeeming your points for amazing rewards!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userRedemptions.map((redemption) => (
                  <div key={redemption.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-orange-50">
                        <Award className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{redemption.itemName}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(redemption.dateSubmitted).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-orange-600">-{redemption.pointsUsed} pts</p>
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(redemption.status)}`}>
                        {getStatusIcon(redemption.status)}
                        <span>{redemption.status}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Referrals */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Recent Referrals
          </h2>
        </div>
        <div className="p-6">
          {userReferrals.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No referrals yet</p>
              <p className="text-sm text-gray-400">Start referring great candidates to earn points!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userReferrals.map((referral) => (
                <div key={referral.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-blue-50">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{referral.candidateName}</p>
                      <p className="text-sm text-gray-500">{referral.position}</p>
                      <p className="text-xs text-gray-400 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(referral.dateSubmitted).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(referral.status)}`}>
                      {getStatusIcon(referral.status)}
                      <span>{referral.status}</span>
                    </span>
                    {referral.pointsEarned > 0 && (
                      <p className="text-xs text-green-600 mt-1">+{referral.pointsEarned} pts earned</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;