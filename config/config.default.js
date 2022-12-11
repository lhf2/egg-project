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

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
