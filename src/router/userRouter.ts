import { IRouteOption } from '../../interface/route';
import * as userController from '../controller/user/userController';
import * as loginController from '../controller/user/loginController';

const routes: Array<IRouteOption> = [
  { path: '/login', method: 'post', controller: loginController.login },
  { path: '/userInfo', auth: true, controller: userController.userInfo },
];

export default routes;
