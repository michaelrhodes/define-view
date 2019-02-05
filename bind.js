var def = Object.defineProperties

module.exports = bind

function bind (binder) {
  return function () {
    if (!this._bound) def(this, {
      _bound: { value: true },
      _cache: { value: {} },
      create: { value: create },
      fragment: { value: fragment },
      select: { value: select }
    })

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

function select (selector) {
  return this._cache[selector] || (
    this._cache[selector] = this.el
      .querySelector(selector)
  )
}
