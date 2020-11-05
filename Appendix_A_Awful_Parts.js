(function () {
    console.info("**Awful Parts**");
    // Global Variables
    /* sure */

    // parseInt
    console.info("\n*parseInt*");
    console.info(`=> parseInt("16") = ${parseInt("16")} // OK`);
    console.info(`=> parseInt("16 tons") = ${parseInt("16 tons")} // NOT OK`);

    /* and also ('a tin teardrop') parseFloat */
    // parseFloat
    console.info("\n*parseFloat*");
    console.info(`=> parseFloat("16") = ${parseFloat("16")} // OK`);
    console.info(`=> parseFloat("16 tons") = ${parseFloat("16 tons")} // NOT OK`);

    // Floating Point
    /* well that's just IEE754, don't blame javascript for it. Many other languages are bad at this at well */
    /* just be aware! of it */

    // Nan
    console.info("\n*NaN*");
    console.info(`=> typeOf NaN = "${typeof NaN}"`);
    console.info(`=> NaN !== 0: ${NaN !== 0}`);
    console.info(`=> NaN === NaN: ${NaN === NaN}`);
    console.info(`=> NaN !== NaN: ${NaN !== NaN}`);
    console.info(`=> + "oops" = ${+"oops"}`);
    console.info(`=> isNaN(NaN) = ${isNaN(NaN)}`);
    console.info(`=> isNaN(0) = ${isNaN(0)}`);
    console.info(`=> isNaN("oops") = ${isNaN("oops")}`);
    console.info(`=> isNaN("0") = ${isNaN("0")}`);

    // Arrays and Falsy Values
    console.info("\n*Arrays*");

    let is_array1 = function (maybe_array) {
        return maybe_array && typeof maybe_array === "object" && maybe_array.constructor === Array;
    };

    console.info(`let is_array1 = ${is_array1}`);
    console.info(`=> is_array1([]): ${is_array1([])}`);
    console.info(`=> is_array1({}): ${is_array1({})}`);
    console.info(`=> is_array1("array"): ${is_array1("array")}`);
    console.info(`=> is_array1(0): ${is_array1(0)} ???`); /* WTF? */
    console.info(`=> is_array1(null): ${is_array1(null)}`); /* 'works' for all falsy values */

    /* Let's try another version */
    let is_array2 = function (maybe_array) {
        return Object.prototype.toString.apply(maybe_array) === "[object Array]";
    };

    console.info(`\nlet is_array2 = ${is_array2}`);
    console.info(`=> is_array2([]): ${is_array2([])}`);
    console.info(`=> is_array2({}}): ${is_array2({})}`);
    console.info(`=> is_array2("array"): ${is_array2("array")}`);
    console.info(`=> is_array2(0): ${is_array2(0)}`);
    console.info(`=> is_array2(null): ${is_array2(null)}`);
    /* I'd use this! */

    /* The book is not wrong, because the code there is slightly different there and works correctly, because 0 and NaN are falsy and have to be coerced into a boolean
     * because the expression is part of an if-statement.
     * In this case there is no coercion. 0 && false -> 0 and 0 && true -> 0
     * Gotcha!
     */
    console.log("Explanation");
    console.log("let falsy_value = 0 | NaN | '' | false | null | undefined // pseudo-code");
    console.log("=> (falsy_value && true) = falsy_value not false");
    /* true and false are not even being evaluated because 0 is falsy */

    // hasOwnProperty
    // don't mess with it

    // Object
    // be wary of special names when using objects

}());