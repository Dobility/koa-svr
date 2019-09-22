import { IRouteRule } from '../../interface/route';
import { routerMiddleWare } from '../../middleware/router';
import userRoutes from './userRouter';
import shopRoutes from './shopRouter';

const rules: Array<IRouteRule> = [
  { prefix: '/user', routes: userRoutes },
  { prefix: '/shop', routes: shopRoutes },
];

export default routerMiddleWare(rules);
