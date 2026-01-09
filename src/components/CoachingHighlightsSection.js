import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from '@mui/material';

function CoachingHighlightsSection() {
  const achievements = [
    {
      title: 'Fairfield Union High School',
      subtitle: 'Early Coaching Years',
      highlights: [
        '4 individual Ohio High School State Championships',
        'Rob Myers: Cross Country, 1600m, 800m',
        'Chris Millisor: 1600m',
        '1 High School National Championship (800m)',
        'Multiple team and individual podium finishes at the state level',
      ],
    },
    {
      title: 'The Ohio State University',
      subtitle: 'NCAA Division I Coaching',
      highlights: [
        'Assistant Cross Country and Track Coach',
        'Worked with All-Big Ten athletes',
        'NCAA Regional qualifiers',
        'Runners ranging from 800m to 5,000m',
      ],
    },
    {
      title: 'Professional Coaching',
      subtitle: 'Working with Rob Myers',
      highlights: [
        'Coached during final years of professional career with Saucony',
        '3-time Indoor National Champion in the 1500m',
        '2-time World Championship team member',
        'Personal bests: 3:53 (mile) and 3:34 (1500m)',
      ],
    },
    {
      title: 'Personal Online Coaching',
      subtitle: 'Worked with Columbus Running Company as their personal online coach',
      highlights: [
        'Worked with athletes from all over',
        'Coached athletes to achieve their personal bests',
        'Coached athletes to achieve their goals',
        'Coached athletes to run 5ks, 10ks, half marathons, and marathons',
      ],
    },
    {
      title: 'Fairfield Union High School - Assistant Coach under Head Coach Rob Myers',
      subtitle: 'Current Program over the past 4 years',
      highlights: [
        'Helped lead the boys team to a Division II State Championship (Boys Cross Country)',
        'Helped guide 2 individual state champion titles (one boy)',
        'Helped the boys team to 4 top-10 finishes',
        'Helped the girls team to 2 top-13 finishes',
      ],
    },
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
          Coaching Experience & Achievements
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {achievements.map((achievement, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: '400px',
                  width: '100%',
                  mx: 'auto',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 600, mb: 1, wordWrap: 'break-word' }}
                  >
                    {achievement.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                    sx={{ mb: 2, fontStyle: 'italic', wordWrap: 'break-word' }}
                  >
                    {achievement.subtitle}
                  </Typography>
                  <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                    {achievement.highlights.map((highlight, idx) => (
                      <Typography
                        key={idx}
                        component="li"
                        variant="body2"
                        sx={{
                          mb: 1.5,
                          lineHeight: 1.6,
                          color: 'text.primary',
                          wordWrap: 'break-word',
                        }}
                      >
                        {highlight}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default CoachingHighlightsSection;

