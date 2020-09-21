module.exports = el

function el (selector) {
  return typeof selector === 'string' ?
    `this.get('${selector}')` :
    `this.el`
}
