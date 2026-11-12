# Vodafone M-Vatu integration

Vanuatu Smart Transit no longer calls the Digicel MyCash gateway (`gifts.digicelpacific.com`). Fare taps still spend the prepaid card balance only. They do not debit an M-Vatu wallet.

## What Vodafone publishes

Checked against Vodafone Vanuatu’s M-Vatu page and the M-Vatu specific terms (October 2019, still the public customer contract):

- Customers use USSD `*120#` or the M-Vatu app.
- A registered customer can pay a business that Vodafone has listed for bill payment (consumer-to-business).
- Shops can also be paid by QR inside the M-Vatu app. Vodafone has not published the QR payload.
- Vodafone has not published a merchant HTTP API: no base URL, no payment, OTP, or callback schema, and no product ID for third parties.

mHITs documents a cross-border remittance link with M-PAiSA Fiji. That is not a merchant top-up API for this system.

## What this system does until Vodafone issues a contract

Admin → Settings stores the fields Vodafone would have to supply:

- API base URL
- API key
- Username and password
- Merchant mobile (the number or biller customers pay)
- Merchant or product code, only if Vodafone assigns one

Those values are saved and are not sent anywhere. Starting a top-up creates a **pending** `mvatu_transactions` row (card, amount in VUV, customer mobile, order id). The card balance does **not** increase.

`POST /api/payments/topup/approve` still contains the balance update, and it runs only after a provider response with `status: "approved"`. The current provider never returns that, because there is no official request to send. A short changelog of this cut-over is enough; do not point the app back at MyCash.

## Still needed from Vodafone Vanuatu

1. Written merchant API (or SMS/callback) specification: URL, authentication, request fields, success and failure codes.
2. IHS merchant registration: the biller name or merchant code customers select in `*120#` or the app.
3. Whether confirmation is OTP, app push, or an asynchronous receipt, and the exact reference we must store.
4. Sandbox credentials.

When those exist, implement them in `backend/src/payments/mycash.service.js` (`beginTopUp` / `approvePayment`) and only then credit the card. Card-sale fees and agent commissions are not charged: no price for either is defined. Add them only after a price is set in `system_settings`.
