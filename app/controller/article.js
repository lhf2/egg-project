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

        if (!article) {
            ctx.throw(404, '文章不存在')
        }
        const user = await ctx.model.User.findById(article.userId)
        ctx.body = {
            ...article._doc,
            user: user
        }
    }
    // 点赞文章
    async like() {
        const { ctx } = this
        const articleId = ctx.request.body.articleId

        // 文章是否存在
        const article = await ctx.model.Article.findById(articleId)
        if (!article) {
            ctx.throw(404, '文章不存在')
        }

        // 是否已经点赞
        const isLike = await ctx.model.Like.findOne({
            articleId,
            userId: ctx.user._id
        })
        if (!!isLike) {
            ctx.throw(422, '已经点过赞了')
        }

        // 正常逻辑
        const { Like } = this.app.model
        const like = await new Like({
            articleId,
            userId: ctx.user._id
        }).save()

        if (like) {
            // 增加文章的点赞数
            article.likeCount = await Like.countDocuments({
                articleId: articleId
            })
            await article.save()
            ctx.body = {
                msg: '点赞成功'
            }
        } else {
            this.ctx.throw(501, '点赞失败')
        }
    }
}

module.exports = ArticleController;