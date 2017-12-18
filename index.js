var mkdom = require('mkdom')
var def = Object.defineProperty
var obj = Object.create
var keys = Object.keys
var has = {}.hasOwnProperty
var str = {}.toString
var input = /(input|select)/i
var checkable = /(checkbox|radio)/i
var el = /HTML.+Element/i

module.exports = view

function view (template, selectors) {
  if (template && selectors) return function (prefill) {
    var dom = type(template) === 'element' ?
      template.cloneNode(true) :
      mkdom(template + '')

    var cache = obj(null)
    var data = obj(null, {
      el: { value: dom },
      bind: { value: bind },
      toString: { value: toString }
    })

    var props = keys(selectors)
    var i = 0, l = props.length, prop
    while (i < l && (prop = props[i++]))
      watch(prop)

    if (typeof prefill == 'object')
      mutate(data, prefill)

    return data

    function toString () {
      return bind(), dom.outerHTML
    }

    function bind () {
      if (!selectors) return

      var names = keys(data)
      var i = 0, l = names.length
      var name, datum, sel, el, t

      while (i < l && (name = names[i++])) {
        if (cache[name] === (datum = data[name])) continue
        sel = selectors[name], cache[name] = datum

        if (typeof sel == 'function') {
          sel.call(dom, datum)
          continue
        }

        if (sel == null || datum == null) continue
        if (!(el = dom.querySelector(sel))) continue
        if ((t = type(datum)) == 'object' || t == 'element') {
          el.innerHTML = ''
          el.appendChild(t == 'object' ? datum.el : datum)
          continue
        }

        var prop = input.test(el.nodeName) ?
          checkable.test(el.type) ?
            'checked' : 'value' :
            'textContent'

        el[prop] = datum
      }
    }

    function watch (prop, val) {
      def(data, prop, {
        get: function() { return val },
        set: function (x) { val = x, bind() },
        enumerable: true
      })
    }
  }
}

function type (val) {
  var c = val.constructor
  var t = (c && c.name) || str.call(val).slice(8, -1)
  return el.test(t) ? 'element' : t.toLowerCase()
}

function mutate (a, b) {
  for (var k in b)
    if (has.call(b, k))
      a[k] = b[k]
}
