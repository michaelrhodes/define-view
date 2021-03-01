var mkdom = require('mkdom')
var assert = require('dexy/assert')
var define = require('../define')
var html = require('../bind/html')

var solo = mkdom('<p></p>')
var nest = mkdom('<div><p></p></div>')
var instance

// Basic solo
instance = define(solo, {
  html: html()
})()

instance.html = '<span>'
assert('html is set',
  instance.toString(),
  '<p><span></span></p>'
)

instance.html = ''
assert('html is empty',
  instance.toString(),
  '<p></p>'
)

instance.html = null
assert('html is unset',
  instance.toString(),
  '<p></p>'
)

// Basic nested
instance = define(nest, {
  html: html('p')
})()

instance.html = '<span>'
assert('html is set',
  instance.toString(),
  '<div><p><span></span></p></div>'
)

instance.html = ''
assert('html is empty',
  instance.toString(),
  '<div><p></p></div>'
)

instance.html = null
assert('html is unset',
  instance.toString(),
  '<div></div>'
)

// Transform nest
instance = define(nest, {
  html: html('p', val => '<marquee>' + val + '</marquee>')
})()

instance.html = '<span>'
assert('html is set',
  instance.toString(),
  '<div><p><marquee><span></span></marquee></p></div>'
)

instance.html = ''
assert('html is empty',
  instance.toString(),
  '<div><p><marquee></marquee></p></div>'
)

instance.html = null
assert('html is unset',
  instance.toString(),
  '<div></div>'
)
