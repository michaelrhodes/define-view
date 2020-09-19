module.exports = html

var renderer = require('./util/renderer')

function html (selector, opts) {
  if (typeof selector !== 'string') {
    opts = selector
    selector = null
  }

  return renderer(selector, opts, [], `
    el.innerHTML = val
  `)
}
