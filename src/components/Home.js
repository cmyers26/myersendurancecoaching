import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
} from '@mui/material';

function Home() {
  const navigate = useNavigate();
  const heroImageUrl = '/images/pexels-packermann-878151.jpg';

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
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
              variant="h2"
              component="h1"
              gutterBottom
              sx={{ mb: 3 }}
            >
              Personalized Online Running Coaching
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              sx={{ mb: 4, fontWeight: 400, color: 'rgba(255, 255, 255, 0.9)' }}
            >
              Smart, sustainable training designed to help you achieve your goals
              while staying healthy and injury-free
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/pricing')}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
              }}
            >
              Get Started With Coaching
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Who This Is For Section */}
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
            sx={{ mb: 5 }}
          >
            Who This Coaching Is For
          </Typography>
          <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs={12} md={4}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h5" textAlign="center" component="h3" gutterBottom>
                    Busy Professionals
                  </Typography>
                  <Typography variant="body1" color="text.secondary" textAlign="center">
                    Maximize your limited training time with efficient,
                    science-backed workouts that fit into your schedule.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h5" textAlign="center" component="h3" gutterBottom>
                    Post Collegiate Runners
                  </Typography>
                  <Typography variant="body1" color="text.secondary" textAlign="center">
                    Get personalized guidance to help you transition from collegiate running to the next level of your running career.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h5" textAlign="center" component="h3" gutterBottom>
                    Goal-Oriented Runners
                  </Typography>
                  <Typography variant="body1" color="text.secondary" textAlign="center">
                    Whether you're training for your first 5K or aiming for a
                    marathon PR, get personalized guidance to reach your
                    targets.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h5" textAlign="center" component="h3" gutterBottom>
                    Injury-Prevention Focused
                  </Typography>
                  <Typography variant="body1" color="text.secondary" textAlign="center">
                    Learn to train sustainably with proper progression, recovery,
                    and form guidance to keep you running strong for years to
                    come.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
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
            sx={{ mb: 5 }}
          >
            How It Works
          </Typography>
          <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  backgroundColor: 'background.paper',
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    fontSize: '1.5rem',
                    fontWeight: 600,
                  }}
                >
                  1
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  Initial Assessment
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Complete a detailed intake form about your running history,
                  goals, and current fitness level.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  backgroundColor: 'background.paper',
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    fontSize: '1.5rem',
                    fontWeight: 600,
                  }}
                >
                  2
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  Personalized Plan
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Receive a customized training plan tailored to your schedule,
                  experience, and objectives.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  backgroundColor: 'background.paper',
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    fontSize: '1.5rem',
                    fontWeight: 600,
                  }}
                >
                  3
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  Ongoing Support
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get regular check-ins, plan adjustments, and expert guidance
                  throughout your training journey.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  backgroundColor: 'background.paper',
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    fontSize: '1.5rem',
                    fontWeight: 600,
                  }}
                >
                  4
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  Achieve Your Goals
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Build consistency, improve performance, and develop sustainable
                  running habits for long-term success.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Bottom CTA Section */}
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
              Ready to Start Your Running Journey?
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
              Take the first step with our comprehensive intake assessment
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

export default Home;

