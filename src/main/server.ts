import { join } from 'path';
import {
  useContainer as routingUseContainer,
  ExpressErrorMiddlewareInterface,
  Middleware,
  useExpressServer,
} from 'routing-controllers';
import { Container } from 'typedi';
import * as express from 'express';
import compression from 'compression';
import { TestService } from '../services/testService';
import { open } from 'sqlite';

process.on('uncaughtException', function(err) {
  console.log('UNCAUGHT EXCEPTION - keeping process alive:', err); // err.message is "foobar"
});

routingUseContainer(Container);

@Middleware({ type: 'after' })
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
  error(error: any, _request: any, response: any, next: any) {
    if (error) {
      console.log(error);
      response.status(500).send({
        message: error.message,
      });
      return;
    }
    next();
  }
}

export async function start(prod: boolean) {
  const db = await open(':memory:');
  await db.run('CREATE TABLE lorem (info TEXT)');
  let stmt = await db.prepare('INSERT INTO lorem VALUES (?)');
  for (let i = 0; i < 10; i++) {
    await stmt.run(`Ipsum ${i}`);
  }
  await stmt.finalize();
  const temp = await db.all('SELECT rowid AS id, info FROM lorem');
  console.log(temp);
  let expressApp = express();
  expressApp.use(compression());
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const app = useExpressServer(expressApp, {
    routePrefix: '/api',
    defaultErrorHandler: false,
    controllers: [TestService],
  });
  if (prod) {
    expressApp.use('/', express.static(join(__dirname, './renderer')));
  }
  app.listen(prod ? 8888 : 8887);
}
