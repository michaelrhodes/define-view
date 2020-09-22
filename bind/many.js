module.exports = many

function many (bindings) {
  return function (v) {
    for (var i = 0; i < bindings.length; i++) {
      bindings[i].call(this, v)
    }
  }
}
