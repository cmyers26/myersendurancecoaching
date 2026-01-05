import React from 'react';
import { useAppContext } from '../context/AppContext';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';

const planDetails = {
  'pdf-5k': {
    name: '5K Training Plan',
    type: 'Downloadable Plan',
  },
  'pdf-half': {
    name: 'Half Marathon Plan',
    type: 'Downloadable Plan',
  },
  'pdf-marathon': {
    name: 'Marathon Plan',
    type: 'Downloadable Plan',
  },
  level1: {
    name: 'Level 1 - Essential Coaching',
    type: 'Monthly Coaching',
  },
  level2: {
    name: 'Level 2 - Premium Coaching',
    type: 'Monthly Coaching',
  },
  level3: {
    name: 'Level 3 - Elite Virtual 1-on-1 Coaching',
    type: 'Monthly Coaching',
  },
};

function AthleteDashboard() {
  const { selectedPlan, intakeComplete } = useAppContext();
  const plan = selectedPlan ? planDetails[selectedPlan] : null;

  return (
    <>
      {/* Page Header */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: 2,
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ mb: 2 }}
          >
            Intake Dashboard
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontWeight: 400 }}
          >
            Welcome to your intake dashboard
          </Typography>
        </Container>
      </Box>

      {/* Dashboard Content */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Selected Plan Card */}
            <Grid item xs={12} md={6}>
              <Card elevation={2} sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Your Plan
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  {plan ? (
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {plan.name}
                      </Typography>
                      <Chip
                        label={plan.type}
                        color="primary"
                        size="small"
                        sx={{ mb: 2 }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Your coaching plan has been received and is being processed.
                      </Typography>
                    </Box>
                  ) : (
                    <Alert severity="info" icon={<InfoIcon />}>
                      No plan selected. Visit the pricing page to choose a
                      coaching plan.
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Intake Status Card */}
            <Grid item xs={12} md={6}>
              <Card elevation={2} sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Intake Status
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  {intakeComplete ? (
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CheckCircleIcon
                          sx={{ color: 'success.main', fontSize: 32, mr: 1 }}
                        />
                        <Typography variant="h6">Intake Complete</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Your intake form has been submitted. Your personalized
                        training plan will be created based on your responses.
                      </Typography>
                    </Box>
                  ) : (
                    <Alert severity="warning">
                      Intake form not completed. Please complete your intake to
                      receive your training plan.
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default AthleteDashboard;


