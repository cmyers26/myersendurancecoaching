import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Alert, Box, Button } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

function RequireIntake({ children }) {
  const { intakeComplete } = useAppContext();
  const navigate = useNavigate();

  return (
    <>
      {!intakeComplete && (
        <Alert
          severity="warning"
          icon={<WarningIcon />}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => navigate('/onboarding/intake')}
            >
              Complete Intake
            </Button>
          }
          sx={{
            borderRadius: 0,
            position: 'sticky',
            top: 0,
            zIndex: 1000,
          }}
        >
          Complete your intake to unlock your training plan
        </Alert>
      )}
      {children}
    </>
  );
}

export default RequireIntake;

