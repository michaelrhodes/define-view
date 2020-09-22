module.exports = bind

var select = require('./util/select')

function bind (selector, name, opts) {
  if (typeof name !== 'string') {
    opts = name
    name = selector
    selector = null
  }

  return function listener (v) {
    var el = select(selector, this)

   ;(this['l$' + (el.s$ = '' + selector) + name] = v) ?
      el.addEventListener(name, this, opts) :
      el.removeEventListener(name, this)
  }
}
