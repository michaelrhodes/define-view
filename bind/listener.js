module.exports = listener

var transform = require('./util/transform')
var select = require('./util/select')

function listener (selector, name, opts) {
  if (typeof name !== 'string') {
    opts = name
    name = selector
    selector = null
  }

  var key = selector + name
  var listener = opts && opts.listener
  var capture = opts && !!opts.capture

  if (typeof opts === 'function') {
    listener = opts
    opts = null
  }

  return {
    type: 'listener',
    event: name,
    key: key,
    listener: listener,
    args: ['val','el'],
    body: `
      val = ${transform(opts)}
      el = ${select(selector, opts)}
      el.$$selector = '${selector}'
      el.addEventListener('${name}', this, ${capture})
      Object.defineProperty(this, '$$u${key}', {
        writable: true,
        value: val
      })
   `
  }
}
