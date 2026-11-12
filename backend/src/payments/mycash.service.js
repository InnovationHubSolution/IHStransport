/**
 * Vodafone Vanuatu M-Vatu.
 * Vodafone has not published a merchant HTTP API. This module must not call
 * the old Digicel MyCash gateway or invent payment, OTP, or callback paths.
 * See docs/MVATU_INTEGRATION.md.
 */
const { getMycashConfig } = require('../config/mycash-loader');

const NOT_CONFIGURED =
  'Vodafone Vanuatu has not published an M-Vatu merchant API. The top-up is saved as pending and the card balance is unchanged. Customers can pay a registered M-Vatu business with *120# or the M-Vatu app, but this system cannot confirm that payment until Vodafone supplies the merchant URL, credentials, and response schema.';

class MvatuService {
  async getConfig() {
    return getMycashConfig();
  }

  async beginTopUp() {
    const err = new Error(NOT_CONFIGURED);
    err.code = 'mvatu_not_configured';
    throw err;
  }

  async sendOTP() {
    return this.beginTopUp();
  }

  async approvePayment() {
    return this.beginTopUp();
  }

  async connectionStatus() {
    const config = await this.getConfig();
    const saved = Boolean(config.apiUrl || config.apiKey || config.merchantMobile);
    return {
      connected: false,
      configured: false,
      credentials_saved: saved,
      code: 'mvatu_not_configured',
      message: NOT_CONFIGURED
    };
  }
}

module.exports = new MvatuService();
