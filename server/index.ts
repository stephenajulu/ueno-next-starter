import * as express from 'express';
import next from 'next';

const { PORT, NODE_ENV } = process.env;
const port = PORT ? parseInt(PORT, 10) : 3000;
const dev = NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err: express.Errback) => {
    if (err) {
      throw err;
    }

    // tslint:disable-next-line:no-console
    console.log(`> Ready on http://localhost:${port}`);
  });
});
