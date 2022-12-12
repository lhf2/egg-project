const Service = require('egg').Service
const jwt = require('jsonwebtoken')
class UserService extends Service {
    get User() {
        return this.app.model.User
    }
    // 注册
    async createUser(data) {
        data.password = this.ctx.helper.md5(data.password)
        const user = new this.User(data)
        await user.save()
        return user
    }
    // 查找邮箱是否存在
    async findEmail(email) {
        // 这里需要返回 password，在登录对比密码是否正确时会用到
        return this.User.findOne({
            email
        }).select('+password')
    }
    // 创建 token
    async createToken(data) {
        return jwt.sign(data, this.app.config.jwt.secret, {
            expiresIn: this.app.config.jwt.expiresIn
        })
    }
    // 验证 token
    async verifyToken(token) {
        return jwt.verify(token, this.app.config.jwt.secret)
    }
}

module.exports = UserService