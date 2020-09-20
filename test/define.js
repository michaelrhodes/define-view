var mkdom = require('mkdom')
var assert = require('dexy/assert')
var define = require('../define')

var value = Math.random()
var template = `<main></main>`
var instance = `<main>${value}</main>`

var main = define(mkdom(template), {
  property: function (value) {
    this.el.textContent = value
  }
})

assert('define returns function', typeof main, 'function')

var view = main()
assert('view is object', typeof view, 'object')
assert('view.el is object', typeof view.el, 'object')
assert('view.el is <main>', view.el.nodeName, 'MAIN')
assert('view.get is function', typeof view.get, 'function')
assert('view.set is function', typeof view.set, 'function')
assert('view.toString is function', typeof view.toString, 'function')

assert('view[property] exists', view.hasOwnProperty('property'))
assert('view[property] is null by default', (
  view.property === null &&
  view.toString() === template
))

assert('view[property] can be set directly', (
  view.property = value,
  view.property === value&&
  view.toString() === instance
))

assert('view[property] can be unset directly', (
  view.property = null,
  view.property === null &&
  view.toString() === template
))

assert('view[property] can be set indirectly', (
  view.set({ property: value }),
  view.property === value &&
  view.toString() === instance
))

assert('view[property] can be unset indirectly', (
  view.set({ property: null }),
  view.property === null &&
  view.toString() === template
))

assert('view can be initialised with state', (
  view = main({ property: value }),
  view.property === value &&
  view.toString() === instance
))

assert('view can have all state unset', (
  view.set(null),
  view.property === null &&
  view.toString() === template
))
