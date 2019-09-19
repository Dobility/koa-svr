import Router from 'koa-router';
import shop from '../controllers/shop/shopController';

const router = new Router();
router
  .get('/getShop', shop.getShop);

export default router.routes();
