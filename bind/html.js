module.exports = bind

var el = require('./util/el')
var val = require('./util/val')
var hide = require('./util/hide')

function bind (selector, transform) {
  if (typeof selector !== 'string') {
    transform = selector, selector = null
  }

  return {
    b: ``+
    `!${html}(`+
      `${el(selector)},`+
      `${val(transform)}`+
    `);`+
    `!${hide}(`+
      `${el(selector)},`+
      `${val(transform)}`+
    `)`
  }
}

function html (el, val) {
  el.innerHTML = val
}
