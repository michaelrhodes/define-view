module.exports = text

var visibility = require('./visibility')

function text (el, val, doc) {
  el.textContent = val
  visibility(el, val, doc)
}
