# view

## install
```sh
npm install michaelrhodes/view#future
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
    field({ name: 'Newsletter', type: 'checkbox', checked: true })
  ],
  buttonText: 'Signup',
  onSubmit: function (e) {
    e.preventDefault()
    alert('Hooray')
  }
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
var bind = require('view/bind')

var template = mkdom`
  <form>
    <input type="hidden" name="csrf">
    <fieldset></fieldset>
    <button></button>
  </form>
`

module.exports = define(template, {
  csrfToken: bind.attr('[name="csrf"]', 'value'),
  fields: bind.children('fieldset'),
  buttonText: bind.text('button'),
  onSubmit: bind.listener('submit')
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
  name: bind.combine([
    bind.attr('input', 'name', val => val.toLowerCase()),
    bind.text('span')
  ]),
  type: bind.attr('input', 'type'),
  value: bind.attr('input', 'value'),
  checked: bind.attr('input', 'checked')
})
```

## obey
[CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/)
