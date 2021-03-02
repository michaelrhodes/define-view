module.exports = bind

function bind (transform, bindings) {
  if (typeof transform !== 'function') {
    bindings = transform
    transform = null
  }

  return function many (v) {
    var val = transform && v != null ? transform(v) : v
    for (var i = 0; i < bindings.length; i++) {
      bindings[i].call(this, val)
    }
  }
}
