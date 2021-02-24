var mkdom = require('mkdom')
var assert = require('dexy/assert')
var define = require('../define')
var bind = require('../bind')

var template = mkdom(`
  <label>
    <span></span>
    <input>
  </label>
`)

var bindings = {
  name: bind.many([
    bind.text('span'),
    bind.attr('input', 'name', name => name.toLowerCase())
  ]),
  type: bind.attr('input', 'type'),
  value: bind.attr('input', 'value'),
  checked: bind.attr('input', 'checked')
}

var field = define(template, bindings)()

// Module-defined properties
assert('field has el', typeof field.el, 'object')
assert('field has get', typeof field.get, 'function')
assert('field has set', typeof field.set, 'function')
assert('field has toString', typeof field.toString, 'function')
assert('field has handleEvent', typeof field.handleEvent, 'function')

// User-defined properties
assert('field has name', field.hasOwnProperty('name'))
assert('field has type', field.hasOwnProperty('type'))
assert('field has value', field.hasOwnProperty('value'))
assert('field has checked', field.hasOwnProperty('checked'))

var label = field.el
var span = field.get('span')
var input = field.get('input')

assert('label is <label>', label.nodeName, 'LABEL')
assert('span is <span>', span.nodeName, 'SPAN')
assert('input is <input>', input.nodeName, 'INPUT')

field.name = 'Subscribe'
field.type = 'checkbox'
field.checked = true

assert('input has name', input.hasAttribute('name'))
assert('input has type', input.hasAttribute('type'))
assert('input is checked', input.hasAttribute('checked'))

assert('span.text is name', span.textContent, field.name)
assert('input.name is lower(name)', input.name, field.name.toLowerCase())
assert('input.type is type', input.type, field.type)
assert('input.checked is checked', input.checked, field.checked)

field.set({
  name: 'Name',
  type: 'text',
  value: 'Change me',
  checked: false
})

assert('input has name', input.hasAttribute('name'))
assert('input has type', input.hasAttribute('type'))
assert('input has value', input.hasAttribute('value'))
assert('input not checked', !input.hasAttribute('checked'))

assert('span.text is name', span.textContent, field.name)
assert('input.name is lower(name)', input.name, field.name.toLowerCase())
assert('input.type is type', input.type, field.type)
assert('input.value is value', input.value, field.value)
assert('input.checked is checked', input.checked, field.checked)
