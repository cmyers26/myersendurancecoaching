import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Paper,
  Alert,
} from '@mui/material';

function GetStarted() {
  const navigate = useNavigate();
  const { setIntakeData } = useAppContext();
  const [formData, setFormData] = useState({
    runningExperience: '',
    weeklyMileage: '',
    goal: '',
    daysPerWeek: '',
    preferredTime: '',
    longestDistance: '',
    currentFitness: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.runningExperience) {
      newErrors.runningExperience = 'Please select your running experience';
      isValid = false;
    }

    if (!formData.weeklyMileage) {
      newErrors.weeklyMileage = 'Please enter your weekly mileage';
      isValid = false;
    }

    if (!formData.goal) {
      newErrors.goal = 'Please select your primary goal';
      isValid = false;
    }

    if (!formData.daysPerWeek) {
      newErrors.daysPerWeek = 'Please select days per week';
      isValid = false;
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select preferred training time';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Save data to context
      setIntakeData(formData);
      // Navigate to pricing
      navigate('/pricing');
    }
  };

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
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', maxWidth: '700px', mx: 'auto' }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{ mb: 3 }}
            >
              Get Started
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 2, fontWeight: 400 }}
            >
              Tell us a bit about yourself so we can recommend the best coaching
              option for you
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.75 }}
            >
              This quick form takes just a few minutes and helps us understand
              your running background and goals.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Form Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Container maxWidth="md">
          <Paper elevation={2} sx={{ p: { xs: 3, md: 4 } }}>
            <form onSubmit={handleSubmit}>
              <FormControl
                fullWidth
                required
                error={!!errors.runningExperience}
                sx={{ mb: 3 }}
              >
                <FormLabel component="legend">Running Experience</FormLabel>
                <RadioGroup
                  value={formData.runningExperience}
                  onChange={(e) =>
                    handleChange('runningExperience', e.target.value)
                  }
                >
                  <FormControlLabel
                    value="beginner"
                    control={<Radio />}
                    label="Beginner (less than 1 year)"
                  />
                  <FormControlLabel
                    value="intermediate"
                    control={<Radio />}
                    label="Intermediate (1-3 years)"
                  />
                  <FormControlLabel
                    value="advanced"
                    control={<Radio />}
                    label="Advanced (3+ years)"
                  />
                </RadioGroup>
                {errors.runningExperience && (
                  <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                    {errors.runningExperience}
                  </Typography>
                )}
              </FormControl>

              <TextField
                fullWidth
                label="Current Weekly Mileage"
                type="number"
                required
                value={formData.weeklyMileage}
                onChange={(e) => handleChange('weeklyMileage', e.target.value)}
                error={!!errors.weeklyMileage}
                helperText={errors.weeklyMileage || 'Average miles per week'}
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                label="Longest Distance Completed"
                value={formData.longestDistance}
                onChange={(e) => handleChange('longestDistance', e.target.value)}
                helperText="e.g., 5K, 10K, Half Marathon, Marathon"
                sx={{ mb: 3 }}
              />

              <FormControl
                fullWidth
                required
                error={!!errors.goal}
                sx={{ mb: 3 }}
              >
                <FormLabel component="legend">Primary Goal</FormLabel>
                <RadioGroup
                  value={formData.goal}
                  onChange={(e) => handleChange('goal', e.target.value)}
                >
                  <FormControlLabel
                    value="first-5k"
                    control={<Radio />}
                    label="Complete my first 5K"
                  />
                  <FormControlLabel
                    value="improve-5k"
                    control={<Radio />}
                    label="Improve my 5K time"
                  />
                  <FormControlLabel
                    value="half-marathon"
                    control={<Radio />}
                    label="Complete a half marathon"
                  />
                  <FormControlLabel
                    value="marathon"
                    control={<Radio />}
                    label="Complete a marathon"
                  />
                  <FormControlLabel
                    value="pr"
                    control={<Radio />}
                    label="Set a personal record"
                  />
                  <FormControlLabel
                    value="fitness"
                    control={<Radio />}
                    label="Improve overall fitness"
                  />
                </RadioGroup>
                {errors.goal && (
                  <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                    {errors.goal}
                  </Typography>
                )}
              </FormControl>

              <FormControl
                fullWidth
                required
                error={!!errors.daysPerWeek}
                sx={{ mb: 3 }}
              >
                <FormLabel component="legend">
                  How many days per week can you train?
                </FormLabel>
                <RadioGroup
                  value={formData.daysPerWeek}
                  onChange={(e) => handleChange('daysPerWeek', e.target.value)}
                >
                  <FormControlLabel value="2-3" control={<Radio />} label="2-3 days" />
                  <FormControlLabel value="4-5" control={<Radio />} label="4-5 days" />
                  <FormControlLabel value="6-7" control={<Radio />} label="6-7 days" />
                </RadioGroup>
                {errors.daysPerWeek && (
                  <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                    {errors.daysPerWeek}
                  </Typography>
                )}
              </FormControl>

              <FormControl
                fullWidth
                required
                error={!!errors.preferredTime}
                sx={{ mb: 3 }}
              >
                <FormLabel component="legend">Preferred Training Time</FormLabel>
                <RadioGroup
                  value={formData.preferredTime}
                  onChange={(e) => handleChange('preferredTime', e.target.value)}
                >
                  <FormControlLabel
                    value="early-morning"
                    control={<Radio />}
                    label="Early morning (before 7 AM)"
                  />
                  <FormControlLabel
                    value="morning"
                    control={<Radio />}
                    label="Morning (7 AM - 12 PM)"
                  />
                  <FormControlLabel
                    value="afternoon"
                    control={<Radio />}
                    label="Afternoon (12 PM - 5 PM)"
                  />
                  <FormControlLabel
                    value="evening"
                    control={<Radio />}
                    label="Evening (after 5 PM)"
                  />
                  <FormControlLabel
                    value="flexible"
                    control={<Radio />}
                    label="Flexible"
                  />
                </RadioGroup>
                {errors.preferredTime && (
                  <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                    {errors.preferredTime}
                  </Typography>
                )}
              </FormControl>

              <TextField
                fullWidth
                label="Current Fitness Level"
                select
                value={formData.currentFitness}
                onChange={(e) => handleChange('currentFitness', e.target.value)}
                helperText="Optional: How would you rate your current fitness?"
                sx={{ mb: 4 }}
              >
                <MenuItem value="">Select fitness level</MenuItem>
                <MenuItem value="poor">Poor</MenuItem>
                <MenuItem value="fair">Fair</MenuItem>
                <MenuItem value="good">Good</MenuItem>
                <MenuItem value="very-good">Very Good</MenuItem>
                <MenuItem value="excellent">Excellent</MenuItem>
              </TextField>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                  }}
                >
                  Continue
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default GetStarted;

