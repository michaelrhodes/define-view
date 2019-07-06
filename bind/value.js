var select = require('./util/select')
var transform = require('./util/transform')

module.exports = value

function value (selector, opts) {
  if (typeof selector !== 'string') {
    opts = selector
    selector = null
  }

  return {
    type: 'renderer',
    args: ['el', 'val', 'start', 'end'],
    body: `
      el = ${select(selector, opts)}
      val = ${transform(opts)}
      if (val == null) val = ''

      if (el === el.ownerDocument.activeElement) {
        try {
          start = el.selectionStart
          end = el.selectionEnd
          el.value = val
          el.setSelectionRange(start, end)
        }
        catch (e) {
          el.value = val
        }
      }
      else {
        el.value = val
      }
    `
  }
}
