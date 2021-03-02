module.exports = require('./core')(function (el, val, doc) {
  if (val == null) val = ''
  if (el !== doc.activeElement) el.value = val
  else try {
    var start = el.selectionStart
    var end = el.selectionEnd
    el.value = val
    el.setSelectionRange(start, end)
  }
  catch (o_0) {
    el.value = val
  }
})
