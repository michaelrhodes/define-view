module.exports = bind

var el = require('./util/el')
var val = require('./util/val')

function bind (selector, name, transform) {
  if (typeof name !== 'string') {
    transform = name, name = selector, selector = null
  }

  return {
    b: ``+
    `!${attr}(`+
      `${el(selector)},`+
      `${val(transform)},`+
      `'${name}'`+
    `)`
  }
}

function attr (el, val, name) {
  val ?
  el.setAttribute(name, val === true ? '' : val) :
  el.removeAttribute(name)
}
