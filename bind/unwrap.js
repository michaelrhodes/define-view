module.exports = unwrap

var renderer = require('./util/renderer')

function unwrap (selector, opts, args) {
  if (typeof selector !== 'string') {
    opts = selector
    selector = null
  }

  opts = opts || {}
  opts.nohide = true
  args = ['fragment', 'children', 'c', 'i']

  return renderer(selector, opts, args, `
    if (!el.$before) el.$before = doc.createTextNode('')
    if (!el.$after) el.$after = doc.createTextNode('')

    if (el.parentNode) {
      el.parentNode.insertBefore(el.$after, el)
      el.parentNode.insertBefore(el.$before, el.$after)
      el.parentNode.removeChild(el)
    }

    if (el.$before.parentNode) {
      while ((c = el.$before.nextSibling) !== el.$after)
        el.$before.parentNode.removeChild(c)
    }

    if (val != null && el.$after.parentNode) {
      fragment = doc.createDocumentFragment()
      children = [].slice.call(el.childNodes)
      i = 0; while (c = children[i++]) fragment.appendChild(c)
      el.$after.parentNode.insertBefore(fragment, el.$after)
    }
  `)
}
