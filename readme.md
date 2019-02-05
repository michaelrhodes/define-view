# view

## install
```sh
npm install michaelrhodes/view#8.0.1
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
var define = require('view/define')
var mkdom = require('mkdom')

var template = mkdom(`
  <form>
    <input type="hidden" name="csrf">
    <fieldset></fieldset>
    <button></button>
  </form>
`)

module.exports = define(template, {
  csrfToken: function (val) {
    this.el.querySelector('[name="csrf"]').value = val
  },
  fields: function (fields) {
    var fieldset = this.el.querySelector('fieldset')
    var fragment = this.el.ownerDocument
      .createDocumentFragment()

    fields.forEach(function (field) {
      fragment.appendChild(field.el)
    })

    fieldset.innerHTML = ''
    fieldset.appendChild(fragment)
  },
  buttonText: function (val) {
    this.el.querySelector('button').textContent = val
  }
})
```

**field.js**
```js
var define = require('view/define')
var mkdom = require('mkdom')

var template = mkdom(`
  <label>
    <span></span>
    <input>
  </label>
`)

module.exports = define(template, {
  name: function (val) {
    this.el.querySelector('input').name = val.toLowerCase()
    this.el.querySelector('span').textContent = val
  },
  type: function (val) {
    this.el.querySelector('input').type = val
  },
  value: function (val) {
    this.el.querySelector('input').value = val
  }
})
```

## obey
Copyright 2019 Michael Rhodes

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
