import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Stack } from '@mui/material';

function AboutCTA() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        px: 2,
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: '700px',
            mx: 'auto',
          }}
        >
          <Typography
            variant="h5"
            component="p"
            sx={{
              mb: 4,
              lineHeight: 1.7,
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: 'text.primary',
              fontWeight: 400,
            }}
          >
            Whether you're training for your first race or your fastest one yet,
            my goal is to help you train smarter, stay healthy, and enjoy the
            process.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => navigate('/pricing')}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                minWidth: { xs: '100%', sm: '200px' },
              }}
            >
              View Coaching Plans
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/pricing')}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                minWidth: { xs: '100%', sm: '200px' },
              }}
            >
              Get Started
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutCTA;

