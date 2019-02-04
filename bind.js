module.exports = bind

function bind (binder) {
  return function () {
    var selected = {}

    this.create = create
    this.fragment = fragment
    this.select = select

    function select (selector) {
      return selected[selector] || (
        selected[selector] = this.el
          .querySelector(selector)
      )
    }

    binder.apply(this, arguments)
  }
}

function create (name, ns) {
  var op = ns ?
    'createElementNS' :
    'createElement'

  return this.el
    .ownerDocument[op](name, ns)
}

function fragment () {
  return this.el
    .ownerDocument
    .createDocumentFragment()
}
