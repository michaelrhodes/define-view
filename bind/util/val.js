module.exports = transform

function transform (opts) {
  var transform = opts && opts.transform || opts

  return typeof transform === 'function' ?
    `$$val != null ? (${transform})($$val) : $$val` :
    `$$val`
}
