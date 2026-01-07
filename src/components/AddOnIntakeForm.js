import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { productConfig } from '../config/productConfig';
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
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

function AddOnIntakeForm() {
  const [searchParams] = useSearchParams();
  const productParam = searchParams.get('product');
  
  // Normalize and validate product type
  const normalizedProductType = useMemo(() => {
    return productParam ? normalizeProductType(productParam) : null;
  }, [productParam]);

  // Get product from config
  const product = normalizedProductType ? productConfig[normalizedProductType] : null;
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
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

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

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
              `RLS Policy Error: ${insertUserError.message}. Please verify that an INSERT policy exists for the 'users' table and that it allows public inserts. Error code: ${insertUserError.code || 'N/A'}`
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
          level: null,
          years_running: null,
          longest_distance: null,
          typical_pace: null,
        }),
        weekly_mileage: null,
        goals: JSON.stringify({
          primary_goal: null,
          target_race: null,
          target_date: null,
          time_goal: null,
        }),
        availability: JSON.stringify({
          days_per_week: null,
          preferred_days: [],
          preferred_time: null,
          weekly_hours: null,
          interested_in_cross_training: false,
        }),
        injury_history: JSON.stringify({
          has_injuries: false,
          injury_details: null,
          medical_conditions: null,
        }),
        current_issues: formData.notes || null,
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
      
      // Clear form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(
        error.message || 'An error occurred while submitting your form. Please try again.'
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
            Contact Form
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: '600px', mx: 'auto' }}
          >
            Please provide your contact information and we'll get back to you soon.
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
                <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>
                  Thank you! Your form has been submitted successfully.
                </Typography>
                <Typography variant="body2">
                  Coach Chad will reach out to you via email to coordinate the details of your add-on service.
                </Typography>
              </Alert>
            )}
            {submitError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {submitError}
              </Alert>
            )}
            
            {!submitSuccess && (
              <>
                <Alert severity="info" sx={{ mb: 3 }}>
                  <Typography variant="body2">
                    After you submit this form, Coach Chad will reach out to you via email to coordinate the details of your add-on service.
                  </Typography>
                </Alert>

                <Typography
                  variant="body1"
                  sx={{ mb: 3, color: 'text.primary' }}
                >
                  Thanks for your purchase! Please share your contact information below so Coach Chad can reach out to schedule your session.
                </Typography>

                <form onSubmit={handleSubmit}>
                  {/* Hidden product_type field */}
                  <input
                    type="hidden"
                    name="product_type"
                    value={productParam || ''}
                  />

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
                        autoComplete="given-name"
                        aria-required="true"
                        sx={{
                          '& .MuiInputLabel-asterisk': {
                            color: 'error.main',
                          },
                        }}
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
                        autoComplete="family-name"
                        aria-required="true"
                        sx={{
                          '& .MuiInputLabel-asterisk': {
                            color: 'error.main',
                          },
                        }}
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
                        autoComplete="email"
                        aria-required="true"
                        inputProps={{
                          'aria-describedby': errors.email ? 'email-error' : undefined,
                        }}
                        sx={{
                          '& .MuiInputLabel-asterisk': {
                            color: 'error.main',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        autoComplete="tel"
                        helperText="Optional"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Notes"
                        value={formData.notes}
                        onChange={(e) => handleChange('notes', e.target.value)}
                        helperText="Optional - Tell us about your interest in this add-on service"
                        inputProps={{
                          'aria-label': 'Additional notes about your interest in the add-on service',
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
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
                        minWidth: { xs: '100%', sm: '200px' },
                      }}
                      startIcon={
                        isSubmitting ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : null
                      }
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                  </Box>
                </form>
              </>
            )}
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default AddOnIntakeForm;

