module.exports = queryAll

function queryAll (el, selector, fresh) {
  return el['μsa' + selector] =
    (!fresh && el['μsa' + selector]) ||
    el.querySelectorAll(selector)
}
