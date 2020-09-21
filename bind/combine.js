module.exports = combine

function combine (ops) {
  var functions = []
  var bindings = []
  var binding

  ops.forEach(function (o) {
    if (typeof o === 'function') functions.push(o)
    if (typeof o === 'object') bindings.push(o)
  })

  if (bindings.length) binding = Function
    .apply(null, ['$$val', bindings.map(r => r.b).join(';')])

  return !functions.length ? binding : function (value) {
    var i = 0, l = functions.length
    for (; i < l; i++) functions[i].call(this, value)
    if (binding) binding.call(this, value)
  }
}
