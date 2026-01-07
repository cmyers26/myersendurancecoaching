import { productConfig } from '../config/productConfig';

/**
 * Maps old product format to new format
 * @param {string|null|undefined} productType - The product type to normalize
 * @returns {string|null} - Normalized product type or null
 */
export const normalizeProductType = (productType) => {
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

/**
 * Validates a product type against productConfig
 * @param {string|null|undefined} productType - The product type to validate (can be in old or new format)
 * @returns {{isValid: boolean, product: object|null, errorMessage: string|null}} - Validation result
 */
export const validateProductType = (productType) => {
  // Handle null/undefined/empty
  if (!productType) {
    return {
      isValid: false,
      product: null,
      errorMessage: 'No product selected. Please select a product to continue.',
    };
  }

  // Normalize the product type
  const normalizedType = normalizeProductType(productType);
  
  // Check if product exists in config
  const product = normalizedType ? productConfig[normalizedType] : null;

  if (!product) {
    return {
      isValid: false,
      product: null,
      errorMessage: 'Invalid product selected. Please choose a valid product from our pricing page.',
    };
  }

  // Validate that product has required fields
  if (!product.stripePriceId) {
    return {
      isValid: false,
      product: product,
      errorMessage: 'This product is not available for purchase at this time. Please contact support for assistance.',
    };
  }

  return {
    isValid: true,
    product: product,
    errorMessage: null,
  };
};

