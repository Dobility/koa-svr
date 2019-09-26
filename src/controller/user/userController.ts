import { IRouterContext } from 'koa-router';
import * as userService from '../../service/user/userService';

// 用户信息
export const userInfo = async (ctx: IRouterContext) => {
  const data = await userService.getUserInfo();
  return {
    status: true,
    data,
  };
};
