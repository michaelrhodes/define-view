module.exports = text

var renderer = require('./util/renderer')

function text (selector, opts) {
  if (typeof selector !== 'string') {
    opts = selector
    selector = null
  }

  return renderer(selector, opts, [], `
    el.textContent = val
  `)
}
