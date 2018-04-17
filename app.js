const Koa = require('koa')
const mount = require('koa-mount')
const serve = require('koa-static')
const cors = require('@koa/cors')

const app = new Koa()

app
  .use(cors()) // 允许跨域请求
  .use(serve('./static')) // 渲染swagger-ui
  .use(mount('/docs', serve('./static'))) // 指定docs路径

const PORT = process.env.PORT || 4000
const HOST = process.env.HOST || '127.0.0.1'

app.listen(PORT, HOST)
console.log(`Server listening on ${HOST}:${PORT}!`)
