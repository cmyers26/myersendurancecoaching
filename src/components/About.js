import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Avatar,
  Paper,
  Divider,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

function About() {
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
          <Box sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{ mb: 3 }}
            >
              About Your Coach
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: 400 }}
            >
              Dedicated to helping adult runners achieve their goals through
              smart, sustainable training
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Photo and Introduction Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 200, md: 280 },
                    height: { xs: 200, md: 280 },
                    bgcolor: 'primary.main',
                    fontSize: { xs: 80, md: 120 },
                  }}
                >
                  <PersonIcon sx={{ fontSize: 'inherit' }} />
                </Avatar>
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ mb: 3 }}
              >
                Chad Myers
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3, lineHeight: 1.75 }}
              >
                With over a decade of experience coaching adult runners, I've
                helped hundreds of athletes achieve their goals—from completing
                their first 5K to setting personal records in marathons. My
                approach is built on the understanding that adult runners have
                unique challenges: demanding work schedules, family
                responsibilities, and the need for sustainable training that
                fits into real life.
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.75 }}
              >
                I believe running should enhance your life, not consume it. That's
                why every training plan I create is personalized, flexible, and
                designed to help you build consistency while staying healthy and
                injury-free.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Coaching Philosophy Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: 2,
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="lg">
          <Paper elevation={0} sx={{ p: { xs: 4, md: 6 }, backgroundColor: 'background.paper' }}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ mb: 4 }}
            >
              Coaching Philosophy
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3, lineHeight: 1.75, fontSize: '1.1rem' }}
            >
              My coaching philosophy centers on three core principles:
              sustainability, personalization, and long-term health. I don't
              believe in one-size-fits-all training plans or pushing athletes
              to the breaking point. Instead, I focus on building a strong
              foundation, progressing gradually, and creating habits that last.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3, lineHeight: 1.75, fontSize: '1.1rem' }}
            >
              Every runner is different. Your schedule, goals, experience level,
              and life circumstances are unique. That's why every training plan I
              create is tailored specifically to you. We work together to find
              what fits your life, and we adjust as needed. Flexibility isn't
              just a feature—it's essential for long-term success.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.75, fontSize: '1.1rem' }}
            >
              Most importantly, I believe in training that keeps you running
              for years to come. That means proper progression, adequate
              recovery, and a focus on injury prevention. Your running journey
              shouldn't end with burnout or injury. It should be a sustainable
              part of your life that brings you joy, health, and achievement.
            </Typography>
          </Paper>
        </Container>
      </Box>

      {/* Background Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ mb: 4 }}
          >
            Background & Experience
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                color="primary.main"
                gutterBottom
                sx={{ mb: 2 }}
              >
                Running Experience
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3, lineHeight: 1.75 }}
              >
                I've been a competitive runner for over 15 years, competing in
                distances from 5K to ultramarathons. This experience has given
                me firsthand understanding of the challenges runners face—from
                balancing training with life demands to managing injuries and
                plateaus.
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.75 }}
              >
                More importantly, I've learned what works and what doesn't. I've
                made mistakes, learned from them, and developed an approach that
                prioritizes long-term health and sustainable progress over
                short-term gains.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant="h6"
                color="primary.main"
                gutterBottom
                sx={{ mb: 2 }}
              >
                Coaching Credentials
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3, lineHeight: 1.75 }}
              >
                I'm a certified running coach with specialized training in
                adult athlete development, injury prevention, and sustainable
                training methodologies. Over the past 10+ years, I've coached
                hundreds of adult runners at every level—from complete beginners
                to competitive age-group athletes.
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.75 }}
              >
                My coaching is grounded in exercise science, but it's shaped by
                real-world experience working with busy adults who need training
                that fits their lives. I stay current with the latest research
                and continuously refine my approach based on what I learn from
                working with athletes.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Approach Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: 2,
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ mb: 4, textAlign: 'center' }}
          >
            My Approach
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  backgroundColor: 'background.paper',
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  color="primary.main"
                >
                  Built for Adults
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.7 }}
                >
                  I understand that adult runners have jobs, families, and
                  responsibilities. My training plans respect your time and
                  work around your schedule, not against it. We find the
                  training windows that work for you and make the most of them.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  backgroundColor: 'background.paper',
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  color="primary.main"
                >
                  Sustainable Training
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.7 }}
                >
                  Every plan emphasizes proper progression, adequate recovery,
                  and injury prevention. We build fitness gradually and
                  consistently, avoiding the boom-and-bust cycles that lead to
                  burnout and injury. Your long-term health is always the
                  priority.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  backgroundColor: 'background.paper',
                }}
              >
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  color="primary.main"
                >
                  Personalized Support
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.7 }}
                >
                  You're not just following a generic plan. We work together to
                  create something tailored to your goals, experience, and
                  life circumstances. Regular check-ins ensure we're always
                  adjusting and optimizing your training as you progress.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Closing Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Divider sx={{ mb: 4 }} />
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ mb: 3 }}
            >
              Ready to Work Together?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.75, mb: 3 }}
            >
              If you're looking for a coach who understands the realities of
              adult running and is committed to helping you achieve your goals
              sustainably, I'd love to hear from you. Let's start a
              conversation about how we can work together to make your running
              goals a reality.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default About;

