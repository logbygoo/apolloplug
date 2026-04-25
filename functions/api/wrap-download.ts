/**
 * Pobieranie plików wrap z R2 z nagłówkiem `Content-Disposition: attachment`
 * (wymusza zapis pliku zamiast otwierania w karcie; omija CORS z img.apolloidea.com).
 */
const CDN_BASE = 'https://img.apolloidea.com/img/wrap/';

const ALLOWED_FILE = /^wrap-[a-z0-9-]+\.png$/i;

interface PagesCtx {
  request: Request;
}

export const onRequest = async (context: PagesCtx): Promise<Response> => {
  if (context.request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }
  const url = new URL(context.request.url);
  const file = url.searchParams.get('file');
  if (!file || !ALLOWED_FILE.test(file)) {
    return new Response('Invalid file', { status: 400 });
  }
  const upstream = await fetch(CDN_BASE + encodeURIComponent(file), { method: 'GET' });
  if (!upstream.ok) {
    return new Response('Not found', { status: 404 });
  }
  const buf = await upstream.arrayBuffer();
  const safeName = file.replace(/"/g, '');
  return new Response(buf, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Content-Disposition': `attachment; filename="${safeName}"`,
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
