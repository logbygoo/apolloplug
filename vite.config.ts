import path from 'path';
import type { Plugin } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const WRAP_CDN = 'https://img.apolloidea.com/img/wrap/';
const WRAP_NAME_RE = /^wrap-[a-z0-9-]+\.png$/i;

function wrapDownloadDevPlugin(): Plugin {
  return {
    name: 'wrap-download-dev',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/api/wrap-download')) {
          return next();
        }
        const u = new URL(req.url, 'http://dev');
        const file = u.searchParams.get('file');
        if (!file || !WRAP_NAME_RE.test(file)) {
          res.statusCode = 400;
          res.end();
          return;
        }
        const cdn = `${WRAP_CDN}${encodeURIComponent(file)}`;
        fetch(cdn)
          .then((r) => {
            if (!r.ok) {
              res.statusCode = 404;
              res.end();
              return;
            }
            return r.arrayBuffer();
          })
          .then((buf) => {
            if (!buf) return;
            res.setHeader('Content-Type', 'image/png');
            res.setHeader('Content-Disposition', `attachment; filename="${file.replace(/"/g, '')}"`);
            res.end(Buffer.from(buf));
          })
          .catch(() => {
            res.statusCode = 502;
            res.end();
          });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), wrapDownloadDevPlugin()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
