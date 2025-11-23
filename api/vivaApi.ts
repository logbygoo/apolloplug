interface CreateOrderPayload {
  amount: number;
  isPreAuth: boolean;
  createRecurring: boolean;
}

interface VivaPaymentOrderResponse {
  orderCode?: string;
  error?: string;
}

/**
 * Creates a payment order.
 * In a local development environment, it returns a mock order code to allow UI testing.
 * In a production environment (deployed to Cloudflare), it calls the secure backend proxy.
 *
 * @param payload - The payment details.
 * @returns A promise that resolves with the Viva.com API response.
 */
export const createVivaPaymentOrder = async (payload: CreateOrderPayload): Promise<VivaPaymentOrderResponse> => {
  // Check if we are in a local development environment
  const isLocalDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || !window.location.hostname;

  if (isLocalDev) {
    // In local development, the backend proxy function is not available.
    // We will return a valid, pre-generated DEMO order code to allow UI testing without 405 errors.
    console.log('%c LOCAL DEV MODE ', 'background: #fdba74; color: #7c2d12; font-weight: bold;', 'Returning demo order code for UI testing.');
    
    // This is a pre-generated, static DEMO order code.
    const DEMO_ORDER_CODE = '2306152342038942'; 

    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ orderCode: DEMO_ORDER_CODE });
      }, 1000); // Simulate network delay
    });
  }

  // In production (deployed on Cloudflare), call the real backend proxy.
  try {
    const response = await fetch('/api/create-viva-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      // If the server returns an error response, throw an error with the message
      throw new Error(data.error || `Request failed with status ${response.status}`);
    }

    return { orderCode: data.orderCode };
  } catch (error) {
    console.error('Error creating Viva payment order via proxy:', error);
    // Return a structured error response
    const errorMessage = error instanceof Error ? error.message : 'An unknown network error occurred.';
    return { error: errorMessage };
  }
};