import { IRouteOption } from '../../interface/route';
import * as userController from '../controller/user/userController';
import * as loginController from '../controller/user/loginController';
import * as registerController from '../controller/user/registerController';

const routes: Array<IRouteOption> = [
  { path: '/login', method: 'post', controller: loginController.login },
  { path: '/userInfo', method: 'get', controller: userController.userInfo },
  { path: '/register', method: 'get', controller: registerController.register },
];

export default routes;
