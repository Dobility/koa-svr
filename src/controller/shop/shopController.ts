import { IRouterContext } from 'koa-router';
import * as shopService from '../../service/shop/shopService';

export const getShop = async (ctx: IRouterContext) => {
  const id = ctx.getNumberParam('id');
  return await shopService.getShopById(id);
};
