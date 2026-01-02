import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Alert,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const planDetails = {
  'pdf-5k': {
    name: '5K Training Plan',
    type: 'Downloadable Plan',
    price: 29,
    features: [
      '12-week structured plan',
      'Beginner to intermediate',
      'PDF download',
    ],
  },
  'pdf-half': {
    name: 'Half Marathon Plan',
    type: 'Downloadable Plan',
    price: 49,
    features: [
      '16-week structured plan',
      'Intermediate to advanced',
      'PDF download',
    ],
  },
  'pdf-marathon': {
    name: 'Marathon Plan',
    type: 'Downloadable Plan',
    price: 69,
    features: [
      '20-week structured plan',
      'Intermediate to advanced',
      'PDF download',
    ],
  },
  level1: {
    name: 'Level 1 - Essential Coaching',
    type: 'Monthly Coaching',
    price: 99,
    features: [
      'Customized training plan',
      'Monthly plan updates',
      'Email support',
    ],
  },
  level2: {
    name: 'Level 2 - Premium Coaching',
    type: 'Monthly Coaching',
    price: 179,
    features: [
      'Everything in Level 1',
      'Bi-weekly plan adjustments',
      'Weekly check-ins',
      'Form analysis & feedback',
    ],
  },
  level3: {
    name: 'Level 3 - Elite Virtual 1-on-1 Coaching',
    type: 'Monthly Coaching',
    price: 299,
    features: [
      'Everything in Level 2',
      'Weekly 1-on-1 video calls',
      'Real-time plan adjustments',
      'Priority support',
      'Nutrition & recovery guidance',
    ],
  },
};

function Checkout() {
  const { plan: planParam } = useParams();
  const navigate = useNavigate();
  const { selectedPlan, setSelectedPlan, setIsAuthenticated } = useAppContext();

  // Use plan from URL params if selectedPlan is not set
  const currentPlan = selectedPlan || planParam;
  const plan = planDetails[currentPlan];

  useEffect(() => {
    // If plan is in URL but selectedPlan is not set, set it in context
    if (planParam && !selectedPlan && planDetails[planParam]) {
      setSelectedPlan(planParam);
    }
    // If no plan is selected and no plan in URL, redirect to pricing
    if (!currentPlan || !plan) {
      navigate('/pricing');
    }
  }, [currentPlan, plan, navigate, planParam, selectedPlan, setSelectedPlan]);

  const handleCompletePurchase = () => {
    setIsAuthenticated(true);
    navigate('/onboarding/intake');
  };

  if (!plan) {
    return null; // Will redirect in useEffect
  }

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
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            align="center"
            gutterBottom
            sx={{ mb: 2 }}
          >
            Checkout
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ fontWeight: 400 }}
          >
            Review your selection and complete your purchase
          </Typography>
        </Container>
      </Box>

      {/* Checkout Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Container maxWidth="md">
          <Paper elevation={2} sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
              Order Summary
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" component="h3" gutterBottom>
                {plan.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {plan.type}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <List dense>
                {plan.features.map((feature, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                    <CheckCircleIcon
                      sx={{ color: 'primary.main', fontSize: 20, mr: 1 }}
                    />
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography variant="h6" component="span">
                Total
              </Typography>
              <Typography
                variant="h4"
                component="span"
                sx={{ fontWeight: 600, color: 'primary.main' }}
              >
                ${plan.price}
                {plan.type === 'Monthly Coaching' && (
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 1, fontWeight: 400 }}
                  >
                    /month
                  </Typography>
                )}
              </Typography>
            </Box>

            <Alert severity="info" sx={{ mb: 3 }}>
              {plan.type === 'Downloadable Plan'
                ? 'You will receive a download link via email after purchase.'
                : 'Your coaching subscription will begin immediately after purchase.'}
            </Alert>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleCompletePurchase}
              sx={{
                py: 1.5,
                fontSize: '1.1rem',
              }}
            >
              Complete Purchase
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 2 }}
            >
              By completing this purchase, you agree to our terms of service.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default Checkout;

