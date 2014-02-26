/**
 * User: santi8ago8
 * GitHub: https://github.com/santi8ago8/gamepiracy
 */

Boq.utils.qs.adds.html = function (html) {
    if (typeof html === 'undefined') {
        if (typeof this[0] !== 'undefined')
            return this[0].innerHTML;
    }
    this.each(function (it) {
        it.innerHTML = html;
    });
    return this;
};
Boq.utils.qs.adds.attr = function (name, value) {
    if (typeof value === 'undefined') {
        if (typeof this[0] !== 'undefined')
            return this[0].getAttribute(name);
    }
    this.each(function (it) {
        it.setAttribute(name, value);
    });
    return this;
};
Boq.utils.qs.adds.css = function (name, value) {
    if (typeof value === 'undefined') {
        if (typeof this[0] !== 'undefined')
            return this[0].style[name];
    }
    this.each(function (it) {
        it.style[name] = value;
    });
    return this;
};

var Game = function () {
    var content = b.u.qs('.content');
    var load = function () {

        content.html(template());
        content.f().classList.add('contentLoaded');

    };


    load();
};


Boq.Router.on('/', {
    cb: function () {
        new Game();
    },
    name: 'index'
});