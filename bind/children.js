module.exports = bind

var el = require('./util/el')
var val = require('./util/val')
var hide = require('./util/hide')

function bind (selector, opts) {
  if (typeof selector !== 'string') {
    opts = selector
    selector = null
  }

  return {
    b: ``+
    `!${children}(`+
      `${el(selector, opts)},`+
      `${val(opts)}`+
    `);`+
    `!${hide(opts)}(`+
      `${el(selector, opts)},`+
      `${val(opts)}`+
    `)`
  }
}

function children (el, val, child) {
  if (!val) return

  var doc = el.ownerDocument

  if (Array.isArray(val)) {
    child = doc.createDocumentFragment()
    val.forEach(function (v) {
      child.appendChild(element(v, doc))
    })
  }
  else {
    child = element(val, doc)
  }

  if (child.nodeType === 11) {
    child = child.cloneNode(true)
  }

  el.innerHTML = ''
  el.appendChild(child)

  function element (val, doc, ndx) {
    val = val && val.el || val
    ndx = {}.toString.call(val).indexOf('Element')
    return !~ndx ? doc.createTextNode(val) : val
  }
}
