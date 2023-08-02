"use client";

import { useCallback, useMemo } from "react";

type PaymentRequestValues = {
  isSupported: boolean;
  show: () => void;
  // abort: () => void;
};

export type PaymentRequestConfig = {
  methodData: PaymentMethodData[];
  detail: PaymentDetailsInit;
}

type PaymentRequestInput = PaymentRequestConfig & {
  onShowSuccess?: (
    response: PaymentResponse,
    resolve: Resolve,
    reject: Reject
  ) => Promise<void>;
  onShowFail?: (e: Error) => void;
};

type Resolve = (value?: {} | PromiseLike<{}>) => void;
type Reject = (reason?: any) => void;

const hasSupport = () => typeof window !== "undefined" && !!window.PaymentRequest;

const createPaymentRequest = ({methodData, detail}: PaymentRequestConfig) => {
  return new PaymentRequest(methodData, detail);
}

export const usePaymentRequest = ({
  methodData,
  detail,
  onShowSuccess,
  onShowFail,
}: PaymentRequestInput): PaymentRequestValues => {
  const isSupported = hasSupport();

  const show = useCallback(() => {
    const request = createPaymentRequest({methodData, detail});
    if (!request.canMakePayment()) {
      return Promise.reject();
    }

    return request.show().then((response) => {
      if (!onShowSuccess) {
        return Promise.reject();
      }

      return new Promise((resolve: Resolve, reject: Reject) => {
        onShowSuccess(response, resolve, reject)
          .then(() => response.complete("success"))
          .catch(() => response.complete("fail"));
      }).catch((error: Error) => {
        request.abort();
        onShowFail?.(error)
      });
    });
  }, [methodData, detail, onShowSuccess, onShowFail]);

  return {
    isSupported,
    show,
  };
};
