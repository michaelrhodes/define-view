var mkdom = require('mkdom')
var assert = require('dexy/assert')
var define = require('../define')
var visibility = require('../bind/visibility')

var solo = mkdom('<span>')
var nest = mkdom('<p><span></p>')
var instance

// Solo
instance = define(solo, {
  value: visibility()
})()

instance.value = !null
assert('element is visible',
  instance.toString(),
  '<span></span>'
)

instance.value = null
assert('element is still visible',
  instance.toString(),
  '<span></span>'
)

// Nested
instance = define(nest, {
  value: visibility('span')
})()

instance.value = !null
assert('element is visible',
  instance.toString(),
  '<p><span></span></p>'
)

instance.value = null
assert('element is still visible',
  instance.toString(),
  '<p></p>'
)
