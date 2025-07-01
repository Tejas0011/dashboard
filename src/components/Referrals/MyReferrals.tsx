import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { mockReferrals } from '../../data/mockData';
import { User, Mail, Phone, Briefcase, Calendar, Coins, Clock } from 'lucide-react';

const MyReferrals: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const userReferrals = mockReferrals.filter(referral => referral.referrerId === user.id);

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

  const getNextMilestone = (status: string, monthsCompleted: number) => {
    if (status !== 'Hired') return null;
    
    if (monthsCompleted < 3) {
      return { months: 3, points: 3, remaining: 3 - monthsCompleted };
    } else if (monthsCompleted < 6) {
      return { months: 6, points: 2, remaining: 6 - monthsCompleted };
    } else if (monthsCompleted < 12) {
      return { months: 12, points: 2, remaining: 12 - monthsCompleted };
    }
    return null;
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">My Referrals</h2>
        <p className="text-gray-600">
          Track the status of your referrals and earned points
        </p>
      </div>

      {userReferrals.length === 0 ? (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No referrals yet</h3>
          <p className="text-gray-500 mb-4">Start referring great candidates to earn points!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {userReferrals.map((referral) => {
            const nextMilestone = getNextMilestone(referral.status, referral.monthsCompleted);
            
            return (
              <div key={referral.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{referral.candidateName}</h3>
                        <p className="text-sm text-gray-500">{referral.position}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(referral.status)}`}>
                          {referral.status}
                        </span>
                        {referral.monthsCompleted > 0 && (
                          <span className="text-sm text-gray-500">
                            {referral.monthsCompleted} months completed
                          </span>
                        )}
                      </div>
                      
                      {referral.pointsEarned > 0 && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Coins className="h-4 w-4" />
                          <span className="font-semibold">+{referral.pointsEarned} points earned</span>
                        </div>
                      )}
                    </div>

                    {nextMilestone && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-blue-800">Next Milestone</p>
                            <p className="text-xs text-blue-600">
                              {nextMilestone.remaining} months until {nextMilestone.points} points
                            </p>
                          </div>
                          <div className="flex items-center text-blue-600">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className="text-sm font-medium">{nextMilestone.months} months</span>
                          </div>
                        </div>
                        <div className="mt-2 bg-blue-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(referral.monthsCompleted / nextMilestone.months) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyReferrals;