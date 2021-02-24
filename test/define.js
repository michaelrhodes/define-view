var mkdom = require('mkdom')
var assert = require('dexy/assert')
var define = require('../define')

var id = Math.random()
var title = Math.random()

var empty = `<h1></h1>`
var partial = `<h1>${title}</h1>`
var complete = `<h1 id="${id}">${title}</h1>`

var template = mkdom(empty)
var element = mkdom(empty)

var bindings = {
  id: function (title) {
    title ?
    this.el.setAttribute('id', title) :
    this.el.removeAttribute('id')
  },
  title: function (title) {
    this.el.textContent = title
  }
}

test(define(template, bindings))
test(define(bindings), element)

function test (view, el) {
  assert('view is a function', typeof view, 'function')

  var instance = el ? view(el) : view()

  assert('instance is object', typeof instance, 'object')
  assert('instance.el is object', typeof instance.el, 'object')
  assert('instance.el is <h1>', instance.el.nodeName, 'H1')
  assert('instance.get is function', typeof instance.get, 'function')
  assert('instance.set is function', typeof instance.set, 'function')
  assert('instance.toString is function', typeof instance.toString, 'function')

  assert('instance[properties] exist', (
    instance.hasOwnProperty('id') &&
    instance.hasOwnProperty('title')
  ))

  assert('instance[properties] are null by default', (
    instance.id === null &&
    instance.title === null &&
    instance.toString() === empty
  ))

  assert('instance[properties] can be set directly', (
    instance.title = title,
    instance.id === null &&
    instance.title === title &&
    instance.toString() === partial
  ))

  assert('instance[properties] can be unset directly', (
    instance.title = null,
    instance.id === null &&
    instance.title === null &&
    instance.toString() === empty
  ))

  assert('instance[properties] can be set indirectly', (
    instance.set({ id, title }),
    instance.id === id &&
    instance.title === title &&
    instance.toString() === complete
  ))

  assert('instance[properties] can be unset indirectly', (
    instance.set({ title }),
    instance.id === null &&
    instance.title === title &&
    instance.toString() === partial
  ))

  assert('instance can have all state unset', (
    instance.set(null),
    instance.id === null &&
    instance.title === null &&
    instance.toString() === empty
  ))

  assert('instance can be initialised with state', (
    instance = el ?
      view(el, { id, title }) :
      view({ id, title }),
    instance.id === id &&
    instance.title === title &&
    instance.toString() === complete
  ))
}
