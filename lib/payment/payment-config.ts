// https://applepaydemo.apple.com/payment-request-api
export const applePaymentDataRequest = {
  environment: "TEST",
  version: 3,
  merchantIdentifier: "merchant.com.apdemo",
  merchantCapabilities: [
    "supports3DS",
    "supportsCredit",
    "supportsDebit"
  ],
  supportedNetworks: ["amex", "discover", "masterCard", "visa"],
  countryCode: "JP",
  requiredBillingContactFields: ["postalAddress", "name"],
  requiredShippingContactFields: [
    "postalAddress",
    "name",
    "phone",
    "email"
  ]
};

export const googlePaymentDataRequest = {
  environment: "TEST",
  apiVersion: 2,
  apiVersionMinor: 0,
  merchantInfo: {
    // A merchant ID is available after approval by Google.
    // @see {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist}
    // merchantId: '12345678901234567890',
    merchantName: "Example Merchant",
  },
  allowedPaymentMethods: [
    {
      type: "CARD",
      parameters: {
        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
        allowedCardNetworks: [
          "AMEX",
          "DISCOVER",
          "INTERAC",
          "JCB",
          "MASTERCARD",
          "VISA",
        ],
      },
      tokenizationSpecification: {
        type: "PAYMENT_GATEWAY",
        // Check with your payment gateway on the parameters to pass.
        // @see {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway}
        parameters: {
          gateway: "example",
          gatewayMerchantId: "exampleGatewayMerchantId",
        },
      },
    },
  ],
};
  

export const paymentMethods = [
  // basic-cardはほぼ使えなそう
  {
    supportedMethods: "basic-card"
  },
  {
    supportedMethods: "https://google.com/pay",
    data: googlePaymentDataRequest
  },
  {
    supportedMethods: "https://apple.com/apple-pay",
    data: applePaymentDataRequest
  }
]