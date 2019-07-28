module.exports = unwrap

function unwrap (opts) {
  return !opts || !opts.unwrap ? `` : `
    if (!el.$before) el.$before = el
      .ownerDocument
      .createTextNode('')

    if (!el.$after) el.$after = el
      .ownerDocument
      .createTextNode('')

    if (el.parentNode) {
      el.parentNode.insertBefore(el.$after, el)
      el.parentNode.insertBefore(el.$before, el.$after)
      el.parentNode.removeChild(el)
    }

    if (el.$before.parentNode) (function (s) {
      while ((s = el.$before.nextSibling) !== el.$after)
        el.$before.parentNode.removeChild(s)
    })()

    if (val != null && el.$after.parentNode) (function () {
      var fragment = el.ownerDocument.createDocumentFragment()
      var children = [].slice.call(el.childNodes)
      var c, i = 0; while (c = children[i++]) fragment.appendChild(c)
      el.$after.parentNode.insertBefore(fragment, el.$after)
    })()
  `
}
