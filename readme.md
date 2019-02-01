# define-view

## install
```sh
npm install michaelrhodes/define-view#7.0.0
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
  csrfToken: function (val) {
    this.select('[name="csrf"]').value = val
  },
  fields: function (fields) {
    var fieldset = this.select('fieldset')
    var fragment = this.el.ownerDocument
      .createDocumentFragment()

    fields.forEach(function (field) {
      fragment.appendChild(field.el)
    })

    fieldset.innerHTML = ''
    fieldset.appendChild(fragment)
  },
  buttonText: function (val) {
    this.select('button').textContent = val
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
  name: function (val) {
    this.select('input').name = val.toLowerCase()
    this.select('span').textContent = val
  },
  type: function (val) {
    this.select('input').type = val
  },
  value: function (val) {
    this.select('input').value = val
  }
})
```

## obey
[MIT](https://opensource.org/licenses/MIT)
