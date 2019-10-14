import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import onerror from 'koa-onerror';
import helmet from 'koa-helmet';
import router from './router';
import config from '../config';
import { loggerMiddleware } from '../middleware/logger';
import { jwtMiddleware } from '../middleware/jwt';
import { paramsMiddleware } from '../middleware/params';
import { responseHandler, errorHandler } from '../middleware/response';

const app = new Koa();

// logger
app.use(loggerMiddleware);

// error
onerror(app);
app.use(errorHandler);

// body parser
app.use(bodyParser());

// params
app.use(paramsMiddleware);

// jwt
app.use(jwtMiddleware);

// helmet
app.use(helmet());

// router
app.use(router.routes())
  .use(router.allowedMethods());

// response
app.use(responseHandler);

// start kit
app.listen(config.port, () => {
  process.stdout.write(`Listening on http://localhost:${config.port}/\n`);
});

export default app;
