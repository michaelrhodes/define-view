var mkdom = require('mkdom')
var assert = require('dexy/assert')
var define = require('../define')
var slot = require('../bind/slot')

var solo = mkdom('<embed>')
var nest = mkdom('<label><embed> <input></label>')
var view, instance

// Solo
view = define(solo, {
  value: slot()
})

instance = view()
assert('slot cannot unset root node',
  instance.toString(),
  '<embed>'
)

instance.value = 'Some text'
assert('slot cannot set root node',
  instance.toString(),
  '<embed>'
)

// Nest
view = define(nest, {
  value: slot('embed')
})

instance = view()
assert('slot unsets',
  instance.toString(),
  '<label> <input></label>'
)

instance.value = 'Some text'
assert('slot sets text',
  instance.toString(),
  '<label>Some text <input></label>'
)

instance.value = '<label>'
assert('slot sets text only',
  instance.toString(),
  '<label>&lt;label&gt; <input></label>'
)

instance.value = nest.cloneNode(true)
assert('slot sets element',
  instance.toString(),
  '<label><label><embed> <input></label> <input></label>'
)

instance.value = view({
  value: 'Some text'
})
assert('slot sets view',
  instance.toString(),
  '<label><label>Some text <input></label> <input></label>'
)
