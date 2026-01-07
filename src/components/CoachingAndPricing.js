import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { productConfig } from '../config/productConfig';
import { productFeatures } from '../config/productFeatures';
import { normalizeProductType } from '../lib/productValidation';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Product keys organized by section (using old format for handlePlanSelect compatibility)
const PDF_PLANS = ['pdf-5k', 'pdf-10k', 'pdf-half', 'pdf-marathon'];
const COACHING_TIERS = ['level1', 'level2', 'level3'];
const ADD_ONS = ['addon-strength', 'addon-race-strategy'];

function CoachingAndPricing() {
  const navigate = useNavigate();
  const { setSelectedPlan } = useAppContext();
  const heroImageUrl = '/images/pexels-bohlemedia-2803160.jpg';

  const handlePlanSelect = (planName) => {
    setSelectedPlan(planName);
    navigate(`/checkout?product=${planName}`);
  };

  // Helper to get product data (normalizes key and retrieves from config)
  const getProductData = (oldKey) => {
    const normalizedKey = normalizeProductType(oldKey);
    return normalizedKey ? productConfig[normalizedKey] : null;
  };

  // Helper to get product features
  const getProductFeatures = (oldKey) => {
    const normalizedKey = normalizeProductType(oldKey);
    return normalizedKey ? productFeatures[normalizedKey] || [] : [];
  };

  // Render a product card
  const renderProductCard = (oldKey, options = {}) => {
    const product = getProductData(oldKey);
    const features = getProductFeatures(oldKey);
    
    if (!product) return null;

    const {
      isPopular = false,
      buttonText = 'Get Started',
      cardElevation = 2,
      showBorder = false,
    } = options;

    return (
      <Grid item xs={12} sm={6} md={4} key={oldKey}>
        <Card
          elevation={cardElevation}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            ...(showBorder && {
              border: '2px solid',
              borderColor: 'primary.main',
            }),
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: cardElevation + 2,
            },
          }}
        >
          {isPopular && (
            <Chip
              label="Most Popular"
              color="primary"
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                fontWeight: 600,
                zIndex: 1,
              }}
            />
          )}
          <CardContent sx={{ flexGrow: 1, p: 3, ...(isPopular && { pt: 5 }) }}>
            <Typography variant="h5" component="h3" gutterBottom>
              {product.name.split(' - ')[0]}
            </Typography>
            {product.name.includes(' - ') && (
              <Typography
                variant={isPopular ? 'h6' : 'subtitle1'}
                color={isPopular ? 'primary.main' : 'text.secondary'}
                gutterBottom
                sx={{ mb: 2, fontWeight: isPopular ? 600 : 400 }}
              >
                {product.name.split(' - ')[1]}
              </Typography>
            )}
            <Box sx={{ my: 2 }}>
              {product.priceDisplay.includes('/') ? (
                <>
                  <Typography
                    variant="h4"
                    component="span"
                    sx={{ fontWeight: 600 }}
                  >
                    {product.priceDisplay.split('/')[0]}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="span"
                    sx={{ ml: 1 }}
                  >
                    /{product.priceDisplay.split('/')[1]}
                  </Typography>
                </>
              ) : (
                <Typography
                  variant="h4"
                  component="span"
                  sx={{ fontWeight: 600 }}
                >
                  {product.priceDisplay}
                </Typography>
              )}
            </Box>
            <Divider sx={{ my: 2 }} />
            {features.length > 0 && (
              <List dense>
                {features.map((feature, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                    <CheckCircleIcon
                      sx={{ color: 'primary.main', fontSize: 20, mr: 1 }}
                    />
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            )}
            <Button
              variant={oldKey.startsWith('pdf') || oldKey.startsWith('addon') ? 'outlined' : 'contained'}
              color="primary"
              fullWidth
              size={isPopular ? 'large' : 'medium'}
              onClick={() => handlePlanSelect(oldKey)}
              sx={{ mt: 3, ...(isPopular && { py: 1.5 }) }}
            >
              {buttonText}
            </Button>
          </CardContent>
        </Card>
      </Grid>
    );
  };
  return (
    <>
      {/* Page Header */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: 2,
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: { xs: '60vh', md: '70vh' },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto', color: 'white' }}>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              gutterBottom
              sx={{ mb: 2, color: 'white' }}
            >
              Coaching Options & Pricing
            </Typography>
            <Typography
              variant="h6"
              align="center"
              sx={{ maxWidth: '700px', mx: 'auto', fontWeight: 400, color: 'rgba(255, 255, 255, 0.9)' }}
            >
              Choose the coaching option that best fits your goals and commitment
              level, downloadable training plans, or personalized coaching tiers.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Downloadable Training Plans Section */}
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
            sx={{ mb: 4 }}
          >
            Downloadable Training Plans
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}
          >
            Self-paced training plans you can download and follow at your own
            pace. Perfect for runners who prefer structure without ongoing
            support. Each plan is designed based on your individual running experience and goals.
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {PDF_PLANS.map((planKey) =>
              renderProductCard(planKey, {
                buttonText: 'Purchase Plan',
              })
            )}
          </Grid>
        </Container>
      </Box>

      {/* Coaching Tiers Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          px: 2,
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 4 }}
          >
            Personalized Coaching Tiers
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {COACHING_TIERS.map((tierKey, index) =>
              renderProductCard(tierKey, {
                isPopular: index === 2, // level3 is most popular
                cardElevation: index === 2 ? 4 : 2,
                showBorder: index === 2,
              })
            )}
          </Grid>
        </Container>
      </Box>

      {/* Optional Add-Ons Section */}
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
            sx={{ mb: 4 }}
          >
            Optional Add-Ons
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 5, maxWidth: '600px', mx: 'auto' }}
          >
            Enhance your coaching experience with specialized add-on services
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
              justifyContent: 'center',
            }}
          >
            {ADD_ONS.map((addonKey) => {
              const product = getProductData(addonKey);
              return (
                <Box key={addonKey} sx={{ flex: { xs: '1 1 100%', md: '1 1 50%' }, maxWidth: { md: '500px' } }}>
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                        {product?.name}
                  </Typography>
                  <Box sx={{ my: 2 }}>
                        {product?.priceDisplay.includes('/') ? (
                          <>
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ fontWeight: 600 }}
                    >
                              {product.priceDisplay.split('/')[0]}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="span"
                      sx={{ ml: 1 }}
                    >
                              /{product.priceDisplay.split('/')[1]}
                    </Typography>
                          </>
                        ) : (
                    <Typography
                      variant="h4"
                      component="span"
                      sx={{ fontWeight: 600 }}
                    >
                            {product?.priceDisplay}
                    </Typography>
                        )}
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {product?.description}
                  </Typography>
                  <List dense>
                        {getProductFeatures(addonKey).map((feature, index) => (
                          <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                      <CheckCircleIcon
                        sx={{ color: 'primary.main', fontSize: 20, mr: 1 }}
                      />
                      <ListItemText
                              primary={feature}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                        ))}
                  </List>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                        onClick={() => handlePlanSelect(addonKey)}
                    sx={{ mt: 3 }}
                  >
                        {addonKey === 'addon-strength' ? 'Add Strength Training' : 'Book Consultation'}
                  </Button>
                </CardContent>
              </Card>
            </Box>
              );
            })}
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default CoachingAndPricing;

