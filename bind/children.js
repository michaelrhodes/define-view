module.exports = bind

var visibility = require('./core/visibility')

function bind (selector, transform) {
  if (typeof selector !== 'string') {
    transform = selector
    selector = null
  }

  return function (v) {
    var el = selector ? this.get(selector) : this.el
    var val = transform && v != null ? transform(v) : v
    var doc = el.ownerDocument
    children(el, val, doc)
  }
}

function children (el, val, doc) {
  el.innerHTML = ''
  visibility(el, val)

  if (Array.isArray(val)) {
    var child = doc.createDocumentFragment()
    val.forEach(v => child.appendChild(element(v, doc)))
    el.appendChild(child)
  }
  else if (val) {
    el.appendChild(element(val, doc))
  }
}

function element (val, doc, el) {
  el = val && val.el || val.nodeName && val
  return el || doc.createTextNode(val)
}

// My secret shame! 💐
module.exports.c = children
