var obj = Object.create
var def = Object.defineProperty
var keys = Object.keys

module.exports = define

function define (template, bindings) {
  return function view (state) {
    var el = template.cloneNode(true)

    // Allow query selector caching
    var selected = {}

    // Note: These properties are non-enumerable.
    // If they weren’t the bind function would treat
    // them as user-defined and potentially inject
    // their values into the DOM -- not ideal!
    var instance = obj(null, {
      el: { value: el },
      set: { value: set },
      bind: { value: bind },
      select: { value: select },
      toString: { value: toString }
    })

    // Add binding properties to the instance,
    // with each value’s setter calling the
    // bind function on assignment
    observe(instance, bindings, bind)

    // Allow instance to be initialised with state
    if (typeof state === 'object') set(state)

    return instance

    function set (state) {
      each(state, function (key) {
        instance[key] = state[key]
      })
    }

    function bind (key) {
      if (!key) return each(instance, bind)
      var binder = bindings[key]
      var value = instance[key]
      if (binder) binder.call(instance, value)
    }

    function select (selector) {
      return selected[selector] || (
        selected[selector] = el
          .querySelector(selector)
      )
    }

    function toString () {
      return el.outerHTML
    }
  }
}

function observe (instance, bindings, bind) {
  each(bindings, function (key) {
    var val; def(instance, key, {
      enumerable: true,
      set: function (v) { val !== v && (val = v, bind(key)) },
      get: function () { return val }
    })
  })
}

function each (obj, fn) {
  var i = 0, prop, props = keys(obj)
  while (prop = props[i++]) fn(prop)
}
