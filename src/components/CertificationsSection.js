import React from 'react';
import { Container, Typography, Box, Chip, Stack } from '@mui/material';

function CertificationsSection() {
  const certifications = [
    'USA Track & Field – Level I Coaching Certification',
  ];

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        px: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 5, fontWeight: 600 }}
        >
          Certifications
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {certifications.map((certification, index) => (
              <Chip
                key={index}
                label={certification}
                color="primary"
                sx={{
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  py: 2.5,
                  px: 1,
                  height: 'auto',
                  fontWeight: 500,
                }}
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default CertificationsSection;

