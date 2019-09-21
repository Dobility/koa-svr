// 用户登录
import { IRouterContext } from 'koa-router';

export const login = async (ctx: IRouterContext) => {
  // 获取请求提交的数据
  const name = ctx.request.body.name || '';
  const pwd = ctx.request.body.pwd || '';

  // do something
  return {
    status: true,
    token: '123',
    name,
    pwd,
  };
};
