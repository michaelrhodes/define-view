# define-view

## install
```sh
pnpm install michaelrhodes/define-view#4.0.0
```

## use
```js
var define = require('define-view')
var mkdom = require('mkdom')

var form = (function () {
  var template = mkdom([
    '<form>',
      '<input type="hidden" name="csrf">',
      '<fieldset></fieldset>',
      '<button></button>',
    '</form>'
  ].join(''))

  return define(template, {
    csrf: '[name="csrf"]',
    button: 'button',
    fieldset: function (fields) {
      var form = this
      var fragment = form.ownerDocument
        .createDocumentFragment()

      // Cache the query
      form.fieldset = form.fieldset ||
        form.querySelector('fieldset')

      fields.forEach(function (field) {
        fragment.appendChild(field.el)
      })

      form.fieldset.innerHTML = ''
      form.fieldset.appendChild(fragment)
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

  return define(template, {
    value: 'input',
    name: function (val) {
      var field = this

      field.input = field.input ||
        field.querySelector('input')

      field.span = field.span ||
       field.querySelector('span')

      field.input.name = val.toLowerCase()
      field.span.textContent = val
    },
    type: function (val) {
      var field = this

      field.input = field.input ||
        field.querySelector('input')

      field.input.type = val
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
