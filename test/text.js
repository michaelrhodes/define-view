var mkdom = require('mkdom')
var assert = require('dexy/assert')
var define = require('../define')
var text = require('../bind/text')

var solo = mkdom('<p></p>')
var nest = mkdom('<div><p></p></div>')
var instance

// Basic solo
instance = define(solo, {
  value: text()
})()

instance.value = '<span>'
assert('text is set',
  instance.toString(),
  '<p>&lt;span&gt;</p>'
)

instance.value = ''
assert('text is empty',
  instance.toString(),
  '<p></p>'
)

instance.value = null
assert('text is unset',
  instance.toString(),
  '<p></p>'
)

// Basic nested
instance = define(nest, {
  value: text('p')
})()

instance.value = '<span>'
assert('text is set',
  instance.toString(),
  '<div><p>&lt;span&gt;</p></div>'
)

instance.value = ''
assert('text is empty',
  instance.toString(),
  '<div><p></p></div>'
)

instance.value = null
assert('text is unset',
  instance.toString(),
  '<div></div>'
)

// Transform solo
instance = define(solo, {
  value: text(val => val.toUpperCase())
})()

instance.value = '<span>'
assert('text is set',
  instance.toString(),
  '<p>&lt;SPAN&gt;</p>'
)

instance.value = ''
assert('text is empty',
  instance.toString(),
  '<p></p>'
)

instance.value = null
assert('text is unset',
  instance.toString(),
  '<p></p>'
)

// Transform nested
instance = define(nest, {
  value: text('p', val => val.toUpperCase())
})()

instance.value = '<span>'
assert('text is set',
  instance.toString(),
  '<div><p>&lt;SPAN&gt;</p></div>'
)

instance.value = ''
assert('text is empty',
  instance.toString(),
  '<div><p></p></div>'
)

instance.value = null
assert('text is unset',
  instance.toString(),
  '<div></div>'
)
