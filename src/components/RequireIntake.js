import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Alert, Button } from '@mui/material';
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
              onClick={() => navigate('/pricing')}
            >
              View Plans
            </Button>
          }
          sx={{
            borderRadius: 0,
            position: 'sticky',
            top: 0,
            zIndex: 1000,
          }}
        >
          Purchase a coaching plan to access your training dashboard
        </Alert>
      )}
      {children}
    </>
  );
}

export default RequireIntake;

