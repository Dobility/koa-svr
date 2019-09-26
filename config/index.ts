import path from 'path';

export default {
  port: 3000,
  logPath: path.resolve(__dirname, '../../logs'),
  apiPrefix: '/api',
  jwtSecret: 'secret',
};
