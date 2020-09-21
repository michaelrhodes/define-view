module.exports = val

function val (transform) {
  return typeof transform === 'function' ?
    `$$val != null ? (${transform})($$val) : $$val` :
    `$$val`
}
