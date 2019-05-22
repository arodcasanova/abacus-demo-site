var DOUBLE_PRESS = 500
var STYLE_URL = 'https://1317375494.rsc.cdn77.org/styles/flora-latest.css'
var LIB_URL = 'https://cdn.jsdelivr.net/npm/resonance-audio/build/resonance-audio.min.js'
var SCAPE_URL = 'https://1317375494.rsc.cdn77.org/scripts/demo-scape.js'
var flora = document.createElement('div')
var lastKeypressTime = 0
var audioContext = null
var isPlaying = false

var loadStyle = function(href, callback) {
	var resource = document.createElement('link')
	resource.href = href
	resource.rel = 'stylesheet'
	resource.onreadystatechange = callback
    resource.onload = callback
    document.head.appendChild(resource)
}

var loadScript = function(src, callback) {
	var resource = document.createElement('script')
	resource.type = 'text/javascript'
	resource.src = src
	resource.onreadystatechange = callback
    resource.onload = callback
    document.body.appendChild(resource)
}

var createFlora = function() {
	flora.id = 'flora'
	document.body.appendChild(flora)
}

var installFlora = function() {
	window.onkeydown = showFlora
	window.onkeyup = hideFlora
}

var isDoublePress = function(e, key) {
	if (e.key !== key) return false
	var isDoubleKeypress = false
	var currKeypressTime = new Date()
	if (currKeypressTime - lastKeypressTime <= DOUBLE_PRESS) {
		thisKeypressTime = 0
		isDoubleKeypress = true
	} 
	lastKeypressTime = currKeypressTime
	return isDoubleKeypress
}

var showFlora = function(e) {
	if (e.target.tagName === 'INPUT') { return }
	if (isPlaying) { e.preventDefault() }
	if (isDoublePress(e, 'f')) {
		if (audioContext == null) {
			startFlora()
		} else { audioContext.resume() }
		isPlaying = true
		flora.style.display = 'block'
	} 
}

var hideFlora = function(e) {
	if (e.key === 'g') {
		if (audioContext != null) {
			audioContext.suspend()
		}
		isPlaying = false
		flora.style.display = 'none'
	}
}

loadStyle(STYLE_URL, createFlora)
loadScript(LIB_URL, loadScript(SCAPE_URL, installFlora))