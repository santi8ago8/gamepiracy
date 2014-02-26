function template(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="start"><h2>Click to start</h2><img src="/images/click.png"/></div><div class="piracy"></div><div class="persons"></div>');
}
return buf.join("");
}