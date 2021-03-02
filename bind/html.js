var visibility = require('./core/visibility')

module.exports = require('./core')(function (el, val, doc) {
  el.innerHTML = val
  visibility(el, val, doc)
})
