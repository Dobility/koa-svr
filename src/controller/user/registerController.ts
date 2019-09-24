import { IRouterContext } from 'koa-router';
import { createUser } from '../../service/user/userService';

export const register = async (ctx: IRouterContext) => {
  const { id = 0, name = '' } = ctx.request.query || {};
  const user = await createUser(+id, name);
  return {
    user,
  };
};
