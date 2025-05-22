
import React, { useState } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

const AuthPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-realestate-primary mb-2">RealEstate Pro</h1>
        <p className="text-gray-600">Comprehensive solution for real estate professionals</p>
      </div>
      
      {showLogin ? (
        <LoginForm onToggleForm={() => setShowLogin(false)} />
      ) : (
        <SignupForm onToggleForm={() => setShowLogin(true)} />
      )}
    </div>
  );
};

export default AuthPage;
