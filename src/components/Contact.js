import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  Paper,
  Alert,
} from '@mui/material';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Contact Form Submitted:', formData);
      setSubmitted(true);
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
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
              Get in Touch
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 2, fontWeight: 400 }}
            >
              Have questions? Want to learn more? We'd love to hear from you.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.75 }}
            >
              Send us a message below, and we'll get back to you as soon as
              possible. Whether you're curious about our coaching approach,
              ready to get started, or just want to chat about your running
              goals, we're here to help.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Contact Form Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Container maxWidth="md">
          <Paper elevation={2} sx={{ p: { xs: 3, md: 4 } }}>
            {submitted && (
              <Alert severity="success" sx={{ mb: 3 }}>
                Thank you for your message! We'll get back to you soon.
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  label="Name"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  error={!!errors.name}
                  helperText={errors.name}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="Message"
                  multiline
                  rows={6}
                  required
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  error={!!errors.message}
                  helperText={errors.message}
                  sx={{ mb: 3 }}
                />
              </Box>

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
                  Send Message
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>

      {/* Consultation Note Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: 2,
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              backgroundColor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ mb: 2 }}
            >
              Interested in a Consultation?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 3, lineHeight: 1.75 }}
            >
              If you'd like to schedule a free consultation call to discuss your
              goals and see if our coaching is a good fit, just mention it in
              your message above. We're happy to set up a time that works for
              you—no pressure, just a friendly conversation about your running.
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: 'italic' }}
            >
              No obligation, just an opportunity to learn more and ask any
              questions you might have.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default Contact;

