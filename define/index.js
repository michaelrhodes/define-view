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
    })

    view.set(state)
  }

  View.prototype = {
    set: set,
    get: get,
    toString: toString,
    handleEvent: handleEvent
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
    view[key] = state && ~view.$$.indexOf(key) ?
      state[key] :
      null
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

function $$ (proto, bindings) {
  proto.$$ = Object.keys(bindings).filter(function (key) {
    var b = bindings[key]

    // Allow views to listen to themselves
    if (b.type === 'listener' && b.listener) {
      proto['$$v' + b.key] = b.listener
    }

    // Assign render function
    return proto['$$' + key] = (
      typeof b === 'function' ? b :
      Function.apply(null, ['value'].concat(b.args, b.body))
    )
  })
}
