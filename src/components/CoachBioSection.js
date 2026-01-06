import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function CoachBioSection() {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        px: 2,
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: '800px',
            mx: 'auto',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              mb: 4,
              fontWeight: 600,
            }}
          >
            About Coach Chad Myers
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              lineHeight: 1.75,
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: 'text.primary',
            }}
          >
            My coaching philosophy is shaped by more than 30 years as a
            competitive runner and over 12 years of coaching experience at both
            the high school and NCAA Division I levels.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.75,
              fontSize: { xs: '1rem', md: '1.1rem' },
              color: 'text.primary',
            }}
          >
            I believe deeply in the value of hard work — and just as strongly in
            the importance of not doing too much. Sustainable progress comes
            from consistency, smart structure, and understanding when to push
            and when to pull back. My goal as a coach is to help athletes
            maximize their potential while staying healthy and motivated
            long-term.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default CoachBioSection;

