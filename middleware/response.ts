import { logger } from './logger';

// 这个middleware用于将ctx.result中的内容最终回传给客户端
// 回传的格式遵循这样的格式：{ code: 0, msg: any, data: any }
export const responseHandler = async (ctx, next) => {
  if (ctx.body) {
    ctx.type = 'json';
    ctx.body = {
      code: 200,
      success: true,
      msg: ctx.msg || '',
      data: ctx.body,
    };
  }
  await next();
};

// 这个middleware处理在其它middleware中出现的异常
// 并将异常消息回传给客户端：{ code: '错误代码', msg: '错误信息' }
export const errorHandler = (ctx, next) => (
  next().catch((err) => {
    if (err.code == null) {
      logger.error(err.stack);
    }
    ctx.body = {
      code: err.code || -1,
      success: false,
      msg: err.message.trim(),
    };
    ctx.status = 200; // 保证返回状态是 200, 这样前端不会抛出异常
    return Promise.resolve();
  })
);
