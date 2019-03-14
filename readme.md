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
    field({ name: 'Name' }),
    field({ name: 'Email', type: 'email' }),
    field({ name: 'Newsletter', type: 'checkbox', value: true })
  ],
  buttonText: 'Signup'
})

// Browser
if (typeof document !== 'undefined') {
  document.body.appendChild(signup.el)
  setTimeout(() => signup.buttonText = 'SIGNUP ALREADY!', 5000)
}

// Node
else {
  console.log(signup.toString())
}
```

**form.js**
```js
var mkdom = require('mkdom')
var define = require('view/define')
var autobind = require('view/autobind')
var bind = require('view/bind')

var template = mkdom`
  <form>
    <input type="hidden" name="csrf">
    <fieldset></fieldset>
    <button></button>
  </form>
`

module.exports = define(template, {
  csrfToken: autobind('[name="csrf"]'),
  fields: bind(function (fields) {
    var fieldset = this.select('fieldset')
    var fragment = this.fragment()

    fields.forEach(function (field) {
      fragment.appendChild(field.el)
    })

    fieldset.innerHTML = ''
    fieldset.appendChild(fragment)
  }),
  buttonText: autobind('button')
})
```

**field.js**
```js
var mkdom = require('mkdom')
var define = require('view/define')
var bind = require('view/bind')

var template = mkdom`
  <label>
    <span></span>
    <input>
  </label>
`

module.exports = define(template, {
  name: bind(function (val) {
    this.select('input').name = val.toLowerCase()
    this.select('span').textContent = val
  }),
  type: bind(function (val) {
    this.select('input').type = val
  }),
  value: bind(function (val) {
    this.select('input').value = val
  })
})
```

## obey
Copyright 2019 Michael Rhodes

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
