var str = {}.toString
var checkable = /(checkbox|radio)/i
var input = /(input|select)/i
var el = /HTML.+Element/i

module.exports = bind

function bind (selector) {
  var el, prop

  return function (val, t) {
    el = el || this.select(selector)
    prop = prop || property(el)
    t = type(val)

    // Allow binding of view instances and DOM elements
    if (t === 'object' || t === 'element') {
      el.innerHTML = ''
      el.appendChild(t === 'object' ? val.el : val)
      return
    }

    el[prop] = val
  }
}

function type (val) {
  var c = val.constructor
  var t = (c && c.name) || str.call(val).slice(8, -1)
  return el.test(t) ? 'element' : t.toLowerCase()
}

function property (el) {
  return input.test(el.nodeName) ?
    checkable.test(el.type) ?
      'checked' : 'value' :
      'textContent'
}
