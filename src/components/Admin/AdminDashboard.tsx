import React from 'react';
import { mockUsers, mockTransactions, mockReferrals, mockNominations } from '../../data/mockData';
import { 
  Users, 
  Coins, 
  Clock, 
  TrendingUp, 
  UserPlus, 
  Award,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  // Calculate metrics
  const totalPointsInCirculation = mockUsers.reduce((sum, user) => sum + user.totalPoints, 0);
  const pendingNominations = mockNominations.filter(nom => nom.status === 'pending').length;
  const activeReferrals = mockReferrals.filter(ref => ref.status === 'Interview' || ref.status === 'Applied').length;
  const recentTransactions = mockTransactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const metrics = [
    {
      label: 'Total Users',
      value: mockUsers.length,
      icon: Users,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: '+5%'
    },
    {
      label: 'Points in Circulation',
      value: totalPointsInCirculation,
      icon: Coins,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      change: '+12%'
    },
    {
      label: 'Pending Actions',
      value: pendingNominations,
      icon: Clock,
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      change: '3 items'
    },
    {
      label: 'Active Referrals',
      value: activeReferrals,
      icon: UserPlus,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      change: '+2 this week'
    }
  ];

  const departmentStats = mockUsers.reduce((acc, user) => {
    if (!acc[user.department]) {
      acc[user.department] = { users: 0, points: 0 };
    }
    acc[user.department].users++;
    acc[user.department].points += user.totalPoints;
    return acc;
  }, {} as Record<string, { users: number; points: number }>);

  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{metric.value}</p>
                <p className="text-sm text-gray-500 mt-1">{metric.change}</p>
              </div>
              <div className={`${metric.bgColor} p-3 rounded-lg`}>
                <metric.icon className={`h-6 w-6 ${metric.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentTransactions.map((transaction) => {
                const user = mockUsers.find(u => u.id === transaction.userId);
                return (
                  <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        transaction.amount > 0 ? 'bg-green-50' : 'bg-red-50'
                      }`}>
                        {transaction.amount > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <Coins className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user?.name}</p>
                        <p className="text-sm text-gray-500">{transaction.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}{transaction.amount} pts
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Department Overview */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Department Overview</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {Object.entries(departmentStats).map(([dept, stats]) => (
                <div key={dept} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{dept}</p>
                    <p className="text-sm text-gray-500">{stats.users} employees</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-600">{stats.points} pts</p>
                    <p className="text-xs text-gray-500">
                      {Math.round(stats.points / stats.users)} avg
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pending Actions */}
      {pendingNominations > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-6 w-6 text-yellow-600" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">Pending Actions Required</h3>
              <p className="text-yellow-700">
                You have {pendingNominations} nomination{pendingNominations !== 1 ? 's' : ''} waiting for approval.
              </p>
            </div>
            <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
              Review Now
            </button>
          </div>
        </div>
      )}

      {/* System Status */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">System Status</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Database</p>
                <p className="text-sm text-green-600">Operational</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Points Engine</p>
                <p className="text-sm text-green-600">Running</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="font-medium text-gray-900">Sync Service</p>
                <p className="text-sm text-yellow-600">Maintenance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;