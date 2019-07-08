var select = require('./util/select')
var transform = require('./util/transform')
var hide = require('./util/hide')

module.exports = children

function children (selector, opts) {
  if (typeof selector !== 'string') {
    opts = selector
    selector = null
  }

  return {
    type: 'renderer',
    args: ['el', 'val', 'doc', 'children'],
    body: `
      el = ${select(selector, opts)}

      if (val = ${transform(opts)}) {
        doc = el.ownerDocument

        if (Array.isArray(val)) {
          children = doc.createDocumentFragment()
          val.forEach(function (v) {
            children.appendChild(${node('v')})
          })
        }
        else {
          children = ${node('val')}
        }

        // Make sure document fragments can be
        // appended to the element
        if (children.nodeType === 11) {
          children = children.cloneNode(true)
        }

        el.innerHTML = ''
        el.appendChild(children)
      }

      ${hide(opts)}
    `
  }

  function node (val) {
    return `typeof ${val} === 'object' && ${val}.el ? ${val}.el :
      /element/i.test({}.toString.call(${val})) ? ${val} :
      doc.createTextNode(${val})`
  }
}
