module.exports = combine

function combine (ops) {
  var functions = []
  var renderers = []
  var renderer

  ops.forEach(function (o) {
    if (typeof o === 'function') functions.push(o)
    if (typeof o === 'object') renderers.push(o)
  })

  if (renderers.length) renderer = Function
    .apply(null, ['$$val', renderers.map(r => r.b).join(';')])

  return !functions.length ? renderer : function (value) {
    var i = 0, l = functions.length
    for (; i < l; i++) functions[i].call(this, value)
    if (renderer) renderer.call(this, value)
  }
}
