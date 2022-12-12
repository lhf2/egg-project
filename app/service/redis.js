const redis = require("redis");
const client = redis.createClient();

client.on("error", function (error) {
    console.log('redis 连接失败')
    client.quit()
});

client.on('ready', (err) => {
    console.log('redis 连接成功')
});


module.exports = client
