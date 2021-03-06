import Router from 'koa-router';
import { IRouteOption, IRouteRule } from '../interface/route';
import config from '../config';

const controllerHandler = (controller: Function) => (
  async (ctx: Router.IRouterContext, next: Function) => {
    ctx.body = await controller(ctx);
    next();
  }
);

const routerHandler = (routes: Array<IRouteOption>) => {
  let router = new Router();
  routes.forEach(route => {
    router = router[route.method || 'get'](
      route.path || `/${route.controller.name}`,
      controllerHandler(route.controller),
    );
  });
  return router.routes();
};

export const routerMiddleWare = (rules: Array<IRouteRule>) => {
  const router = new Router();
  router.prefix(config.apiPrefix);
  rules.forEach(rule => {
    router.use(rule.prefix, routerHandler(rule.routes));
  });
  return router;
};
