var staging = document.getElementById('staging');
var ctx = staging.getContext('2d');
var staging2 = document.getElementById('staging2');
var ctx2 = staging2.getContext('2d');

var canv = document.getElementById('canvas');
var output = canv.getContext('2d');

function clear() {
  ctx.fillStyle = '#fff';
  ctx2.fillStyle = '#fff';
  ctx.fillRect(0, 0, 200, 100);
  ctx2.fillRect(0, 0, 200, 100);
}

var word = 'العربية';
ctx.font = '84px serif';
ctx2.font = '84px serif';
var colors = ['red', 'orange', 'green', 'blue', 'purple'];
var oldWidth = 0;

for (var w = 0; (w + 1) < word.length + 1; w++) {
  clear();
  ctx.fillStyle = colors[w % colors.length];
  ctx2.fillStyle = colors[w % colors.length];

  // even though Arabic is right-to-left
  // the X coordinate is the left-most point of the word or character
  ctx.fillText(word.substring(0, w + 1), 10, 70);

  var newWidth = ctx.measureText(word.substring(0, w + 1)).width;

  ctx2.fillText(word.substring(0, w), 10 + newWidth - oldWidth, 70);
  oldWidth = newWidth;

  var lastChars = ctx2.getImageData(0, 0, 300, 140).data;
  var newChars = ctx.getImageData(0, 0, 300, 140).data;

  for (var x = 299; x >= 0; x--) {
    for (var y = 0; y < 140; y++) {
      var r = lastChars[(y * 300 + x) * 4];
      var g = lastChars[(y * 300 + x) * 4 + 1];
      var b = lastChars[(y * 300 + x) * 4 + 2];

      var r2 = newChars[(y * 300 + x) * 4];
      var g2 = newChars[(y * 300 + x) * 4 + 1];
      var b2 = newChars[(y * 300 + x) * 4 + 2];

      if (r != r2 || g != g2 || b != b2) {
        // modified pixel
        output.fillStyle = 'rgb(' + [r2, g2, b2].join(',') + ')';
        output.fillRect(270 - Math.round(newWidth - x), y + 20, 1, 1);
      }
    }
  }
}
