import path from 'path';
import db from './db';

export default {
  port: 3000,
  logPath: path.resolve(__dirname, '../../logs'),
  apiPrefix: '/api',
  db,
};
