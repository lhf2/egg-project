module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const LikeSchema = new Schema({
        // 点赞的用户
        userId: {
            type: mongoose.ObjectId,
            require: true,
            ref: 'User'
        },
        // 点赞的文章
        articleId: {
            type: mongoose.ObjectId,
            require: true,
            ref: 'Article'
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

    return mongoose.model('Like', LikeSchema);
}