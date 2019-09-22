import { IRouterContext } from 'koa-router';
import * as shopService from '../../service/shop/shopService';

export const getShop = async (ctx: IRouterContext) => {
  const { id = 1 } = ctx.request.query || {};
  return await shopService.getShopById(+id);
};
