module.exports = children

var renderer = require('./util/renderer')

function children (selector, opts) {
  if (typeof selector !== 'string') {
    opts = selector
    selector = null
  }

  return renderer(selector, opts, ['children'], `
    if (val) {
      if (Array.isArray(val)) {
        children = doc.createDocumentFragment()
        val.forEach(function (v) {
          children.appendChild(${node('v')})
        })
      }
      else {
        children = ${node('val')}
      }

      if (children.nodeType === 11) {
        children = children.cloneNode(true)
      }

      el.innerHTML = ''
      el.appendChild(children)
    }
  `)

  function node (val) {
    return `typeof ${val} === 'object' && ${val}.el ? ${val}.el :
      /element/i.test({}.toString.call(${val})) ? ${val} :
      doc.createTextNode(${val})`
  }
}
