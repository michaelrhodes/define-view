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
  if (selectors) return function (prefill) {
    var dom = type(template) === 'element' ?
      template.cloneNode(true) :
      mkdom(template + '')

    var cache = obj(null)
    var data = obj(null, {
      toString: { value: toString },
      toElement: { value: toElement }
    })

    if (typeof prefill === 'object')
      mutate(data, prefill)

    var props = keys(selectors)
    var i = 0, l = props.length, p
    while (i < l && (p = props[i++]))
      redef(p, data[p])

    return data

    function toString () {
      return bind(), dom.outerHTML
    }

    function toElement () {
      return bind(), dom
    }

    function bind () {
      if (!selectors) return

      var names = keys(data)
      var i = 0, l = names.length
      var name, datum, sel, el

      while (i < l && (name = names[i++])) {
        if (!(sel = selectors[name])) continue
        if (cache[name] === (datum = data[name])) return
        cache[name] = datum

        if (typeof sel === 'function') {
          sel.call(dom, datum)
          continue
        }

        if (datum == null) continue
        if (!(el = dom.querySelector(sel))) continue

        if (/(object|element)/.test(type(datum))) {
          el.innerHTML = ''
          typeof datum.toElement === 'function' ?
            el.appendChild(datum.toElement()) :
            el.appendChild(datum)
          continue
        }

        var prop = input.test(el.nodeName) ?
          checkable.test(el.type) ?
            'checked' : 'value' :
            'textContent'

        el[prop] = datum
      }
    }

    function redef (prop, val) {
      def(data, prop, {
        get: function() { return val },
        set: function (x) { val = x, bind() },
        enumerable: true,
        configurable: true
      })
    }
  }
}

function type (val) {
  var type = str.call(val).slice(8, -1)
  type = /HTML.+Element/.test(type) ? 'Element' : type
  return type.toLowerCase()
}
