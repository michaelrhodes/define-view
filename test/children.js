var mkdom = require('mkdom')
var assert = require('dexy/assert')
var define = require('../define')
var children = require('../bind/children')

var span = mkdom('<span>')
var view = define(span, {
  value: children()
})

var instance = view()
assert('children unsets',
  instance.toString(),
  '<span></span>'
)

instance.value = 'Some text'
assert('children sets text',
  instance.toString(),
  '<span>Some text</span>'
)

instance.value = '<span>'
assert('children sets text only',
  instance.toString(),
  '<span>&lt;span&gt;</span>'
)

instance.value = span.cloneNode(true)
assert('children sets element',
  instance.toString(),
  '<span><span></span></span>'
)

instance.value = view({
  value: 'Some text'
})
assert('children sets view',
  instance.toString(),
  '<span><span>Some text</span></span>'
)
