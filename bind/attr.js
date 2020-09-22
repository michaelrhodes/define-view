module.exports = bind

var select = require('./util/select')
var apply = require('./util/apply')

function bind (selector, name, transform) {
  if (typeof name !== 'string') {
    transform = name
    name = selector
    selector = null
  }

  return function attr (v) {
    var el = select(selector, this)
    var val = apply(transform, v); val ?
    el.setAttribute(name, val === true ? '' : val) :
    el.removeAttribute(name)
  }
}
