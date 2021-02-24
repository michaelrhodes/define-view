var assert = require('dexy/assert')
var view = require('../')

assert('define exists', view.hasOwnProperty('define'))
assert('bind exists', view.hasOwnProperty('bind'))
assert('define is function', typeof view.define, 'function')
assert('bind is an object', typeof view.bind, 'object')
