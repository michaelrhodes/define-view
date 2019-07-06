module.exports = transform

function transform (opts) {
  return !!opts && !!opts.transform ?
    `value != null && (${opts.transform})(value)` : `value`
}
