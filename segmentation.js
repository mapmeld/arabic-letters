var colors = ['red', 'orange', 'green', 'blue', 'purple'];

function processWord(word) {
  for (var w = 0; w < word.length; w++) {
    var letter = document.createElement('span');
    letter.style.color = colors[w % colors.length];
    letter.innerHTML = '&zwj;' + word[w] + '&zwj;';
    document.getElementById('output').appendChild(letter);
  }
}

processWord('العربية');

document.getElementById('try').onclick = function() {
  var word = document.getElementById('wordEntry').value;
  processWord(word);
};
