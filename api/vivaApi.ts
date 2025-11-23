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
 * Creates a payment order by calling our secure backend proxy (serverless function).
 * This function sends the payment details to our backend, which then securely
 * communicates with the Viva.com API.
 *
 * @param payload - The payment details.
 * @returns A promise that resolves with the Viva.com API response.
 */
export const createVivaPaymentOrder = async (payload: CreateOrderPayload): Promise<VivaPaymentOrderResponse> => {
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
