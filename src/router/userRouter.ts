import { IRouteOption } from '../../interface/route';
import {
  userController,
  loginController,
} from '../controllers/user';

const routes: Array<IRouteOption> = [
  { path: '/login', method: 'post', controller: loginController.login },
  { path: '/userInfo', method: 'get', controller: userController.userInfo },
];

export default routes;
