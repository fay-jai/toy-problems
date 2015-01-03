
/**
 * Given a roman numeral as input, write a function that converts the roman
 * numeral to a number and outputs it.
 *
 * Ex:
 * translateRomanNumeral("LX") // 60
 *
 * When a smaller numeral appears before a larger one, it becomes 
 * a subtractive obertion. You can assume only one smaller numeral
 * may appear in front of larger one.
 *
 * Ex:
 * translateRomanNumeral("IV") // 4
 *
 */

var DIGIT_VALUES = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
};

var translateRomanNumeral = function (romanNumeral) {
  if (typeof romanNumeral !== 'string') {
    throw 'function "translateRomanNumeral" can only process strings';
  }

  var len    = romanNumeral.length;
  var result = 0;
  var i, current, next;

  // base case
  if (len <= 0) return 0;
  if (len === 1) return DIGIT_VALUES[ romanNumeral ];

  for (i = 0; i < len - 1; i += 1) {
    current = DIGIT_VALUES[ romanNumeral[i] ];
    next    = DIGIT_VALUES[ romanNumeral[i + 1] ];

    result += (current >= next ? current : -current);
  }

  return result + DIGIT_VALUES[ romanNumeral[i] ];
};