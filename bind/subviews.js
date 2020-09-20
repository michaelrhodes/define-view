module.exports = subview

var transform = require('./util/transform')
var select = require('./util/select')
var hide = require('./util/hide')

function subview (selector, view, opts) {
  if (typeof selector !== 'string') {
    opts = view
    view = selector
    selector = null
  }

  var key = '$$sbv' + selector

  return {
    key: key,
    val: view,
    args: ['el','val','doc','view'],
    body: `
      el = ${select(selector, opts)}
      val = ${transform(opts)}
      doc = el.ownerDocument
      view = this['$$v${key}']

      if (val != null) {
        var cache = el.$$sbvcache = el.$$sbvcache || []
        var values = [].concat(val)

        // Create additional views
        var existing = cache.length
        var needed = Math.max(0, values.length - existing)
        while (needed--) cache.push(view())

        // Batch DOM mutations
        var add = doc.createDocumentFragment()
        var remove = []

        cache.forEach(function (view, i) {
          var state = values[i]

          if (!state) return (
            view.el.parentNode &&
            remove.push(view)
          )

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

      ${hide(opts)}
    `
  }
}
