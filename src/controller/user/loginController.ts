import { IRouterContext } from 'koa-router';
import { checkLogin } from '../../service/user/loginService';
import { generateToken } from '../../utils/token';

export const login = async (ctx: IRouterContext) => {
  const { name = '', pwd = '' } = ctx.request.body || {};
  if (await checkLogin(name, pwd)) {
    // 更新token
    const token = generateToken(name, '20s');
    return {
      status: true,
      token,
    };
  }
  throw { code: 200, success: false, message: '用户名密码错误' };
};
