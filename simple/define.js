define=function(){function e(e){var t=this;return t.b$.forEach(n=>t[n]=e&&null!=e[n]?e[n]:null),t}function t(e,t){return this.el["e$"+e]=!t&&this.el["e$"+e]||this.el.querySelector(e)}function n(e,t,n){(t=e.currentTarget.s$)&&(n=this["l$"+t+e.type])&&n.call(this,e)}function r(){return this.el.outerHTML}return function(i,o){function u(e,t){var n=this;e&&e.cloneNode||(t=e,e=i.cloneNode(!0)),Object.defineProperty(n,"el",{value:e}),n.b$.forEach(function(e){var t;Object.defineProperty(n,e,{get:e=>t,set:function(n){t!==n&&this["b$"+e](t=n)},enumerable:!0})}),n.set(t)}return o||(o=i,i=null),function(i,o){o.set=e,o.get=t,o.handleEvent=n,o.toString=r,o.b$=Object.keys(i).filter(e=>o["b$"+e]=i[e])}(o,u.prototype),(e,t)=>new u(e,t)}}();