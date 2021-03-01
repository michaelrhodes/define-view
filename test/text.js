var mkdom = require('mkdom')
var assert = require('dexy/assert')
var define = require('../define')
var text = require('../bind/text')

var solo = mkdom('<p></p>')
var nest = mkdom('<div><p></p></div>')
var instance

// Basic solo
instance = define(solo, {
  text: text()
})()

instance.text = '<span>'
assert('text is set',
  instance.toString(),
  '<p>&lt;span&gt;</p>'
)

instance.text = ''
assert('text is empty',
  instance.toString(),
  '<p></p>'
)

instance.text = null
assert('text is unset',
  instance.toString(),
  '<p></p>'
)

// Basic nested
instance = define(nest, {
  text: text('p')
})()

instance.text = '<span>'
assert('text is set',
  instance.toString(),
  '<div><p>&lt;span&gt;</p></div>'
)

instance.text = ''
assert('text is empty',
  instance.toString(),
  '<div><p></p></div>'
)

instance.text = null
assert('text is unset',
  instance.toString(),
  '<div></div>'
)

// Transform solo
instance = define(solo, {
  text: text(val => val.toUpperCase())
})()

instance.text = '<span>'
assert('text is set',
  instance.toString(),
  '<p>&lt;SPAN&gt;</p>'
)

instance.text = ''
assert('text is empty',
  instance.toString(),
  '<p></p>'
)

instance.text = null
assert('text is unset',
  instance.toString(),
  '<p></p>'
)

// Transform nested
instance = define(nest, {
  text: text('p', val => val.toUpperCase())
})()

instance.text = '<span>'
assert('text is set',
  instance.toString(),
  '<div><p>&lt;SPAN&gt;</p></div>'
)

instance.text = ''
assert('text is empty',
  instance.toString(),
  '<div><p></p></div>'
)

instance.text = null
assert('text is unset',
  instance.toString(),
  '<div></div>'
)
