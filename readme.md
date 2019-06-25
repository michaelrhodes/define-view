# view

## install
```sh
npm install michaelrhodes/view#next
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

var template = mkdom`
  <form>
    <input type="hidden" name="csrf">
    <fieldset></fieldset>
    <button></button>
  </form>
`

module.exports = define(template, {
  csrfToken: autobind('[name="csrf"]'),
  fields: autobind('fieldset'),
  buttonText: autobind('button')
})
```

**field.js**
```js
var mkdom = require('mkdom')
var define = require('view/define')
var autobind = require('view/autobind')
var query = require('view/query')

var template = mkdom`
  <label>
    <span></span>
    <input>
  </label>
`

module.exports = define(template, {
  name: function (val) {
    query(this.el, 'span').textContent = val
    query(this.el, 'input').name = val.toLowerCase()
  },
  type: autobind('input', 'type'),
  value: autobind('input')
})
```

## obey
[CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/)
