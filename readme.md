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
  <form method="POST">
    <input name="csrf" type="hidden">
    <fieldset></fieldset>
    <button></button>
  </form>
`

module.exports = define(template, {
  action: bind.attr('action'),
  csrfToken: bind.value('[name="csrf"]'),
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
    <embed> <input>
  </label>
`

module.exports = define(template, {
  name: bind.many([
    bind.slot('embed'),
    bind.attr('input', 'name', v => casey.kebab(v))
  ]),
  type: bind.attr('input', 'type'),
  checked: bind.attr('input', 'checked'),
  value: bind.attr('input', 'value')
})
```

**signup.js**
```js
var form = require('./form')

var signup = form({
  action: '/account',
  csrfToken: '1d3d6928f021d69a694bec4640e71ff4d7c004b1',
  fields: [
    { name: 'First Name' },
    { name: 'Last Name' },
    { name: 'Email', type: 'email' },
    { name: 'Newsletter', type: 'checkbox', checked: true }
  ],
  buttonText: 'Signup',
  onSubmit: e => alert('🎉')
})

if (typeof document !== 'undefined') {
  document.body.appendChild(signup.el)
  setTimeout(() => signup.buttonText = 'SIGNUP ALREADY!', 5000)
}

console.log(signup.toString())
```

```html
<form method="POST" action="/account">
  <input name="csrf" type="hidden" value="1d3d6928f021d69a694bec4640e71ff4d7c004b1">
  <fieldset>
    <label>
      First Name <input name="first-name">
    </label>
    <label>
      Last Name <input name="last-name">
    </label>
    <label>
      Email <input name="email" type="email">
    </label>
    <label>
      Newsletter <input name="newsletter" type="checkbox" checked>
    </label>
  </fieldset>
  <button>Signup</button>
</form>
```

## see
[brutal hacker news](https://github.com/michaelrhodes/hn)

## obey
[CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/)
