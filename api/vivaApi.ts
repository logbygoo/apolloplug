// This file simulates a backend call to the Viva.com API.
// In a production app, the logic to fetch the orderCode MUST be on a secure backend server.

interface VivaPaymentOrderResponse {
  orderCode: string;
  error?: string;
}

/**
 * Simulates creating a payment order by a backend server.
 *
 * IMPORTANT: This implementation is for DEMONSTRATION purposes only.
 * The real API call is blocked by browser CORS security policies. This function
 * mimics a successful response from your backend, which would securely
 * call the Viva.com API.
 *
 * @param amount The amount in the smallest currency unit (e.g., 100 for 1.00 PLN).
 * @param isPreAuth Whether to create a pre-authorization order.
 * @param createRecurring Whether to mark the transaction for recurring payments (subscriptions).
 * @returns A promise that resolves with the payment order details.
 */
export const createVivaPaymentOrder = async (
  amount: number,
  isPreAuth: boolean,
  createRecurring: boolean
): Promise<VivaPaymentOrderResponse> => {
  console.log("Simulating backend call to create Viva.com payment order...");
  console.log(`Amount: ${amount}, PreAuth: ${isPreAuth}, Recurring: ${createRecurring}`);

  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate a random, plausible-looking Order Code for testing.
      // A real one is a long number.
      const testOrderCode = Math.floor(Math.random() * 10**12).toString();
      console.log("Simulated success. Test Order Code:", testOrderCode);
      resolve({ orderCode: testOrderCode });
    }, 1000); // Simulate network latency
  });
};
