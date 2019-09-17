import router from 'koa-router';
import user from '../controllers/user/userController';

router()
  .post('/api/user/login', user.login)
  .get('/api/user/userinfo', user.userInfo);

export default router;
