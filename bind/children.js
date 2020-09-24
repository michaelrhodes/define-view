module.exports = bind

var autohide = require('./core/autohide')

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
  autohide(el, val)

  if (Array.isArray(val)) {
    var child = doc.createDocumentFragment()
    val.forEach(v => child.appendChild(element(v, doc)))
    el.appendChild(child)
  }
  else if (val) {
    el.appendChild(element(val, doc))
  }
}

function element (val, doc, ndx) {
  val = val && val.el || val
  ndx = type(val).indexOf('Element')
  return ndx < 0 ? doc.createTextNode(val) : val
}

function type (val) {
  return val &&
    val.constructor &&
    val.constructor.name ||
    {}.toString.call(val)
}

// My secret shame! 💐
module.exports.c = children
