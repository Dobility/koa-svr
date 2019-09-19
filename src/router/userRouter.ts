import Router from 'koa-router';
import user from '../controllers/user/userController';

const router = new Router();
router
  .post('/login', user.login)
  .get('/userinfo', user.userInfo);

export default router.routes();
