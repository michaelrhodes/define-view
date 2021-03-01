var mkdom = require('mkdom')
var assert = require('dexy/assert')
var define = require('../define')
var attr = require('../bind/attr')

var solo = mkdom('<span>')
var nest = mkdom('<p><span></p>')
var instance

// Basic solo
instance = define(solo, {
  value: attr('data-value')
})()

instance.value = 'Some text'
assert('attribute is set',
  instance.toString(),
  '<span data-value="Some text"></span>'
)

instance.value = null
assert('attribute is removed',
  instance.toString(),
  '<span></span>',
)

instance.value = true
assert('attribute is boolean on',
  instance.toString(),
  '<span data-value=""></span>'
)

instance.value = false
assert('attribute is boolean off',
  instance.toString(),
  '<span></span>'
)

// Basic nested
instance = define(nest, {
  value: attr('span', 'data-value')
})()

instance.value = 'Some text'
assert('attribute is set',
  instance.toString(),
  '<p><span data-value="Some text"></span></p>'
)

instance.value = null
assert('attribute is removed',
  instance.toString(),
  '<p><span></span></p>'
)

instance.value = true
assert('attribute is boolean on',
  '<p><span data-value=""></span></p>',
  instance.toString()
)

instance.value = false
assert('attribute is boolean off',
  instance.toString(),
  '<p><span></span></p>'
)

// Transform solo
instance = define(solo, {
  value: attr('data-value', val => val.toLowerCase())
})()

instance.value = 'Some text'
assert('attribute is set',
  instance.toString(),
  '<span data-value="some text"></span>'
)

instance.value = null
assert('attribute is removed',
  instance.toString(),
  '<span></span>'
)

// Transform nested
instance = define(nest, {
  value: attr('span', 'data-value', val => val.toLowerCase())
})()

instance.value = 'Some text'
assert('attribute is set',
  instance.toString(),
  '<p><span data-value="some text"></span></p>'
)

instance.value = null
assert('attribute is removed',
  instance.toString(),
  '<p><span></span></p>'
)
