module.exports = bind

function bind (selector, name, opts) {
  if (typeof name !== 'string') {
    opts = name
    name = selector
    selector = null
  }

  return function listener (v) {
    var el = selector ? this.get(selector) : this.el

   ;(this['l$' + (el.s$ = '' + selector) + name] = v) ?
      el.addEventListener(name, this, opts) :
      el.removeEventListener(name, this)
  }
}
