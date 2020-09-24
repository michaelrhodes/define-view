module.exports = bind

var children = require('./children')

function bind (selector, transform) {
  if (typeof selector !== 'string') {
    transform = selector
    selector = null
  }

  return function (v) {
    var el = selector ? this.get(selector) : this.el
    var val = transform && v != null ? transform(v) : v
    var doc = el.ownerDocument
    slot(el, val, doc)
  }
}

function slot (el, val, doc) {
  if (!el.pb$) el.pb$ = doc.createTextNode('')
  if (!el.pa$) el.pa$ = doc.createTextNode('')

  if (el.parentNode) {
    // Replace slot with bounding placeholders
    el.parentNode.insertBefore(el.pa$, el)
    el.parentNode.insertBefore(el.pb$, el.pa$)
    el.parentNode.removeChild(el)
  }

  if (el.pb$.parentNode) (function (s) {
    // Remove any nodes between the boundaries
    while ((s = el.pb$.nextSibling) !== el.pa$)
      el.pb$.parentNode.removeChild(s)
  })()

  if (val != null && el.pa$.parentNode) (function (i, f) {
    // Insert values between boundaries
    f = doc.createDocumentFragment(), children.c(el, val, doc)
    while (i < el.childNodes.length) f.appendChild(el.childNodes[i++])
    el.pa$.parentNode.insertBefore(f, el.pa$)
  })(0)
}
