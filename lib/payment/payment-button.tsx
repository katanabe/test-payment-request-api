"use client";

import { Button } from "@/components/ui/button"
import { usePaymentRequest } from "./use-payment-request-api";
import {paymentMethods} from "./payment-config";

const paymentDetails = {
  total: {
    label: "Total",
    amount: {
      currency: "JPY",
      value: "100"
    }
  }
};

export const PaymentButton = () => {
  const { show } = usePaymentRequest({
    methodData: paymentMethods,
    detail: paymentDetails,
    onShowSuccess: async (request, resolve, _reject) => {
      console.log(request);
      await resolve();
    },
  });

  return <Button onClick={() => show()}>Payment</Button>;
};
