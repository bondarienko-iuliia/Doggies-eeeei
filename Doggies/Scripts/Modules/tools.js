webApp.factory("Tools", [function () {
    function Loader(funcs) {
        var loader = this;

        loader.ActiveLoads = 0;
        loader.observers = [];


        if (typeof funcs == "function") {
            loader.Regist(funcs);
        }
        else if (typeof funcs == "object" && funcs instanceof Array) {
            funcs.forEach(function (func) {
                loader.Regist(func);
            });
        }
        else if (funcs) {
            throw new Error("Parameter in constructor is not valid.");
        }
    };

    Loader.prototype.Regist = function (func) {
        if (typeof func != "function") throw new Error("Cannot use in Loader object who is not function.");
        this.ActiveLoads++;
        this.Notification(true);
        func(this.DoneCallback.bind(this));
    };

    Loader.prototype.DoneCallback = function () {
        if (--this.ActiveLoads == 0) this.Notification(false);
    };

    Loader.prototype.Observe = function (observer) {
        this.observers.push(observer);
    };

    Loader.prototype.Notification = function (value) {
        this.observers.forEach(function (observer) {
            observer(value);
        });
    };

    Loader.prototype.IsLoad = function () {
        return this.ActiveLoads > 0 ? true : false;
    };

    function Clone(obj) {
        if (obj === null || typeof (obj) !== 'object' || 'isActiveClone' in obj)
            return obj;

        var temp = obj.constructor(); // changed

        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                obj['isActiveClone'] = null;
                temp[key] = Clone(obj[key]);
                delete obj['isActiveClone'];
            }
        }

        return temp;
    }

    function ResponseMessageWrapper(messages) {
        //console.warn("ResponseMessageWrapper");
        //console.log(messages);
        //messages.forEach(function (message) {
        //    console.log(message.Type + ": " + message.Body);
        //});
    }

    // обрабатывает асинхронные ответы от сервера
    function ResponseUnwrapper(callback) {
        //console.warn("ResponseUnwrapper");
        //console.log(callback);
        return function (response) {
            //console.warn("ResponseUnwrapper: response");
            //console.log(response);
            ResponseMessageWrapper(response.data.Messages);
            if (typeof callback == "function") callback(response.data.Data);
        };
    }

    function ResponsePromiseWrap() {

    };

    function CreateDateObj(line) {
        var date = new Date(line);
        var day = date.getDate();           // yields 
        var month = date.getMonth();    // yields month
        var year = date.getFullYear();      // yields year
        var hour = date.getHours();         // yields hours 
        var minute = date.getMinutes();     // yields minutes
        var second = date.getSeconds();     // yields seconds
        var millisec = date.getMilliseconds();
        var jsDate = Date.UTC(year, month, day, hour, minute, second, millisec);
        return new Date(jsDate);
    }

    Array.prototype.remove = function (item) {
        var index = this.indexOf(item);
        if (index != -1) {
            this.splice(index, 1);
        }
    }

    var dateWorker = {
        minusTZ: function (sourceDate) {
            return new Date(sourceDate.valueOf() + sourceDate.getTimezoneOffset() * 60000);
        },
        plusTZ: function (gtcDate) {
            return new Date(gtcDate.valueOf() - gtcDate.getTimezoneOffset() * 60000);
        }
    };

    function parodyObject(source, income) {
        var result = false;
        for (key in source) {
            if (source[key] != income[key]) {
                source[key] = income[key];
                result = true;
            }
        }
        return result;
    }

    var loopStarted = false;

    var loopCallback;

    var loopInProgress = false;

    var loopAmount = 0;

    function loopStart(interval) {
        //console.log("interval: " + interval);
        if (!loopInProgress && typeof loopCallback == "function") {
            //console.log("loop");
            loopAmount++;
            loopInProgress = true;
            setTimeout(loopCallback.bind(null, loopEndCallback), interval);
        }
    }

    function loopEndCallback() {
        //console.log("loopEndCallback");
        loopInProgress = false;
        if (loopAmount < 30) {
            //console.log("and en");
            loopStart(4000);
        }
    }

    var awaitTimer;

    function looper(callback) {
        //console.log("loop change");
        loopCallback = callback;

        if (!loopStarted) {
            //console.log("loop start");
            $(window).mousemove(function (event) {
                if (!awaitTimer) {
                    loopAmount = 0;
                    //console.log("M");
                    awaitTimer = setTimeout(function () {
                        awaitTimer = undefined;
                    }, 4000);
                    loopStart(0);
                }
            });
            loopStarted = true;
        }

        loopStart(0);
    }

    return {
        Loader: Loader,
        Clone: Clone,
        ResponseUnwrapper: ResponseUnwrapper,
        DateWithoutTimeZone: CreateDateObj,
        DateWorker: dateWorker,
        ParodyObject: parodyObject,
        Looper: looper
    };
}]);


