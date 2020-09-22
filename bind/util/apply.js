module.exports = apply

function apply (transform, v) {
  return transform && v != null ? transform(v) : v
}
