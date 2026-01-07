import React from 'react';
import { Container, Typography, Box, Grid, List, ListItem } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function WhyCoachSection() {
  const benefits = [
    'Expert guidance built on years of experience at multiple levels',
    'Clear goal setting with a long-term plan, not guesswork',
    'Structured training that balances progression and recovery',
    'Supplemental programming for strength, mobility, and durability',
    'Race planning and strategy tailored to your strengths',
    'Objective feedback from an extra set of trained eyes',
    'Confidence and perspective during both highs and setbacks',
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
          sx={{ mb: 4, fontWeight: 600 }}
        >
          Why Work With a Coach?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={10} lg={8}>
            <Typography
              variant="body1"
              align="center"
              sx={{
                mb: 3,
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.7,
                fontStyle: 'italic',
                color: 'text.secondary',
              }}
            >
              Training on your own can work — until it doesn't.
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{
                mb: 4,
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.7,
                color: 'text.primary',
              }}
            >
              A coach brings experience, structure, and perspective that's
              difficult to replicate alone. Whether you're chasing a personal
              best, returning from injury, or simply looking for smarter, more
              consistent training, coaching provides:
            </Typography>
            <List sx={{ width: '100%', mb: 4 }}>
              {benefits.map((benefit, index) => (
                <ListItem
                  key={index}
                  disablePadding
                  sx={{
                    py: 2,
                    borderBottom: index < benefits.length - 1 ? '1px solid' : 'none',
                    borderColor: 'divider',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      maxWidth: '100%',
                    }}
                  >
                    <CheckCircleIcon
                      sx={{
                        color: 'primary.main',
                        fontSize: 28,
                        mr: 2,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        lineHeight: 1.7,
                        color: 'text.primary',
                      }}
                    >
                      {benefit}
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
            <Typography
              variant="body1"
              align="center"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.7,
                color: 'text.primary',
                fontWeight: 500,
                fontStyle: 'italic',
              }}
            >
              The right coach helps you train with purpose — and stay healthy
              along the way.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default WhyCoachSection;

