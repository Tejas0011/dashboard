import React, { useState } from 'react';
import { mockUsers } from '../../data/mockData';
import { 
  Search, 
  Plus, 
  Minus, 
  Upload, 
  Download, 
  User, 
  Award,
  Plane,
  Users
} from 'lucide-react';

const PointsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [pointsForm, setPointsForm] = useState({
    employeeId: '',
    pointType: 'performance',
    amount: 1,
    reason: '',
    referenceNumber: ''
  });
  const [showBulkUpload, setShowBulkUpload] = useState(false);

  const quickActions = [
    { id: 'referral', label: 'Award Referral Points', icon: Users, color: 'green' },
    { id: 'performance', label: 'Add Performance Points', icon: Award, color: 'blue' },
    { id: 'travel', label: 'Credit Travel Miles', icon: Plane, color: 'orange' },
    { id: 'bulk', label: 'Bulk Upload Points', icon: Upload, color: 'purple' },
    { id: 'deduct', label: 'Deduct Points', icon: Minus, color: 'red' }
  ];

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleQuickAction = (actionId: string) => {
    setSelectedAction(actionId);
    if (actionId === 'bulk') {
      setShowBulkUpload(true);
    } else {
      setPointsForm({ ...pointsForm, pointType: actionId === 'deduct' ? 'deduction' : actionId });
    }
  };

  const handlePointsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockUsers.find(u => u.id === pointsForm.employeeId);
    if (!user) return;

    // Simulate API call
    alert(`Points ${pointsForm.amount > 0 ? 'awarded' : 'deducted'} successfully to ${user.name}`);
    setPointsForm({
      employeeId: '',
      pointType: 'performance',
      amount: 1,
      reason: '',
      referenceNumber: ''
    });
    setSelectedAction('');
  };

  const handleBulkUpload = () => {
    // Simulate bulk upload
    alert('Bulk upload completed successfully!');
    setShowBulkUpload(false);
  };

  const handleExportTemplate = () => {
    const template = 'Employee_ID,Name,Email,Point_Type,Amount,Reason,Reference_Number\n';
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'points-upload-template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action.id)}
              className={`p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all text-left group`}
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 bg-${action.color}-100 rounded-lg mb-3 group-hover:bg-${action.color}-200 transition-colors`}>
                <action.icon className={`h-5 w-5 text-${action.color}-600`} />
              </div>
              <p className="font-medium text-gray-900 text-sm">{action.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Individual Points Assignment */}
      {selectedAction && selectedAction !== 'bulk' && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Individual Point Assignment</h2>
          </div>
          <div className="p-6">
            <form onSubmit={handlePointsSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search & Select Employee *
                  </label>
                  <div className="relative mb-2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name, email, or department"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={pointsForm.employeeId}
                    onChange={(e) => setPointsForm({ ...pointsForm, employeeId: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select employee</option>
                    {filteredUsers.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name} - {user.department} ({user.totalPoints} pts)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Point Type *
                  </label>
                  <select
                    value={pointsForm.pointType}
                    onChange={(e) => setPointsForm({ ...pointsForm, pointType: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="referral">Referral Points</option>
                    <option value="performance">Performance Points</option>
                    <option value="travel">Travel Miles</option>
                    <option value="deduction">Point Deduction</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount * {pointsForm.pointType === 'deduction' ? '(Will be deducted)' : '(Minimum 1)'}
                  </label>
                  <input
                    type="number"
                    min={pointsForm.pointType === 'deduction' ? '1' : '1'}
                    value={pointsForm.amount}
                    onChange={(e) => setPointsForm({ ...pointsForm, amount: parseInt(e.target.value) || 1 })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reference Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={pointsForm.referenceNumber}
                    onChange={(e) => setPointsForm({ ...pointsForm, referenceNumber: e.target.value })}
                    placeholder="REF-001, TXN-123, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason *
                </label>
                <textarea
                  value={pointsForm.reason}
                  onChange={(e) => setPointsForm({ ...pointsForm, reason: e.target.value })}
                  required
                  rows={3}
                  placeholder="Provide detailed reason for this point adjustment..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {pointsForm.pointType === 'deduction' ? 'Deduct Points' : 'Award Points'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedAction('')}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Upload */}
      {showBulkUpload && (
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Bulk Points Upload</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Instructions</h3>
                <ol className="text-sm text-blue-700 list-decimal list-inside space-y-1">
                  <li>Download the CSV template</li>
                  <li>Fill in employee data and point adjustments</li>
                  <li>Upload the completed file</li>
                  <li>Review and confirm changes</li>
                </ol>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleExportTemplate}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Template</span>
                </button>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Drag and drop your CSV file here, or{' '}
                  <button className="text-blue-600 hover:text-blue-500">browse</button>
                </p>
                <p className="text-xs text-gray-500 mt-1">CSV files only, max 10MB</p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleBulkUpload}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Process Upload
                </button>
                <button
                  onClick={() => setShowBulkUpload(false)}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Current Points Summary */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Current Points Summary</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Employee</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Department</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Total</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Referral</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Performance</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Travel</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.slice(0, 10).map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{user.department}</td>
                    <td className="py-4 px-4 text-center font-semibold text-blue-600">{user.totalPoints}</td>
                    <td className="py-4 px-4 text-center text-green-600">{user.referralPoints}</td>
                    <td className="py-4 px-4 text-center text-purple-600">{user.performancePoints}</td>
                    <td className="py-4 px-4 text-center text-orange-600">{user.travelMiles}</td>
                    <td className="py-4 px-4 text-center">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Adjust
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsManagement;