/**
 * User: santi8ago8
 * GitHub: https://github.com/santi8ago8/boq.js
 * Version 0.0.1
 */


(function (window) {
    var boq = {};
    boq._version = "0.0.1";

    /**
     * private functions (utils)
     * @type {{}}
     */
    var privateUtils = {
        qsThis: function (query) {
            return boq.utils.qs.call(this, query, this);
        },
        qs: function (self, query) {
            if (self.length == 0) {
                var r = boq.Array(document.querySelectorAll(query));
                r.each(function (el) {
                    self.push(el);
                });
                return self;
            } else {
                return boq.utils.qs()
            }
        },
        qsContext: function (query, context, res) {
            context.each(function (it) {
                var resIt = boq.Array(it.querySelectorAll(query));
                resIt.each(function (itR) {
                    if (res.indexOf(itR) == -1) {
                        res.push(itR);
                    }
                });

            });
            return res;
        }
    };
    /**
     * Util functions
     * @type {{debug: Function, log: Function, extends: Function, random: Function, randomInt: Function, qs: Function}}
     */
    boq.utils = boq.u = {
        /**
         * Debug params in console, fix problems with internet explorer
         * @param {object} args
         */
        debug: function (args) {
            //control for internet explorer
            if (typeof console !== 'undefined' && console.debug) {
                console.debug.apply(console, arguments);
            }
        },
        /**
         * Log params in console, fix problems with internet explorer
         * @param {object} args
         */
        log: function (args) {
            //control for internet explorer
            if (typeof console !== 'undefined') {
                console.log.apply(console, arguments);
            }
        },
        /**
         * Table object in console, fix problems with internet explorer
         * @param {object} args
         */
        table: function (args) {
            //control for internet explorer
            if (typeof console !== 'undefined' && console.table) {
                console.table.apply(console, arguments);
            }
        },
        /**
         * Get the keys from second object and insert into the first
         * @param {Object} targetObject Target object
         * @param {Object} sourceObject Source object
         * @param {Boolean} [replace=true] Replace keys, default true
         *
         * @returns {Object} the resultant object
         */
        extends: function (targetObject, sourceObject, replace) {
            if (typeof replace == 'undefined')
                replace = true;
            for (var i in sourceObject) {
                //check if property is direct from the object
                if (sourceObject.hasOwnProperty && sourceObject.hasOwnProperty(i)) {
                    if (!replace) {
                        if (typeof targetObject[i] === 'undefined') {
                            targetObject[i] = sourceObject[i];
                        }
                    }
                    else {
                        targetObject[i] = sourceObject[i];
                    }
                }
            }
            return targetObject;
        },
        /**
         * get a random float number.
         * @param {number} [min] minimun value
         * @param {number} [max] maximun value
         * @returns {number} a random float number
         */
        random: function (min, max) {
            if (typeof min === 'undefined')
                min = 0;
            if (typeof max === 'undefined')
                max = 1;
            return (Math.random() * (max - min) + min)
        },
        /**
         * get a random integer number
         * @param {number} [min] minimun value
         * @param {number} [max] maximun value
         * @returns {number} a random int number
         */
        randomInt: function (min, max) {
            return parseInt(boq.utils.random(min, max));
        },
        /**
         * get keys from object.
         * @param {object} sourceObject
         * @returns {boq.Array}
         */
        keys: function (sourceObject) {
            var ret = new boq.Array();
            for (var i in sourceObject) {
                //check if property is direct from the object
                if (sourceObject.hasOwnProperty && sourceObject.hasOwnProperty(i)) {
                    ret.push(i);
                }
            }
            return ret;
        },
        /**
         * get an boq.Array with document.querySelector
         * @param query query selector
         * @returns {boq.Array}
         */
        qs: function (query, context) {
            var res = boq.Array();
            boq.utils.extends(res, boq.utils.qs.adds, false);
            boq.utils.extends(res.adds = {}, boq.utils.qs.adds);
            if (typeof context !== 'undefined') {

                return privateUtils.qsContext.call(res, query, context, res);

            }
            else
                return privateUtils.qs.call(res, res, query);
        },

        /**
         * format string
         * @param {string} mask mask string example "hello %0% your name is %1%" don't use spaces between % and the numbers
         * @returns {string}
         */
        format: function (mask) {
            var patern = /%\d+%/;
            var args = new boq.Array(arguments);
            args.each(function (it, ind) {
                //replace the ocurrences
                var reg = new RegExp('%' + (ind - 1).toString() + '%');
                reg.multiline = true;
                while (reg.test(mask))
                    mask = mask.replace(reg, it);
            }, 1);

            return mask;

        }
    };

    //create the adds for the query selector
    boq.utils.qs.adds = {
        qs: privateUtils.qsThis
    };

    /**
     * Create a boq array
     * @param {Array} [arr=[]] origin array
     * @constructor
     */
    boq.Array = function (arr) {
        var self = typeof arr !== 'undefined' ? arr : [];

        /**
         * each in the array
         * @param {function} fn iteration function
         * @param {number} [start=0]
         * @param {number} [interval=1]
         * @returns {boq.Array}
         */
        self.each = function (fn, start, interval) {
            if (typeof fn !== 'function') {
                interval = start;
                start = fn;
                fn = false;
            }
            if (typeof start == 'undefined')
                start = 0;
            if (typeof interval == 'undefined')
                interval = 1;

            var result = new boq.Array();
            for (var i = start;
                //normal for
                 (interval > 0 && i < self.length) ||
                     //reverse for, used to reverse function.
                     (interval < 0 && i >= 0)

                ; i += interval) {
                var res = true;
                if (fn) {
                    res = fn.call(self, self[i], i);
                }
                if (res || typeof res === 'undefined') {
                    result.push(self[i]);
                }
                //if the response is 'break' the each is cancel.
                if (res === 'break') {
                    break;
                }

            }
            return result;
        };

        /**
         * reverse array
         * @returns {boq.Array}
         */
        self.reverse = function () {
            return self.each(self.length - 1, -1);
        };

        if (!self.indexOf) {
            /**
             * Find the object into the array
             * @param {object} findElement element to find
             * @returns {number} the index of the element
             */
            self.indexOf = function (findElement) {
                var index = -1;
                self.each(function (it, ind) {
                    if (findElement == it) {
                        index = ind;
                        return 'break';
                    }
                    else
                        return false;
                });
                return index;
            }
        }

        /**
         * remove element from array
         * @param {object} element element to remove from array
         * @param {function} [compareFunction] compare function, default function use the === to compare elements.
         * @returns {boq.Array} resultant array
         */
        self.without = function (element, compareFunction) {
            if (!compareFunction)
                compareFunction = function (it) {
                    return !(it === element);
                };
            return self.each(compareFunction);
        };
        /**
         * compare with another array, using the === to compare elements.
         * @param {Array} arrayToCompare Array to compare.
         * @returns {boolean}
         */
        self.compare = function (arrayToCompare) {
            var result = true;
            self.each(function (it, ind) {
                if (it === arrayToCompare[ind]) {
                    return false
                }
                else {
                    result = false;
                    return 'break';
                }
            });
            return result;
        };
        /**
         * return the first element of the array
         * @type {Function}
         */
        self.first = self.f = function () {
            return self[0];
        };
        /**
         * return the last element of the array
         * @type {Function}
         */
        self.last = self.l = function () {
            return self[self.length - 1];
        };
        /**
         * get a random element from array.
         * @returns {object}
         */
        self.randomElem = function () {
            return self[boq.utils.randomInt(0, self.length)];
        };
        /**
         * get elements with even indexes
         * @returns {*}
         */
        self.even = function () {
            return self.each(function () {
            }, 0, 2);
        };
        /**
         * get elements with uneven indexes
         * @returns {*}
         */
        self.uneven = function () {
            return self.each(function () {
            }, 1, 2)
        };
        /**
         * group an elements from array, creating a object
         * @param propertyName the property that read from object
         * @param [restName='default'] name of the default property, use in elements with value: null, undefined, false, 0
         * @returns {object}
         */
        self.groupBy = function (propertyName, restName) {
            var result = {};
            if (typeof restName === 'undefined') {
                restName = "default";
            }
            self.each(function (it) {
                var pName = it[propertyName] ? it[propertyName] : restName;
                if (!result[pName])
                    result[pName] = new boq.Array();

                result[pName].push(it);
            });
            return result;
        };
        /**
         * return the count of ocurrences of the element, using the three equals operator.
         * @param {object} element element to find
         * @param {number} [start=1] start index
         * @returns {number}
         */
        self.ocurrences = function (element, start) {
            if (typeof start === 'undefined')
                start = 0;
            var count = 0;
            self.each(function (it, ind) {
                //using the three equals operator.
                if (it === element)
                    count++;
            }, start);
            return count;
        };
        /**
         * return an array with the indexes of the element in array
         * @param {object} element element to find
         * @param {number} [start=1] start index
         * @returns {boq.Array}
         */
        self.indexes = function (element, start) {
            if (typeof start === 'undefined')
                start = 0;
            var result = new boq.Array();
            self.each(function (it, ind) {
                //using the three equals operator.
                if (it === element)
                    result.push(ind);
            }, start);
            return result;
        };
        return self;
    };

    //private functions (Router)
    var privatesRouter = {
        init: function () {
            privatesRouter.currentHash = window.location.hash;
            window.addEventListener('hashchange', privatesRouter.eventChange);
        },
        currentRoute: undefined,
        currentHash: undefined,
        eventChange: function () {
            var e = typeof event !== 'undefined' ? event : undefined;
            //result from exit function.
            var resultExit = true;
            if (e) {
                if (e.preventDefault) e.preventDefault();
                if (e.stopPropagation) e.stopPropagation();
            }
            var hash = window.location.hash.substr(1);
            var rObj = privatesRouter.getRouteObjectByCreatedRoute(hash);
            if (privatesRouter.currentRoute) {
                var current = privatesRouter.currentRoute;
                if (typeof current.exit === 'function') {
                    //only stop event if the result is === false.
                    if (current.exit() === false) {
                        //stop
                        resultExit = false;
                        //remove to not trigger when the hash change
                        window.removeEventListener('hashchange', privatesRouter.eventChange);
                        window.location.hash = privatesRouter.currentHash;
                        //add again the event
                        window.addEventListener('hashchange', privatesRouter.eventChange);
                    }
                }
            }
            if (resultExit === true && rObj) {
                privatesRouter.currentRoute = rObj;
                var container;
                //convert querySelector in element.
                if (typeof rObj.container === 'string')
                    container = boq.u.qs(rObj.container);
                //if exist jQuery, the element is converted to jQuery element.
                if (typeof jQuery !== 'undefined')
                    container = jQuery(container);
                var params = {};
                var originalRoute = new boq.Array(rObj.route.split('/')).without('');
                var route = new boq.Array(hash.split('/')).without('').without('#');
                //generate an object with params, (urls starting with ':')
                originalRoute.each(function (it, ind) {
                    if (it.charAt(0) === ':') {
                        params[it.substr(1)] = route[ind];
                    }
                });
                //call the callback function.
                rObj.cb({
                    name: rObj.name,
                    container: container,
                    newRoute: hash,
                    originalRoute: rObj.route,
                    params: params
                });
                privatesRouter.currentHash = window.location.hash;
            }
        },
        on: function (route, config) {
            //add to routes
            var defaultConfig = {
                name: undefined,
                route: route,
                container: undefined,
                cb: undefined,
                exit: undefined
            };
            if (typeof config === 'function')
                defaultConfig.cb = config;
            else
                boq.utils.extends(defaultConfig, config);
            if (privatesRouter.existRoute(route)) {
                //update route
                var routeParts = new boq.Array(route.split('/'));
                routeParts = routeParts.without("");
                routeParts = routeParts.each(function (it) {
                    return !(it.charAt(0) === ':');
                });
                boq.Router.routes.each(function (it) {
                    var routeParts2 = new boq.Array(it.route.split('/'));
                    routeParts2 = routeParts2.without("");
                    routeParts2 = routeParts2.each(function (it) {
                        return !(it.charAt(0) === ':');
                    });
                    if (routeParts.compare(routeParts2)) {
                        boq.utils.extends(it, defaultConfig);
                    }
                });
            }
            else {
                //add new route
                boq.Router.routes.push(defaultConfig);
            }

            //check if is the current route and trigger event.
            var actualRoute = privatesRouter.getRouteObjectByCreatedRoute(window.location.hash);
            if (actualRoute && actualRoute.route == route) {
                privatesRouter.eventChange();
            }
            return boq.Router;
        },
        off: function (route) {
            var routeParts = new boq.Array(route.split('/'));
            routeParts = routeParts.without("");

            var routeToDelete;
            boq.Router.routes.each(function (it) {
                var routeParts2 = new boq.Array(it.route.split('/'));
                routeParts2 = routeParts2.without("");
                if (routeParts.compare(routeParts2)) {
                    routeToDelete = it;
                }
            });
            if (routeToDelete) {
                boq.Router.routes = boq.Router.routes.without(routeToDelete);
            }
            return boq.Router;
        },
        offByName: function (routeName) {
            var routeToDelete;
            boq.Router.routes.each(function (it) {
                if (it.name === routeName)
                    routeToDelete = it;
            });
            if (routeToDelete) {
                boq.Router.routes = boq.Router.routes.without(routeToDelete);
            }
            return boq.Router;
        },
        goTo: function (route) {
            var hash = b.Array(window.location.hash.substr(1).split('/')).without('').without('#');
            var r = b.Array(route.split('/')).without('').without('#');

            if (hash.compare(r))
                privatesRouter.eventChange();
            else
                window.location.hash = route;
            return boq.Router;
        },
        existRoute: function (route) {
            var routeParts = new boq.Array(route.split('/'));
            routeParts = routeParts.without("");
            var res = boq.Router.routes.each(function (it) {
                var routePartsE = new boq.Array(it.route.split('/'));
                routePartsE = routePartsE.without("");
                return routeParts.compare(routePartsE);
            });
            return res.length == 1;
        },
        getRouteObjectByCreatedRoute: function (routeStr) {
            var response;

            var route = new boq.Array(routeStr.split('/'));
            route = route.without('').without("#");

            boq.Router.routes.each(function (it) {
                var routeObj = new boq.Array(it.route.split('/')).without('');
                var count = 0;
                route.each(function (str, ind) {
                    if (routeObj[ind] && str == routeObj[ind] && routeObj[ind].charAt(0) !== ':') {
                        count++;
                    }
                    if (routeObj[ind] && routeObj[ind].charAt(0) === ':') {
                        count++;
                    }
                    return false;
                });
                if (count == route.length && count == routeObj.length) {
                    response = it;
                }
            });

            return response;
        }
    };
    //init the Router
    privatesRouter.init();

    /**
     * Router
     * @type {{routes: boq.Array, on: Function, off: Function, goTo: Function, back: Function, forward: Function}}
     */
    boq.Router = {
        /**
         * created routes.
         */
        routes: new boq.Array(),
        /**
         * create a new route
         * @param {string} route the new route
         * @param {object|function} config config object or function callback.
         * @returns {object} Boq.Router
         */
        on: function (route, config) {
            return privatesRouter.on.call(this, route, config);
        },
        /**
         * remove a route
         * @param {string} route route to remove.
         * @returns {object} Boq.Router
         */
        off: function (route) {
            return privatesRouter.off.call(this, route)
        },
        /**
         * remove a route by name
         * @param {string} routeName route name to remove.
         * @returns {object} Boq.Router
         */
        offByName: function (routeName) {
            return privatesRouter.offByName.call(this, routeName);
        },
        /**
         *
         * @param route route destination
         * @returns {object} Boq.Router
         */
        goTo: function (route) {
            return privatesRouter.goTo.call(this, route);
        },
        /**
         * Back into the history
         * @returns {object} Boq.Router
         */
        back: function () {
            window.history.back();
            return boq.Router;
        },
        /**
         * forward into the history
         * @returns {object} Boq.Router
         */
        forward: function () {
            window.history.forward();
            return boq.Router;
        },
        /**
         * get the current route
         * @returns {object}
         */
        current: function () {
            return privatesRouter.currentRoute;
        }
    };


    window.Boq = window.boq = boq;
    if (typeof window.b === 'undefined')
        window.b = boq;
    if (typeof window._b === 'undefined')
        window._b = boq;
}(window));
