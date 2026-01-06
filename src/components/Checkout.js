import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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

const productConfig = {
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
  'pdf-10k': {
    name: '10K Training Plan',
    type: 'Downloadable Plan',
    price: 35,
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
    name: 'Bronze - Essential Coaching',
    type: 'Monthly Coaching',
    price: 99,
    features: [
      'Customized training plan',
      'Monthly plan updates',
      'Email support',
    ],
  },
  level2: {
    name: 'Silver - Premium Coaching',
    type: 'Monthly Coaching',
    price: 179,
    features: [
      'Everything in Bronze',
      'Bi-weekly plan adjustments',
      'Weekly check-ins',
      'Form analysis & feedback',
    ],
  },
  level3: {
    name: 'Gold - Elite Virtual 1-on-1 Coaching',
    type: 'Monthly Coaching',
    price: 299,
    features: [
      'Everything in Silver',
      'Weekly 1-on-1 video calls',
      'Real-time plan adjustments',
      'Priority support',
      'Nutrition & recovery guidance',
    ],
  },
  'addon-strength': {
    name: 'Strength Training Program',
    type: 'Add-On',
    price: 49,
    pricingUnit: '/month',
    features: [
      'Runner-specific exercises',
      '2-3 sessions per week',
      'Mobility work & progressions',
    ],
  },
  'addon-race-strategy': {
    name: 'Race Strategy Consultation',
    type: 'Add-On',
    price: 99,
    pricingUnit: '/session',
    features: [
      '60-minute strategy session',
      'Personalized pacing plan',
      'Written race strategy document',
    ],
  },
};

function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { selectedPlan, setSelectedPlan, setIsAuthenticated } = useAppContext();

  // Read productType from query parameter "product"
  const productTypeParam = searchParams.get('product');
  
  // Use productType from query params if selectedPlan is not set
  const currentProductType = selectedPlan || productTypeParam;
  const product = productConfig[currentProductType];

  useEffect(() => {
    // If productType is in query params but selectedPlan is not set, set it in context
    if (productTypeParam && !selectedPlan && productConfig[productTypeParam]) {
      setSelectedPlan(productTypeParam);
    }
    // If no productType is selected and no productType in query params, redirect to pricing
    if (!currentProductType || !product) {
      navigate('/pricing');
    }
  }, [currentProductType, product, navigate, productTypeParam, selectedPlan, setSelectedPlan]);

  const handleCompletePurchase = () => {
    setIsAuthenticated(true);
    // Include product query parameter in the navigation
    const productType = currentProductType || productTypeParam;
    if (productType) {
      navigate(`/intake?product=${productType}`);
    } else {
      navigate('/intake');
    }
  };

  if (!product) {
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
            variant="h3"
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
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {product.type}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <List dense>
                {product.features.map((feature, index) => (
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
                variant="h5"
                component="span"
                sx={{ fontWeight: 600, color: 'primary.main' }}
              >
                ${product.price}
                {product.type === 'Monthly Coaching' && (
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
              {product.type === 'Downloadable Plan'
                ? 'You will receive a download link via email after purchase. Please allow 2-3 days for the plan to be formulated by Coach Chad and delivered.'
                : product.type === 'Add-On'
                ? 'Your add-on service will be activated after purchase. Coach Chad will reach out to you via email to coordinate the details.'
                : 'Your coaching subscription will begin immediately after purchase. Coach Chad will reach out to you via email to schedule an onboarding call.'}
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

