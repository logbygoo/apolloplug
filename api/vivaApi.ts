interface VivaPaymentOrderResponse {
  orderCode: string;
  error?: string;
}

/**
 * Creates a payment order by sending a request to our secure backend proxy.
 * The proxy then adds the secret credentials and calls the Viva.com API.
 * This approach is secure and avoids CORS issues.
 *
 * @param amount The amount in the smallest currency unit (e.g., 100 for 1.00 PLN).
 * @param isPreAuth Whether to create a pre-authorization order.
 * @param createRecurring Whether to mark the transaction for recurring payments.
 * @returns A promise that resolves with the real payment order details from Viva.com.
 */
export const createVivaPaymentOrder = async (
  amount: number,
  isPreAuth: boolean,
  createRecurring: boolean
): Promise<VivaPaymentOrderResponse> => {
  try {
    const response = await fetch('/api/create-viva-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, isPreAuth, createRecurring }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return { orderCode: data.orderCode };
  } catch (error) {
    console.error('Error creating Viva payment order via proxy:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { orderCode: '', error: errorMessage };
  }
};
