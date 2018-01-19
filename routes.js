const util = require('./util')
const request = require('request')
const Router = require('koa-router')
const cheerio = require('cheerio')
const axios = require('axios')

const produceRouter = () => {
	const router = new Router()

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

	router.get('/room/search', async ctx => {
		const keywords = encodeURIComponent(ctx.query.kw)
		const result = await axios({
			url: 'https://search.bilibili.com/live?keyword=' + keywords,
			headers: {
				'Referer': 'https://search.bilibili.com',
				'User-Agent': 'request'
			}
		})
		
		const $ = cheerio.load(result.data)

		const list = []
		
		$('li.user-item').map(function(item) {
			const user = $(this)
			const roomid = user.children().first().attr('href').match(/\d+/ig)[0]
			const uname = user.children().first().attr('title')
			const face = 'https:' + user.find('img').first().attr('data-src')
			const status = user.find('.status').first().text()
			list.push({
				roomid,
				uname,
				face,
				status
			})
		})
		ctx.body = {
			status: 1,
			data: list
		}
	})

	return router
}


module.exports = {
	produceRouter: produceRouter
}
