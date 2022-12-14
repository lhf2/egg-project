'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  const auth = app.middleware.auth()
  // 设置请求前缀
  router.prefix('/api/v1')

  // 用户相关
  router.post('/user/register', controller.user.register)
  router.post('/user/login', controller.user.login)
  router.get('/user/info/:userId', app.middleware.auth({ required: false }), controller.user.info)

  // 文章相关
  router.post('/article/create', auth, controller.article.create)
  router.get('/article/info/:articleId', controller.article.info)
  router.post('/article/like', auth, controller.article.like)
  router.post('/article/comment', auth, controller.article.comment)
  router.get('/article/comment/list/:articleId', controller.article.commentList)
  router.get('/article/rank/hot/get', controller.article.getHotRank)
};
