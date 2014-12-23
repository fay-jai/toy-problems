/**
 * Implement a function that takes a URL and a callback and makes a JSONP
 * GET request to that URL.
 *
 * We've provided the following API endpoint:
 *   http://toy-problems.hackreactor.com/jsonparty
 *
 * Your function should accept a call with that URL, and call the callback
 * with the response data from the server. You should NOT return the response
 * from the server, only the wrapped data! jQuery is not available, and you won't
 * be able to do this using a native XMLHttpRequest.
 *
 * Example:
 *   jsonpRequest('http://toy-problems.hackreactor.com/jsonparty', function (data) {
 *     console.log(data.response); // "Aw yeah, now we're JSONPartying"
 *     console.log(data.random); // 3558
 *   });
 *
 *   // Subsequent requests should have properly random responses:
 *   jsonpRequest('http://toy-problems.hackreactor.com/jsonparty', function (data) {
 *     console.log(data.random); // 1733
 *   });
 *
 * Hint: The API accepts a `callback` parameter. What is that for?
 * See http://en.wikipedia.org/wiki/JSONP if you need more information
 * about this exciting AJAX protocol!
 *
 */

var jsonpRequest = function(url, callback) {
};
