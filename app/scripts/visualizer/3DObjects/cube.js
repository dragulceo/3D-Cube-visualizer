var THREE = require('three.js');
var Face = require('./face');

var Cube = function(size, spacing) {
  THREE.Object3D.call(this);

  this.size = size;
  this.faces = [];

  var offset = (size - 1) / 2;
  for (var i = 0; i < size; i++) {
    var face = new Face(size, spacing);
    face.position.set(0, 0, spacing * (i - offset));
    this.add(face);
    this.faces.push(face);
  }
}

Cube.prototype = Object.create(THREE.Object3D.prototype);

Cube.prototype.update = function(data) {
  var length = Math.floor(data.length / this.faces.length), arr = new Array(length);
  for (var i = 0; i < this.faces.length; i++) {
    for(var j = 0; j < length; j++) {
      arr[j] = data[length * i + j];
    }
    this.faces[i].update(arr);
  }
}

module.exports = Cube;
