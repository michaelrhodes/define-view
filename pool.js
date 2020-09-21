module.exports = pool

function pool (view, size) {
  var pool = []
  var cursor = 0

  return grow(size = size || 0), bind

  function bind (values) {
    var more = Math.max(0, values.length - size)
    more && grow(size += more)
    return values.map(set)
  }

  function grow (more) {
    while (more--) pool[pool.length] = view()
  }

  function set (value) {
    cursor = Math.min(++cursor, size) % size
    return pool[cursor].set(value)
  }
}
