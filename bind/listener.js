module.exports = bind

var select = require('./util/select')

function bind (selector, name, opts) {
  if (typeof name !== 'string') {
    opts = name
    name = selector
    selector = null
  }

  var id = selector + name

  var fn = typeof opts === 'object' ?
    opts.listener :
    opts

  if (typeof fn === 'function') {
    listener.k = `$$v$${id}`
    listener.v = fn
  }

  return listener

  function listener (value) {
    var el = select(selector, this)
    Object.defineProperty(this, `$$u$${id}`, { value, writable: true })
    el.addEventListener(name, this, !!(opts && opts.capture))
    el.$$selector = `${selector}`
  }
}
