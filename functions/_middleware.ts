/**
 * 301 z legacy hostów na apolloidea.com (stara domena + *.pages.dev).
 * Dodatkowo: stary slug dokumentu regulaminu → nowy (SEO / zakładki).
 */
interface MiddlewareContext {
  request: Request;
  next: () => Promise<Response>;
  waitUntil: (promise: Promise<unknown>) => void;
  passThroughOnException: () => void;
  env: unknown;
}

const CANONICAL_HOST = 'apolloidea.com';

const LEGACY_HOSTS = new Set([
  'apolloplug.com',
  'www.apolloplug.com',
  'apolloplug.pages.dev',
]);

function redirectTo(url: URL, status: 301 | 302): Response {
  return Response.redirect(url.toString(), status);
}

export const onRequest = async (context: MiddlewareContext): Promise<Response> => {
  const req = context.request;
  const url = new URL(req.url);
  const host = url.hostname.toLowerCase();

  if (LEGACY_HOSTS.has(host)) {
    const next = new URL(req.url);
    next.hostname = CANONICAL_HOST;
    next.protocol = 'https:';
    next.port = '';
    return redirectTo(next, 301);
  }

  if (host === CANONICAL_HOST) {
    if (url.pathname === '/dokumentacja' && url.searchParams.get('doc') === 'regulamin-apolloplug') {
      const next = new URL(req.url);
      next.searchParams.set('doc', 'regulamin-apolloidea');
      return redirectTo(next, 301);
    }

    const pdfOld = /^\/pdf\/regulamin-apolloplug\.pdf$/i;
    if (pdfOld.test(url.pathname)) {
      const next = new URL(req.url);
      next.pathname = '/pdf/regulamin-apolloidea.pdf';
      return redirectTo(next, 301);
    }
  }

  return context.next();
};
