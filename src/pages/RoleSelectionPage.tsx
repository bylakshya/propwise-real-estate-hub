
import React from 'react';
import RoleSelectionForm from '@/components/auth/RoleSelectionForm';

const RoleSelectionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <RoleSelectionForm />
    </div>
  );
};

export default RoleSelectionPage;
