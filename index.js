var mkdom = require('mkdom')
var mutate = require('xtend/mutable')
var def = Object.defineProperty
var obj = Object.create
var keys = Object.keys
var str = {}.toString
var input = /(input|select)/i
var checkable = /(checkbox|radio)/i

module.exports = view

function view (template, selectors) {
  return function (prefill) {
    var dom = type(template) === 'element' ?
      template.cloneNode(true) :
      mkdom(template + '')

    var data = obj(null, {
      toString: { value: toString },
      toElement: { value: toElement }
    })

    if (typeof prefill === 'object')
      mutate(data, prefill)

    return data

    function toString () {
      return bind(), dom.outerHTML
    }

    function toElement () {
      return bind(), dom
    }

    function bind () {
      var names = keys(data)
      var datum, sel, el

      if (selectors) names.forEach(function (name) {
        if (!(sel = selectors[name])) return

        datum = data[name]

        if (typeof sel === 'function')
          return sel.call(dom, datum)

        if (datum == null) return
        if (!(el = dom.querySelector(sel))) return

        if (/(object|element)/.test(type(datum))) {
          el.innerHTML = ''
          return typeof datum.toElement === 'function' ?
            el.appendChild(datum.toElement()) :
            el.appendChild(datum)
        }

        var prop = input.test(el.nodeName) ?
          checkable.test(el.type) ?
            'checked' : 'value' :
            'textContent'

        el[prop] = datum
      })
    }
  }
}

function type (val) {
  var type = str.call(val).slice(8, -1)
  type = /HTML.+Element/.test(type) ? 'Element' : type
  return type.toLowerCase()
}
