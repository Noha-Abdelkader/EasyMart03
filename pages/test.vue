<template>
    <div>
        <!-- <form ref="moyaSarForm" id="moyasar-payment-form" className="w-100"></form> -->
        
    </div>
</template>


<script setup>

const form = ref(null);
const data = ref(null);


</script>

<!-- <template>
  <div class="example">
    <div class="demo">
      <google-pay-button
        environment="TEST"
        :button-type="buy"
        :button-color="buttonColor"
        :existing-payment-method-required=true
        :paymentRequest="{
          apiVersion: paymentRequest.apiVersion,
          apiVersionMinor: paymentRequest.apiVersionMinor,
          allowedPaymentMethods: paymentRequest.allowedPaymentMethods,
          merchantInfo: paymentRequest.merchantInfo,
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: 10,
            currencyCode: 'USD',
            countryCode: 'US',
          },
          callbackIntents: ['PAYMENT_AUTHORIZATION'],
        }"
        :loadpaymentdata="onLoadPaymentData"
        :error="onError"
        :onPaymentAuthorized="onPaymentDataAuthorized"
      ></google-pay-button>
    </div>
  </div>
</template>
  
  <script setup>
import "@google-pay/button-element";

let amount = 10.0;
let existingPaymentMethodRequired = true;
let buttonColor = "default";
let buttonType = "buy";
let paymentRequest = {
  apiVersion: 2,
  apiVersionMinor: 0,
  allowedPaymentMethods: [
    {
      type: "CARD",
      parameters: {
        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
        allowedCardNetworks: ["MASTERCARD", "VISA"],
      },
      tokenizationSpecification: {
        type: "PAYMENT_GATEWAY",
        parameters: {
          gateway: "example",
          gatewayMerchantId: "exampleGatewayMerchantId",
        },
      },
    },
  ],
  merchantInfo: {
    merchantId: "12345678901234567890",
    merchantName: "Demo Merchant",
  },
};
const onLoadPaymentData = (event) => {
  console.log("load payment data", event.detail);
};
//   onError: (event) => {
//     console.error("error", event.error);
//   },
const onPaymentDataAuthorized = (paymentData) => {
  console.log("payment authorized", paymentData);
  return {
    transactionState: "SUCCESS",
  };
};
</script>
  
  
  <style scoped>
.example {
  margin: 5px;
  display: flex;
  flex-direction: row;
}

.example > .demo {
  flex: 1 0 0;
}
.example > .demo > * {
  margin: 1px;
}
</style> -->