import { IRouteOption } from '../../interface/route';
import * as shopController from '../controller/shop/shopController';

const routes: Array<IRouteOption> = [
  { controller: shopController.getShop },
  // path默认值为 斜杆+controller的函数名、method 默认为 get
  // { path: '/getShop', method: 'get', controller: shopController.getShop },
];

export default routes;
