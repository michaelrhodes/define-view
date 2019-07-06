module.exports = all

function all (ops) {
  return {
    type: 'renderer',
    args: ops
      .reduce(function (a, b) { return a.concat(b.args || []) }, [])
      .filter(function (v, i, a) { return a.indexOf(v) === i }),
    body: ops
      .map(function (b) { return b.body })
      .join(';\n')
  }
}
