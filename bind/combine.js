module.exports = combine

function combine (ops) {
  return function (v) {
    for (var i = 0; i < ops.length; i++) {
      ops[i].call(this, v)
    }
  }
}
