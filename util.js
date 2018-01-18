const url = require('url')

const getHostName = uri => {
	const parsedUrl = url.parse(uri);
    return parsedUrl.protocol + '//' + parsedUrl.host
}

module.exports = {
	getHostName: getHostName
}