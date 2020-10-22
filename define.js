module.exports = define

function define (template, bindings) {
  if (!bindings) bindings = template, template = null

  function View (el, state) {
    var view = this

    if (!el || !el.cloneNode) {
      state = el, el = template.cloneNode(true)
    }

    Object.defineProperty(view, 'el', {
      value: el
    })

    view.b$.forEach(function (key) {
      var val; Object.defineProperty(view, key, {
        get: $ => val,
        set: function (v) { val !== v && this['b$' + key](val = v) },
        enumerable: true
      })
    })

    view.set(state)
  }

  attach(bindings, View.prototype)

  return (el, state) => new View(el, state)
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
