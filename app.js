import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import onerror from 'koa-onerror';
import { loggerMiddleware } from './middlewares/logger';
import config from './config';
// import apiRouter from './router';

const app = new Koa();

// logger
app.use(loggerMiddleware);

// error
onerror(app);

// body parser
app.use(bodyParser());

// app.use(apiRouter.routes());

// start kit
app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}/`);
});

export default app;
