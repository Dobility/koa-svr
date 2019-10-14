import { IRouterContext } from 'koa-router';

export const paramsMiddleware = async (ctx: IRouterContext, next: Function) => {
  // 获取所有参数
  ctx.getParams = function getParams() {
    const query = ctx.request.query || {};
    const body = ctx.request.body || {};
    return { ...query, ...body };
  };
  // 获取字符串类型参数
  ctx.getParam = function getParam(field: string, defaultValue?: string) {
    return this.getParams()[field] || defaultValue || null;
  };
  // 获取数字类型参数
  ctx.getNumberParam = function getNumberParam(field: string, defaultValue?: number) {
    const num = Number(this.getParams()[field]);
    if (num !== undefined) {
      return num;
    }
    return defaultValue !== undefined ? defaultValue : null;
  };
  await next();
};
