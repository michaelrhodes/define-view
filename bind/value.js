module.exports = value

var renderer = require('./util/renderer')

function value (selector, opts) {
  if (typeof selector !== 'string') {
    opts = selector
    selector = null
  }

  opts = opts || {}
  opts.nohide = true

  return renderer(selector, opts, ['start', 'end'], `
    if (val == null) val = ''
    if (el !== doc.activeElement) el.value = val
    else {
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
  `)
}
