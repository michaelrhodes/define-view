# view

## install
```sh
pnpm install michaelrhodes/view#4.0.0
```

## use
```js
var view = require('view')
var mkdom = require('mkdom')

var form = (function () {
  var template = mkdom([
    '<form>',
      '<input type="hidden" name="csrf">',
      '<button></button>',
    '</form>'
  ].join(''))

  return view(template, {
    csrf: '[name="csrf"]',
    button: 'button',
    fields: function (fields) {
      var form = this
      var button = this.querySelector('button')
      fields.forEach(function (field) {
        form.appendChild(field.el)
      })
      form.appendChild(button)
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
  fields: [
    field({ name: 'Name' }),
    field({ name: 'Email', type: 'email' }),
    field({ name: 'Newsletter', type: 'checkbox', value: true })
  ]
})

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
