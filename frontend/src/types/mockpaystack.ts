export const initPaystack = async (planId: string) => {
  return {
    authorization_url: "https://paystack.com/pay/example",
    reference: "MOCK_REF_" + planId,
  };
};
