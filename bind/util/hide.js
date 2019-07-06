module.exports = hide

function hide (opts) {
  return !!opts && !!opts.nohide ? `` : `
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
  `
}
