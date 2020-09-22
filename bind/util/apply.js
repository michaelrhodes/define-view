module.exports = apply

function apply (transform, val) {
  return transform && val != null ?
    transform(val) :
    val
}
