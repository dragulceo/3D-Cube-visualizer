var THREE = require('three.js');
var ColorProvider = require('../color-provider');

var geometry = new THREE.BoxGeometry( 1, 1, 1 );

var UNLIT_OPACITY = 0.1;
var Bar = function(size, spacing) {
  THREE.Object3D.call( this );

  this.size = size;
  this.elements = [];
  this.oldLitElements = 0;

  //TODO should be a singleton
  this.colorProvider = new ColorProvider(size, [[0, '#00FF00'], [0.5, '#FFFF00'], [1, '#FF0000']]);

  for (var i = 0; i < size; i++) {
    var material = new THREE.MeshLambertMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: UNLIT_OPACITY
    });

    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(0, i * spacing, 0);
    this.add(cube);
    this.elements.push(cube);
  }
}

Bar.prototype = Object.create(THREE.Object3D.prototype);

Bar.prototype.update = function(value) {
  var shouldLightElements = Math.round((value * this.size) / 256);
  //var shouldLightElements = Math.round(((value - 128) * this.size) / 128);

  var diff = shouldLightElements - this.oldLitElements;
  var litElements;
  if (!diff) {
    return;
  }

  litElements = this.oldLitElements + diff;
  for (var i = 0; i < this.size; i++) {
    var hex, opacity;
    if (i <= litElements) {
      hex = this.colorProvider.getColor(i);
      opacity = 1;
    } else {
      hex = 0xdddddd;
      opacity = UNLIT_OPACITY;
    }
    this.elements[i].material.color.setHex(hex);
    this.elements[i].material.opacity = opacity;
  }

  this.oldLitElements = litElements;
};

module.exports = Bar;
