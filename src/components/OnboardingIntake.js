import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { supabase } from '../lib/supabase';
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
  Alert,
  CircularProgress,
} from '@mui/material';

function OnboardingIntake() {
  const navigate = useNavigate();
  const { setIntakeComplete, selectedPlan } = useAppContext();
  const [formData, setFormData] = useState({
    email: '',
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const email = formData.email.trim().toLowerCase();
      let userId;

      // Step 1: Check if user exists by email
      const { data: existingUsers, error: checkError } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .limit(1);

      if (checkError) {
        console.error('Check user error:', checkError);
        // If it's an RLS error on SELECT, we'll handle it
        if (
          checkError.message.includes('row-level security') ||
          checkError.message.includes('RLS') ||
          checkError.code === '42501'
        ) {
          throw new Error(
            `RLS Policy Error: Missing SELECT policy on 'users' table. Please create a SELECT policy. Error: ${checkError.message}`
          );
        }
        throw new Error(`Failed to check user: ${checkError.message}`);
      }

      // Step 2: If user doesn't exist, create new user with plan_type
      // If user exists, update plan_type and set intake_complete = true
      if (!existingUsers || existingUsers.length === 0) {
        // Create new user with plan_type
        const { data: newUser, error: insertUserError } = await supabase
          .from('users')
          .insert([
            {
              email: email,
              plan_type: selectedPlan || null,
              intake_complete: true,
              created_at: new Date().toISOString(),
            },
          ])
          .select('id')
          .single();

        if (insertUserError) {
          // Log the full error for debugging
          console.error('User creation error:', insertUserError);
          
          // Check if it's an RLS error
          if (
            insertUserError.message.includes('row-level security') ||
            insertUserError.message.includes('RLS') ||
            insertUserError.code === '42501'
          ) {
            throw new Error(
              `RLS Policy Error: ${insertUserError.message}. Please verify that an INSERT policy exists for the 'users' table and that it allows public inserts. Error code: ${insertUserError.code || 'N/A'}`
            );
          }
          throw new Error(`Failed to create user: ${insertUserError.message} (Code: ${insertUserError.code || 'N/A'})`);
        }

        userId = newUser.id;
      } else {
        // User exists - update plan_type and set intake_complete = true
        userId = existingUsers[0].id;
        
        const { error: updateUserError } = await supabase
          .from('users')
          .update({
            plan_type: selectedPlan || null,
            intake_complete: true,
          })
          .eq('id', userId);

        if (updateUserError) {
          console.error('User update error:', updateUserError);
          throw new Error(`Failed to update user: ${updateUserError.message}`);
        }
      }

      // Step 3: Insert intake data linked to user_id
      // Map form fields to database schema (which uses consolidated columns)
      const intakeData = {
        user_id: userId,
        // Experience column - combine experience level and years
        experience: JSON.stringify({
          level: formData.experienceLevel,
          years_running: formData.yearsRunning
            ? parseInt(formData.yearsRunning)
            : null,
          longest_distance: formData.longestDistance || null,
          typical_pace: formData.typicalPace || null,
        }),
        // Weekly mileage column
        weekly_mileage: formData.currentWeeklyMileage
          ? parseInt(formData.currentWeeklyMileage)
          : null,
        // Goals column - combine all goal-related fields
        goals: JSON.stringify({
          primary_goal: formData.primaryGoal,
          target_race: formData.targetRace || null,
          target_date: formData.targetDate || null,
          time_goal: formData.timeGoal || null,
        }),
        // Availability column - combine all availability fields
        availability: JSON.stringify({
          days_per_week: formData.daysPerWeek,
          preferred_days: formData.preferredDays,
          preferred_time: formData.preferredTime,
          weekly_hours: formData.weeklyHours
            ? parseFloat(formData.weeklyHours)
            : null,
        }),
        // Injury history column - combine injury-related fields
        injury_history: JSON.stringify({
          has_injuries: formData.hasInjuries === 'yes',
          injury_details: formData.injuryDetails || null,
          medical_conditions: formData.medicalConditions || null,
        }),
        // Current issues column
        current_issues: formData.currentIssues || null,
        created_at: new Date().toISOString(),
      };

      const { error: intakeError } = await supabase
        .from('intakes')
        .insert([intakeData]);

      if (intakeError) {
        console.error('Intake insert error:', intakeError);
        // Check if it's a missing column error
        if (intakeError.message.includes('column') && intakeError.message.includes('schema cache')) {
          throw new Error(
            `Database schema error: ${intakeError.message}. Please check that all required columns exist in the 'intakes' table.`
          );
        }
        throw new Error(`Failed to save intake: ${intakeError.message}`);
      }

      // Step 4: Set intake_complete = true in context
      setIntakeComplete(true);

      // Step 5: Show success message
      setSubmitSuccess(true);

      // Navigate to dashboard after a brief delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error submitting intake:', error);
      setSubmitError(
        error.message || 'An error occurred while submitting your intake. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
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
            {submitSuccess && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Your intake form has been submitted successfully! Redirecting to
                dashboard...
              </Alert>
            )}
            {submitError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {submitError}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <TextField
                fullWidth
                label="Email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                sx={{ mb: 4 }}
              />

              <Divider sx={{ my: 4 }} />

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
                  disabled={isSubmitting}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                  }}
                  startIcon={
                    isSubmitting ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : null
                  }
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Intake'}
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

