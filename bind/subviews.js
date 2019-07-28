module.exports = subview

function subview (selector, view, opts) {
  if (typeof selector !== 'string') {
    opts = view
    view = selector
    selector = null
  }

  return function (value) {
    var el = selector ?
      this.get(selector, opts && opts.nocache) :
      this.el

    var transform = opts && opts.transform || opts

    var val = typeof transform === 'function' ?
      value != null && transform(value) :
      value

    if (val != null) {
      var cache = el.$$sbvcache = el.$$sbvcache || []
      var values = [].concat(val)

      // Create additional views
      var existing = cache.length
      var needed = Math.max(0, values.length - existing)
      while (needed--) cache.push(view())

      // Batch DOM mutations
      var add = el.ownerDocument.createDocumentFragment()
      var remove = []

      cache.forEach(function (view, i) {
        var state = values[i]

        if (!state && view.el.parentNode) {
          return remove.push(view)
        }

        view.set(state)

        if (!view.el.parentNode) {
          add.appendChild(view.el)
        }
      })

      remove.forEach(function (view) {
        view.el.parentNode.removeChild(view.el)
      })

      if (!existing) el.innerHTML = ''

      el.appendChild(add)
    }

    // Replace element with an empty text node if value is null/void
    if (!(opts && opts.nohide)) {
      if (!el.$placeholder) el.$placeholder = el
        .ownerDocument
        .createTextNode('')

      if (val != null && el.$placeholder.parentNode) {
        el.$placeholder.parentNode.insertBefore(el, el.$placeholder)
        el.$placeholder.parentNode.removeChild(el.$placeholder)
      }

      else if (val == null && el.parentNode) {
        el.parentNode.insertBefore(el.$placeholder, el)
        el.parentNode.removeChild(el)
      }
    }
  }
}
