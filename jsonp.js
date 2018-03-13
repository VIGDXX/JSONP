function JSONP(url,setting) {
	let script = document.createElement('script')
	let body = document.body
	if (typeof JSONP.index  === 'undefined') {
		JSONP.index = 0
	}
	const parseParams = (params) => {
		let query = '?'
		Object.keys(params).forEach( (item) => {
			query += `${item}=${encodeURIComponent(params[item])}&`
		} )
		return query
	}
	const query = parseParams(setting.data)
	const callbackName = `cb${JSONP.index}`
	JSONP.index++ 
	JSONP[callbackName] = (data) => {
		setting.callback(data)
		document.removeChild(script)
		delete JSONP[callbackName]
	}
	script.src = url + query + `callback=JSONP.${callbackName}`
	body.appendChild(script)
}
