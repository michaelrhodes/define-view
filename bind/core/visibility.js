module.exports = visibility

function visibility (el, val) {
  if (!el.p$) el.p$ = el
    .ownerDocument
    .createTextNode('')

  if (val != null && el.p$.parentNode) {
    el.p$.parentNode.replaceChild(el, el.p$)
  }
  else if (val == null && el.parentNode) {
    el.parentNode.replaceChild(el.p$, el)
  }
}
