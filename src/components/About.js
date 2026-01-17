import React from 'react';
import { Box } from '@mui/material';
import AboutHero from './AboutHero';
import WhyCoachSection from './WhyCoachSection';
import CoachBioSection from './CoachBioSection';
import CoachingHighlightsSection from './CoachingHighlightsSection';
import CompetitiveBackgroundSection from './CompetitiveBackgroundSection';
import CertificationsSection from './CertificationsSection';
import AboutCTA from './AboutCTA';
import SEO from './SEO';

function About() {
  return (
    <Box component="main">
      <SEO pageKey="about" />
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
