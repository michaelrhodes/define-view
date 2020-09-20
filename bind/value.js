module.exports = bind

var el = require('./util/el')
var val = require('./util/val')

function bind (selector, opts) {
  if (typeof selector !== 'string') {
    opts = selector
    selector = null
  }

  return {
    b: ``+
    `!${value}(`+
      `${el(selector, opts)},`+
      `${val(opts)}`+
    `)`
  }
}

function value (el, val) {
  if (val == null) {
    val = ''
  }
  if (el !== el.ownerDocument.activeElement) {
    return el.value = val
  }
  try {
    var start = el.selectionStart
    var end = el.selectionEnd
    el.value = val
    el.setSelectionRange(start, end)
  }
  catch (e) {
    el.value = val
  }
}
