module.exports = pool

function pool (view, size) {
  var pool = []
  var cursor = 0

  fill(size = size || 0)

  return function bind (states, more) {
    if (!states) return drain()
    more = Math.max(0, states.length - size)
    size += more, fill(more)
    return states.map(set)
  }

  function fill (more) {
    while (more--) pool[pool.length] = view()
  }

  function drain () {
    pool = []
    cursor = 0
    size = 0
  }

  function set (state) {
    // Keep cursor within bounds while also
    // preventing it from growing too large
    cursor = Math.min(++cursor, size) % size
    return pool[cursor].set(state)
  }
}
