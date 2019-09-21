import { IRouterContext } from 'koa-router';

export const getShop = async (ctx: IRouterContext) => {
  const { id = 1 } = ctx.request.query || {};
  return [
    { id: 1, name: 'shopA' },
    { id: 2, name: 'shopB' },
    { id: 3, name: 'shopC' },
  ].find(s => s.id === +id);
};
