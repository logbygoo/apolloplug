// This is a Cloudflare Pages Function that acts as a secure backend proxy.
// It intercepts requests from the frontend, adds the secret API credentials
// from environment variables, and calls the Viva.com API.
// To make this work, you must set VIVA_MERCHANT_ID and VIVA_API_KEY
// in your Cloudflare project's environment variables.

// FIX: Replaced the specific Buffer type declaration with `any` to resolve a persistent TypeScript error where `Buffer` was being incorrectly inferred as type `never`. This is a safe workaround as the code includes a runtime check for `Buffer`'s existence.
declare const Buffer: any;

interface Env {
    VIVA_MERCHANT_ID: string;
    VIVA_API_KEY: string;
}

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

// FIX: Define the 'PagesFunction' type to resolve the TypeScript error. This type is
// normally available in a Cloudflare Pages environment and is added here for compatibility.
type PagesFunction<Env = unknown> = (context: {
  request: Request;
  env: Env;
  params: Record<string, string>;
  waitUntil: (promise: Promise<any>) => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  data: Record<string, unknown>;
}) => Response | Promise<Response>;

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*', // Be more specific in production if needed
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  try {
    const { amount, isPreAuth, createRecurring } = await request.json();

    const merchantId = env.VIVA_MERCHANT_ID;
    const apiKey = env.VIVA_API_KEY;

    if (!merchantId || !apiKey || merchantId === 'YOUR_VIVA_MERCHANT_ID') {
        throw new Error('Server configuration error: Missing API credentials.');
    }

    const credentials = toBase64(`${merchantId}:${apiKey}`);
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
        'Authorization': `Basic ${credentials}`,
      },
      body: JSON.stringify(body),
    });

    const responseData = await vivaResponse.json();

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    };

    if (!vivaResponse.ok) {
        console.error('Viva API Error:', responseData);
        const errorMessage = responseData.error || `Viva API responded with status ${vivaResponse.status}`;
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: vivaResponse.status,
            headers: headers,
        });
    }

    return new Response(JSON.stringify({ orderCode: responseData.orderCode }), {
      status: 200,
      headers: headers,
    });

  } catch (error) {
    console.error('Error in proxy function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An internal server error occurred.';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
};
