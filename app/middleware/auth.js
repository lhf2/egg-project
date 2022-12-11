/**
 * 
 * @param {*} options 默认为 true 需要验证 token；如果传入的是 false，说明可传 token 也可不传
 * @returns 
 */
module.exports = (options = { requried: true }) => {
    return async function auth(ctx, next) {
        // 获取 token 
        let token = ctx.headers.authorization
        token = token ? token.split('Bearer ')[1] : null

        if (token) {
            // 验证 token 是否正确
            try {
                const data = ctx.service.user.verifyToken(token)
                ctx.user = data.user
            } catch (error) {
                ctx.throw(401, 'token验证失败')
            }
        } else if (!options.requried) {
            // 不需要验证
            await next()
            return
        } else {
            ctx.throw(401, 'token未传入')
        }

        await next()
    }
}