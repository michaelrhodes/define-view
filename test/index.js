var assert = require('dexy/assert')
var view = require('../')

assert('define exists', view.hasOwnProperty('define'))
assert('refine exists', view.hasOwnProperty('refine'))
assert('pool exists', view.hasOwnProperty('pool'))
assert('bind exists', view.hasOwnProperty('bind'))
assert('define is function', typeof view.define, 'function')
assert('refine is function', typeof view.refine, 'function')
assert('pool is function', typeof view.pool, 'function')
assert('bind is an object', typeof view.bind, 'object')

require('./define')
require('./integration')
