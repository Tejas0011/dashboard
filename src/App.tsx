import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './components/Auth/LoginPage';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import MyPoints from './components/Points/MyPoints';
import ReferralProgram from './components/Referrals/ReferralProgram';
import RewardsCatalog from './components/Rewards/RewardsCatalog';
import Profile from './components/Profile/Profile';
import NominateEmployee from './components/Manager/NominateEmployee';
import AdminPanel from './components/Admin/AdminPanel';
import ProtectedRoute from './components/Auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/points" element={<MyPoints />} />
              <Route path="/rewards" element={<RewardsCatalog />} />
              <Route path="/referrals" element={<ReferralProgram />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/nominate" element={
                <ProtectedRoute requiredRole="manager">
                  <NominateEmployee />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminPanel />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;