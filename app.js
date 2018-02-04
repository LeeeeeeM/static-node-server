const serve = require('koa-static')
const koa = require('koa')
const helmet = require('koa-helmet')
const cors = require('koa2-cors')
const app = new koa()

const router = require('./routes').produceRouter()

app.use(cors({
	origin: ctx => '*'
}))

app.use(helmet())

app.use(serve(__dirname + '/public'))

app.use(router.routes(), router.allowedMethods())

app.listen(8090, '127.0.0.1', () => {
	// 这里是个坑,node 服务如果想用127.0.0.1访问必选加本机 127.0.0.1
    console.log('server begin on 8090')
})