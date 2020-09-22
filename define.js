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

    view.b$.forEach(function (key) {
      var val; Object.defineProperty(view, key, {
        get: () => val,
        set: function (v) { val !== v && this['b$' + key](val = v) },
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
  proto.handleEvent = handleEvent
  proto.toString = toString
  proto.b$ = Object
    .keys(bindings)
    .filter(key => proto['b$' + key] = bindings[key])
}

function set (state) {
  var view = this

  view.b$.forEach(key => view[key] =
    state && state[key] != null ?
    state[key] : null)

  return view
}

function get (selector, fresh) {
  return this.el['e$' + selector] =
   (!fresh && this.el['e$' + selector]) ||
    this.el.querySelector(selector)
}

function handleEvent (e, selector, listener) {
  if (selector = e.currentTarget.s$) {
    listener = this['l$' + selector + e.type]
    listener && listener.call(this, e)
  }
}

function toString () {
  return this.el.outerHTML
}
