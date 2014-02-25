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

Boq.Router.on('/', {
    cb: function () {
        Game.load();
    },
    name: 'index'
});

var Game = {
    load: function () {

    }
};