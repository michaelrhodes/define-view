module.exports = bind

var visibility = require('./core/visibility')

function bind (selector, transform) {
  if (typeof selector !== 'string') {
    transform = selector
    selector = null
  }

  return function text (v) {
    var el = selector ? this.get(selector) : this.el
    var val = transform && v != null ? transform(v) : v
    el.textContent = val
    visibility(el, val)
  }
}
