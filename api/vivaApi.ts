// This file now makes a REAL call to the Viva.com API.
// In a production app, this logic MUST be on a secure backend server.
import { VIVA_MERCHANT_ID, VIVA_API_KEY } from '../configs/vivaConfig';

interface VivaPaymentOrderResponse {
  orderCode: string;
  error?: string;
}

// Base64 encoding function for the browser
// FIX: Removed Node.js-specific `Buffer` logic. In a browser environment, `window.btoa` is always available.
const toBase64 = (str: string) => window.btoa(str);

const VIVA_DEMO_API_URL = 'https://demo-api.vivapayments.com/checkout/v2/orders';

/**
 * Creates a real payment order by calling the Viva.com API.
 *
 * IMPORTANT: This implementation is for DEMONSTRATION purposes only.
 * Exposing the API Key in the frontend is a major security risk.
 * In a production environment, this function MUST be moved to a secure backend server.
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
  console.log("Attempting to create a REAL payment order with Viva.com...");

  const credentials = `${VIVA_MERCHANT_ID}:${VIVA_API_KEY}`;
  const encodedCredentials = toBase64(credentials);

  const requestBody = {
    amount: amount,
    customerTrns: "Testowa płatność ze strony ApolloPlug.com",
    customer: {
        email: "test@apolloplug.com",
        fullname: "Jan Kowalski",
        countryCode: "PL"
    },
    paymentTimeout: 1800,
    preauth: isPreAuth,
    allowRecurring: createRecurring,
    sourceCode: 'Default' // Your source code from Viva Wallet
  };

  try {
    const response = await fetch(VIVA_DEMO_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${encodedCredentials}`
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Viva API Error:", errorData);
        throw new Error(`HTTP error! status: ${response.status} - ${errorData.error || 'Unknown error'}`);
    }

    const data: { orderCode: string } = await response.json();
    console.log("Successfully created Viva.com order. Order Code:", data.orderCode);
    return { orderCode: data.orderCode };
  } catch (error) {
    console.error("Failed to create Viva payment order:", error);
    if (error instanceof Error) {
        return { orderCode: '', error: error.message };
    }
    return { orderCode: '', error: 'An unknown error occurred' };
  }
};