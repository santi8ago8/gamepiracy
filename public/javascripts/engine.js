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
    var piracy;
    var currentPiracy = 100;
    var decrement = -.3;
    var decclick = 3;
    var intPiracy = b.Array();
    var initDate;
    var load = function () {

        content.html(template());
        content.f().classList.add('contentLoaded');
        piracy = content.qs('.piracy');

        init();
    };
    var init = function () {
        currentPiracy = 100;
        while (i = intPiracy.pop()) {
            clearInterval(i);
        }
        piracy.css('right', piracy + '%');

        intPiracy.push(setInterval(function () {
            decrement -= .3;
        }, 1000));
        intPiracy.push(setInterval(movePiracy, 100));
        content.f().addEventListener('click', backPiracy);
        initDate = Date.now();
    };
    var movePiracy = function () {
        updatePiracy(decrement);
    };
    var end = function () {
        var finalScore = Date.now() - initDate;
        while (i = intPiracy.pop()) {
            clearInterval(i);
        }
        content.f().removeEventListener('click', backPiracy);
        updatePiracy(1000);
        b.u.debug('end', finalScore);
    };
    var backPiracy = function () {
        updatePiracy(decclick);
    };
    var updatePiracy = function (n) {
        currentPiracy += n;
        if (currentPiracy < 50) {

        }
        if (currentPiracy < 0) {
            end();
        } else {
            piracy.css('right', currentPiracy + '%');
        }
    };

    load();
};


Boq.Router.on('/', {
    cb: function () {
        new Game();
    },
    name: 'index'
});