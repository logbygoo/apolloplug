// This file simulates a backend API that interacts with Viva.com
// In a real application, these functions would be on your server,
// and you would call them from the frontend via fetch().

interface VivaPaymentOrderResponse {
  orderCode: string;
}

/**
 * Simulates creating a payment order on the backend.
 *
 * IMPORTANT: In a real-world scenario:
 * 1. This function would reside on your secure server (e.g., a Node.js/Express backend).
 * 2. It would use your Viva.com Merchant ID and API Key to make a POST request
 *    to the Viva.com API endpoint for creating payment orders.
 * 3. Never expose your API Key on the frontend.
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
  console.log("Simulating backend call to Viva.com to create a payment order...");
  console.log("Amount:", amount);
  console.log("Is Pre-authorization:", isPreAuth);
  console.log("Create Recurring Token:", createRecurring);

  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));

  // In a real backend, you would make a POST request to:
  // `https://api.vivapayments.com/checkout/v2/orders` (for production)
  // or `https://demo-api.vivapayments.com/checkout/v2/orders` (for demo)
  // with an Authorization header `Bearer <your_encoded_api_key>`
  // and a JSON body containing details like amount, customer info, etc.

  // For this simulation, we'll return a mock order code.
  // The code is a random string to show it changes when parameters change.
  const mockOrderCode = `MOCK_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

  console.log("Simulation successful. Mock Order Code:", mockOrderCode);

  return {
    orderCode: mockOrderCode,
  };
};
