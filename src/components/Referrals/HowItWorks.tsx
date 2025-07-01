import React from 'react';
import { UserPlus, FileText, Users, Award, Download, AlertTriangle } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: UserPlus,
      title: 'Submit Referral',
      description: 'Fill out the referral form with candidate details and submit their resume',
      details: ['Complete candidate information', 'Upload resume (optional)', 'Select appropriate position']
    },
    {
      icon: FileText,
      title: 'Application Process',
      description: 'Candidate applies for the position and goes through our hiring process',
      details: ['Candidate receives application link', 'HR reviews application', 'Interview process begins']
    },
    {
      icon: Users,
      title: 'Candidate Hired',
      description: 'When your referral is successfully hired, the point earning journey begins',
      details: ['Offer letter extended', 'Candidate joins TravClan', 'Point tracking starts']
    },
    {
      icon: Award,
      title: 'Earn Points',
      description: 'Earn points at specific milestones during the employee\'s tenure',
      details: ['3 points at 3 months', '2 points every 6 months', 'Automatic point credit']
    }
  ];

  const pointsStructure = [
    { milestone: '3 months', points: 3, description: 'Initial milestone bonus' },
    { milestone: '6 months', points: 2, description: 'Continued employment bonus' },
    { milestone: '12 months', points: 2, description: 'Annual retention bonus' },
    { milestone: '18 months', points: 2, description: 'Long-term retention bonus' },
    { milestone: 'Every 6 months thereafter', points: 2, description: 'Ongoing retention bonus' }
  ];

  const handleDownloadPolicy = () => {
    // Create a simple policy document
    const policyContent = `
TravClan Employee Referral Program Policy

1. ELIGIBILITY
- All active TravClan employees are eligible to participate
- Employees cannot refer immediate family members
- Referrals must be for open positions only

2. POINTS STRUCTURE
- 3 points when referral completes 3 months
- 2 points every 6 months thereafter
- -1 point for every 10 rejections (candidates who don't meet basic criteria)

3. FAIR USE POLICY
- Maximum 5 referrals per month per employee
- Referrals must be genuine and meet position requirements
- Spam or inappropriate referrals will result in program suspension

4. POINT REDEMPTION
- Points can be redeemed for rewards in the catalog
- Minimum redemption varies by reward tier
- Points expire after 24 months of inactivity

5. PROGRAM MODIFICATIONS
- TravClan reserves the right to modify this program
- Changes will be communicated 30 days in advance
- Existing earned points remain valid

Last Updated: January 2024
`;

    const blob = new Blob([policyContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'travclan-referral-policy.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">How It Works</h2>
        <p className="text-gray-600">
          Learn how our referral program works and start earning points today
        </p>
      </div>

      {/* Process Steps */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">4-Step Process</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <step.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                <ul className="space-y-1">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="text-xs text-gray-500 flex items-center">
                      <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-gray-300"></div>
                  <div className="w-0 h-0 absolute right-0 top-1/2 transform -translate-y-1/2 border-l-4 border-l-gray-300 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Points Structure */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Points Structure</h3>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h4 className="font-semibold text-gray-900">Milestone-Based Rewards</h4>
          </div>
          <div className="divide-y divide-gray-200">
            {pointsStructure.map((item, index) => (
              <div key={index} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-900">{item.milestone}</span>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-green-600">+{item.points}</span>
                  <span className="text-sm text-gray-500">points</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fair Use Policy */}
      <div className="mb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="text-lg font-semibold text-yellow-800 mb-2">Fair Use Policy</h4>
              <div className="text-sm text-yellow-700 space-y-2">
                <p>• Maximum 5 referrals per month per employee</p>
                <p>• Candidates must meet basic position requirements</p>
                <p>• -1 point deduction for every 10 rejected candidates</p>
                <p>• Spam or inappropriate referrals may result in program suspension</p>
                <p>• All referrals subject to standard hiring process and approval</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Policy */}
      <div className="text-center">
        <button
          onClick={handleDownloadPolicy}
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span>Download Complete Policy PDF</span>
        </button>
      </div>
    </div>
  );
};

export default HowItWorks;