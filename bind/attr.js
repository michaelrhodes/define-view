module.exports = attr

var renderer = require('./util/renderer')

function attr (selector, name, opts) {
  if (typeof name !== 'string') {
    opts = name
    name = selector
    selector = null
  }

  opts = opts || {}
  opts.nohide = true

  return renderer(selector, opts, ['bool'], `
    ;((bool = ${bool(opts)}) ? val : val != null) ?
      el.setAttribute('${name}', bool ? '' : val) :
      el.removeAttribute('${name}')
  `)

  // Set boolean attributes where appropriate
  function bool (opts) {
    return !opts || !opts.noboolean ?
      `val === true || val === false` :
      `false`
  }
}
