module.exports = children

var visibility = require('./visibility')

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

function element (val, doc) {
  return val && val.el ||
    val.nodeName && val ||
    doc.createTextNode(val)
}
