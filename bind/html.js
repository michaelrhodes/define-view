var select = require('./util/select')
var transform = require('./util/transform')
var hide = require('./util/hide')
var unwrap = require('./util/unwrap')

module.exports = html

function html (selector, opts) {
  if (typeof selector !== 'string') {
    opts = selector
    selector = null
  }

  return {
    type: 'renderer',
    args: ['el', 'val'],
    body: `
      el = ${select(selector, opts)}
      el.innerHTML = val = ${transform(opts)}
      ${hide(opts)}
      ${unwrap(opts)}
    `
  }
}
