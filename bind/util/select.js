module.exports = select

function select (selector, view) {
  return selector ?
    view.get(selector) :
    view.el
}
