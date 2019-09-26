import Router from 'koa-router';

declare interface IRouteOption {
  path?: string | RegExp,
  method?: 'get' | 'post',
  controller: Router.IMiddleware,
}

declare interface IRouteRule {
  prefix?: string,
  routes: Array<IRouteOption>,
}
