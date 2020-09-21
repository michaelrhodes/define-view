module.exports = bind

var el = require('./util/el')
var val = require('./util/val')

function bind (selector, name, opts) {
  if (typeof name !== 'string') {
    opts = name, name = selector, selector = null
  }

  var key = selector + name
  var listener = opts && opts.listener

  if (typeof opts === 'function') {
    listener = opts, opts = null
  }

  return {
    k: listener && key,
    v: listener,
    b: ``+
    `!${listen}.call(this,`+
      `${el(selector)},`+
      `${val(opts && opts.transform)},`+
      `${!!(opts && opts.capture)},`+
      `'$$u${key}',`+
      `'${selector}',`+
      `'${name}'`+
    `)`
  }
}

function listen (el, value, capture, prop, selector, name) {
  Object.defineProperty(this, prop, { value, writable: true })
  el.addEventListener(name, this, capture)
  el.$$selector = selector
}
