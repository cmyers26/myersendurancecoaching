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
  Checkbox,
  FormGroup,
  Paper,
  Grid,
  Divider,
} from '@mui/material';

function OnboardingIntake() {
  const navigate = useNavigate();
  const { setIntakeComplete } = useAppContext();
  const [formData, setFormData] = useState({
    // Runner Background
    experienceLevel: '',
    yearsRunning: '',
    currentWeeklyMileage: '',
    longestDistance: '',
    typicalPace: '',
    // Goals
    primaryGoal: '',
    targetRace: '',
    targetDate: '',
    timeGoal: '',
    // Availability
    daysPerWeek: '',
    preferredDays: [],
    preferredTime: '',
    weeklyHours: '',
    // Injury History
    hasInjuries: '',
    injuryDetails: '',
    currentIssues: '',
    medicalConditions: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleCheckboxChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Runner Background validation
    if (!formData.experienceLevel) {
      newErrors.experienceLevel = 'Please select your experience level';
      isValid = false;
    }
    if (!formData.yearsRunning) {
      newErrors.yearsRunning = 'Please enter years of running experience';
      isValid = false;
    }

    // Goals validation
    if (!formData.primaryGoal) {
      newErrors.primaryGoal = 'Please select your primary goal';
      isValid = false;
    }

    // Availability validation
    if (!formData.daysPerWeek) {
      newErrors.daysPerWeek = 'Please select days per week';
      isValid = false;
    }
    if (!formData.preferredTime) {
      newErrors.preferredTime = 'Please select preferred training time';
      isValid = false;
    }

    // Injury History validation
    if (!formData.hasInjuries) {
      newErrors.hasInjuries = 'Please answer this question';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIntakeComplete(true);
      navigate('/dashboard');
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
          <Typography
            variant="h2"
            component="h1"
            align="center"
            gutterBottom
            sx={{ mb: 2 }}
          >
            Complete Your Intake
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: '700px', mx: 'auto', fontWeight: 400 }}
          >
            Help us create your personalized training plan by sharing your
            running background, goals, and availability
          </Typography>
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
              {/* Runner Background Section */}
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ mb: 3 }}
              >
                Runner Background
              </Typography>

              <FormControl
                component="fieldset"
                required
                error={!!errors.experienceLevel}
                sx={{ mb: 3 }}
              >
                <FormLabel component="legend">Experience Level</FormLabel>
                <RadioGroup
                  value={formData.experienceLevel}
                  onChange={(e) =>
                    handleChange('experienceLevel', e.target.value)
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
                {errors.experienceLevel && (
                  <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                    {errors.experienceLevel}
                  </Typography>
                )}
              </FormControl>

              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Years of Running Experience"
                    type="number"
                    required
                    value={formData.yearsRunning}
                    onChange={(e) => handleChange('yearsRunning', e.target.value)}
                    error={!!errors.yearsRunning}
                    helperText={errors.yearsRunning}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Current Weekly Mileage"
                    type="number"
                    value={formData.currentWeeklyMileage}
                    onChange={(e) =>
                      handleChange('currentWeeklyMileage', e.target.value)
                    }
                    helperText="Average miles per week"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Longest Distance Completed"
                    value={formData.longestDistance}
                    onChange={(e) =>
                      handleChange('longestDistance', e.target.value)
                    }
                    helperText="e.g., 5K, 10K, Half Marathon, Marathon"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Typical Training Pace"
                    value={formData.typicalPace}
                    onChange={(e) => handleChange('typicalPace', e.target.value)}
                    helperText="e.g., 8:00/mile or 5:00/km"
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              {/* Goals Section */}
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ mb: 3 }}
              >
                Goals
              </Typography>

              <FormControl
                component="fieldset"
                required
                error={!!errors.primaryGoal}
                sx={{ mb: 3 }}
              >
                <FormLabel component="legend">Primary Goal</FormLabel>
                <RadioGroup
                  value={formData.primaryGoal}
                  onChange={(e) => handleChange('primaryGoal', e.target.value)}
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
                {errors.primaryGoal && (
                  <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                    {errors.primaryGoal}
                  </Typography>
                )}
              </FormControl>

              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Target Race (if applicable)"
                    value={formData.targetRace}
                    onChange={(e) => handleChange('targetRace', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Target Date"
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) => handleChange('targetDate', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Time Goal (if applicable)"
                    value={formData.timeGoal}
                    onChange={(e) => handleChange('timeGoal', e.target.value)}
                    helperText="e.g., Sub-2:00 half marathon"
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              {/* Availability Section */}
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ mb: 3 }}
              >
                Availability
              </Typography>

              <FormControl
                component="fieldset"
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

              <FormControl component="fieldset" sx={{ mb: 3 }}>
                <FormLabel component="legend">Preferred Training Days</FormLabel>
                <FormGroup>
                  <Grid container spacing={1}>
                    {[
                      'monday',
                      'tuesday',
                      'wednesday',
                      'thursday',
                      'friday',
                      'saturday',
                      'sunday',
                    ].map((day) => (
                      <Grid item xs={6} sm={4} key={day}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formData.preferredDays.includes(day)}
                              onChange={() =>
                                handleCheckboxChange('preferredDays', day)
                              }
                            />
                          }
                          label={day.charAt(0).toUpperCase() + day.slice(1)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </FormGroup>
              </FormControl>

              <FormControl
                component="fieldset"
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

              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Hours Available Per Week"
                    type="number"
                    value={formData.weeklyHours}
                    onChange={(e) => handleChange('weeklyHours', e.target.value)}
                    helperText="Total hours you can dedicate to training"
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 4 }} />

              {/* Injury History Section */}
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ mb: 3 }}
              >
                Injury History
              </Typography>

              <FormControl
                component="fieldset"
                required
                error={!!errors.hasInjuries}
                sx={{ mb: 3 }}
              >
                <FormLabel component="legend">
                  Have you experienced any running-related injuries in the past?
                </FormLabel>
                <RadioGroup
                  value={formData.hasInjuries}
                  onChange={(e) => handleChange('hasInjuries', e.target.value)}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {errors.hasInjuries && (
                  <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                    {errors.hasInjuries}
                  </Typography>
                )}
              </FormControl>

              {formData.hasInjuries === 'yes' && (
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label="Injury Details"
                      value={formData.injuryDetails}
                      onChange={(e) =>
                        handleChange('injuryDetails', e.target.value)
                      }
                      helperText="Please describe past injuries, when they occurred, and recovery status"
                    />
                  </Grid>
                </Grid>
              )}

              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Current Issues or Concerns"
                    value={formData.currentIssues}
                    onChange={(e) => handleChange('currentIssues', e.target.value)}
                    helperText="Any current pain, discomfort, or concerns we should be aware of"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Medical Conditions"
                    value={formData.medicalConditions}
                    onChange={(e) =>
                      handleChange('medicalConditions', e.target.value)
                    }
                    helperText="Any medical conditions, medications, or health considerations"
                  />
                </Grid>
              </Grid>

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
                  Submit Intake
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default OnboardingIntake;

