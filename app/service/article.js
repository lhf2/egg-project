const Service = require('egg').Service
class ArticleService extends Service {
    get Article() {
        return this.app.model.Article
    }
    // 创建文章
    async createArticle(data) {
        const article = new this.Article(data)
        article.userId = this.ctx.user._id
        await article.save()
        return article
    }

}
module.exports = ArticleService