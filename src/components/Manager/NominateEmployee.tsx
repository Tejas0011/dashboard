import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockUsers, mockNominations } from '../../data/mockData';
import { User, Award, Send, CheckCircle, Clock, XCircle } from 'lucide-react';

const NominateEmployee: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    employeeId: '',
    points: 1,
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user || user.role !== 'manager') return null;

  // Get employees in the same department (excluding self)
  const departmentEmployees = mockUsers.filter(
    emp => emp.department === user.department && emp.id !== user.id && emp.role === 'employee'
  );

  const userNominations = mockNominations
    .filter(nom => nom.nominatorId === user.id)
    .sort((a, b) => new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.points < 1 || !formData.reason.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('Nomination submitted successfully! It will be reviewed by admin.');
    setFormData({ employeeId: '', points: 1, reason: '' });
    setIsSubmitting(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Nominate Employee</h1>
        <p className="text-gray-600 mt-1">Recognize outstanding performance with points</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Nomination Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Submit Nomination
            </h2>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Employee *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    value={formData.employeeId}
                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose an employee</option>
                    {departmentEmployees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} - {emp.department}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Points to Award * (Minimum 1)
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={formData.points}
                  onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 1 })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Award between 1-20 points based on performance</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Reason *
                </label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Provide specific details about the employee's outstanding performance, achievements, or contributions that warrant this recognition..."
                />
                <p className="text-xs text-gray-500 mt-1">Minimum 50 characters required</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || formData.points < 1 || formData.reason.length < 50}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Nomination'}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Guidelines */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Nomination Guidelines</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Award Criteria</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Exceptional work quality or innovation</li>
                  <li>• Going above and beyond job requirements</li>
                  <li>• Outstanding team collaboration</li>
                  <li>• Significant project contributions</li>
                  <li>• Leadership and mentoring efforts</li>
                </ul>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                <h3 className="font-semibold text-orange-800 mb-2">Points Scale</h3>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• 1-5 points: Good performance</li>
                  <li>• 6-10 points: Excellent work</li>
                  <li>• 11-15 points: Outstanding achievement</li>
                  <li>• 16-20 points: Exceptional contribution</li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-400 p-4">
                <h3 className="font-semibold text-green-800 mb-2">Process</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Nominations sent to admin for review</li>
                  <li>• Admin approval required for point award</li>
                  <li>• Employee notified upon approval</li>
                  <li>• Points credited to employee account</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nomination History */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">My Nominations</h2>
        </div>
        <div className="p-6">
          {userNominations.length === 0 ? (
            <div className="text-center py-8">
              <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No nominations submitted yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userNominations.map((nomination) => {
                const employee = mockUsers.find(u => u.id === nomination.employeeId);
                return (
                  <div key={nomination.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{employee?.name}</h3>
                            <p className="text-sm text-gray-500">{employee?.department}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{nomination.reason}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            Submitted {new Date(nomination.dateSubmitted).toLocaleDateString()}
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="font-semibold text-blue-600">{nomination.points} points</span>
                            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(nomination.status)}`}>
                              {getStatusIcon(nomination.status)}
                              <span className="capitalize">{nomination.status}</span>
                            </span>
                          </div>
                        </div>
                        {nomination.approvedBy && nomination.approvedDate && (
                          <p className="text-xs text-green-600 mt-2">
                            Approved by {nomination.approvedBy} on {new Date(nomination.approvedDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NominateEmployee;