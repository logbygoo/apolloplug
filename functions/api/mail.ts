interface Env {
  RESEND_API_KEY: string;
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

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: jsonHeaders });
  }

  if (!env.RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: 'Mail service not configured' }), { status: 503, headers: jsonHeaders });
  }

  let body: {
    to?: string;
    from?: string;
    subject?: string;
    html?: string;
    reply_to?: string;
  };

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400, headers: jsonHeaders });
  }

  const { to, from, subject, html, reply_to } = body;
  if (!to || !from || !subject || !html) {
    return new Response(JSON.stringify({ error: 'Missing required fields: to, from, subject, html' }), {
      status: 400,
      headers: jsonHeaders,
    });
  }

  const resendBody: Record<string, unknown> = {
    from,
    to: [to],
    subject,
    html,
  };
  if (reply_to) {
    resendBody.reply_to = reply_to;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resendBody),
  });

  const text = await res.text();
  return new Response(text, {
    status: res.status,
    headers: jsonHeaders,
  });
};
