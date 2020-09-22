# view

[![ci](https://api.travis-ci.com/michaelrhodes/view.svg?branch=simple)](https://travis-ci.com/michaelrhodes/view)

## install
```sh
npm install michaelrhodes/view#simple
```

## use
**form.js**
```js
var mkdom = require('mkdom')
var define = require('view/define')
var refine = require('view/refine')
var bind = require('view/bind')
var field = require('./field')

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

refine(module.exports, {
  // Convert data into views before
  // calling the bind function
  fields: v => v.map(field)
})
```

**field.js**
```js
var mkdom = require('mkdom')
var casey = require('casey')
var define = require('view/define')
var bind = require('view/bind')

var template = mkdom`
  <label>
    <embed>
    <input>
  </label>
`

module.exports = define(template, {
  name: bind.many([
    bind.slot('embed'),
    bind.attr('input', 'name', v => casey.kebab(v))
  ]),
  type: bind.attr('input', 'type'),
  value: bind.attr('input', 'value'),
  checked: bind.attr('input', 'checked')
})
```

**signup.js**
```js
var form = require('./form')

var signup = form({
  csrfToken: 'abc07acb986acb76ef2fb8134da11',
  fields: [
    { name: 'First Name' },
    { name: 'Last Name' },
    { name: 'Email', type: 'email' },
    { name: 'Newsletter', type: 'checkbox', checked: true }
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

## see
[brutal hacker news](https://github.com/michaelrhodes/hn)

## obey
[CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/)
