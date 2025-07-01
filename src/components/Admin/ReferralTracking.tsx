import React, { useState } from 'react';
import { mockReferrals, mockUsers } from '../../data/mockData';
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Calendar, 
  Award, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const ReferralTracking: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedReferral, setSelectedReferral] = useState<string | null>(null);

  const allReferrals = mockReferrals.map(referral => ({
    ...referral,
    referrerName: mockUsers.find(u => u.id === referral.referrerId)?.name || 'Unknown'
  }));

  const filteredReferrals = allReferrals.filter(referral => 
    filterStatus === 'all' || referral.status === filterStatus
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Hired':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Interview':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'Applied':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'Rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hired':
        return 'bg-green-100 text-green-800';
      case 'Interview':
        return 'bg-blue-100 text-blue-800';
      case 'Applied':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = (referralId: string, newStatus: string) => {
    // Simulate API call
    alert(`Referral status updated to ${newStatus}`);
  };

  const handleAwardPoints = (referralId: string, points: number) => {
    // Simulate API call
    alert(`${points} points awarded for referral milestone!`);
  };

  const getMilestoneActions = (referral: any) => {
    if (referral.status !== 'Hired') return null;

    const actions = [];
    
    if (referral.monthsCompleted >= 3 && referral.pointsEarned === 0) {
      actions.push({
        label: '3-Month Milestone',
        points: 3,
        description: 'Award 3 points for 3-month completion'
      });
    }
    
    if (referral.monthsCompleted >= 6 && referral.pointsEarned < 5) {
      actions.push({
        label: '6-Month Milestone',
        points: 2,
        description: 'Award 2 points for 6-month completion'
      });
    }

    return actions;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Referral Tracking</h2>
          <p className="text-gray-600">Monitor all referrals and manage milestone rewards</p>
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Hired">Hired</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Timeline View */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Referral Timeline</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {filteredReferrals.map((referral) => {
              const milestones = getMilestoneActions(referral);
              
              return (
                <div key={referral.id} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{referral.candidateName}</h4>
                        <p className="text-sm text-gray-600">
                          Referred by {referral.referrerName} for {referral.position}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(referral.status)}`}>
                        {getStatusIcon(referral.status)}
                        <span>{referral.status}</span>
                      </span>
                      <select
                        onChange={(e) => handleStatusUpdate(referral.id, e.target.value)}
                        className="px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value=""
                      >
                        <option value="">Update Status</option>
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Hired">Hired</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span>{referral.candidateEmail}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{referral.candidatePhone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Briefcase className="h-4 w-4" />
                      <span>{referral.relationship}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Submitted {new Date(referral.dateSubmitted).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {referral.status === 'Hired' && (
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold text-gray-900">Employment Progress</h5>
                        <div className="flex items-center space-x-2">
                          <Award className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-600">
                            {referral.pointsEarned} points earned
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                        <span>{referral.monthsCompleted} months completed</span>
                        <span>Next milestone: {referral.monthsCompleted < 3 ? '3 months' : '6 months'}</span>
                      </div>

                      <div className="bg-gray-200 rounded-full h-2 mb-4">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((referral.monthsCompleted / 6) * 100, 100)}%` }}
                        ></div>
                      </div>

                      {milestones && milestones.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-orange-800">Milestone Actions Available:</p>
                          {milestones.map((milestone, index) => (
                            <div key={index} className="flex items-center justify-between bg-orange-50 rounded p-3">
                              <div>
                                <p className="font-medium text-orange-800">{milestone.label}</p>
                                <p className="text-sm text-orange-600">{milestone.description}</p>
                              </div>
                              <button
                                onClick={() => handleAwardPoints(referral.id, milestone.points)}
                                className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 transition-colors"
                              >
                                Award {milestone.points} pts
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Bulk Actions</h3>
        </div>
        <div className="p-6">
          <div className="flex space-x-4">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Award All Pending 3-Month Points
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Award All Pending 6-Month Points
            </button>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
              Send Milestone Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralTracking;