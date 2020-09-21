odule.exports = define

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
        // If the value has changed, pass it to the binding function
        set: function (v) { val !== v && this['$$' + key](val = v) },
        get: () => val,
        enumerable: true
      })
    })

    view.set(state)
  }

  attach(bindings, View.prototype)

  return View
}

function attach (bindings, proto) {
  proto.set = set
  proto.get = get
  proto.toString = toString
  proto.$$ = Object.keys(bindings)
    .filter(key => proto['$$' + key] = bindings[key])
}

function set (state) {
  var view = this

  view.$$.forEach(key => view[key] =
    state && state[key] != null ?
    state[key] : null)

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
