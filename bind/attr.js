module.exports = bind

function bind (selector, name, transform) {
  if (typeof name !== 'string') {
    transform = name
    name = selector
    selector = null
  }

  return function attr (v) {
    var el = selector ? this.get(selector) : this.el
    var val = transform && v != null ? transform(v) : v
    val ?
    el.setAttribute(name, val === true ? '' : val) :
    el.removeAttribute(name)
  }
}
