import Router from 'koa-router';
import userRouter from './userRouter';
import shopRouter from './shopRouter';

const router = new Router();
router.prefix('/api');
router.use('/user', userRouter);
router.use('/shop', shopRouter);

export default router;
