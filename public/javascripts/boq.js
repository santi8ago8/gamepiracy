!function(t){var e={};e._version="0.0.1";var n={qsThis:function(t){return e.utils.qs.call(this,t,this)},qs:function(t,n){if(0==t.length){var r=e.Array(document.querySelectorAll(n));return r.each(function(e){t.push(e)}),t}return e.utils.qs()},qsContext:function(t,n,r){return n.each(function(n){var o=e.Array(n.querySelectorAll(t));o.each(function(t){-1==r.indexOf(t)&&r.push(t)})}),r}};e.utils=e.u={debug:function(){"undefined"!=typeof console&&console.debug&&console.debug.apply(console,arguments)},log:function(){"undefined"!=typeof console&&console.log.apply(console,arguments)},table:function(){"undefined"!=typeof console&&console.table&&console.table.apply(console,arguments)},"extends":function(t,e,n){"undefined"==typeof n&&(n=!0);for(var r in e)e.hasOwnProperty&&e.hasOwnProperty(r)&&(n?t[r]=e[r]:"undefined"==typeof t[r]&&(t[r]=e[r]));return t},random:function(t,e){return"undefined"==typeof t&&(t=0),"undefined"==typeof e&&(e=1),Math.random()*(e-t)+t},randomInt:function(t,n){return parseInt(e.utils.random(t,n))},keys:function(t){var n=new e.Array;for(var r in t)t.hasOwnProperty&&t.hasOwnProperty(r)&&n.push(r);return n},qs:function(t,r){var o=e.Array();return e.utils.extends(o,e.utils.qs.adds,!1),e.utils.extends(o.adds={},e.utils.qs.adds),"undefined"!=typeof r?n.qsContext.call(o,t,r,o):n.qs.call(o,o,t)},format:function(t){var n=new e.Array(arguments);return n.each(function(e,n){var r=new RegExp("%"+(n-1).toString()+"%");for(r.multiline=!0;r.test(t);)t=t.replace(r,e)},1),t}},e.utils.qs.adds={qs:n.qsThis},e.Array=function(t){var n="undefined"!=typeof t?t:[];return n.each=function(t,r,o){"function"!=typeof t&&(o=r,r=t,t=!1),"undefined"==typeof r&&(r=0),"undefined"==typeof o&&(o=1);for(var u=new e.Array,a=r;o>0&&a<n.length||0>o&&a>=0;a+=o){var i=!0;if(t&&(i=t.call(n,n[a],a)),(i||"undefined"==typeof i)&&u.push(n[a]),"break"===i)break}return u},n.reverse=function(){return n.each(n.length-1,-1)},n.indexOf||(n.indexOf=function(t){var e=-1;return n.each(function(n,r){return t==n?(e=r,"break"):!1}),e}),n.without=function(t,e){return e||(e=function(e){return!(e===t)}),n.each(e)},n.compare=function(t){var e=!0;return n.each(function(n,r){return n===t[r]?!1:(e=!1,"break")}),e},n.first=n.f=function(){return n[0]},n.last=n.l=function(){return n[n.length-1]},n.randomElem=function(){return n[e.utils.randomInt(0,n.length)]},n.even=function(){return n.each(function(){},0,2)},n.uneven=function(){return n.each(function(){},1,2)},n.groupBy=function(t,r){var o={};return"undefined"==typeof r&&(r="default"),n.each(function(n){var u=n[t]?n[t]:r;o[u]||(o[u]=new e.Array),o[u].push(n)}),o},n.ocurrences=function(t,e){"undefined"==typeof e&&(e=0);var r=0;return n.each(function(e){e===t&&r++},e),r},n.indexes=function(t,r){"undefined"==typeof r&&(r=0);var o=new e.Array;return n.each(function(e,n){e===t&&o.push(n)},r),o},n};var r={init:function(){r.currentHash=t.location.hash,t.addEventListener("hashchange",r.eventChange)},currentRoute:void 0,currentHash:void 0,eventChange:function(){var n=event,o=!0;n&&(n.preventDefault&&n.preventDefault(),n.stopPropagation&&n.stopPropagation());var u=t.location.hash.substr(1),a=r.getRouteObjectByCreatedRoute(u);if(r.currentRoute){var i=r.currentRoute;"function"==typeof i.exit&&i.exit()===!1&&(o=!1,t.removeEventListener("hashchange",r.eventChange),t.location.hash=r.currentHash,t.addEventListener("hashchange",r.eventChange))}if(o===!0&&a){r.currentRoute=a;var c;"string"==typeof a.container&&(c=e.u.qs(a.container)),"undefined"!=typeof jQuery&&(c=jQuery(c));var f={},s=new e.Array(a.route.split("/")).without(""),h=new e.Array(u.split("/")).without("").without("#");s.each(function(t,e){":"===t.charAt(0)&&(f[t.substr(1)]=h[e])}),a.cb({name:a.name,container:c,newRoute:u,originalRoute:a.route,params:f}),r.currentHash=t.location.hash}},on:function(n,o){var u={name:void 0,route:n,container:void 0,cb:void 0,exit:void 0};if("function"==typeof o?u.cb=o:e.utils.extends(u,o),r.existRoute(n)){var a=new e.Array(n.split("/"));a=a.without(""),a=a.each(function(t){return!(":"===t.charAt(0))}),e.Router.routes.each(function(t){var n=new e.Array(t.route.split("/"));n=n.without(""),n=n.each(function(t){return!(":"===t.charAt(0))}),a.compare(n)&&e.utils.extends(t,u)})}else e.Router.routes.push(u);var i=r.getRouteObjectByCreatedRoute(t.location.hash);return i&&i.route==n&&r.eventChange(),e.Router},off:function(t){var n=new e.Array(t.split("/"));n=n.without("");var r;return e.Router.routes.each(function(t){var o=new e.Array(t.route.split("/"));o=o.without(""),n.compare(o)&&(r=t)}),r&&(e.Router.routes=e.Router.routes.without(r)),e.Router},offByName:function(t){var n;return e.Router.routes.each(function(e){e.name===t&&(n=e)}),n&&(e.Router.routes=e.Router.routes.without(n)),e.Router},goTo:function(n){var o=b.Array(t.location.hash.substr(1).split("/")).without("").without("#"),u=b.Array(n.split("/")).without("").without("#");return o.compare(u)?r.eventChange():t.location.hash=n,e.Router},existRoute:function(t){var n=new e.Array(t.split("/"));n=n.without("");var r=e.Router.routes.each(function(t){var r=new e.Array(t.route.split("/"));return r=r.without(""),n.compare(r)});return 1==r.length},getRouteObjectByCreatedRoute:function(t){var n,r=new e.Array(t.split("/"));return r=r.without("").without("#"),e.Router.routes.each(function(t){var o=new e.Array(t.route.split("/")).without(""),u=0;r.each(function(t,e){return o[e]&&t==o[e]&&":"!==o[e].charAt(0)&&u++,o[e]&&":"===o[e].charAt(0)&&u++,!1}),u==r.length&&u==o.length&&(n=t)}),n}};r.init(),e.Router={routes:new e.Array,on:function(t,e){return r.on.call(this,t,e)},off:function(t){return r.off.call(this,t)},offByName:function(t){return r.offByName.call(this,t)},goTo:function(t){return r.goTo.call(this,t)},back:function(){return t.history.back(),e.Router},forward:function(){return t.history.forward(),e.Router},current:function(){return r.currentRoute}},t.Boq=t.boq=e,"undefined"==typeof t.b&&(t.b=e),"undefined"==typeof t._b&&(t._b=e)}(window);