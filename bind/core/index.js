module.exports = core

function core (binding) {
  return function (selector, transform) {
    if (typeof selector !== 'string') {
      transform = selector
      selector = null
    }

    return function (v) {
      var el = selector ? this.get(selector) : this.el
      var val = transform && v != null ? transform(v) : v
      binding.call(this, el, val, el.ownerDocument)
    }
  }
}
