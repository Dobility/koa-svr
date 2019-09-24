import { IRouterContext } from 'koa-router';
import * as userService from '../../service/user/userService';

// 用户信息
export const userInfo = async (ctx: IRouterContext) => {
  // do something
  const { id = 1 } = ctx.request.query || {};
  // 假设这是请求回来的数据
  const data = await userService.getUserInfo(+id);
  return {
    status: true,
    data,
  };
};
