var bind = require('./bind')

var str = {}.toString
var checkable = /(checkbox|radio)/i
var input = /(input|select)/i
var el = /HTML.+Element/i

module.exports = select

function select (selector) {
  return bind(function auto (val, append) {
    var el, prop, t
    if (!(el = this.select(selector))) return
    prop = property(el)
    t = type(val)

    if (t === 'array') {
      el.innerHTML = ''
      var i = 0, l = val.length
      while (i < l) auto.call(this, val[i++], true)
      return
    }

    // Allow binding of view instances and DOM elements
    if (t === 'object' || t === 'element') {
      if (!append) el.innerHTML = ''
      el.appendChild(t === 'object' ? val.el : val)
      return
    }

    el[prop] = val
  })
}

function type (val) {
  var c = val && val.constructor
  var t = (c && c.name) || str.call(val).slice(8, -1)
  return el.test(t) ? 'element' : t.toLowerCase()
}

function property (el) {
  return input.test(el.nodeName) ?
    checkable.test(el.type) ?
      'checked' : 'value' :
      'innerHTML'
}
