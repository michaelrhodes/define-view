module.exports = html

var visibility = require('./visibility')

function html (el, val, doc) {
  el.innerHTML = val
  visibility(el, val, doc)
}
