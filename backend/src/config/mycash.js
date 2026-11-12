require('dotenv').config();

module.exports = {
  apiUrl: process.env.MVATU_API_URL || process.env.MYCASH_API_URL || '',
  apiKey: process.env.MVATU_API_KEY || process.env.MYCASH_API_KEY,
  username: process.env.MVATU_USERNAME || process.env.MYCASH_USERNAME,
  password: process.env.MVATU_PASSWORD || process.env.MYCASH_PASSWORD,
  merchantMobile: process.env.MVATU_MERCHANT_MOBILE || process.env.MYCASH_MERCHANT_MOBILE,
  productId: process.env.MVATU_MERCHANT_CODE || process.env.MYCASH_PRODUCT_ID || ''
};
