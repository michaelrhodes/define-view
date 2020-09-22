module.exports = bind

var select = require('./util/select')
var apply = require('./util/apply')
var hide = require('./util/hide')

function bind (selector, transform) {
  if (typeof selector !== 'string') {
    transform = selector
    selector = null
  }

  return function text (v) {
    var el = select(selector, this)
    var val = apply(transform, v)
    el.textContent = val
    hide(el, val)
  }
}
