import React from 'react';
import { Box } from '@mui/material';
import AboutHero from './AboutHero';
import WhyCoachSection from './WhyCoachSection';
import CoachBioSection from './CoachBioSection';
import CoachingHighlightsSection from './CoachingHighlightsSection';
import CompetitiveBackgroundSection from './CompetitiveBackgroundSection';
import CertificationsSection from './CertificationsSection';
import AboutCTA from './AboutCTA';

function About() {
  return (
    <Box component="main">
      <AboutHero />
      <WhyCoachSection />
      <CoachBioSection />
      <CoachingHighlightsSection />
      <CompetitiveBackgroundSection />
      <CertificationsSection />
      <AboutCTA />
    </Box>
  );
}

export default About;
