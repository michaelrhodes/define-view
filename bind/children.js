module.exports = bind

var select = require('./util/select')
var apply = require('./util/apply')
var hide = require('./util/hide')

function bind (selector, transform) {
  if (typeof selector !== 'string') {
    transform = selector
    selector = null
  }

  return function children (v) {
    var el = select(selector, this)
    var val = apply(transform, v)
    var doc = el.ownerDocument

    if (Array.isArray(val)) {
      child = doc.createDocumentFragment()
      val.forEach(v => child.appendChild(element(v, doc)))
    }
    else {
      child = element(val, doc)
    }

    el.innerHTML = ''
    el.appendChild(child)
    hide(el, val)
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
