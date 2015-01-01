$(function(){
  // --------------STEP 1--------------
  // wrap every word in every `<p>` tag with a `<span>` tag.
  // for example: <p>Hey there</p> 
  // becomes: <p><span>Hey</span><span>there</span></p>
  // HINT: the `split` array method is your friend

  var addSpan = function () {
    $('p').each(function (idx, p) {
      var $pElement = $(p);

      var text = $pElement.text().trim().split(' ').reduce(function (acc, cur) {
        return acc + '<span>' + cur + '</span>' + ' ';
      }, '');

      $pElement.html( text );
    });
  };

  // --------------STEP 2--------------
  // Next, change spans to random colors, once per second

  var changeSpanColors = function () {
    $('span').each(function (idx, s) {
      var r = Math.floor( Math.random() * 256 );
      var g = Math.floor( Math.random() * 256 );
      var b = Math.floor( Math.random() * 256 );
      var rgb = 'rgb(' + r + ', ' + g + ', ' + b + ')';
      $(s).css( 'background-color', rgb );
    });
  };

  addSpan();
  setInterval(changeSpanColors, 1000);
});