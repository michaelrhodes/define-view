module.exports = define

function define (template, bindings) {
  var keys = Object.keys(bindings)

  function View (state) {
    if (!(this instanceof View)) {
      return new View(state)
    }

    var view = this

    Object.defineProperty(this, 'el', {
      value: template.cloneNode(true)
    })

    keys.forEach(function (key) {
      var val; Object.defineProperty(view, key, {
        enumerable: true,
        set: function (v) { val !== v && (val = v, this.bind(key)) },
        get: function () { return val }
      })
    })

    this.set(state)
  }

  View.prototype.set = set
  View.prototype.bind = bind
  View.prototype.toString = toString
  View.prototype._ = keys

  keys.forEach(function (key) {
    View.prototype['μ' + key] = bindings[key]
  })

  return View
}

function set (state) {
  if (typeof state !== 'object') return

  var view = this
  var keys = Object.keys(state)
  keys.forEach(function (key) {
    if (~view._.indexOf(key)) {
      view[key] = state[key]
    }
  })
}

function bind (key) {
  if (key) {
    var binding = this['μ' + key]
    if (binding) binding.call(this, this[key])
    return
  }

  var view = this
  this._.forEach(function (key) {
    var binding = view['μ' + key]
    if (binding) binding.call(view, view[key])
  })
}

function toString () {
  return this.el.outerHTML
}
