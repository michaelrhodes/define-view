module.exports = renderer

var transform = require('./transform')
var select = require('./select')
var hide = require('./hide')

function renderer (selector, opts, args, body) {
  return {
    type: 'renderer',
    args: ['el','val','doc'].concat(args),
    body: `
      el = ${select(selector, opts)}
      val = ${transform(opts)}
      doc = el.ownerDocument
      ${body}
      ${hide(opts)}
    `
  }
}
