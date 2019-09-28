import fs from 'fs';
import path from 'path';
import log4js from 'log4js';
import config from '../config';

if (!fs.existsSync(config.logPath)) {
  fs.mkdirSync(config.logPath);
}

const resolve = (file: string) => path.resolve(config.logPath, file);
const year = new Date().getFullYear();

log4js.configure({
  appenders: {
    console: { type: 'console' },
    http: {
      type: 'dateFile',
      filename: resolve(`./http/${year}`),
      pattern: 'MM.dd_hh.log',
      alwaysIncludePattern: true,
    },
    error: {
      type: 'dateFile',
      category: 'error',
      filename: resolve(`./error/${year}`),
      pattern: 'MM.dd_hh.log',
      alwaysIncludePattern: true,
    },
  },
  categories: {
    error: { appenders: ['error', 'console'], level: 'error' },
    default: { appenders: ['http', 'console'], level: 'info' },
  },
  pm2: true,
  pm2InstanceVar: 'INSTANCE_ID',
});

export const loggerMiddleware = async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date().getTime() - start.getTime();
  const remoteAddress = ctx.headers['x-forwarded-for']
    || ctx.ip
    || ctx.ips
    || (ctx.socket
      && (ctx.socket.remoteAddress || (ctx.socket.socket && ctx.socket.socket.remoteAddress))
    );
  const logText = [
    `${ctx.method} ${ctx.status} ${ctx.url}`,
    `body: ${JSON.stringify(ctx.request.body || {})}`,
    `response： ${JSON.stringify(ctx.body || {})}`,
    `- ${remoteAddress} - ${ms}ms`,
  ].join(' ');
  log4js.getLogger().info(logText);
};

export const logger = {
  info: (info) => log4js.getLogger().info(info),
  error: (err) => log4js.getLogger('error').error(err),
};
