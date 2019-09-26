import jwt from 'jsonwebtoken';
import config from '../config';

export const jwtMiddleware = async (ctx, next) => {
  try {
    const token = ctx.request.headers.authorization;
    if (token) {
      ctx.jwtData = jwt.verify(token.slice(7), config.jwtSecret);
    }
  } catch (e) {
    throw { code: 401, message: e.message };
  }
  await next();
};
