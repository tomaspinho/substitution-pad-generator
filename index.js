var numSymbolsPerLetter = parseInt(process.argv[2]);

if (!numSymbolsPerLetter) {
  console.log('No valid number of symbols was passed as anargument');
  process.exit(-1);
}

var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var validChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz!@#$%&=?£+*<>";

var numSymbols = alphabet.length * numSymbolsPerLetter;

var generatedSymbols = "";

var i;
for (i = 0; i < numSymbols; i++) {
  generatedSymbols += validChars[Math.floor(Math.random()*validChars.length)];
}

function initializeMatrix(rows) {
  var matrix = [];
  for (var i = 0; i < rows; i++) {
    matrix[i] = [];
  }
  return matrix;
}


function writeSymbolsToMatrix(generatedSymbols, matrix, symbolsPerRow, numSymbolsPerLetter) {
  var i = 0;
  for (var row = 1; row < 6; row += 3) {
    for (var col = 0; col < symbolsPerRow; col++) {
      if ((col + 1) % (numSymbolsPerLetter + 1) == 0) {
        matrix[row][col] = '|';
        col++;
      }
      matrix[row][col] = generatedSymbols[i];
      i++;
    }
  }
}


function writeLettersToMatrix(alphabet, matrix, symbolsPerRow, numSymbolsPerLetter) {
  for (var i = 0; i < alphabet.length; i++) {
    var row = Math.floor(i / (alphabet.length / 2));
    if (row % 3 != 0) row += 3 - row % 3;
    var col = i % (alphabet.length / 2) * (numSymbolsPerLetter + 1);
    if (col != 0) matrix[row][col - 1] = '|';
    matrix[row][col] = alphabet[i];
  }
}

function printMatrix (matrix) {
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j]) process.stdout.write(matrix[i][j]);
      else process.stdout.write(' ');
    }
    process.stdout.write('\n');
  }
}

var matrix = initializeMatrix(6);
var symbolsPerRow = (numSymbolsPerLetter + 1) * Math.floor(alphabet.length / 2) - 1;
writeSymbolsToMatrix(generatedSymbols, matrix, symbolsPerRow, numSymbolsPerLetter);
writeLettersToMatrix(alphabet, matrix, symbolsPerRow, numSymbolsPerLetter);
printMatrix(matrix);
