var visibility = require('./core/visibility')

module.exports = require('./core')(function (el, val, doc) {
  el.textContent = val
  visibility(el, val, doc)
})
