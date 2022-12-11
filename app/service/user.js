const Service = require('egg').Service

class UserService extends Service {
    get User() {
        return this.app.model.User
    }
    async createUser(data) {
        data.password = this.ctx.helper.md5(data.password)
        const user = new this.User(data)
        await user.save()
        return user
    }
    async findEmail(email) {
        return this.User.findOne({
            email
        })
    }
}

module.exports = UserService