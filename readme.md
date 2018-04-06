# view

## install
```sh
pnpm install michaelrhodes/view#4.0.0
```

## use
```js
var mkdom = require('mkdom')
var view = require('view')

var form = (function () {
  var template = mkdom([
    '<form>',
      '<input type="hidden" name="csrf">',
      '<fieldset></fieldset>',
      '<button></button>',
    '</form>'
  ].join(''))

  return view(template, {
    csrf: '[name="csrf"]',
    button: 'button',
    fieldset: function (fields) {
      var form = this
      var fieldset = form.querySelector('fieldset')
      var fragment = form.ownerDocument
        .createDocumentFragment()

      fields.forEach(function (field) {
        fragment.appendChild(field.el)
      })

      fieldset.innerHTML = ''
      fieldset.appendChild(fragment)
    }
  })
})()

var field = (function () {
  var template = mkdom([
    '<label>',
      '<span></span>',
      '<input>',
    '</label>'
  ].join(''))

  return view(template, {
    value: 'input',
    name: function (val) {
      var input = this.querySelector('input')
      var span = this.querySelector('span')

      input.name = val.toLowerCase()
      span.textContent = val
    },
    type: function (val) {
      var input = this.querySelector('input')
      input.type = val
    }
  })
})()

var signup = form({
  csrf: 'abc07acb986acb76ef2fb8134da11',
  button: 'Signup',
  fieldset: [
    field({ name: 'Name' }),
    field({ name: 'Email', type: 'email' })
  ]
})

signup.fieldset = signup.fieldset.concat(field({
  name: 'Newsletter',
  type: 'checkbox',
  value: true
}))

// Note: View data are only bound to the DOM after
// property assignment. If we had simply pushed the
// checkbox into the fieldset, we would have had to
// subsequently call signup.bind('fieldset') before
// the change would propagate

if (typeof document == 'undefined') {
  return console.log(signup.toString())
}

document.body.appendChild(signup.el)

setTimeout(function () {
  signup.button = 'SIGNUP ALREADY!'
}, 5000)
```

## obey
[MIT](https://opensource.org/licenses/MIT)
