var assert = require('dexy/assert')
var index = require('../')

assert('define exists', index.hasOwnProperty('define'))
assert('bind exists', index.hasOwnProperty('bind'))
assert('define is function', typeof index.define, 'function')
assert('bind is an object', typeof index.bind, 'object')

require('./define')
require('./integration')
