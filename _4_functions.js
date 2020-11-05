(function () {
    // 4 Functions

    console.info("\n\n**Chapter 4 Functions**");

    // function literals
    console.info("\n*Function literals*");
    console.info("Functions can be declared as:");
    // Create a variable called add and store a function
    // in it that adds two numbers. */
    let add = function (a, b) {
        console.info(`DEBUG _add_ is a global function: _this_ is _${this}_`);
        return a + b;
    };
    console.info(`add = ${add}`);
    console.info(`=> add(2,3) = ${add(2, 3)}`);

    /* is there a difference using var or let?*/
    var add2 = function (a, b) {
        console.info(`DEBUG _add2_ is a global function defined with _var_ instead of _let_: _this_ is _${this}_`);
        return a + b;
    };
    add2(2, 3);
    /* apparently not even though the book says _this_ in this case is the global object for functions, using _var_ to declare them. Is that behavior superseded? */


    //Method Invocation Pattern
    console.info("\n*The Method Invocation pattern*");
    console.info("A method is a function that is bound to an object.");
    // Create myObject. It has a value and an increment
    // method. The increment methods takes an optional
    // parameter. If the argument is not a number, then 1
    // is used as the default.
    let myObject = {
        value: 0,
        increment: function (inc) {
            console.debug(`DEBUG _increment_ is a method: _this_ is ${this}`);
            this.value += (typeof inc === "number" ? inc : 1);
        },
        toString: function () {
            return `myObject [value=${this.value}]`;
        }
    };

    myObject.increment(); // 1
    console.info(`=> myObject.value after myObject.increment(): ${myObject.value}`);
    myObject.increment(2); // 3
    console.info(`=> myObject.value after myObject.increment(2): ${myObject.value}`);

    /*
     * The explanation under the heading 'The Function invocation Pattern' is not immediately clear. It starts of with explaning that _this_ is bound to the global
     * object in case of a function (which, btw I cannot replicate in node 15.1/ES6). But then it goes on explaning that _this_ is not correctly bound in
     * a nested function of a method. Is that the same thing?, ie. a global function and a nested function?
     * Lets test it:
     */

    // Augment myObject with a double method
    console.info("\n_this_ in a nested function is undefined. The outer method must first assign it to some varaiable (_that_).");
    myObject.double = function () {
        let that = this;
        let helper = function () {
            that.value = add(that.value, that.value); /* indeed a nested function has no _this_. The code using _this_ won't run. Too bad. */
        };
        helper();
    };
    myObject.double(); // 6
    console.info(`=> ${myObject.toString()}`);

    console.info("But for lambdas this is not necessary.");
    /* And what about lambda notation ? */
    myObject.triple = function () {
        let helper = () => this.value = 3 * this.value;
        helper();
    };
    myObject.triple(); // 18
    console.info(`=> ${myObject.toString()}`); /* yay, now it does work! */


    // The Constructor Invocation Pattern
    console.info("\n*The Constructor Invocation Pattern*");
    console.info(`This pattern was seemingly added to make it look OO- and java-like. Don't use it. 
All state is public and forgetting _new_ when using it makes for nasty errors.`);
    // Create a constructor function called Quo. It makes an object with a status property.
    let Quo = function (string) {
        this.status = string;
    };
    console.info(`let Quo = ${Quo}`);
    // Give all instances of Quo a public method called get_status.
    Quo.prototype.get_status = function () {
        return this.status;
    };
    console.info(`Quo.prototype.get_status = ${Quo.prototype.get_status}`);
    // Make an instance of Quo.
    let myQuo = new Quo("confused");
    console.info("let myQuo = new Quo(\"confused\");");
    console.info(`=> The status of myQuo is "${myQuo.get_status()}"`);
    /* Let's say this pattern is deprecated */


    //The Apply Invocation Pattern
    console.info(`\n*The Apply invocation pattern*
Earlier we defined a function sum that takes two parameters
We can also pass it an array of two elements.
Note that adding any subsequent array elements, will not change the outcome. They will be ignored`);

    // Make an array of 2 numbers and add them
    console.info(`let array = [3, 4];
    let sum = add.apply(null, array);`);
    let array = [3, 4];
    let sum = add.apply(null, array); // sum is 7
    console.info(`=> sum is ${sum}`);


    // statusObject does not inherit from Quo.prototype,
    // but we can invoke the get_status method on
    // statusObject even though statusObject does not have
    // a get_status method.
    /* Make an object with a status member */
    let statusObject = {
        status: "A-OK"
    };

    console.info("\nHere is a form of structural typing. As long as an argument behaves as expected for the function it is passed to, you can pass  it.");
    console.info("We can pass statusObject to the get_status method/function because that function simply looks for a _value_ variable.");
    console.info("Quo.get_status does not kwow anything about statusOject, but that does not matter.");
    let status = Quo.prototype.get_status.apply(statusObject); /* oh really? */
    console.info(`=> The status of statusObject should be 'A-OK', result: ${status}`);


    // Arguments
    console.info("\n*Arguments*");
    console.info("Within a function _arguments_ can be used to retrieve any number of (undeclared) arguments.");
    // Make a function that adds a lot of stuff

    console.info("mySum is a function that does not declare parameters");
    let mySum = function () { // sum has already been declared
        let mySum = 0;
        for (let i = 0; i < arguments.length; i++) {
            mySum += arguments[i];
        }
        return mySum;
    };
    console.info(`let mySum = ${mySum}`);
    console.info(`=> mySum(4, 8, 15, 16, 23, 42) should be 108: ${mySum(4, 8, 15, 16, 23, 42)}`);
    /* 'this is not a particularly useful pattern' */
    /* 'arguments is not really an array' */

    // Return
    /* no code here */

    // Exceptions
    console.info("\n*Exceptions*");
    console.info("You can throw and catch exceptions in the same vein as java Runtime exceptions.");
    let myAdd = function (a, b) { // add has
        if (typeof a !== "number" || typeof b !== "number") {
            throw {
                name: "TypeError",
                message: "myAdd needs numbers"
            };
        }
        return a + b;
    };
    console.info(`let myAdd = ${myAdd}`);
    try {
        console.info("calling myAdd() without arguments");
        myAdd();
    } catch (e) {
        console.info(`=> Exception caught: ${e.message}`);
    }
    /* very java like */

    // Augmenting types
    console.info("\n*Augmenting types*");
    console.info("The Function prototype can be used to add functions to existing types (strings, numbers etc) that were not there before.");
    /* define a method _method_ on the Function prototype to make it available to al functions*/
    Function.prototype.method = function (name, func) {
        if (!Function.prototype[name]) { /* added later on page 33 to avoid clashes (well does it?, but at least it's 'nicer' to already defined libraries) */
            this.prototype[name] = func;
        }
        return this;
    };
    console.info(`Function.prototype.method = ${Function.prototype.method}`);

    /* and use _method_ to augment numbers with an _integer_ method */
    console.info("Augmenting numbers with integer");
    Number.method("integer", function () {
        return Math[this < 0 ? "ceil" : "floor"](this); /* I just love this */
    });
    console.info(`Number.prototype.integer = ${Number.prototype.integer}`);
    console.info(`=> calling _integer_ on minus 10 thirds ((-10 / 3).integer()), should be -3: ${(-10 / 3).integer()}`);

    /* or use _method_ to augment String with a trim method */
    console.info("Augmenting String with trim");
    String.method("trim", function () {
        return this.replace(/^\s+|\s+$/g, "");
    });
    console.info(`String.prototype.trim = ${String.prototype.trim}`);
    console.info(`=> "  neat  ".trim() should result in "neat", and it is: "${"  neat  ".trim()}"`);

    // Recursion
    console.info("\n*Recursion*");
    console.info("The Towers of Hanoi");
    console.info("_hanoi_ is a recursive function because it calls itself.");
    let hanoi = function (disc, src, aux, dst) {
        if (disc > 0) {
            hanoi(disc - 1, src, dst, aux);
            console.debug(`Move disc ${disc} from ${src} to ${dst}`);
            hanoi(disc - 1, aux, src, dst);
        }
    };
    console.info(`let hanoi = ${hanoi}`);
    console.info("=>");
    hanoi(3, "Src", "Aux", "Dst");

    /* no DOM in node, so skipping this part */

    console.info("\n*Tail recursion*");
    console.info("_factorial_ is a tail recursive function, because the *last* thing it does is calling itself.");
    // make a factorial function with tail
    // recursion. It is tail recursive because
    // it returns the result of calling itself.

    /* ie. calling itself is the very last thing it does */

    // JavaScript does not currently optimize this form /* Not true anymore in ES6 according to SO */
    let factorial = function factorial(i, a) {
        a = a || 1;
        if (i < 2) {
            return a;
        } else {
            return factorial(i - 1, a * i);
        }
    };
    console.info(`let factorial = ${factorial}`);
    console.info(`10 factorial : ${factorial(10)}`);
    console.info(`which by the way is the nr of seconds in 6 weeks: factorial(10) / (60*60*24*7) = ${factorial(10) / (60 * 60 * 24 * 7)} 😀`);

    // Scope
    console.info("\n*Scope*");
    console.info("We print _a_ before it (seemingly) is declared. This is possible because in the compiled code,");
    console.info("the declaration is put at the start of the function.");
    console.info("This is true for _var_ but not for _let_ and _const_");
    /* _a_ has function scope */
    let foo = function () {
        console.info(`In the code _a_ is declared after this line, but when running _a_ is defined first. It's value is _${a}_, because its assignment has not yet been executed`);
        var a = 1; // _let_ and _const_ would not allow this
    };
    console.info(`let foo = ${foo}`);
    foo();

    // Closure
    console.info("\n*Closure*");
    console.info("meaning: a nested function has access to the state of the outer function");
    console.info("it closes over that state.");
    let someObject = function () {
        let value = 0;

        return {
            inc: function () { /* slightly simpler than the book provides */
                value += 1;
            },
            getValue() {
                return value; /* value is accessible here */
            }
        };
    }(); /* I took away the extra parentheses */
    someObject.inc();
    console.info(`=> someObject's value after 1 increment (by 1) is ${someObject.getValue()}`);

    // A better quo
    console.info("\nQuo as defined earlier can be rewritten in a better fashion using closures:");
    let quo = function (status) {
        return {
            get_status() {
                return status;
            }
        };
    };
    console.info(`let quo = ${quo}`);

    console.info("\nUsing closures the wrong way:");
    // BAD EXAMPLE
    // Make a function that assigns event handler functions to an array of nodes the wrong way
    // When you click on the node /* simulated here */, an alert box is supposed to display the ordinal of the node.
    // But it always displays the number of nodes instead
    let add_the_handlers = function (nodes) {
        let i; /* _i_ is shared by all onclick function instances */
        for (i = 0; i < nodes.length; i++) { /* and the same _i_ is mutated here*/
            nodes[i].onclick = function () {
                console.info(`ordinal: ${i}`);
            };
        }
    };
    console.info(`let add_the_handlers = ${add_the_handlers}`);
    let nodes = [{}, {}, {}];
    add_the_handlers(nodes);
    // simulate clicking the nodes
    console.info("=>");
    for (let j = 0; j < nodes.length; j++) {
        nodes[j].onclick();
    }
    /* The ordinal is always 3 because the onclick functions close over the shared mutable variable _i_
       instead there should be a separate state for all onclick functions, and it should not be mutable */

    // BETTER EXAMPLE
    // Make a function that assigns event handler functions to an array of nodes.
    // When you click on the node, an alert box will display the ordinal of the node.
    let add_the_handlers2 = function (nodes) {
        let helper = function (i) { /* the passed value of i is the state to close over */
            const ordinal = i; /* not necessary, but added to stress immutability*/
            return function () {
                console.info(`ordinal ${ordinal}`);
            };
        };
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].onclick = helper(i);
        }
    };
    console.info("This is the right way:");
    console.info(`let add_the_handlers2 = ${add_the_handlers2}`);

    add_the_handlers2(nodes);
    console.info("=>");
    for (let j = 0; j < nodes.length; j++) {
        nodes[j].onclick();
    }

    // Callbacks
    /* node code*/

    // Module
    console.info("\n*Modules*");
    String.method("deentityify",
        function () {
            // The entity table. It maps entity names to characters.
            let entity = {
                quot: "\"",
                lt: "<",
                gt: ">"
            };
            return function () {
                return this.replace(/&([^&;]+);/g, function (a, b) {
                    let r = entity[b];
                    return typeof r === "string" ? r : a;
                });
            };
        }()
    );
    console.info(`String.prototype.deentityify = ${String.prototype.deentityify}`);
    console.info("NB The code you see outputted here is not the actual code, but the result of it...");
    console.info("The entity table is hidden and can never be accessed, not even by new functions that are added to deentityify later on");
    console.info(`=> "&lt;&quot;&gt;".deentityify() = ${"&lt;&quot;&gt;".deentityify()}`);
    /* What I fail to see is how you could access entity, had you put it in deentityify directly */

    // Cascade
    /* Also called Fluent pattern */
    /* return _this_ instead of _undefined_ so you can chain method calls on the same object */
    /* you get don't you? */

    // Curry
    /* After famous computer scientist Haskell Curry */
    console.info("\n*Curry*");
    console.info("Currying a function results in a new function that does the same thing, but is has part of the original's parameters already entered.");
    Function.method("curry", function () {
        let slice = Array.prototype.slice, /* this workaround is explained in the book */
            args = slice.apply(arguments),
            that = this; /* store the arguments for _curry_ and the function it's called on */
        return function () {
            return that.apply(null, args.concat(slice.apply(arguments))); /* nifty: the argument for _curry_ precede all arguments for the eventual function call */
        };
    });
    console.info(`Function.prototype.curry = ${Function.prototype.curry}`);
    let add1 = add.curry(1);
    console.info(`We've curried _add_ with argument numeric 1 in _add1_. So add1(6) will give you ${add1(6)}`);

    // Memoization
    console.info("\nMemoization");

    /* I added a track_calls function that keeps track of all calls to a supplied function */
    let track_calls = function (track_object, fn) {
        return function () {
            track_object.calls += 1;
            fn.apply(null, arguments);
        };
    };
    let tracker = {calls: 0}; /* not really elegant but I can't think of anything better right now */
    let fibonacci = track_calls(tracker, function fib(n) {
        if (n < 2) {
            return n;
        } else {
            return fibonacci(n - 1) + fibonacci(n - 2); /* important here  to not call fib, but the tracked function */
        }
    });

    console.info(`let fibonacci = ${fibonacci}`);
    for (let i = 0; i < 11; i++) {
        console.info(`=> ${i}: ${fibonacci(i)}`);
    }

    console.info(`It works but is inefficient because the function is often called (${tracker.calls} times!) on mostly the same values, 
    which could also have been stored somewhere after calculation.`);

    let memo_fibo = function () {
        let memo = [0, 1];
        let fib = function (n) {
            let result = memo[n];
            if (typeof result !== "number") {
                result = fib(n - 1) + fib(n - 2);
                memo[n] = result;
            }
            return result;
        };
        return fib;
    }();

    console.info(`\nlet memo_fibo = function () {
    let memo = [0, 1];
    let fib = function (n) {
        let result = memo[n];
        if (typeof result !== 'number') {
            result = fib(n - 1) + fib(n - 2);
            memo[n] = result;
        }
        return result;
    };
    return fib;
    }();`);
    for (let i = 0; i < 11; i++) {
        console.info(`=> ${i}: ${memo_fibo(i)}`);
    }
    console.info("This works efficiently, but we could extract the memoization function to make it more general.");

    let memoizer = function (track_object, memo, formula) { /* call tracking built-in */
        let recur = function (n) {
            let result = memo[n];
            if (result === undefined) { /* slightly altered to allow for non-numeric types as well */
                track_object.calls += 1;
                result = formula(recur, n);
                memo[n] = result;
            }
            return result;
        };
        return recur;
    };
    console.info(`let memoizer = ${memoizer}`);

    tracker = {calls: 0};
    let ultimate_fibonacci = memoizer(tracker, [0, 1], function (recur, n) {
        return recur(n - 1) + recur(n - 2);
    });
    console.info("We've redefined fibonacci to make use of _memoizer_");
    console.info(`let ultimate_fibonacci = memoizer([0,1], function (recur, n){
    return recur(n-1) + recur(n-2);
});`);
    for (let i = 0; i < 11; i++) {
        console.info(`=> ${i}: ${ultimate_fibonacci(i)}`);
    }
    console.info(`The number of times something had to be calculated is now ${tracker.calls}!`);
}());