module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const CommentSchema = new Schema({
        // 评论的用户
        userId: {
            type: mongoose.ObjectId,
            require: true,
            ref: 'User'
        },
        // 评论的文章
        articleId: {
            type: mongoose.ObjectId,
            require: true,
            ref: 'Article'
        },
        // 评论的内容
        content: {
            type: String,
            require: true
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

    return mongoose.model('Comment', CommentSchema);
}