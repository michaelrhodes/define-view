var query = require('./query')

var str = {}.toString
var checkable = /(checkbox|radio)/i
var input = /(input|textarea)/i
var el = /HTML.+Element/i

module.exports = autobind

function autobind (selector, prop) {
  var attr = prop && prop.match(/^\[([^\]]+)\]$/)

  return function auto (val, append, el) {
    if (!selector) el = this.el
    else if (!(el = query(this.el, selector))) return

    var t = type(val)

    if (t === 'array') {
      el.innerHTML = ''
      var i = 0, l = val.length
      while (i < l) auto.call(this, val[i++], true)
      return
    }

    // Allow binding of μView instances and DOM elements
    if (t === 'object' || t === 'element') {
      if (!append) el.innerHTML = ''
      el.appendChild(val.el || val)
      return
    }

    if (prop) return attr ?
      el[val ? 'setAttribute' : 'removeAttribute'](attr[1], val) :
      el[prop] = val

    el[property(el)] = val
  }
}

function type (val) {
  var t = str.call(val).slice(8, -1)
  return el.test(t) ? 'element' : t.toLowerCase()
}

function property (el) {
  return input.test(el.nodeName) ?
    checkable.test(el.type) ?
      'checked' : 'value' :
      'textContent'
}
