module.exports = combine

function combine (ops) {
  var functions = []
  var renderers = []
  var renderer

  ops.forEach(function (o) {
    if (typeof o === 'function') functions.push(o)
    if (typeof o === 'object') renderers.push(o)
  })

  if (renderers.length) renderer = Function.apply(null, [].concat(
    renderers.reduce(args, ['value']).filter(unique),
    renderers.map(body).join(';\n')
  ))

  return !functions.length ? renderer : function (value) {
    var i = 0, l = functions.length
    for (; i < l; i++) functions[i].call(this, value)
    if (renderer) renderer.call(this, value)
  }
}

function unique (v, i, a) {
  return a.indexOf(v) === i
}

function args (a, b) {
  return a.concat(b.args || [])
}

function body (v) {
  return v.body
}
