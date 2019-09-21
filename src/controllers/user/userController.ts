import { IRouterContext } from 'koa-router';

// 用户信息
export const userInfo = async (ctx: IRouterContext) => {
  // do something

  // 假设这是请求回来的数据
  const data = {
    name: 'jk',
    age: 25,
  };
  return {
    status: true,
    data,
  };
};
