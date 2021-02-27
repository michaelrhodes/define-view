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
var bind = require('view/bind')

var template = mkdom(`
  <form method="POST">
    <input name="csrf" type="hidden">
    <fieldset></fieldset>
    <button></button>
  </form>
`)

module.exports = define(template, {
  action: bind.attr('action'),
  csrfToken: bind.attr('[name="csrf"]', 'value'),
  fields: bind.children('fieldset'),
  buttonText: bind.text('button')
})
```

**field.js**
```js
var mkdom = require('mkdom')
var casey = require('casey')
var define = require('view/define')
var bind = require('view/bind')

var template = mkdom(`
  <label class="field">
    <embed class="name"> <input>
  </label>
`)

module.exports = define(template, {
  name: bind.many([
    bind.slot('embed.name'),
    bind.attr('input', 'name', casey.kebab)
  ]),
  type: bind.attr('input', 'type'),
  checked: bind.attr('input', 'checked'),
  value: bind.value('input')
})
```

**signup.js**
```js
var form = require('./form')
var field = require('./field')

var signup = form({
  action: '/account',
  csrfToken: '1d3d6928f021d69a694bec4640e71ff4d7c004b1',
  fields: [
    field({ name: 'First Name' }),
    field({ name: 'Last Name' }),
    field({ name: 'Email Address', type: 'email' }),
    field({ name: 'Newsletter', type: 'checkbox', checked: true })
  ],
  buttonText: 'Signup'
})

signup.fields[1].name = 'Surname'

if (typeof document !== 'undefined') {
  document.body.appendChild(signup.el)
  setTimeout(() => signup.buttonText = 'SIGNUP ALREADY!', 5000)
}

console.log(signup.toString())
console.log(JSON.stringify(signup, null, 2))
```

```html
<form method="POST" action="/account">
  <input name="csrf" type="hidden" value="1d3d6928f021d69a694bec4640e71ff4d7c004b1">
  <fieldset>
    <label class="field">
      First Name <input name="first-name">
    </label>
    <label class="field">
      Surname <input name="surname">
    </label>
    <label class="field">
      Email Address <input name="email-address" type="email">
    </label>
    <label class="field">
      Newsletter <input name="newsletter" type="checkbox" checked>
    </label>
  </fieldset>
  <button>Signup</button>
</form>
```
```json
{
  "action": "/account",
  "csrfToken": "1d3d6928f021d69a694bec4640e71ff4d7c004b1",
  "fields": [
    {
      "name": "First Name",
      "type": null,
      "checked": null,
      "value": null
    },
    {
      "name": "Surname",
      "type": null,
      "checked": null,
      "value": null
    },
    {
      "name": "Email Address",
      "type": "email",
      "checked": null,
      "value": null
    },
    {
      "name": "Newsletter",
      "type": "checkbox",
      "checked": true,
      "value": null
    }
  ],
  "buttonText": "Signup"
}
```

## see
[brutal hacker news](https://github.com/michaelrhodes/hn)

## obey
[CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/)
