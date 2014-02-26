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
Boq.utils.qs.adds.hide = function () {
    this.each(function (it) {
        it.style.display = 'none';
    });
    return this;
};
Boq.utils.qs.adds.show = function () {
    this.each(function (it) {
        it.style.display = '';
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
    var template = jade.compile(b.u.qs('#main').html());
    var templatePerson = jade.compile(b.u.qs('#person1').html());
    var step = 0;
    var anchoW = 0;
    var anchoCantante = 0;
    var cantante;
    var bajista;
    var batero;

    var resizeWindow = function () {
        anchoW = content.f().offsetWidth;

        console.log(anchoW);
    };
    resizeWindow();
    window.addEventListener('resize', resizeWindow);

    var load = function () {

        content.html(template());
        content.f().classList.add('contentLoaded');
        piracy = content.qs('.piracy');

        initIntro();

    };
    var initIntro = function () {
        content.qs('.start').show();
        content.f().addEventListener('click', startListener);
    };
    var startListener = function () {
        initGame();
    };
    var initGame = function () {
        step = 0;
        content.qs('.start').hide();
        content.f().removeEventListener('click', startListener);

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

        content.qs('.persons').html(templatePerson());

        cantante = content.qs('.cantante');
        bajista = content.qs('.bajista');
        batero = content.qs('.batero');

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
        piracy.css('right', '100%');
        b.u.debug('end', finalScore);
    };
    var backPiracy = function () {
        updatePiracy(decclick);
    };
    var updatePiracy = function (n) {
        currentPiracy += n;
        if (currentPiracy < 0) {
            end();
        } else {
            if (currentPiracy > 100)
                currentPiracy = 99;
            piracy.css('right', currentPiracy + '%');
        }
        updateMusicians();
    };
    var updateMusicians = function () {

        var restScreen = anchoW - (anchoW * ((100 - currentPiracy) / 100));
        var piracyScreen = anchoW - restScreen;

        if (currentPiracy > 75) {
            //completos


            var anchoCantante = cantante.f().offsetWidth;
            cantante.css('left', (piracyScreen + (restScreen / 2)) - (anchoCantante / 2) + 'px');

            var anchoBajista = bajista.f().offsetWidth;
            bajista.css('left', (piracyScreen + (restScreen / 4)) - (anchoBajista / 2) + 'px');

            var anchoBatero = batero.f().offsetWidth;
            batero.css('left', (piracyScreen + (restScreen / 1.5)) - (anchoBatero / 2) + 'px');

        } else if (currentPiracy > 40) {
            //mirando costado
            if (step != 2) {
                step = 2;
                cantante.f().src = '/images/cantante2.png';
                bajista.f().src = '/images/bajista2.png';

            }

            var anchoCantante = cantante.f().offsetWidth;
            cantante.css('left', piracyScreen + 'px');

            var anchoBajista = bajista.f().offsetWidth;
            bajista.css('left', (piracyScreen + (restScreen / 2.5)) - (anchoBajista / 2) + 'px');

            var anchoBatero = batero.f().offsetWidth;
            batero.css('left', (piracyScreen + (restScreen / 1.5)) - (anchoBatero / 2) + 'px');

        } else {
            //empujando pared
            if (step != 3) {
                step = 3;

                // cantante.f().src = '/images/cantante3.png';
                // bajista.f().src = '/images/bajista2.png';
            }
            var anchoCantante = cantante.f().offsetWidth;
            cantante.css('left', piracyScreen + 'px');

            var anchoBajista = bajista.f().offsetWidth;
            bajista.css('left', (piracyScreen + (restScreen / 2.5)) + 'px');

            var anchoBatero = batero.f().offsetWidth;
            batero.css('left', (piracyScreen + (restScreen / 1.5)) + 'px');

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