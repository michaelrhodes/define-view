module.exports = query

function query (el, selector, fresh) {
  return el['μs' + selector] =
    (!fresh && el['μs' + selector]) ||
    el.querySelector(selector)
}
