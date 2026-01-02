import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

function AthleteDashboard() {
  return (
    <>
      {/* Page Header */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: 2,
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ mb: 2 }}
          >
            Dashboard
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontWeight: 400 }}
          >
            Welcome to your coaching dashboard
          </Typography>
        </Container>
      </Box>

      {/* Dashboard Content */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Your Training Plan
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your personalized training plan will appear here once it's
                    created.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card elevation={2}>
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Upcoming Workouts
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your upcoming workouts will be displayed here.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default AthleteDashboard;

