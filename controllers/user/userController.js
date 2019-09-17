class UserController {
  // 用户登录
  async login(ctx, next) {
    // 获取请求提交的数据
    const name = ctx.request.body.name || '';
    const pwd = ctx.request.body.pwd || '';
    console.log(name, pwd);

    // do something

    ctx.body = {
      status: true,
      token: '123',
    };
  }

  // 用户信息
  async userInfo(ctx, next) {
    // do something

    // 假设这是请求回来的数据
    const data = {
      name: 'jk',
      age: 25,
    };
    ctx.body = {
      status: true,
      data,
    };
  }
}

export default new UserController();
