import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

function RequireIntake({ children }) {
  const { intakeComplete } = useAppContext();

  if (!intakeComplete) {
    return <Navigate to="/onboarding/intake" replace />;
  }

  return children;
}

export default RequireIntake;

