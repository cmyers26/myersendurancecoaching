import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
} from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import SEO from './SEO';

function CheckoutCancel() {
  return (
    <>
      <SEO pageKey="checkoutCancel" />
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
            <CancelOutlinedIcon
              sx={{
                fontSize: { xs: 80, md: 100 },
                color: 'warning.main',
                mb: 2,
              }}
            />
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ mb: 2 }}
            >
              Payment Canceled
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: 400 }}
            >
              Your payment was not processed
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Cancel Details */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Container maxWidth="md">
          <Paper elevation={2} sx={{ p: { xs: 3, md: 4 }, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              No charges have been made to your account. You can return to our pricing page 
              to review our coaching options and try again when you're ready.
            </Typography>

            <Button
              component={RouterLink}
              to="/pricing"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 2 }}
            >
              Back to Pricing
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default CheckoutCancel;

