const serve = require('koa-static')
const koa = require('koa')
const helmet = require('koa-helmet')
const app = new koa()

const router = require('./routes').produceRouter()

app.use(helmet())

app.use(serve(__dirname + '/public'))

app.use(router.routes(), router.allowedMethods())

app.listen(8090, () => {
        console.log('server begin on 8090')
})