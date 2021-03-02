var mkdom = require('mkdom')
var assert = require('dexy/assert')
var define = require('../define')
var attr = require('../bind/attr')
var text = require('../bind/text')
var many = require('../bind/many')

var span = mkdom('<span>')
var instance

// Basic
instance = define(span, {
  value: many([
    attr('data-value'),
    text()
  ])
})()

assert('many implictly unsets many',
  instance.toString(),
  '<span></span>'
)

instance.value = 'Some text'
assert('many sets many',
  instance.toString(),
  '<span data-value="Some text">Some text</span>'
)

instance.value = null
assert('many explicitly unsets many',
  instance.toString(),
  '<span></span>'
)

// Transformed
instance = define(span, {
  value: many(val => val.toLowerCase(), [
    attr('data-value'),
    text()
  ])
})()

instance.value = 'Some text'
assert('many sets many',
  instance.toString(),
  '<span data-value="some text">some text</span>'
)

// Transformed twice
instance = define(span, {
  value: many(val => val.toLowerCase(), [
    attr('data-value'),
    text(val => val.toUpperCase())
  ])
})()

instance.value = 'Some text'
assert('many sets many',
  instance.toString(),
  '<span data-value="some text">SOME TEXT</span>'
)
