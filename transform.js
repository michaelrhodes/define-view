module.exports = transform

function transform (view, transformers) {
  Object.keys(transformers).forEach(function (key) {
    var transform = transformers[key]
    var render = view.prototype['$$' + key]
    if (render) view.prototype['$$' + key] = function (val) {
      render.call(this, val == null ? val : transform(val))
    }
  })
}
