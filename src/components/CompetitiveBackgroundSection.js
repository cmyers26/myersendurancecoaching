import React from 'react';
import { Container, Typography, Box, Grid, Divider } from '@mui/material';

function CompetitiveBackgroundSection() {
  const collegiateAchievements = [
    'Served as co-captain of the cross country team (1993–1995)',
    'Qualified for the NCAA National Cross Country Championships in 1994 and 1995',
    'Won the conference championship in the 10,000 meters (1996)',
    'Earned All-Ohio honors in the 10,000 meters (1994)',
  ];

  const personalBests = [
    { distance: '5K', time: '15:10' },
    { distance: '10K', time: '31:18' },
    { distance: 'Marathon', time: '2:47' },
  ];

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        px: 2,
        backgroundColor: 'background.default',
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
          Competitive Background
        </Typography>
        <Grid container spacing={6} justifyContent="center">
          {/* Left Column - Collegiate & Post-Collegiate */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              component="h3"
              align="center"
              gutterBottom
              sx={{ mb: 3, fontWeight: 600 }}
            >
              Collegiate Career
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{
                mb: 3,
                lineHeight: 1.75,
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: 'text.primary',
              }}
            >
              As an athlete, I competed collegiately at Otterbein College, where
              I:
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.5, mb: 4, textAlign: 'center', listStylePosition: 'inside' }}>
              {collegiateAchievements.map((achievement, idx) => (
                <Typography
                  key={idx}
                  component="li"
                  variant="body1"
                  sx={{
                    mb: 2,
                    lineHeight: 1.75,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    color: 'text.primary',
                  }}
                >
                  {achievement}
                </Typography>
              ))}
            </Box>
            <Divider sx={{ my: 3 }} />
            <Typography
              variant="h5"
              component="h3"
              align="center"
              gutterBottom
              sx={{ mb: 2, fontWeight: 600 }}
            >
              Post-Collegiate
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{
                lineHeight: 1.75,
                fontSize: { xs: '1rem', md: '1.1rem' },
                color: 'text.primary',
              }}
            >
              Post-collegiately, I competed in road races at both the local and
              national levels and qualified for the 2017 Boston Marathon.
            </Typography>
          </Grid>

          {/* Right Column - Personal Bests */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              component="h3"
              align="center"
              gutterBottom
              sx={{ mb: 3, fontWeight: 600 }}
            >
              Personal Bests
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {personalBests.map((best, idx) => (
                <Box
                  key={idx}
                  sx={{
                    p: 3,
                    backgroundColor: 'background.paper',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 0.5 }}
                  >
                    {best.distance}
                  </Typography>
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{ fontWeight: 600, color: 'primary.main' }}
                  >
                    {best.time}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default CompetitiveBackgroundSection;

