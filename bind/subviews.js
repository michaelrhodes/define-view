module.exports = bind

var el = require('./util/el')
var val = require('./util/val')
var hide = require('./util/hide')

function bind (selector, view, opts) {
  if (typeof selector !== 'string') {
    opts = view
    view = selector
    selector = null
  }

  var key = '$$sv' + selector

  return {
    k: key,
    v: view,
    b: ``+
    `!${subviews}(`+
      `${el(selector, opts)},`+
      `${val(opts)},`+
      `this['$$v${key}']`+
    `);`+
    `!${hide(opts)}(`+
      `${el(selector, opts)},`+
      `${val(opts)}`+
    `)`
  }
}

function subviews (el, val, view) {
  if (val == null) return

  var cache = el.$$svc = el.$$svc || []
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
