class ShopController {
  // 用户登录
  async getShop(ctx, next) {
    const { id = 1 } = ctx.request.query || {};
    ctx.body = [
      { id: 1, name: 'shopA' },
      { id: 2, name: 'shopB' },
      { id: 3, name: 'shopC' },
    ].find((s) => s.id === +id);
    next();
  }
}

export default new ShopController();
