var mkdom = require('mkdom')
var assert = require('dexy/assert')
var define = require('../define')

var id = Math.random()
var title = Math.random()

var empty = `<h1></h1>`
var partial = `<h1>${title}</h1>`
var complete = `<h1 id="${id}">${title}</h1>`

var h1 = define(mkdom(empty), {
  id: function (title) {
    title ?
    this.el.setAttribute('id', title) :
    this.el.removeAttribute('id')
  },
  title: function (title) {
    this.el.textContent = title
  }
})

assert('define returns function', typeof h1, 'function')

var view = h1()
assert('view is object', typeof view, 'object')
assert('view.el is object', typeof view.el, 'object')
assert('view.el is <h1>', view.el.nodeName, 'H1')
assert('view.get is function', typeof view.get, 'function')
assert('view.set is function', typeof view.set, 'function')
assert('view.toString is function', typeof view.toString, 'function')

assert('view[properties] exist', (
  view.hasOwnProperty('id') &&
  view.hasOwnProperty('title')
))

assert('view[properties] are null by default', (
  view.id === null &&
  view.title === null &&
  view.toString() === empty
))

assert('view[properties] can be set directly', (
  view.title = title,
  view.id === null &&
  view.title === title &&
  view.toString() === partial
))

assert('view[properties] can be unset directly', (
  view.title = null,
  view.id === null &&
  view.title === null &&
  view.toString() === empty
))

assert('view[properties] can be set indirectly', (
  view.set({ id, title }),
  view.id === id &&
  view.title === title &&
  view.toString() === complete
))

assert('view[properties] can be unset indirectly', (
  view.set({ title }),
  view.id === null &&
  view.title === title &&
  view.toString() === partial
))

assert('view can be initialised with state', (
  view = h1({ id, title }),
  view.id === id &&
  view.title === title &&
  view.toString() === complete
))

assert('view can have all state unset', (
  view.set(null),
  view.id === null &&
  view.title === null &&
  view.toString() === empty
))
