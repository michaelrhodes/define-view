var mkdom = require('mkdom')
var assert = require('dexy/assert')
var define = require('../define')
var attr = require('../bind/attr')

var text = 'Some text'
var solo = mkdom(`<span>`)
var nest = mkdom(`<p><span></p>`)
var instance

// Basic solo
instance = define(solo, {
  text: attr('data-text')
})()

instance.text = text
assert('attribute is set',
  instance.toString(),
 `<span data-text="Some text"></span>`
)

instance.text = null
assert('attribute is removed',
  instance.toString(),
 `<span></span>`,
)

instance.text = true
assert('attribute is boolean on',
  instance.toString(),
 `<span data-text=""></span>`
)

instance.text = false
assert('attribute is boolean off',
  instance.toString(),
 `<span></span>`
)

// Basic nested
instance = define(nest, {
  text: attr('span', 'data-text')
})()

instance.text = text
assert('attribute is set',
  instance.toString(),
 `<p><span data-text="Some text"></span></p>`
)

instance.text = null
assert('attribute is removed',
  instance.toString(),
 `<p><span></span></p>`
)

instance.text = true
assert('attribute is boolean on',
 `<p><span data-text=""></span></p>`,
  instance.toString()
)

instance.text = false
assert('attribute is boolean off',
  instance.toString(),
 `<p><span></span></p>`
)

// Transform solo
instance = define(solo, {
  text: attr('data-text', val => val.toLowerCase())
})()

instance.text = text
assert('attribute is set',
  instance.toString(),
 `<span data-text="some text"></span>`
)

instance.text = null
assert('attribute is removed',
  instance.toString(),
 `<span></span>`
)

// Transform nested
instance = define(nest, {
  text: attr('span', 'data-text', val => val.toLowerCase())
})()

instance.text = text
assert('attribute is set',
  instance.toString(),
 `<p><span data-text="some text"></span></p>`
)

instance.text = null
assert('attribute is removed',
  instance.toString(),
 `<p><span></span></p>`
)
