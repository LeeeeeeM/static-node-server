const serve = require('koa-static')
const koa = require('koa')
const Router = require('koa-router')
const helmet = require('koa-helmet')
const request = require('request')
const app = new koa()

const util = require('./util')

let router = new Router()

router.get('/image/check', async ctx => {
	const imgUrl = ctx.query.url
	if (!imgUrl) {
		ctx.body = {
			status: 0
		}
		return
	}
	const referrer = util.getHostName(imgUrl)
	const options = {
		url: imgUrl,
		headers: {
			'Referer': referrer,
			'User-Agent': 'request'
		}
	}

	ctx.body = request(options)
})

app.use(helmet())

app.use(serve(__dirname + '/public'))

app.use(router.routes(), router.allowedMethods())

app.listen(8090, () => {
        console.log('server begin on 8090')
})