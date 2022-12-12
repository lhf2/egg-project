module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        userName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
            // 不返回密码字段
            select: false
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

    return mongoose.model('User', UserSchema);
}