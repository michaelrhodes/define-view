module.exports = slot

var children = require('./children')

function slot (el, val, doc) {
  if (!el.pb$) el.pb$ = doc.createTextNode('')
  if (!el.pa$) el.pa$ = doc.createTextNode('')

  if (el.parentNode) {
    // Replace slot with bounding placeholders
    el.parentNode.insertBefore(el.pb$, el)
    el.parentNode.replaceChild(el.pa$, el)
  }

  if (el.pb$.parentNode) (function (s) {
    // Remove any nodes between the boundaries
    while ((s = el.pb$.nextSibling) !== el.pa$)
      el.pb$.parentNode.removeChild(s)
  })()

  if (val != null && el.pa$.parentNode) (function (f) {
    children(el, val, doc)

    // Insert values between boundaries
    f = doc.createDocumentFragment()
    while (el.childNodes.length) f.appendChild(el.childNodes[0])
    el.pa$.parentNode.insertBefore(f, el.pa$)
  })()
}
