const redis = require('./redis')
const { promisify } = require('util')
const Service = require('egg').Service

// 转为 promise 格式
const zadd = promisify(redis.zadd).bind(redis);
const zrevrangebyscore = promisify(redis.zrevrangebyscore).bind(redis)
const zscore = promisify(redis.zscore).bind(redis)
const zincrby = promisify(redis.zincrby).bind(redis)
const zrevrange = promisify(redis.zrevrange).bind(redis)

class RankService extends Service {
    /**
     * 增加热度
     */
    async hotInc(articleId, incrNum) {
        // 查看集合中是否存在此 id
        const data = await zscore('ranks', articleId)
        // 如果有此 id
        if (data) {
            // 增加多少
            await zincrby('ranks', incrNum, articleId)
        } else {
            // 添加到集合
            await zadd(["ranks", incrNum, articleId])
        }
    }
    /**
     * 排行版前几
     */
    async topHot(num) {
        // 创建一个 redis 的有序集合
        // 从大到小排序

        /**
         * 返回的结构是 
         * {
         *  "63971623ca668665533bbfeb": "4",
         *  ...
         * }
         */
        // const tops = await zrevrangebyscore(['ranks', "+inf", "-inf", "withscores"])
        // let newArr = tops.slice(0, num * 2)
        // let obj = {}
        // for (let i = 0; i < newArr.length; i++) {
        //     // 偶数位是 id，奇数是数值
        //     if (i % 2 == 0) {
        //         obj[newArr[i]] = newArr[i + 1]
        //     }
        // }
        // return obj

        /**
         * 返回的结构是排行榜文章列表
         */
        const tops = await zrevrangebyscore(['ranks', "+inf", "-inf"])
        let list = tops.map(async item => {
            return await this.app.model.Article.findById(item)
        });
        let res = await Promise.all(list)
        return {
            total: num,
            list: res
        }
    }

}

module.exports = RankService