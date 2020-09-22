module.exports = combine

function combine (ops) {
  return function (v) {
    var i = 0, l = ops.length
    for (; i < l; i++) ops[i].call(this, v)
  }
}
