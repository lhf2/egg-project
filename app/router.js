'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 设置请求前缀
  router.prefix('/api/v1')

  // 用户相关
  router.post('/user/register', controller.user.register)
};
