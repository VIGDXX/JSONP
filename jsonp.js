/*
 * @author vigdxx@gmail.com
 * @param {{String}} url
 * @param {{Object}} data
 * @param {{String}} callbackQueryKey
 * @param {{Function}} callback
 */

function JSONP(url,data,callbackKey = 'callback',callback) {
	let script = document.createElement('script')
	let body = document.body
	if(typeof JSONP.index !== 'number' ) {
		JSONP.index = 0
	}
	if(!(data instanceof Object)) {
		return console.error('data is not an object')
	}
	if(typeof callback !== 'function') {
		return console.error('callback is not a function')
	}
	const parseParams = (params) => {
		let query = '?'
		Object.keys(params).forEach( (item) => {
			query += `${item}=${encodeURIComponent(params[item])}&`
		} )
		return query
	}
	const query = parseParams(data)
	const callbackName = `cb${JSONP.index}`
	JSONP.index++ 
	JSONP[callbackName] = (data) => {
		callback(data)
		document.removeChild(script)
		delete JSONP[callbackName]
	}
	script.src = url + query + `${callbackQueryKey}=JSONP.${callbackName}`
	body.appendChild(script)
}
