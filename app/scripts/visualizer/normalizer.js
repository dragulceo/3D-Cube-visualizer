module.exports = function(input, outputSize) {
  var output = [];
  var sum = 0;

  var segmentSize = Math.floor(input.length / outputSize) || 1;
  for (var i = 0; i < input.length; i++) {
    if (i % segmentSize === 0 && i !== 0) {
      output.push(sum / segmentSize);
      sum = 0;
    }

    sum+= input[i];
  }
  var remainingElements = input.length % segmentSize;
  if (!remainingElements) {
    remainingElements = segmentSize;
  }

  output.push(sum / remainingElements);

  return output;
}
