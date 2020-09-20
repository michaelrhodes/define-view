module.exports = bind

var el = require('./util/el')
var val = require('./util/val')
var hide = require('./util/hide')

function bind (selector, opts) {
  if (typeof selector !== 'string') {
    opts = selector
    selector = null
  }

  return {
    b: ``+
    `!${text}(`+
      `${el(selector, opts)},`+
      `${val(opts)}`+
    `);`+
    `!${hide(opts)}(`+
      `${el(selector, opts)},`+
      `${val(opts)}`+
    `)`
  }
}

function text (el, val) {
  el.textContent = val
}
