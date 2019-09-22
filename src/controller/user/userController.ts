import { IRouterContext } from 'koa-router';
import * as userService from '../../service/user/userService';

// 用户信息
export const userInfo = async (ctx: IRouterContext) => {
  // do something

  // 假设这是请求回来的数据
  const data = await userService.getUserInfo();
  return {
    status: true,
    data,
  };
};
