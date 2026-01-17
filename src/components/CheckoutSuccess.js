import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Alert,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { productConfig } from '../config/productConfig';
import { normalizeProductType } from '../lib/productValidation';
import SEO from './SEO';

function CheckoutSuccess() {
  const [searchParams] = useSearchParams();
  const productParam = searchParams.get('product');

  // Get product details if product type is provided
  const product = useMemo(() => {
    if (!productParam) return null;
    const normalizedType = normalizeProductType(productParam);
    return normalizedType ? productConfig[normalizedType] : null;
  }, [productParam]);

  return (
    <>
      <SEO pageKey="checkoutSuccess" />
      {/* Page Header */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: 2,
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <CheckCircleOutlineIcon
              sx={{
                fontSize: { xs: 80, md: 100 },
                color: 'success.main',
                mb: 2,
              }}
            />
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ mb: 2 }}
            >
              Athlete Intake Form and Payment Successful!
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: 400 }}
            >
              Thank you for your purchase and for completing your athlete intake form.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Success Details */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Container maxWidth="md">
          <Paper elevation={2} sx={{ p: { xs: 3, md: 4 } }}>
            {product && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {product.description}
                </Typography>
              </Box>
            )}

            <Alert severity="success" sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                Coach Chad will reach out via email within a couple business days.
              </Typography>
            </Alert>

            <Box sx={{ mt: 3 }}>
              <Typography variant="body1" color="text.secondary">
                You should receive a confirmation email shortly. If you have any questions in the meantime, 
                feel free to contact us.
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default CheckoutSuccess;

