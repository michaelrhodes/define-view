module.exports = util

function util (opts) {
  return opts && opts.nohide ? `${noop}` : `${hide}`
}

function noop () {}

function hide (el, val) {
  if (!el.$placeholder) el.$placeholder = el
    .ownerDocument
    .createTextNode('')

  if (val != null && el.$placeholder.parentNode) {
    el.$placeholder.parentNode.insertBefore(el, el.$placeholder)
    el.$placeholder.parentNode.removeChild(el.$placeholder)
  }

  else if (val == null && el.parentNode) {
    el.parentNode.insertBefore(el.$placeholder, el)
    el.parentNode.removeChild(el)
  }
}
