module.exports = bind

var autohide = require('./util/autohide')

function bind (selector, transform) {
  if (typeof selector !== 'string') {
    transform = selector
    selector = null
  }

  return function html (v) {
    var el = selector ? this.get(selector) : this.el
    var val = transform && v != null ? transform(v) : v
    el.innerHTML = val
    autohide(el, val)
  }
}
