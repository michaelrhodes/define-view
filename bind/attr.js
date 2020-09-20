module.exports = bind

var el = require('./util/el')
var val = require('./util/val')

function bind (selector, name, opts) {
  if (typeof name !== 'string') {
    opts = name
    name = selector
    selector = null
  }

  return {
    b: ``+
    `!${attr}(`+
      `${el(selector, opts)},`+
      `${val(opts)},`+
      `${opts && opts.noboolean},`+
      `'${name}'`+
    `)`
  }
}

function attr (el, val, nobool, name) {
  nobool = nobool || typeof val !== 'boolean'

  ;(nobool ? val != null : val) ?
    el.setAttribute(name, nobool ? val : '') :
    el.removeAttribute(name)
}
