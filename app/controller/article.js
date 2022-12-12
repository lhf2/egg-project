'use strict';

const { Controller } = require('egg');

class ArticleController extends Controller {
    // 创建文章
    async create() {
        const { ctx } = this;
        const body = ctx.request.body
        const article = await this.service.article.createArticle(body)
        ctx.body = article
    }
}

module.exports = ArticleController;