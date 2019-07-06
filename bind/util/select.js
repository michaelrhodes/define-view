module.exports = select

function select (selector, opts) {
  return typeof selector === 'string' ?
    `this.get('${selector}'${nocache(opts)})` :
    `this.el`

  function nocache (opts) {
    return !!opts && !!opts.nocache ? `, true` : ``
  }
}
