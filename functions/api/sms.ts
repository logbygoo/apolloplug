/**
 * Wysyłka SMS przez SMSAPI (OAuth Bearer). W starym workerze był osobny endpoint;
 * oczekiwany payload z frontu: { to, message, from } (from = nadawca alfanum., np. apolloplug).
 */
interface Env {
  SMSAPI_TOKEN: string;
}

interface EventContext<EnvType, P extends string, Data> {
  request: Request;
  env: EnvType;
  waitUntil: (promise: Promise<unknown>) => void;
  passThroughOnException: () => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  functionPath: string;
  params: Record<P, string | string[]>;
  data: Data;
}

type PagesFunction<EnvType = unknown, P extends string = string, Data extends Record<string, unknown> = Record<string, unknown>> = (
  context: EventContext<EnvType, P, Data>
) => Response | Promise<Response>;

const jsonHeaders = { 'Content-Type': 'application/json; charset=utf-8' };

function normalizePolishMsisdn(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 9) {
    return `48${digits}`;
  }
  if (digits.length === 11 && digits.startsWith('48')) {
    return digits;
  }
  if (digits.length >= 10 && digits.length <= 15) {
    return digits;
  }
  return digits;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: jsonHeaders });
  }

  if (!env.SMSAPI_TOKEN) {
    return new Response(JSON.stringify({ error: 'SMS service not configured' }), { status: 503, headers: jsonHeaders });
  }

  let body: { to?: string; message?: string; from?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400, headers: jsonHeaders });
  }

  const { to, message, from } = body;
  if (!to || !message || !from) {
    return new Response(JSON.stringify({ error: 'Missing required fields: to, message, from' }), {
      status: 400,
      headers: jsonHeaders,
    });
  }

  const normalizedTo = normalizePolishMsisdn(to);
  if (normalizedTo.length < 11) {
    return new Response(JSON.stringify({ error: 'Invalid phone number' }), { status: 400, headers: jsonHeaders });
  }

  const params = new URLSearchParams({
    to: normalizedTo,
    message,
    from: String(from).slice(0, 11),
    format: 'json',
  });

  const res = await fetch('https://api.smsapi.pl/sms.do', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.SMSAPI_TOKEN}`,
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    body: params.toString(),
  });

  const text = await res.text();
  let parsed: { error?: number; message?: string } | null = null;
  try {
    parsed = JSON.parse(text) as { error?: number; message?: string };
  } catch {
    // odpowiedź nie-JSON
  }

  const apiError = parsed && typeof parsed.error === 'number' && parsed.error > 0;
  if (!res.ok || apiError) {
    return new Response(
      JSON.stringify({
        error: 'SMSAPI error',
        detail: parsed ?? text,
      }),
      { status: 502, headers: jsonHeaders }
    );
  }

  return new Response(text || JSON.stringify({ ok: true }), {
    status: 200,
    headers: jsonHeaders,
  });
};
