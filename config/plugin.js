'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // 连接 mongodb
  mongoose: {
    enable: true,
    package: 'egg-mongoose'
  },
  // 验证
  validate: {
    enable: true,
    package: 'egg-validate',
  }
}
