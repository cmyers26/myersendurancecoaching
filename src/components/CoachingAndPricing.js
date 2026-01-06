import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function CoachingAndPricing() {
  const navigate = useNavigate();
  const { setSelectedPlan } = useAppContext();
  const heroImageUrl = '/images/pexels-bohlemedia-2803160.jpg';

  const handlePlanSelect = (planName) => {
    setSelectedPlan(planName);
    navigate(`/checkout/${planName}`);
  };
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
              variant="h4"
              component="h1"
              align="center"
              gutterBottom
              sx={{ mb: 2, color: 'white' }}
            >
              Coaching Options & Pricing
            </Typography>
            <Typography
              variant="h6"
              align="center"
              sx={{ maxWidth: '700px', mx: 'auto', fontWeight: 400, color: 'rgba(255, 255, 255, 0.9)' }}
            >
              Choose the coaching option that best fits your goals and commitment
              level, downloadable training plans, or personalized coaching tiers.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Downloadable Training Plans Section */}
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
            sx={{ mb: 4 }}
          >
            Downloadable Training Plans
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}
          >
            Self-paced training plans you can download and follow at your own
            pace. Perfect for runners who prefer structure without ongoing
            support. Each plan is designed based on your individual running experience and goals.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    5K Training Plan
                  </Typography>
                  <Box sx={{ my: 2 }}>
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ fontWeight: 600 }}
                    >
                      $29
                    </Typography>
                  </Box>
                  <List dense>
                    <ListItem disablePadding>
                      <ListItemText
                        primary="12-week structured plan"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        primary="Beginner to intermediate"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        primary="PDF download"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => handlePlanSelect('pdf-5k')}
                    sx={{ mt: 3 }}
                  >
                    Purchase Plan
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    10K Training Plan
                  </Typography>
                  <Box sx={{ my: 2 }}>
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ fontWeight: 600 }}
                    >
                      $35
                    </Typography>
                  </Box>
                  <List dense>
                    <ListItem disablePadding>
                      <ListItemText
                        primary="12-week structured plan"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        primary="Beginner to intermediate"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        primary="PDF download"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => handlePlanSelect('pdf-10k')}
                    sx={{ mt: 3 }}
                  >
                    Purchase Plan
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Half Marathon Plan
                  </Typography>
                  <Box sx={{ my: 2 }}>
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ fontWeight: 600 }}
                    >
                      $49
                    </Typography>
                  </Box>
                  <List dense>
                    <ListItem disablePadding>
                      <ListItemText
                        primary="16-week structured plan"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        primary="Intermediate to advanced"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        primary="PDF download"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => handlePlanSelect('pdf-half')}
                    sx={{ mt: 3 }}
                  >
                    Purchase Plan
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Marathon Plan
                  </Typography>
                  <Box sx={{ my: 2 }}>
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ fontWeight: 600 }}
                    >
                      $69
                    </Typography>
                  </Box>
                  <List dense>
                    <ListItem disablePadding>
                      <ListItemText
                        primary="20-week structured plan"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        primary="Intermediate to advanced"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemText
                        primary="PDF download"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => handlePlanSelect('pdf-marathon')}
                    sx={{ mt: 3 }}
                  >
                    Purchase Plan
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Coaching Tiers Section */}
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
            sx={{ mb: 4 }}
          >
            Personalized Coaching Tiers
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {/* Bronze */}
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
                  <Typography variant="h5" component="h3" gutterBottom>
                    Bronze
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    gutterBottom
                    sx={{ mb: 2 }}
                  >
                    Essential Coaching
                  </Typography>
                  <Box sx={{ my: 2 }}>
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ fontWeight: 600 }}
                    >
                      $99
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="span"
                      sx={{ ml: 1 }}
                    >
                      /month
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <List dense>
                    <ListItem disablePadding sx={{ py: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: 'primary.main', fontSize: 20, mr: 1 }}
                      />
                      <ListItemText
                        primary="Customized training plan"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding sx={{ py: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: 'primary.main', fontSize: 20, mr: 1 }}
                      />
                      <ListItemText
                        primary="Monthly plan updates"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding sx={{ py: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: 'primary.main', fontSize: 20, mr: 1 }}
                      />
                      <ListItemText
                        primary="Email support"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handlePlanSelect('level1')}
                    sx={{ mt: 3 }}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Silver */}
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
                  <Typography variant="h5" component="h3" gutterBottom>
                    Silver
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    gutterBottom
                    sx={{ mb: 2 }}
                  >
                    Premium Coaching
                  </Typography>
                  <Box sx={{ my: 2 }}>
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ fontWeight: 600 }}
                    >
                      $179
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="span"
                      sx={{ ml: 1 }}
                    >
                      /month
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <List dense>
                    <ListItem disablePadding sx={{ py: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: 'primary.main', fontSize: 20, mr: 1 }}
                      />
                      <ListItemText
                        primary="Everything in Bronze"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding sx={{ py: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: 'primary.main', fontSize: 20, mr: 1 }}
                      />
                      <ListItemText
                        primary="Bi-weekly plan adjustments"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding sx={{ py: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: 'primary.main', fontSize: 20, mr: 1 }}
                      />
                      <ListItemText
                        primary="Weekly phone check-ins"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding sx={{ py: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: 'primary.main', fontSize: 20, mr: 1 }}
                      />
                      <ListItemText
                        primary="Form analysis & feedback"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handlePlanSelect('level2')}
                    sx={{ mt: 3 }}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Gold - Elite */}
            <Grid item xs={12} md={4}>
              <Card
                elevation={4}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  border: '2px solid',
                  borderColor: 'primary.main',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Chip
                  label="Most Popular"
                  color="primary"
                  sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    fontWeight: 600,
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3, pt: 5 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Gold
                  </Typography>
                  <Typography
                    variant="h6"
                    color="primary.main"
                    gutterBottom
                    sx={{ mb: 2, fontWeight: 600 }}
                  >
                    Elite Virtual 1-on-1 Coaching
                  </Typography>
                  <Box sx={{ my: 2 }}>
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ fontWeight: 600 }}
                    >
                      $299
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="span"
                      sx={{ ml: 1 }}
                    >
                      /month
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <List dense>
                    <ListItem disablePadding sx={{ py: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: 'primary.main', fontSize: 20, mr: 1 }}
                      />
                      <ListItemText
                        primary="Everything in Silver"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding sx={{ py: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: 'primary.main', fontSize: 20, mr: 1 }}
                      />
                      <ListItemText
                        primary="Weekly 1-on-1 video calls"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding sx={{ py: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: 'primary.main', fontSize: 20, mr: 1 }}
                      />
                      <ListItemText
                        primary="Real-time plan adjustments"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding sx={{ py: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: 'primary.main', fontSize: 20, mr: 1 }}
                      />
                      <ListItemText
                        primary="Priority support"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding sx={{ py: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: 'primary.main', fontSize: 20, mr: 1 }}
                      />
                      <ListItemText
                        primary="Nutrition & recovery guidance"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    onClick={() => handlePlanSelect('level3')}
                    sx={{ mt: 3, py: 1.5 }}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Optional Add-Ons Section */}
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
            sx={{ mb: 4 }}
          >
            Optional Add-Ons
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 5, maxWidth: '600px', mx: 'auto' }}
          >
            Enhance your coaching experience with specialized add-on services
          </Typography>
          <Grid container spacing={4} justifyContent="center" flexWrap="nowrap">
            <Grid item xs={12} sm={6} md={6}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Strength Training Program
                  </Typography>
                  <Box sx={{ my: 2 }}>
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ fontWeight: 600 }}
                    >
                      $49
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="span"
                      sx={{ ml: 1 }}
                    >
                      /month
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Comprehensive strength training program designed specifically
                    for runners. Includes exercises, progressions, mobility work to improve power, prevent injury, and enhance running
                    performance.
                  </Typography>
                  <List dense>
                    <ListItem disablePadding sx={{ py: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: 'primary.main', fontSize: 20, mr: 1 }}
                      />
                      <ListItemText
                        primary="Runner-specific exercises"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding sx={{ py: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: 'primary.main', fontSize: 20, mr: 1 }}
                      />
                      <ListItemText
                        primary="2-3 sessions per week"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding sx={{ py: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: 'primary.main', fontSize: 20, mr: 1 }}
                      />
                      <ListItemText
                        primary="mobility work & progressions"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                  >
                    Add Strength Training
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Race Strategy Consultation
                  </Typography>
                  <Box sx={{ my: 2 }}>
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ fontWeight: 600 }}
                    >
                      $99
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="span"
                      sx={{ ml: 1 }}
                    >
                      /session
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    One-on-one race strategy session to develop a personalized
                    race plan. Includes pacing strategy, nutrition plan, mental
                    preparation, and course-specific tactics for your target race.
                  </Typography>
                  <List dense>
                    <ListItem disablePadding sx={{ py: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: 'primary.main', fontSize: 20, mr: 1 }}
                      />
                      <ListItemText
                        primary="60-minute strategy session"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding sx={{ py: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: 'primary.main', fontSize: 20, mr: 1 }}
                      />
                      <ListItemText
                        primary="Personalized pacing plan"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                    <ListItem disablePadding sx={{ py: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: 'primary.main', fontSize: 20, mr: 1 }}
                      />
                      <ListItemText
                        primary="Written race strategy document"
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  </List>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{ mt: 3 }}
                  >
                    Book Consultation
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default CoachingAndPricing;

