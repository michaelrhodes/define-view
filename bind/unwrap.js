module.exports = unwrap

var select = require('./util/select')
var transform = require('./util/transform')

function unwrap (selector, opts) {
  if (typeof selector !== 'string') {
    opts = selector
    selector = null
  }

  return {
    type: 'renderer',
    args: ['el', 'val', 's', 'fragment', 'children', 'c', 'i'],
    body: `
      el = ${select(selector, opts)}
      val = ${transform(opts)}

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

      if (el.$before.parentNode) {
        while ((s = el.$before.nextSibling) !== el.$after)
          el.$before.parentNode.removeChild(s)
      }

      if (val != null && el.$after.parentNode) {
        fragment = el.ownerDocument.createDocumentFragment()
        children = [].slice.call(el.childNodes)
        i = 0; while (c = children[i++]) fragment.appendChild(c)
        el.$after.parentNode.insertBefore(fragment, el.$after)
      }
    `
  }
}
