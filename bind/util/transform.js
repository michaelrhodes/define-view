module.exports = transform

function transform (opts) {
  var transform = opts && opts.transform || opts

  return typeof transform === 'function' ?
    `value != null ? (${transform})(value) : value` :
    `value`
}
