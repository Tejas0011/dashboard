import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Coins, 
  Gift, 
  Users, 
  User,
  Award,
  Settings
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  const employeeNavItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/points', icon: Coins, label: 'My Points' },
    { to: '/rewards', icon: Gift, label: 'Rewards Catalog' },
    { to: '/referrals', icon: Users, label: 'Referral Program' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  const managerNavItems = [
    ...employeeNavItems,
    { to: '/nominate', icon: Award, label: 'Nominate Employee' },
  ];

  const adminNavItems = [
    ...managerNavItems,
    { to: '/admin', icon: Settings, label: 'Admin Panel' },
  ];

  const getNavItems = () => {
    if (user?.role === 'admin') return adminNavItems;
    if (user?.role === 'manager') return managerNavItems;
    return employeeNavItems;
  };

  return (
    <nav className="bg-white border-r border-gray-200 w-64 min-h-screen">
      <div className="p-6">
        <div className="space-y-2">
          {getNavItems().map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;