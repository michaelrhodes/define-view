module.exports = element

function element (el, name, ns) {
  var docu = el.ownerDocument
  return name ? ns ?
    docu.createElementNS(ns, name) :
    docu.createElement(name) :
    docu.createDocumentFragment()
}
