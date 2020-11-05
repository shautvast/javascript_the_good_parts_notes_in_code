(function () {
    // 6 Arrays
    console.info("\n\n**Chapter 6 Arrays**");
    console.info("\n*Array literals*");
    let empty = [];
    let numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    console.info(`=> element 1 of empty array: ${empty[1]}`); // undefined
    console.info(`=> element 1 of non-empty array: ${numbers[1]}`); // 'one'
    console.info(`=> length of empty array: ${empty.length}`); // 0
    console.info(`=> length of non-empty array: ${numbers.length}`); // 10

    // arrays can contain any element type
    let misc = ["string", 98.6, true, false, null, undefined, ["nested", "array"], {object: true}, NaN, Infinity];

    // Length
    console.info("\n*Length*");
    let myArray = [1, 2, 3];
    console.info(`let myArray = [${myArray}]`);
    console.info(`=> myArray.length = ${myArray.length}`);
    console.info("Array length is not fixed. Let's add an element at index 8");
    myArray[8] = true;
    console.info(`=> myArray = [${myArray}]`);
    console.info(`=> myArray.length = ${myArray.length}`);
    console.info("Surprisingly you can set array length:");
    myArray.length = 10;
    console.info(`Just set it to 10. => myArray.length = ${myArray.length},  => myArray = [${myArray}]`);
    myArray.length = 2;
    console.info(`=> And now it's set to 2: [${myArray}]`);

    // Delete
    console.info("Delete element 1");
    delete myArray[1];
    console.info(`=> myArray = [${myArray}]`);

    // Enumeration
    console.info("C-style for is the only good way to enumerate over arrays.");

    // Confusion
    // Book says this is the way to detect an array:
    let is_array = function (value) {
        return Object.prototype.toString().apply(value) === "[object Array]";
    };

    // Methods
    // While this is interesting, it's not hard to understand, so I'm skipping this right now.


}());