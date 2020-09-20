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
    `!${html}(`+
      `${el(selector, opts)},`+
      `${val(opts)}`+
    `);`+
    `!${hide(opts)}(`+
      `${el(selector, opts)},`+
      `${val(opts)}`+
    `)`
  }
}

function html (el, val) {
  el.innerHTML = val
}
