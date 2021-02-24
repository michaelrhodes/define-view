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
 `<span data-text="Some text"></span>`,
  instance.toString()
)

instance.text = null

assert('attribute is removed',
 `<span></span>`,
  instance.toString()
)

// Basic nested
instance = define(nest, {
  text: attr('span', 'data-text')
})()

instance.text = text

assert('attribute is set',
 `<p><span data-text="Some text"></span></p>`,
  instance.toString()
)

instance.text = null

assert('attribute is removed',
 `<p><span></span></p>`,
  instance.toString()
)

// Transform solo
instance = define(solo, {
  text: attr('data-text', val => val.toLowerCase())
})()

instance.text = text

assert('attribute is set',
 `<span data-text="some text"></span>`,
  instance.toString()
)

instance.text = null

assert('attribute is removed',
 `<span></span>`,
  instance.toString()
)

// Transform nested
instance = define(nest, {
  text: attr('span', 'data-text', val => val.toLowerCase())
})()

instance.text = text

assert('attribute is set',
 `<p><span data-text="some text"></span></p>`,
  instance.toString()
)

instance.text = null

assert('attribute is removed',
 `<p><span></span></p>`,
  instance.toString()
)
