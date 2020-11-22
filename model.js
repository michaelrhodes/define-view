module.exports = model

function model (view, transforms) {
  return state => state ? (
    Array.isArray(state) ?
      transforms ?
        state.map(transform) :
        state.map(view) :
    transforms ?
      transform(state) :
      view(state)
  ) : null

  function transform (s) {
    var state = {}

    Object.keys(s).forEach(key => {
      state[key] = transforms[key] ?
        transforms[key](s[key]) :
        s[key]
    })

    return view(state)
  }
}
