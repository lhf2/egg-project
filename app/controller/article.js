'use strict';

const { Controller } = require('egg');

class ArticleController extends Controller {
    // 创建文章
    async create() {
        const { ctx } = this;
        const body = ctx.request.body

        ctx.validate({
            title: { type: 'string' },
            content: { type: 'string' }
        }, body)

        const article = await this.service.article.createArticle(body)
        ctx.body = article
    }
    // 文章详情
    async info() {
        const { ctx } = this
        const articleId = ctx.params.articleId
        const article = await ctx.model.Article.findById(articleId)

        if(!article){
            ctx.throw(404, '文章不存在')
        }
        const user = await ctx.model.User.findById(article.userId)
        ctx.body = {
            ...article._doc,
            user: user
        }
    }
}

module.exports = ArticleController;