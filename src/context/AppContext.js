import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [intakeComplete, setIntakeComplete] = useState(false);
  const [userRole, setUserRole] = useState('athlete');
  const [intakeData, setIntakeData] = useState(null);

  const value = {
    selectedPlan,
    setSelectedPlan,
    isAuthenticated,
    setIsAuthenticated,
    intakeComplete,
    setIntakeComplete,
    userRole,
    setUserRole,
    intakeData,
    setIntakeData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;

