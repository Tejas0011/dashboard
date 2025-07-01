import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError('');
    
    try {
      // In a real implementation, this would integrate with Supabase Auth
      // For now, we'll simulate Google login with a demo user
      const success = await login('john.doe@travclan.com', 'google-sso');
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Google login failed. Please try again.');
      }
    } catch (err) {
      setError('Google login failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 bg-blue-900 text-white p-4">
        <div className="flex items-center max-w-7xl mx-auto">
          <div className="flex items-center">
            <img 
              src="https://drive.google.com/uc?export=view&id=1WEwqWh-mA_v8uV-AVkA6CRR6TwBRKyyL" 
              alt="TravClan Logo" 
              className="h-8 w-auto"
              onError={(e) => {
                // Fallback if image fails to load
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) {
                  fallback.style.display = 'block';
                }
              }}
              onLoad={(e) => {
                // Hide fallback when image loads successfully
                const target = e.currentTarget as HTMLImageElement;
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) {
                  fallback.style.display = 'none';
                }
              }}
            />
            {/* Fallback logo if Google Drive image fails */}
            <div className="hidden">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">T</span>
                </div>
                <span className="text-xl font-bold text-white">TravClan</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mt-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Log In</h2>
          <p className="text-gray-600">Welcome to TravClan Employee Portal</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm text-center">
            {error}
          </div>
        )}

        {/* Google Login Button */}
        <div className="mb-6">
          <button
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-sm"
          >
            {isGoogleLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            <span>CONTINUE WITH GOOGLE</span>
          </button>
        </div>

        {/* Information Text */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            Use your TravClan Google account to access the Employee Benefits Dashboard
          </p>
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>Secure authentication powered by Google</span>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-orange-100 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 -left-20 w-40 h-40 bg-indigo-100 rounded-full opacity-15"></div>
        <div className="absolute top-1/4 -right-16 w-32 h-32 bg-purple-100 rounded-full opacity-15"></div>
      </div>
    </div>
  );
};

export default LoginPage;