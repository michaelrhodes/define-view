module.exports = bind

var select = require('./util/select')
var apply = require('./util/apply')

function bind (selector, transform) {
  if (typeof selector !== 'string') {
    transform = selector
    selector = null
  }

  return function (v) {
    var el = select(selector, this)
    var val = apply(transform, v)
    var doc = el.ownerDocument
    value(el, val, doc)
  }
}

function value (el, val, doc) {
  if (val == null) val = ''

  if (el !== doc.activeElement) {
    return el.value = val
  }

  try {
    var start = el.selectionStart
    var end = el.selectionEnd
    el.value = val
    el.setSelectionRange(start, end)
  }
  catch (o_0) {
    el.value = val
  }
}
