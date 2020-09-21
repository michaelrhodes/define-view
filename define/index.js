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
        // If the value has changed, pass it to the binding function
        set: function (v) { val !== v && this['$$' + key](val = v) },
        get: () => val,
        enumerable: true
      })
    })

    view.reset(state)
  }

  attach(bindings, View.prototype)

  return View
}

function attach (bindings, proto) {
  proto.reset = reset
  proto.set = set
  proto.get = get
  proto.toString = toString
  proto.handleEvent = handleEvent
  proto.$$ = Object.keys(bindings).filter(key => {
    var b = bindings[key]

    // Allow bindings to store a key-value pair
    if (b.k) proto['$$v' + b.k] = b.v

    // Attach binding function
    return proto['$$' + key] = b.b ?
      Function.apply(null, ['$$val', b.b]) :
      b
  })
}

function reset (state) {
  this.set(null)
  state && this.set(state)
}

function set (state) {
  var view = this

  var keys = state ?
    Object.keys(state) :
    view.$$

  keys.forEach(key => view[key] =
    state && ~view.$$.indexOf(key) ?
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

function handleEvent (e, selector) {
  if (!(selector = e.currentTarget.$$selector)) return

  var userEventListener = this['$$u' + selector + e.type]
  var viewEventListener = this['$$v' + selector + e.type]
  var stop = e.stopImmediatePropagation

  if (userEventListener) {
    // We only have a single event listener so
    // have to simulate the desired behaviour
    e.stopImmediatePropagation = function () {
      viewEventListener = null
      stop.call(e)
    }

    userEventListener.call(this, e)
  }

  if (viewEventListener) {
    viewEventListener.call(this, e)
  }
}
