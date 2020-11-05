(function () {
    console.info("**Chapter 3 Objects**\n");

    /*
     * letter: [A-Za-z]
     * digit: [0-9]
     * underscore: _
     * name: [letter][letter digit underscore]*
     *
     */
    let empty_object = {};

    // object literals
    console.info("*Object Literals*\n");
    let stooge = {
        "first-name": "Jerome", // object property name must be quoted, because it is not a legal javascript _name_
        "last-name": "Howard"
    };
    console.info(`let stooge = {
    "first-name": "Jerome", // object property name must be quoted, because it is not a legal javascript name
    "last-name": "Howard"
    };`);
    console.info("Retrieve property with 'stooge[\"first-name\"]': ", stooge["first-name"]);

    // nested object
    let flight = {
        airline: "Oceanic",
        number: 815,
        departure: {
            IATA: "SYD",
            time: "2004-09-22 14:55",
            city: "Sydney"
        },
        arrival: "LAX",
        time: "2004-09-23 10:42",
        city: "Los Angeles"
    };
    console.info(`\nlet flight = {
    airline: "Oceanic",
    number: 815,
    departure: {
        IATA: "SYD",
        time: "2004-09-22 14:55",
        city: "Sydney"
    },
    arrival: "LAX",
    time: "2004-09-23 10:42",
    city: "Los Angeles"
};`);
    console.info("Retrieve property with 'flight.departure.IATA': ", flight.departure.IATA);
    console.info("Retrieve undefined property with 'flight.status': ", flight.status);
    try {
        console.info("Retrieve property of undefined with 'flight.equipment.model': ");
        console.info(flight.equipment.model);
    } catch (e) {
        console.info("\tCaught error:", e.message);
    }
    console.info(`Retrieve property of undefined with 'flight.equipment && flight.equipment.model': ${flight.equipment && flight.equipment.model}`);

    // update
    stooge["first-name"] = "Moe";
    console.info(`Retrieve updated property with 'stooge["first-name"]': ${stooge["first-name"]}`);

    stooge["middle-name"] = "middle-stooge";
    console.info(`Retrieve property of augmented object with 'stooge["middle-name"]': ${stooge["middle-name"]}`);

    let x = stooge;
    x.nickname = "Curly";
    let nick = stooge.nickname;
    console.info(`nick is 'Curly' because x and stooge are references to the same object: ${nick}`);

    // Prototype

    console.info("\n*Prototype*\n");

    //create a new object from a prototype
    if (typeof Object.createFrom !== "function") { // 'create' is a built-in starting from ES5
        Object.createFrom = function (o) {
            let F = function () {
            };
            F.prototype = o;
            return new F();
        };
    }
    console.info(`Object.createFrom = ${Object.createFrom}`);

    let another_stooge = Object.createFrom(stooge);
    another_stooge["first-name"] = "Shemp";
    console.info(`another stooge is created from stooge, but is a new reference. another_stooge.first-name = ${another_stooge["first-name"]}`);
    console.info(`stooge is unchanged stooge.first-name = ${stooge["first-name"]}`);

    // reflection
    console.info("\n*Reflection*");
    console.info("\nThe type of a property is retrieved wth 'typeof property'");
    console.info(`typeof flight.number = ${typeof flight.number}`,);
    console.info(`typeof flight.status = ${typeof flight.status}`);
    console.info(`typeof flight.arrival = ${typeof flight.arrival}`);
    console.info(`typeof flight.manifest = ${typeof flight.manifest}`);
    console.info(`typeof flight.toString = ${typeof flight.toString}`);

    console.info("\nhasOwnProperty returns true if the object defines that property");
    console.info(`flight.hasOwnProperty("number"): ${Object.prototype.hasOwnProperty.call(flight, "number")}`); // the actual code is actually correct
    console.info(`flight.hasOwnProperty("constructor"): ${Object.prototype.hasOwnProperty.call(flight, "constructor")}`);

    // enumeration

    console.info("\n*Enumeration*");
    console.info("Enumeration shows all properties of an object");
    // order is not guaranteed
    console.info(`for (let name in another_stooge) {
    if (typeof another_stooge[name] !== 'function') { // intellij warns that hasOwnProperty check is *probably* missing but that would change the output, because most properties are in the prototype!
        console.info(\`name: \${another_stooge[name]}\`)
    }
}`);
    for (let name in another_stooge) {
        if (typeof another_stooge[name] !== "function") { // intellij warns that hasOwnProperty check is *probably* missing but that would change the output, because most properties are in the prototype!
            console.info(`name: ${another_stooge[name]}`);
        }
    }

    // order is guaranteed
    console.info("\nAgain with fixed properties in guaranteed order:");
    console.info(`const properties = ['first-name', 'middle-name', 'last-name', 'profession'];
    for (let i = 0; i < properties.length; i++) {
    console.log(\`\${properties[i]}: \${another_stooge[properties[i]]}\`);
}`);
    const properties = ["first-name", "middle-name", "last-name", "profession"];
    for (let i = 0; i < properties.length; i++) {
        console.log(`${properties[i]}: ${another_stooge[properties[i]]}`);
    }

    //delete

    console.info("\n*Delete*");
    console.info("_delete_ deletes a property, and this has the effect that it's prototype property of the same name (if it's there) is now visible");
    another_stooge.nickname = "Moe";
    console.info(`=> original nickname: ${another_stooge.nickname}`);
    console.info("Delete reveals prototype value");
    console.info("delete another_stooge.nickname;");
    delete another_stooge.nickname;
    console.info(`=> nickname after delete: ${another_stooge.nickname}`);
    delete stooge.nickname;
    console.info("delete another_stooge.nickname;");
    console.info(`=> nickname after delete stooge.nickname: ${another_stooge.nickname}`);

// Global atonement
// no examples
}());