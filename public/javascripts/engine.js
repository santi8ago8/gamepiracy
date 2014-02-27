/**
 * User: santi8ago8
 * GitHub: https://github.com/santi8ago8/gamepiracy
 * Descargar ilegalmente esta en tus manos, que ellos sigan tocando es tu decisión.
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
    return this.adds.css.call(this, 'display', 'none');
};
Boq.utils.qs.adds.show = function () {
    return this.adds.css.call(this, 'display', '');
};
Boq.utils.qs.adds.remove = function () {
    return this.each(function (it) {
        if (it.remove) it.remove();
        else {
            it.remove();
        }
    });
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
    var time;
    var cantante;
    var bajista;
    var batero;
    var todos;

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
        content.qs('.time').hide();
        content.f().addEventListener('click', startListener);
    };
    var startListener = function () {
        initGame();
    };
    var initGame = function () {
        step = 0;
        content.qs('.start').hide();
        content.qs('.time').show();
        content.qs('.slogan').hide();
        content.f().removeEventListener('click', startListener);

        currentPiracy = 100;
        while (i = intPiracy.pop()) {
            clearInterval(i);
        }
        piracy.css('right', piracy + '%');

        intPiracy.push(setInterval(function () {
            decrement -= .3;
        }, 1300));
        intPiracy.push(setInterval(movePiracy, 100));
        content.f().addEventListener('click', backPiracy);
        content.qs('.piracy h2').html('');
        content.qs('.persons').html(templatePerson());

        time = content.qs('.time');
        cantante = content.qs('.cantante');
        bajista = content.qs('.bajista');
        batero = content.qs('.batero');
        todos = content.qs('.persons img');
        updateMusicians();
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
        content.qs('.persons').html('<img src="/images/banda5.png">');
        var image = content.qs('.persons img');
        image.css('bottom', '0px');
        image.css('maxHeight', '80%');
        var intimagen = setInterval(function () {
            var imgancho = image.f().offsetWidth;
            if (imgancho>10){
                clearInterval(intimagen);
                image.css('left', (anchoW / 2 - (imgancho) / 2) + "px");

            }
        }, 100);
        content.qs('.slogan').show();
        content.qs('.time').html('');
        b.u.debug('end', finalScore);
    };
    var backPiracy = function () {
        currentPiracy += decclick;
    };
    var updatePiracy = function (n) {
        currentPiracy += n;
        if (currentPiracy < 0) {
          
        } else {
            if (currentPiracy > 100)
                currentPiracy = 99;
            piracy.css('right', currentPiracy + '%');
        }
        setTextValue();
        updateMusicians();
        if (currentPiracy<0) {
            end();
        }
    };

    var setTextValue = function () {
        var finalScore = Date.now() - initDate;
        time.html(b.u.format('%0% s', (finalScore / 1000).toFixed(1)));
    };

    var updateMusicians = function () {

        var restScreen = anchoW - (anchoW * ((100 - currentPiracy) / 100));
        var piracyScreen = anchoW - restScreen;

        if (currentPiracy > 80) {
            //completos


            var anchoCantante = cantante.f().offsetWidth;
            cantante.css('left', (piracyScreen + (restScreen / 2)) - (anchoCantante / 2) + 'px');

            var anchoBajista = bajista.f().offsetWidth;
            bajista.css('left', (piracyScreen + (restScreen / 4)) - (anchoBajista / 2) + 'px');

            var anchoBatero = batero.f().offsetWidth;
            batero.css('left', (piracyScreen + (restScreen / 1.5)) - (anchoBatero / 2) + 'px');

        } else if (currentPiracy > 50) {
            //mirando costado
            if (step != 2) {
                step = 2;
                cantante.f().src = '/images/cantante2.png';
                cantante.f().classList.remove('cantante1');
                cantante.f().classList.add('cantante2');
                bajista.f().src = '/images/bajista2.png';
                bajista.f().classList.remove('bajista1');
                bajista.f().classList.add('bajista2');
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

                cantante.f().src = '/images/cantante3.png';
                cantante.f().classList.remove('cantante2');
                cantante.f().classList.add('cantante3');

                bajista.f().src = '/images/bajista3.png';
                bajista.f().classList.remove('bajista2');
                bajista.f().classList.add('bajista3');

                batero.f().src = '/images/batero3.png';
                batero.f().classList.remove('batero2');
                batero.f().classList.add('batero3');

                content.qs('.piracy').html('<h2>Descargar ilegalmente esta en tus manos</h2>');
            }

            todos.css('left', piracyScreen + 'px');

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