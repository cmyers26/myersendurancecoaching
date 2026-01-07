import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AddOnIntakeForm from './AddOnIntakeForm';
import { productConfig } from '../config/productConfig';
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
  Stepper,
  Step,
  StepLabel,
  Paper,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';

// Map old product format to new format
const normalizeProductType = (productType) => {
  if (!productType) return null;
  
  const mapping = {
    'pdf-5k': 'pdf_5k',
    'pdf-10k': 'pdf_10k',
    'pdf-half': 'pdf_half',
    'pdf-marathon': 'pdf_marathon',
    'level1': 'level_1',
    'level2': 'level_2',
    'level3': 'level_3',
    'addon-strength': 'strength_addon',
    'addon-race-strategy': 'race_strategy_addon',
  };
  
  return mapping[productType] || productType;
};

const steps = [
  'Personal Information',
  'Running Background',
  'Goals',
  'Availability',
  'Injury History',
];

function IntakeForm() {
  const [searchParams] = useSearchParams();
  const productParam = searchParams.get('product');
  
  // Normalize and validate product type
  const normalizedProductType = useMemo(() => {
    return productParam ? normalizeProductType(productParam) : null;
  }, [productParam]);

  // Get product from config to determine intake type
  const product = normalizedProductType ? productConfig[normalizedProductType] : null;
  const intakeType = product?.intakeType || 'full';
  const shouldRenderAddonForm = intakeType === 'addon';
  
  // All hooks must be called before any conditional returns
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Full form data for coaching intake
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    // Running Background
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
    secondaryGoals: [],
    // Availability
    daysPerWeek: '',
    preferredDays: [],
    preferredTime: '',
    weeklyHours: '',
    interestedInCrossTraining: false,
    // Injury History
    hasInjuries: '',
    injuryDetails: '',
    currentIssues: '',
    medicalConditions: '',
  });

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

  const validateStep = (step) => {
    const newErrors = {};
    let isValid = true;

    switch (step) {
      case 0: // Personal Information
        if (!formData.firstName.trim()) {
          newErrors.firstName = 'First name is required';
          isValid = false;
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = 'Last name is required';
          isValid = false;
        }
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
          isValid = false;
        }
        break;
      case 1: // Running Background
        if (!formData.experienceLevel) {
          newErrors.experienceLevel = 'Please select your experience level';
          isValid = false;
        }
        if (!formData.yearsRunning) {
          newErrors.yearsRunning = 'Please enter years of running experience';
          isValid = false;
        }
        break;
      case 2: // Goals
        if (!formData.primaryGoal) {
          newErrors.primaryGoal = 'Please select your primary goal';
          isValid = false;
        }
        break;
      case 3: // Availability
        if (!formData.daysPerWeek) {
          newErrors.daysPerWeek = 'Please select days per week';
          isValid = false;
        }
        if (!formData.preferredTime) {
          newErrors.preferredTime = 'Please select preferred training time';
          isValid = false;
        }
        break;
      case 4: // Injury History
        if (!formData.hasInjuries) {
          newErrors.hasInjuries = 'Please answer this question';
          isValid = false;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);

    if (!validateStep(activeStep)) {
      return;
    }

    // Only submit if we're on the last step
    if (activeStep !== steps.length - 1) {
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

      // Step 2: Create or update user
      // Use normalized product type from productConfig if available
      const productTypeToSave = product?.productType || productParam || null;
      
      if (!existingUsers || existingUsers.length === 0) {
        const { data: newUser, error: insertUserError } = await supabase
          .from('users')
          .insert([
            {
              email: email,
              product_type: productTypeToSave,
              intake_complete: true,
              created_at: new Date().toISOString(),
            },
          ])
          .select('id')
          .single();

        if (insertUserError) {
          console.error('User creation error:', insertUserError);
          if (
            insertUserError.message.includes('row-level security') ||
            insertUserError.message.includes('RLS') ||
            insertUserError.code === '42501'
          ) {
            throw new Error(
              `RLS Policy Error: ${insertUserError.message}. Please verify that an INSERT policy exists for the 'users' table. Error code: ${insertUserError.code || 'N/A'}`
            );
          }
          throw new Error(`Failed to create user: ${insertUserError.message} (Code: ${insertUserError.code || 'N/A'})`);
        }

        userId = newUser.id;
      } else {
        userId = existingUsers[0].id;
        
        const { error: updateUserError } = await supabase
          .from('users')
          .update({
            product_type: productTypeToSave,
            intake_complete: true,
          })
          .eq('id', userId);

        if (updateUserError) {
          console.error('User update error:', updateUserError);
          throw new Error(`Failed to update user: ${updateUserError.message}`);
        }
      }

      // Step 3: Insert intake data
      const intakeData = {
        user_id: userId,
        experience: JSON.stringify({
          level: formData.experienceLevel,
          years_running: formData.yearsRunning
            ? parseInt(formData.yearsRunning)
            : null,
          longest_distance: formData.longestDistance || null,
          typical_pace: formData.typicalPace || null,
        }),
        weekly_mileage: formData.currentWeeklyMileage
          ? parseInt(formData.currentWeeklyMileage)
          : null,
        goals: JSON.stringify({
          primary_goal: formData.primaryGoal,
          target_race: formData.targetRace || null,
          target_date: formData.targetDate || null,
          time_goal: formData.timeGoal || null,
        }),
        availability: JSON.stringify({
          days_per_week: formData.daysPerWeek,
          preferred_days: formData.preferredDays,
          preferred_time: formData.preferredTime,
          weekly_hours: formData.weeklyHours
            ? parseFloat(formData.weeklyHours)
            : null,
          interested_in_cross_training: formData.interestedInCrossTraining,
        }),
        injury_history: JSON.stringify({
          has_injuries: formData.hasInjuries === 'yes',
          injury_details: formData.injuryDetails || null,
          medical_conditions: formData.medicalConditions || null,
        }),
        current_issues: formData.currentIssues || null,
        created_at: new Date().toISOString(),
      };

      const { error: intakeError } = await supabase
        .from('intakes')
        .insert([intakeData]);

      if (intakeError) {
        console.error('Intake insert error:', intakeError);
        if (intakeError.message.includes('column') && intakeError.message.includes('schema cache')) {
          throw new Error(
            `Database schema error: ${intakeError.message}. Please check that all required columns exist in the 'intakes' table.`
          );
        }
        throw new Error(`Failed to save intake: ${intakeError.message}`);
      }

      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error submitting intake form:', error);
      setSubmitError(
        error.message || 'An error occurred while submitting your intake. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  required
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  required
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleChange('age', e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            <FormControl
              component="fieldset"
              required
              error={!!errors.experienceLevel}
              sx={{ mb: 3 }}
            >
              <FormLabel component="legend">Experience Level</FormLabel>
              <RadioGroup
                value={formData.experienceLevel}
                onChange={(e) => handleChange('experienceLevel', e.target.value)}
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

            <Grid container spacing={3}>
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
                  label="Longest Race Distance Completed"
                  value={formData.longestDistance}
                  onChange={(e) => handleChange('longestDistance', e.target.value)}
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
          </Box>
        );

      case 2:
        return (
          <Box sx={{ mt: 3 }}>
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
                  value="first-10k"
                  control={<Radio />}
                  label="Complete my first 10K"
                />
                <FormControlLabel
                  value="improve-10k"
                  control={<Radio />}
                  label="Improve my 10K time"
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
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
              {errors.primaryGoal && (
                <Typography variant="caption" color="error" sx={{ mt: 1 }}>
                  {errors.primaryGoal}
                </Typography>
              )}
            </FormControl>

            <Grid container spacing={3}>
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
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Time Goal (if applicable)"
                  value={formData.timeGoal}
                  onChange={(e) => handleChange('timeGoal', e.target.value)}
                  helperText="e.g., Sub-2:00 half marathon"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Secondary Goals (select all that apply)</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.secondaryGoals.includes('weight-loss')}
                          onChange={() =>
                            handleCheckboxChange('secondaryGoals', 'weight-loss')
                          }
                        />
                      }
                      label="Weight loss"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.secondaryGoals.includes('injury-prevention')}
                          onChange={() =>
                            handleCheckboxChange('secondaryGoals', 'injury-prevention')
                          }
                        />
                      }
                      label="Injury prevention"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.secondaryGoals.includes('strength')}
                          onChange={() =>
                            handleCheckboxChange('secondaryGoals', 'strength')
                          }
                        />
                      }
                      label="Build strength"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.secondaryGoals.includes('consistency')}
                          onChange={() =>
                            handleCheckboxChange('secondaryGoals', 'consistency')
                          }
                        />
                      }
                      label="Build consistency"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ mt: 3 }}>
            <FormControl
              component="fieldset"
              required
              error={!!errors.daysPerWeek}
              sx={{ mb: 3 }}
            >
              <FormLabel component="legend">How many days per week can you train?</FormLabel>
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
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.preferredDays.includes('monday')}
                      onChange={() => handleCheckboxChange('preferredDays', 'monday')}
                    />
                  }
                  label="Monday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.preferredDays.includes('tuesday')}
                      onChange={() => handleCheckboxChange('preferredDays', 'tuesday')}
                    />
                  }
                  label="Tuesday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.preferredDays.includes('wednesday')}
                      onChange={() => handleCheckboxChange('preferredDays', 'wednesday')}
                    />
                  }
                  label="Wednesday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.preferredDays.includes('thursday')}
                      onChange={() => handleCheckboxChange('preferredDays', 'thursday')}
                    />
                  }
                  label="Thursday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.preferredDays.includes('friday')}
                      onChange={() => handleCheckboxChange('preferredDays', 'friday')}
                    />
                  }
                  label="Friday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.preferredDays.includes('saturday')}
                      onChange={() => handleCheckboxChange('preferredDays', 'saturday')}
                    />
                  }
                  label="Saturday"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.preferredDays.includes('sunday')}
                      onChange={() => handleCheckboxChange('preferredDays', 'sunday')}
                    />
                  }
                  label="Sunday"
                />
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

            <Grid container spacing={3}>
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

            <FormControl component="fieldset" sx={{ mt: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.interestedInCrossTraining}
                    onChange={(e) =>
                      handleChange('interestedInCrossTraining', e.target.checked)
                    }
                  />
                }
                label="I'm interested in adding cross training to my program"
              />
            </FormControl>
          </Box>
        );

      case 4:
        return (
          <Box sx={{ mt: 3 }}>
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
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Injury Details"
                    value={formData.injuryDetails}
                    onChange={(e) => handleChange('injuryDetails', e.target.value)}
                    helperText="Please describe past injuries, when they occurred, and recovery status"
                  />
                </Grid>
              </Grid>
            )}

            <Grid container spacing={3} sx={{ mt: 1 }}>
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
                  onChange={(e) => handleChange('medicalConditions', e.target.value)}
                  helperText="Any medical conditions, medications, or health considerations"
                />
              </Grid>
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  // If it's an addon, render the AddOnIntakeForm component
  // This must be after all hooks are declared
  if (shouldRenderAddonForm) {
    return <AddOnIntakeForm />;
  }

  // Render full coaching intake form
  return (
    <>
      {/* Page Header */}
      <Box
        sx={{
          py: { xs: 4, md: 6 },
          px: 2,
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h1"
            align="center"
            gutterBottom
            sx={{ mb: 2 }}
          >
            Intake Form
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: '600px', mx: 'auto' }}
          >
            Help us understand your running background, goals, and availability
            so we can create a personalized training plan for you.
          </Typography>
        </Container>
      </Box>

      {/* Form Section */}
      <Box
        sx={{
          py: { xs: 4, md: 6 },
          px: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Container maxWidth="md">
          <Paper elevation={2} sx={{ p: { xs: 3, md: 4 } }}>
            {submitSuccess && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Thank you! Your intake form has been submitted successfully. We will be in touch soon.
              </Alert>
            )}
            {submitError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {submitError}
              </Alert>
            )}
            
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {!submitSuccess &&
              <form onSubmit={handleSubmit}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {steps[activeStep]}
                </Typography>

                {renderStepContent(activeStep)}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box>
                    {activeStep === steps.length - 1 ? (
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={isSubmitting}
                        startIcon={
                          isSubmitting ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : null
                        }
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        size="large"
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </Box>
              </form>
            }
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default IntakeForm;

