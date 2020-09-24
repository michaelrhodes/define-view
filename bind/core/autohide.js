module.exports = autohide

function autohide (el, val) {
  if (!el.p$) el.p$ = el
    .ownerDocument
    .createTextNode('')

  if (val != null && el.p$.parentNode) {
    el.p$.parentNode.insertBefore(el, el.p$)
    el.p$.parentNode.removeChild(el.p$)
  }

  else if (val == null && el.parentNode) {
    el.parentNode.insertBefore(el.p$, el)
    el.parentNode.removeChild(el)
  }
}
