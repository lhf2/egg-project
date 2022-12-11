'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
  // 注册
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

  // 登录
  async login() {
    const { ctx } = this
    const userBody = ctx.request.body

    // 验证
    ctx.validate({
      email: { type: 'string' },
      password: { type: 'string' }
    }, userBody)

    const user = await this.service.user.findEmail(userBody.email)
    if (!user) {
      ctx.throw(422, '用户未注册')
    }
    if (ctx.helper.md5(userBody.password) != user.password) {
      ctx.throw(422, '密码不正确')
    }

    // 创建 token
    const token = await this.service.user.createToken({ user })

    // 删除密码
    const userInfo = user._doc
    delete userInfo.password

    // 返回数据
    ctx.body = {
      ...userInfo,
      token
    }
  }

  // 用户信息
  async info() {
    const { ctx } = this
    const userId = ctx.params.userId
    const userInfo = await ctx.model.User.findById(userId)
    ctx.body = userInfo
  }
}

module.exports = UserController;
