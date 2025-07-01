import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import PointsManagement from './PointsManagement';
import ReferralTracking from './ReferralTracking';
import GoogleSheetsIntegration from './GoogleSheetsIntegration';
import AuditHistory from './AuditHistory';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', component: AdminDashboard },
    { id: 'points', label: 'Points Management', component: PointsManagement },
    { id: 'referrals', label: 'Referral Tracking', component: ReferralTracking },
    { id: 'sheets', label: 'Google Sheets', component: GoogleSheetsIntegration },
    { id: 'audit', label: 'Audit & History', component: AuditHistory },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || AdminDashboard;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-gray-600 mt-1">Manage the employee benefits system</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;