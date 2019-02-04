var obj = Object.create
var def = Object.defineProperty
var keys = Object.keys

module.exports = define

function define (template, bindings) {
  return function view (state) {
    var el = template.cloneNode(true)

    // Note: These properties are non-enumerable,
    // so the bind function never touches them
    var instance = obj(null, {
      el: { value: el },
      set: { value: set },
      bind: { value: bind },
      toString: { value: toString }
    })

    // Add binding properties to the instance,
    // with each value’s setter calling the
    // bind function on assignment
    each(bindings, function (key) {
      var val; def(instance, key, {
        enumerable: true,
        set: function (v) { val !== v && (val = v, bind(key)) },
        get: function () { return val }
      })
    })

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

    function toString () {
      return el.outerHTML
    }
  }
}

function each (obj, fn) {
  var i = 0, prop, props = keys(obj)
  while (prop = props[i++]) fn(prop)
}
