// This is a serverless function that acts as a secure backend proxy.
// It receives requests from the frontend, adds the secret API credentials,
// and calls the Viva.com API. This is the standard, secure way to handle
// payment API calls from a web application.

import { VIVA_MERCHANT_ID, VIVA_API_KEY } from '../configs/vivaConfig';

// FIX: Declare Buffer to resolve TypeScript errors in environments where Node.js types are not globally available.
// This serverless function runs in a Node.js-like environment where Buffer is present at runtime.
declare const Buffer: {
  from(str: string): {
    toString(encoding: 'base64'): string;
  };
};

// Helper function for Base64 encoding, safe for serverless environments
const toBase64 = (str: string) => {
  if (typeof btoa === 'function') {
    return btoa(str);
  }
  if (typeof Buffer === 'function') {
    return Buffer.from(str).toString('base64');
  }
  throw new Error('Base64 encoding not supported in this environment.');
};

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { amount, isPreAuth, createRecurring } = await req.json();

    const credentials = toBase64(`${VIVA_MERCHANT_ID}:${VIVA_API_KEY}`);
    const apiUrl = 'https://api.vivapayments.com/checkout/v2/orders';

    const body = {
      amount: amount,
      customerTrns: `Test payment for ApolloPlug.com`,
      customer: {
        email: 'test@apolloplug.com',
        fullname: 'John Doe',
        countryCode: 'PL'
      },
      isPreAuth: isPreAuth,
      allowRecurring: createRecurring,
    };

    const vivaResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify(body),
    });

    const responseData = await vivaResponse.json();

    if (!vivaResponse.ok) {
        console.error('Viva API Error:', responseData);
        const errorMessage = responseData.error || `Viva API responded with status ${vivaResponse.status}`;
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: vivaResponse.status,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify({ orderCode: responseData.orderCode }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in proxy function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An internal server error occurred.';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
