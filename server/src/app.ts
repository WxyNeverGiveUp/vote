import * as Koa from 'koa'
import * as http from 'http'
import { config } from "./config/config";
import { makeRouter } from './lib/route';
import { config_redis } from '@tencent/fw_redis_model';
import bodyParser = require("koa-bodyparser");

export const app = new Koa()
const server_config = config.server,
      redis_config = config.redis

/**
 * 本地跨域设置
 */
app.use(async (ctx, next) => {
    if (server_config.env === Env.TEST) {
        ctx.set('Access-Control-Allow-Origin', 'https://h5game.qq.com')
        // ctx.set('Access-Control-Allow-Origin', 'http://h5game.qq.com')
    } else {
        ctx.set('Access-Control-Allow-Origin', '*')
    }

    // 设置所允许的HTTP请求方法
    ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE")

    ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type")
    ctx.set("Allow", "GET, POST")

    ctx.set("Content-Type", "application/json;charset=utf-8")
    await next();
})

/**
 * 解析post请求
 */
app.use(bodyParser())

/**
 * Create HTTP server.
 */
const server = http.createServer(app.callback());

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(server_config.port)
server.on('listening', onListening)

/**
 * use router
 */
makeRouter(app)

/**
 * redis init
 */
config_redis({
    "host": redis_config.host,
    "port": redis_config.port,
    "max": redis_config.max,
    "min": redis_config.min,
    "password": redis_config.password
})

/**
 * Event listener for HTTP server "listening" event.
 */  
function onListening() {
    console.log('strange talk server running:', server_config.ip + ':' + server_config.port)
}