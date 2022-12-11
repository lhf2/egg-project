'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
  // 注册用户
  async register() {
    const { ctx } = this

    ctx.validate({
      userName: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
      phone: { type: 'string' }
    })

    const userBody = ctx.request.body
    const hasEmail = await this.service.user.findEmail(userBody.email)
    if (!!hasEmail) {
      ctx.throw(422, '邮箱已经存在')
    }

    const user = await this.service.user.createUser(userBody);
    ctx.body = user
  }
}

module.exports = UserController;
