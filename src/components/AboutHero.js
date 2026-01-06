import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function AboutHero() {
  const heroImageUrl = '/images/IMG_5324.JPG';

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        px: 2,
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: { xs: '60vh', md: '70vh' },
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto',
            color: 'white',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              mb: 3,
              fontWeight: 600,
              color: 'white',
            }}
          >
            About Coach Chad
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            Dedicated to helping adult runners achieve their goals through
            smart, sustainable training designed to fit your life and keep you
            healthy and injury-free.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutHero;

