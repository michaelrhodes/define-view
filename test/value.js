var mkdom = require('mkdom')
var assert = require('dexy/assert')
var define = require('../define')
var value = require('../bind/value')

var input = mkdom('<input>')
var instance = define(input, {
  value: value()
})()

assert('value starts unset',
  instance.toString(),
  '<input value="">',
)

instance.value = 'Some text'
assert('value sets',
  instance.toString(),
  '<input value="Some text">'
)

instance.value = null
assert('value unsets',
  instance.toString(),
  '<input value="">',
)

instance.value = true
assert('value sets boolean on normally',
  instance.toString(),
  '<input value="true">'
)

instance.value = false
assert('value sets boolean off normally',
  instance.toString(),
  '<input value="false">'
)

instance.value = ''
assert('value sets empty string normally',
  instance.toString(),
  '<input value="">'
)
