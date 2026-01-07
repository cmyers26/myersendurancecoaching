import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import { supabase } from '../lib/supabase';
import { validateProductType } from '../lib/productValidation';

function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { selectedPlan, setSelectedPlan, setIsAuthenticated } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Read productType from query parameter "product"
  const productTypeParam = searchParams.get('product');
  
  // Validate product type using utility function
  const validationResult = useMemo(() => {
    const rawType = selectedPlan || productTypeParam;
    return validateProductType(rawType);
  }, [selectedPlan, productTypeParam]);

  const { isValid: isValidProduct, product, errorMessage: validationError } = validationResult;

  useEffect(() => {
    // If productType is in query params but selectedPlan is not set, set it in context
    if (productTypeParam && !selectedPlan && isValidProduct) {
      setSelectedPlan(productTypeParam);
    }
    // If no valid productType, redirect to pricing
    if (!isValidProduct) {
      navigate('/pricing');
    }
  }, [isValidProduct, navigate, productTypeParam, selectedPlan, setSelectedPlan]);

  const handleCompletePurchase = async () => {
    // Validate product before proceeding
    if (!isValidProduct || !product) {
      setSubmitError(validationError || 'Invalid product. Please select a valid product to continue.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Check if we're in local development mode without Vercel
      const isDevelopment = process.env.NODE_ENV === 'development';
      const skipStripe = isDevelopment && window.location.hostname === 'localhost';

      if (skipStripe) {
        // Development mode: Skip Stripe and go straight to intake
        console.warn('⚠️ Development mode: Skipping Stripe checkout. Use "vercel dev" to test Stripe integration.');
        setIsAuthenticated(true);
        const productType = productTypeParam || selectedPlan;
        navigate(`/intake?product=${productType}`);
        return;
      }

      // Get Stripe price ID and billing type from productConfig
      const stripePriceId = product.stripePriceId;
      const billingType = product.billingType;

      // Additional validation (should not happen if validateProductType worked correctly)
      if (!stripePriceId) {
        throw new Error('Stripe price ID not found for this product. Please contact support.');
      }

      // Create order record with product_type and status
      const { error: insertError } = await supabase
        .from('orders')
        .insert([
          {
            product_type: product.productType,
            status: 'pending',
            created_at: new Date().toISOString(),
          },
        ]);

      if (insertError) {
        console.error('Order insert error:', insertError);
        if (
          insertError.message.includes('row-level security') ||
          insertError.message.includes('RLS') ||
          insertError.code === '42501'
        ) {
          throw new Error(
            `RLS Policy Error: ${insertError.message}. Please verify that an INSERT policy exists for the 'orders' table. Error code: ${insertError.code || 'N/A'}`
          );
        }
        throw new Error(`Failed to create order: ${insertError.message} (Code: ${insertError.code || 'N/A'})`);
      }

      // Call backend to create Stripe checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: stripePriceId,
          billingType: billingType,
          productType: product.productType,
          successUrl: `${window.location.origin}/intake?product=${encodeURIComponent(productTypeParam || selectedPlan || '')}`,
          cancelUrl: `${window.location.origin}/checkout?product=${encodeURIComponent(productTypeParam || selectedPlan || '')}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to create checkout session' }));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const { url: checkoutUrl } = await response.json();

      if (!checkoutUrl) {
        throw new Error('No checkout URL returned from server');
      }

      // Redirect to Stripe checkout
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error submitting checkout:', error);
      setSubmitError(
        error.message || 'An error occurred while processing your order. Please try again.'
      );
      setIsSubmitting(false);
    }
  };

  if (!isValidProduct) {
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
                {product.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
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
                {product.priceDisplay}
              </Typography>
            </Box>

            <Alert severity="info" sx={{ mb: 3 }}>
              {product.billingType === 'one_time'
                ? product.intakeType === 'addon'
                  ? 'Your add-on service will be activated after purchase. Coach Chad will reach out to you via email to coordinate the details.'
                  : 'You will receive a download link via email after purchase. Please allow 2-3 days for the plan to be formulated by Coach Chad and delivered.'
                : 'Your coaching subscription will begin immediately after purchase. Coach Chad will reach out to you via email to schedule an onboarding call.'}
            </Alert>

            {submitError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {submitError}
              </Alert>
            )}

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleCompletePurchase}
              disabled={!isValidProduct || isSubmitting}
              sx={{
                py: 1.5,
                fontSize: '1.1rem',
              }}
            >
              {isSubmitting ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  Processing...
                </Box>
              ) : (
                'Complete Purchase'
              )}
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

