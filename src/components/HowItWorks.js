import React from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

function HowItWorks() {
  const heroImageUrl = '/images/pexels-runffwpu-1571939.jpg';
  const steps = [
    {
      icon: <DescriptionIcon sx={{ fontSize: 48 }} />,
      title: 'Complete Your Intake Form',
      description:
        'Share your running history, current fitness level, goals, and schedule availability. This helps us understand your unique situation and create a plan that fits your life.',
    },
    {
      icon: <AssignmentIcon sx={{ fontSize: 48 }} />,
      title: 'Receive Your Personalized Plan',
      description:
        'Get a customized training plan designed specifically for you. We consider your work schedule, family commitments, and preferred training times to create something sustainable.',
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 48 }} />,
      title: 'Train with Ongoing Support',
      description:
        'Follow your plan with regular check-ins and adjustments. We adapt to your progress, schedule changes, and any challenges that arise. Flexibility is built into everything we do.',
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 48 }} />,
      title: 'Achieve Your Goals',
      description:
        "Build consistency, improve performance, and develop sustainable running habits. Whether you want to finish your first 5K or set a new PR, we're here to support your journey.",
    },
  ];

  return (
    <>
      {/* Page Header */}
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
          <Box sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto', color: 'white' }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ mb: 3, color: 'white' }}
            >
              How It Works
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 2, fontWeight: 400, color: 'rgba(255, 255, 255, 0.9)' }}
            >
              A simple, flexible coaching process designed for busy adults
            </Typography>
            <Typography
              variant="body1"
              sx={{ maxWidth: '700px', mx: 'auto', color: 'rgba(255, 255, 255, 0.85)' }}
            >
              We understand that adult runners have demanding schedules, family
              commitments, and varying availability. Our coaching process is
              built around flexibility, adapting to your life rather than
              forcing you to fit into a rigid structure.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Steps Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {steps.map((step, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: 'primary.light',
                      color: 'primary.contrastText',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      fontWeight: 600,
                      fontSize: '1.25rem',
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ mb: 2 }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.7 }}
                  >
                    {step.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Flexibility Emphasis Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: 2,
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ mb: 3 }}
            >
              Built for Your Schedule
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, lineHeight: 1.75 }}
            >
              Life happens. Work gets busy. Family needs change. That's why our
              coaching is designed to be flexible. We work around your schedule,
              not the other way around. Whether you can train early mornings,
              lunch breaks, or evenings, we'll create a plan that fits. Need to
              adjust? No problem. We adapt your training in real-time to keep
              you on track without adding stress to your already full plate.
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <Typography variant="h6" color="primary.main" gutterBottom>
                    Flexible Timing
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Train when it works for you—early morning, lunch break, or
                    evening. We adapt to your schedule.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <Typography variant="h6" color="primary.main" gutterBottom>
                    Easy Adjustments
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Life changes? We quickly adjust your plan to keep you on track
                    without added stress.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <Typography variant="h6" color="primary.main" gutterBottom>
                    Sustainable Approach
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Training that fits your life, not training that takes over your
                    life. Balance is key.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: 2,
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ mb: 2, color: 'primary.contrastText' }}
            >
              Ready to Get Started?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 4,
                color: 'primary.contrastText',
                opacity: 0.9,
                fontWeight: 400,
              }}
            >
              Take the first step by completing our intake form. It takes about
              10 minutes and helps us understand your goals and create your
              personalized plan.
            </Typography>
            <Button
              variant="contained"
              size="large"
              href="/pricing"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                backgroundColor: 'background.paper',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'background.default',
                },
              }}
            >
              Get Started With Coaching
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default HowItWorks;

