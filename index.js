var def = Object.defineProperty
var obj = Object.create
var keys = Object.keys
var has = {}.hasOwnProperty
var str = {}.toString
var checkable = /(checkbox|radio)/i
var input = /(input|select)/i
var el = /HTML.+Element/i

module.exports = define

function define (base, selectors) {
  return selectors && function view (data) {
    var el = base.cloneNode(true)

    // Note: The defined properties are non-enumerable.
    // If they weren’t, the bind function would treat
    // them as user-defined and potentially inject
    // their values into the DOM --- not ideal!
    var instance = obj(null, {
      el: { value: el },
      bind: { value: bind },
      toString: { value: html }
    })

    // Add user-defined selector properties to the
    // instance, with each value’s setter calling
    // the bind function after the assignment
    observe(instance, selectors, bind)

    // Allow instance to be initialised with data
    if (typeof data == 'object') mutate(instance, data)

    return instance

    function bind (key) {
      if (!key) return each(instance, bind)

      var selector = selectors[key]
      var val = instance[key]
      var child, t, prop

      // If the selector is a function, _it_ can determine
      // whether a null/undefined value should be ignored,
      // or if it should trigger a DOM mutation
      if (typeof selector == 'function')
        return selector.call(el, val)

      // But otherwise, just ignore those values. Also
      // ignore random properties that might be added
      // to the instance after the fact
      if (selector == null || val == null) return
      if (!(child = el.querySelector(selector))) return

      // Values may be DOM elements or other view instances
      if ((t = type(val)) == 'object' || t == 'element') {
        child.innerHTML = ''
        child.appendChild(t == 'object' ? val.el : val)
        return
      }

      // But the default behaviour is just to assign
      // to value to the child element, in the most
      // basic way possible
      prop = input.test(child.nodeName) ?
        checkable.test(child.type) ?
          'checked' : 'value' :
          'textContent'

      child[prop] = val
    }

    function html () {
      return el.outerHTML
    }
  }
}

function type (val) {
  var c = val.constructor
  var t = (c && c.name) || str.call(val).slice(8, -1)
  return el.test(t) ? 'element' : t.toLowerCase()
}

function observe (instance, selectors, bind) {
  each(selectors, function (key) {
    var val; def(instance, key, {
      set: function (x) { val = x, bind(key) },
      get: function () { return val },
      enumerable: true
    })
  })
}

function mutate (instance, data) {
  each(data, function (key) {
    instance[key] = data[key]
  })
}

function each (obj, fn) {
  var i = 0, prop, props = keys(obj)
  while (prop = props[i++]) fn(prop)
}
