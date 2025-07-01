import React, { useState } from 'react';
import { mockTransactions, mockUsers } from '../../data/mockData';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar, 
  User, 
  RotateCcw,
  Eye,
  Clock
} from 'lucide-react';

const AuditHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);

  // Extended transaction data with audit information
  const auditTransactions = mockTransactions.map(transaction => ({
    ...transaction,
    userName: mockUsers.find(u => u.id === transaction.userId)?.name || 'Unknown User',
    modifiedBy: transaction.approvedBy || 'System',
    canReverse: new Date().getTime() - new Date(transaction.date).getTime() < 24 * 60 * 60 * 1000, // 24 hours
    ipAddress: '192.168.1.' + Math.floor(Math.random() * 255),
    userAgent: 'Chrome/120.0.0.0'
  }));

  const filteredTransactions = auditTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesDate = filterDate === 'all' || 
                       (filterDate === 'today' && new Date(transaction.date).toDateString() === new Date().toDateString()) ||
                       (filterDate === 'week' && new Date().getTime() - new Date(transaction.date).getTime() < 7 * 24 * 60 * 60 * 1000) ||
                       (filterDate === 'month' && new Date().getTime() - new Date(transaction.date).getTime() < 30 * 24 * 60 * 60 * 1000);
    
    return matchesSearch && matchesType && matchesDate;
  });

  const handleExportAudit = () => {
    const csvContent = [
      ['Date', 'User', 'Type', 'Description', 'Amount', 'Status', 'Modified By', 'IP Address'],
      ...filteredTransactions.map(t => [
        new Date(t.date).toLocaleString(),
        t.userName,
        t.type,
        t.description,
        t.amount,
        t.status,
        t.modifiedBy,
        t.ipAddress
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit-log.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleReverseTransaction = (transactionId: string) => {
    if (window.confirm('Are you sure you want to reverse this transaction? This action cannot be undone.')) {
      alert('Transaction reversed successfully!');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'referral':
        return '👥';
      case 'performance':
        return '🏆';
      case 'travel':
        return '✈️';
      case 'redemption':
        return '🛍️';
      default:
        return '📝';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Audit & History</h2>
          <p className="text-gray-600">Complete transaction log with audit trail</p>
        </div>
        <button
          onClick={handleExportAudit}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Export Audit Log</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
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
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          <div className="text-sm text-gray-500">
            Showing {filteredTransactions.length} of {auditTransactions.length} transactions
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Transaction Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Date & Time</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">User</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Description</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Amount</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Modified By</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(transaction.date).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{transaction.userName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getTypeIcon(transaction.type)}</span>
                      <span className="text-sm font-medium capitalize">{transaction.type}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm text-gray-900">{transaction.description}</p>
                    {transaction.referenceNumber && (
                      <p className="text-xs text-gray-500">Ref: {transaction.referenceNumber}</p>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`font-semibold ${
                      transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                    </span>
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
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm text-gray-900">{transaction.modifiedBy}</p>
                      <p className="text-xs text-gray-500">{transaction.ipAddress}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => setSelectedTransaction(transaction.id)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {transaction.canReverse && transaction.status === 'approved' && (
                        <button
                          onClick={() => handleReverseTransaction(transaction.id)}
                          className="text-orange-600 hover:text-orange-800 p-1"
                          title="Reverse Transaction"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No transactions found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Transaction Details</h3>
            </div>
            <div className="p-6">
              {(() => {
                const transaction = auditTransactions.find(t => t.id === selectedTransaction);
                if (!transaction) return null;
                
                return (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Transaction ID</label>
                        <p className="text-gray-900">{transaction.id}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">User</label>
                        <p className="text-gray-900">{transaction.userName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Type</label>
                        <p className="text-gray-900 capitalize">{transaction.type}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Amount</label>
                        <p className={`font-semibold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount} points
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Status</label>
                        <p className="text-gray-900 capitalize">{transaction.status}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Modified By</label>
                        <p className="text-gray-900">{transaction.modifiedBy}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">IP Address</label>
                        <p className="text-gray-900">{transaction.ipAddress}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">User Agent</label>
                        <p className="text-gray-900 text-sm">{transaction.userAgent}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Description</label>
                      <p className="text-gray-900">{transaction.description}</p>
                    </div>
                    {transaction.referenceNumber && (
                      <div>
                        <label className="text-sm font-medium text-gray-500">Reference Number</label>
                        <p className="text-gray-900">{transaction.referenceNumber}</p>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setSelectedTransaction(null)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditHistory;