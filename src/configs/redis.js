const {createClient} = require('redis')

const client = createClient({
    // password: process.env.REDIS_PASSWORD,
    // socket: {
    //     host: 'redis-16051.c292.ap-southeast-1-1.ec2.cloud.redislabs.com',
    //     port: 16051
    // }
    url: `redis://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@redis-16051.c292.ap-southeast-1-1.ec2.cloud.redislabs.com:16051`
});

module.exports = client
