module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const ArticleSchema = new Schema({
        title: {
            type: String,
            require: true
        },
        content: {
            type: String,
            require: true
        },
        // 发布文章的用户 Id
        userId: {
            type: mongoose.ObjectId,
            require: true,
            // 跟 User 关联
            ref: 'User'
        },
        // 点赞数
        likeCount: {
            type: Number,
            default: 0
        },
        // 评论数
        commentCount: {
            type: Number,
            default: 0
        },
        createAt: {
            type: Date,
            default: Date.now
        },
         updateAt: {
            type: Date,
            default: Date.now
         }
    });

    return mongoose.model('Article', ArticleSchema);
}