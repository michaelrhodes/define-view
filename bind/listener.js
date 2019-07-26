var select = require('./util/select')
var transform = require('./util/transform')

module.exports = listener

function listener (selector, name, opts) {
  if (typeof name !== 'string') {
    opts = name
    name = selector
    selector = null
  }

  var key = selector + name
  var listener = opts && opts.listener
  var capture = opts && !!opts.capture

  return {
    type: 'listener',
    event: name,
    key: key,
    listener: listener,
    args: ['el', 'val'],
    body: `
      el = ${select(selector, opts)}
      val = ${transform(opts)}

      // The next two lines only need to be
      // executed once, but it shouldn’t
      // impact performance, so fuck it
      el.$$selector = '${selector}'
      el.addEventListener('${name}', this, ${capture})

      Object.defineProperty(this, '$$u${key}', {
        value: val,
        writable: true
      })
   `
  }
}
