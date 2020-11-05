(function () {
    // Appendix B Bad Parts
    console.info("\n\n** Appendix B Bad Parts **");

    // == comparison
    console.info("\n* == comparison *");
    console.info(`=> "" == "0": ${"" == "0"}`);
    console.info(`=> 0 == "": ${0 == ""}`);
    console.info(`=> 0 == "0": ${0 == "0"}`);

    console.info(`\n=> false == "false": ${false == "false"}`);
    console.info(`=> false == "0": ${false == "0"}`);

    console.info(`\n=> false == undefined: ${false == undefined}`);
    console.info(`=> false == null: ${false == null}`);
    console.info(`=> null == undefined: ${null == undefined}`);

    console.info(`\n=> " \\t\\r\\n " == 0: ${" \t\r\n " == 0}`);

    // with Statement
    /* Just don't use it */

    // eval
    /* you probably don't need it. think again */

    // continue
    /* take it out whenever you come across it */

    // switch Fall Through
    /* it is error prone */

    // Block-less statements
    /* just do like the java-peoples */

    // ++ and --
    /* I find no offense here, but +=1 or -=1 looks nicer */

    // Bitwise operators
    /* javascript is really bad at them */

    // The function Statement Versus the function Expression
    /* just avoid hoisting, be more hip and say: let f = function(){} */

    // Typed Wrappers
    /* don't use new Boolean(false), use false
     * dont' use new Object(), use {}
     * don't use new Array(), use []
     */

    // new
    /* better not use it */

    // void
    console.info("* void *");
    console.info(`=> void 1 = ${void 1} ... really weird`);
    // Avoid void.

}());