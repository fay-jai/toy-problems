/*

In England the currency is made up of pound, £, and pence, p, and there are eight coins in general circulation:

1p piece
2p piece
5p piece
10p piece
20p piece
50p piece
1 euro (100p)
2 euro (200p)

It is possible to make £2 in the following way:

1 * £1 + 1 * 50p + 2 * 20p + 1 * 5p + 1 * 2p + 3 * 1p
How many different ways can £2 be made using any number of coins?

example usage of `makeChange`:

// aka, there's only one way to make 1p. that's with a single 1p piece
makeChange(1) === 1
// aka, there's only two ways to make 2p. that's with two, 1p pieces or with a single 2p piece
makeChange(2) === 2
*/

var makeChange = function (total) {
  if (arguments.length < 1 || typeof total !== 'number') {
    throw new Error('Need to provide a numeric value');
  }

  var inner = function (total, coins) {
    // base cases
    if (total < 0) {
      return 0;
    } else if (total === 0) {
      return 1;
    }

    var result = 0;
    var i, temp;

    /*
     * As an example, if total === 16, then what you want to calculate is the sum of the following:
     * 1) The number of ways to use one 10 coin and makeChange(6, with only coins less than or equal to 10)
     * 2) The number of ways to use one 5 coin and makeChange(11, with only coins less than or equal to 5)
     * 3) The number of ways to use one 2 coin and makeChange(14, with only coins less than or equal to 2)
     * 4) The number of ways to use one 1 coin and makeChange(15, with only coins less than or equal to 1)
     * The reason you have to stipulate what coins are available to use is because by doing so, you avoid
     * double counting the combinations.
    */

    // for each coin available to use
    for (i = 0; i < coins.length; i += 1) {
      // subtract that amount from total and call makeChange with new total and updated coinsAvailable
      result += inner( total - coins[i], coinsAvailable(coins[i]) );
    }

    return result;
  };

  return inner( total, coinsAvailable(total) );
};

var coinsAvailable = function (num) {
  var coins = [200, 100, 50, 20, 10, 5, 2, 1];
  return coins.filter(function (n) {
    return n <= num;
  });
};