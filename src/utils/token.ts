import { sign } from 'jsonwebtoken';
import config from '../../config';

export const generateToken = (data: any, exp: string = '1h') => (
  sign({ data }, config.jwtSecret, { expiresIn: exp })
);
