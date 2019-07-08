module.exports = define

function define (template, bindings) {
  function View (state) {
    var view = this

    if (!(view instanceof View)) {
      return new View(state)
    }

    Object.defineProperty(view, 'el', {
      value: template.cloneNode(true)
    })

    view.$$.forEach(function (key) {
      var val; Object.defineProperty(view, key, {
        // If the value has changed, pass it to the render function
        set: function (v) { val !== v && this['$$' + key](val = v) },
        get: function () { return val },
        enumerable: true
      })

      // Default to empty state
      view[key] = null
    })

    view.set(state)
  }

  View.prototype = {
    set: set,
    get: get,
    toString: toString
  }

  $$(View.prototype, bindings)

  return View
}

function set (state) {
  var view = this

  var keys = state ?
    Object.keys(state) :
    view.$$

  keys.forEach(function (key) {
    if (!state) view[key] = null
    else if (~view.$$.indexOf(key)) {
      view[key] = state[key]
    }
  })

  return view
}

function get (selector, fresh) {
  return this.el['$$' + selector] =
    (!fresh && this.el['$$' + selector]) ||
    this.el.querySelector(selector)
}

function toString () {
  return this.el.outerHTML
}

function $$ (proto, bindings) {
  proto.$$ = Object.keys(bindings).filter(function (key) {
    var b = bindings[key]

    // Assign render function
    return typeof b === 'function' && (
      proto['$$' + key] = b
    )
  })
}
