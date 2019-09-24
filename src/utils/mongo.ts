import mongoose from 'mongoose';
import config from '../../config';
import { logger } from '../../middleware/logger';

const mg = config.db.connection;

const url = `mongodb://${mg.user}:${mg.password}@${mg.host}:${mg.port}/${mg.database}?authSource=admin`;

export const connectDB = async () => {
  // 创建一个数据库连接
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.once('connected', () => {
    logger.info(`${url} Connecting database successfully`);
  });

  mongoose.connection.on('error', (e) => {
    logger.error(`${url} Failed to connect to database`);
    logger.error(e.stack);
  });

  mongoose.connection.once('disconnected', () => {
    logger.info(`${url} Closed to connect to database`);
  });

  return mongoose;
};
