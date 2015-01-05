/**
 * Create a hash table with `insert()`, `retrieve()`, and `remove()` methods.
 * Be sure to handle hashing collisions correctly.
 * Set your hash table up to double the storage limit as
 * soon as the total number of items stored is greater than
 * 3/4th of the number of slots in the storage array.
 * Resize by half whenever utilization drops below 1/4.
 */

var makeHashTable = function () {
  var result       = {};
  var storage      = [];
  var storageLimit = 4;
  var size         = 0;

  result.insert = function (key, value) {
    var idx    = getIndexBelowMaxForKey(key, storageLimit);
    var bucket = storage[idx] || [];
    var len    = bucket.length;
    var i;

    // determine whether the key, value pair already exists as an element in bucket
    for ( i = 0; i < len; i += 1 ) {
      // if the same key already exists, replace its old value with the new one
      if ( bucket[i][0] === key ) {
        bucket[i][1] = value;
        return;
      }
    }

    // at this point, the key, value pair doesn't exist in the bucket
    bucket.push( [key, value] );
    storage[idx] = bucket;

    // increase size
    size += 1;
  };

  result.retrieve = function (key) {
    var idx    = getIndexBelowMaxForKey(key, storageLimit);
    var bucket = storage[idx] || [];
    var len    = bucket.length;
    var i;

    for ( i = 0; i < len; i += 1 ) {
      if ( bucket[i][0] === key ) return bucket[i][1];
    }
  };

  result.remove = function (key) {
    var idx    = getIndexBelowMaxForKey(key, storageLimit);
    var bucket = storage[idx] || [];
    var len    = bucket.length;
    var value, i;

    for ( i = 0; i < len; i += 1 ) {
      if ( bucket[i][0] === key ) {
        value = bucket.splice(i, 1);

        size -= 1;

        return value[0];
      }
    }
  };

  result.adjustStorageLimit = function () {
    // for now, focus on case where you're doubling the storage limit

    // determine what the new storage limit is
    // create a new storage array
    // for each item in the current storage array
  };

  return result;
};

// This is a "hashing function". You don't need to worry about it, just use it
// to turn any string into an integer that is well-distributed between
// 0 and max - 1
var getIndexBelowMaxForKey = function (str, max) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash<<5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};
