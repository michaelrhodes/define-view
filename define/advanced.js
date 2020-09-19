module.exports = define

var def = require('./')
var bind = require('../bind')
var combine = require('../combine')
var parse = require('../parse')

function define (el, etc) {
  etc = etc || {}

  var bindings = {}
  var spec = parse(el)

  Object.keys(spec).forEach(function (key) {
    var render = combine(spec[key].map(function (i) {
      var b = etc['@' + i.type] || bind[i.type]
      if (!b) return

      i.opts.transform = etc[i.opts.transform]
      var selector = i.root ? null : '[' + i.id + ']'

      if (i.wrapped) i.opts.unwrap = true

      return (
        i.type === 'attr' ? b(selector, i.name, i.opts) :
        i.type === 'listener' ? b(selector, i.event, i.opts) :
        i.type === 'subviews' ? b(selector, etc[i.opts.args[0]], i.opts) :
        b(selector, i.opts)
      )
    })
    .filter(function (b) {
      return !!b
    }))

    bindings[key] = function (value) {
      render.call(this, value)

      var p, el, i = 0; while (p = spec[key][i++]) {
        el = (p.root ? this.el : this.get('[' + p.id + ']'))
        el.removeAttribute(p.id)
      }
    }
  })

  return def(el, bindings)
}
