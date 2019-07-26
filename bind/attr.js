var select = require('./util/select')
var transform = require('./util/transform')

module.exports = attr

function attr (selector, name, opts) {
  if (typeof name !== 'string') {
    opts = name
    name = selector
    selector = null
  }

  return {
    type: 'renderer',
    args: ['el', 'val', 'bool'],
    body: `
      el = ${select(selector, opts)}
      val = ${transform(opts)}
      bool = ${bool(opts)}
      ;(bool ? val : val != null) ?
        el.setAttribute('${name}', bool ? '' : val) :
        el.removeAttribute('${name}')
    `
  }

  function bool (opts) {
    return !!opts && !!opts.noboolean ?
      `false` : `val === true || val === false`
  }
}
