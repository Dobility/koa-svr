import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import onerror from 'koa-onerror';
import helmet from 'koa-helmet';
import { loggerMiddleware } from './middlewares/logger';
import router from './router';
import config from './config';

const app = new Koa();

// logger
app.use(loggerMiddleware);

// error
onerror(app);

// body parser
app.use(bodyParser());

// helmet
app.use(helmet());

// router
app.use(router.routes())
  .use(router.allowedMethods());

// start kit
app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}/`);
});

export default app;
