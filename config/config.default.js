/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1670748495731_6863';

  // add your middleware config here
  config.middleware = ['errorHandle'];

  // mongodb 
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/egg-project',
      options: {},
      // mongoose global plugins, expected a function or an array of function and options
      plugins: [],
    },
  };

  // 用于测试需要关掉
  config.security= {
    csrf:{
      enable:false
    }
  }
  
  // jwt
  config.jwt = {
    // 生成 token 唯一的 key
    secret:'f2d1c153-39ec-4327-8c86-0d7308ad84f0',
    // token 的过期时间
    expiresIn:'1d'
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
