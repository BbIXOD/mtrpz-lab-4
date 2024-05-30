import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 8000;
const indexFilePath = './public/index.html';

const mimeTypes: Record<string, string> = {
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.html': 'text/html',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
};

const requestListener = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  const url = req.url;
  if (!url) return;

  if (url === '/') onRootRequest(req, res);
  else requestFile(req, res);
};

const server = http.createServer(requestListener);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const shutdown = () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server has been shut down.');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

const onRootRequest = (
  _req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  const content = fs.readFileSync(indexFilePath, 'utf8');
  res.end(content);
};

const requestFile = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const url = req.url;
  if (!url) return;
  const filename = '.' + url;

  const ext = path.parse(url).ext;
  const contentType = mimeTypes[ext] || 'text/plain';
  res.setHeader('Content-Type', contentType);
  if (!fs.existsSync(filename)) {
    res.statusCode = 404;
    console.log(`File not found: ${filename}`);
    res.end('File not found');
    return;
  }
  fs.createReadStream(filename).pipe(res);
};
