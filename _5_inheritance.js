(function () {
    // 5 Inheritance
    console.info("\n\n**Chapter 5 Inheritance**");
    console.info("\n*Pseudoclassical*");
    console.info("\n*Object Specifiers*");
    console.info("\n*Prototypal*");
    console.info("Prototypal inheritance is simpler");
    let prototypal_mammal = {
        name: "Herb the Mammal",
        get_name: function () {
            return this.name;
        },
        says: function () {
            return this.saying || "";
        }
    };

    let prototypal_cat = Object.create(prototypal_mammal);
    prototypal_cat.name = "Henrietta"; /* uses existing property */
    prototypal_cat.saying = "Meow!"; /* is sort of abstract in mammal */
    prototypal_cat.purr = function (n) { /* add new behavior */
        let s = "";
        for (let i = 0; i < n; i += 1) {
            if (s) {
                s += "-";
            }
            s += "r";
        }
        return s;
    };
    prototypal_cat.get_name = function () { /* alter existing behavior */
        return this.says() + " " + this.name + " " + this.says();
    };
    console.info(`${prototypal_cat.get_name()}`);

    console.info("*Functional*");
    console.info("Yet a better way to deal with objects");
    let mammal = function (spec) {
        let that = {};
        that.get_name = function () {
            return spec.name;
        };
        that.says = function () {
            return spec.saying || "";
        };
        return that;
    };

    let cat = function (spec) {
        spec.saying = spec.saying || "meow";
        let that = mammal(spec);
        that.purr = function (n) {
            let s = "";
            for (let i = 0; i < n; i += 1) {
                if (s) {
                    s += "-";
                }
                s += "r";
            }
            return s;
        };
        that.get_name = function () {
            return that.says() + " " + spec.name + " " + that.says();
        };
        return that;
    };

    // We make a _superior_ method that takes a method and returns a function that invokes that method
    Object.method("superior", function (name) {
        let that = this,
            method = that[name];
        return function () {
            return method.apply(that, arguments);
        };
    });
    /* I don't see the 'superior' in this. What version of the method you get depends on the calling order, right? It just saves a method reference in a function. */

    let coolcat = function (spec) {
        let that = cat(spec),
            super_get_name = that.superior("get_name"); // just try putting this after line 82
        that.get_name = function () {
            return `like ${super_get_name()} baby`;
        };
        return that;
    };

    let myCoolCat = coolcat({name: "Brix"});
    console.info(`my cool cat's name = ${myCoolCat.get_name()}`);

    // Parts
    /* The code was not immediately obvious to me. Copying it from the book helped me understand.
     * At the same time taking the liberty to improve it - forgive my hubris - only superficial though */
    let eventuality = function (that) {
        let registry = {};

        that.fire = function (event) { /* add a _fire_ method */
            let handler_array,
                type = (typeof event === "string") ? event : event.type;

            // If an array of handlers exist for this event, then loop through it and execute the handlers in order.

            /* nit: is the book's code properly indented ? */
            if (Object.prototype.hasOwnProperty.call(registry, type)) {
                handler_array = registry[type];
                for (let i = 0; i < handler_array.length; i += 1) { /* I do like this better than _i++_ */
                    let handler = handler_array[i];

                    // A handler record contains a method and an optional array of parameters. If the method is a name, look up the function

                    let func = handler.method; /* This makes me think: objects, records and structs in strongly typed languages really define a contract.
                                            * Here being the fact that _handler_ *has* a _method_ */
                    if (typeof func === "string") {
                        func = this[func]; /* what is this here? */
                    }
                    func.apply(this, handler.parameters || [event]);
                }
            }
            return this;
        };

        // Register an event. Make a handler record. Put it in a handler array, making one if it doesn't yet exist for this type.

        that.on = function (type, method, parameters) { /* add an _on_ method */
            let handler = {
                method: method,
                parameters: parameters
            }; /* might this serve as a contract? */
            if (Object.prototype.hasOwnProperty.call(registry, type)) {
                registry[type].push(handler);
            } else {
                registry[type] = [handler];
            }
            return this;
        };

        return that;
    };
}());