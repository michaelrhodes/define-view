# define-view

## install
```sh
npm install michaelrhodes/define-view#5.0.0
```

## use

**index.js**
```js
var form = require('./form')
var field = require('./field')

var signup = form({
  csrfToken: 'abc07acb986acb76ef2fb8134da11',
  fields: [
    field({
      name: 'Name'
    }),
    field({
      name: 'Email',
      type: 'email'
    }),
    field({
      name: 'Newsletter',
      type: 'checkbox',
      value: true
    })
  ],
  buttonText: 'Signup'
})

// Browser
if (typeof document !== 'undefined') {
  document.body.appendChild(signup.el)

  setTimeout(function () {
    signup.buttonText = 'SIGNUP ALREADY!'
  }, 5000)
}

// Node
else {
  console.log(signup.toString())
}
```

**form.js**
```js
var define = require('define-view')
var mkdom = require('mkdom')

var template = mkdom([
  '<form>',
    '<input type="hidden" name="csrf">',
    '<fieldset></fieldset>',
    '<button></button>',
  '</form>'
].join(''))

module.exports = define(template, {
  csrfToken: function (el, val) {
    el.querySelector('[name="csrf"]').value = val
  },
  fields: function (el, fields) {
    var fragment = el.ownerDocument.createDocumentFragment()
    var fieldset = el.querySelector('fieldset')

    fields.forEach(function (field) {
      fragment.appendChild(field.el)
    })

    fieldset.innerHTML = ''
    fieldset.appendChild(fragment)
  },
  buttonText: function (el, val) {
    el.querySelector('button').textContent = val
  }
})
```

**field.js**
```js
var define = require('define-view')
var mkdom = require('mkdom')

var template = mkdom([
  '<label>',
    '<span></span>',
    '<input>',
  '</label>'
].join(''))

module.exports = define(template, {
  name: function (el, val) {
    var input = el.querySelector('input')
    var span = el.querySelector('span')
    input.name = val.toLowerCase()
    span.textContent = val
  },
  type: function (el, val) {
    var input = el.querySelector('input')
    input.type = val
  },
  value: function (el, val) {
    el.querySelector('input').value = val
  }
})
```

## obey
[MIT](https://opensource.org/licenses/MIT)
