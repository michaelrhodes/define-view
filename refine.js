module.exports = refine

function refine (view, refinements) {
  Object.keys(refinements).forEach(key => {
    var refine = refinements[key]
    var binding = view.prototype['$$' + key]
    if (binding) view.prototype['$$' + key] = function (val) {
      binding.call(this, val == null ? val : refine(val))
    }
  })
}
