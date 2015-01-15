var THREE = require('three.js');
var Stats = require('stats.js');
var OrbitControls = require('../utils/OrbitControls')
var Cube = require('./3DObjects/cube')
var visualizerEl = document.querySelector('.visualizer');
var normalizer = require('./normalizer');
var CanvasVizualizer = require('./Dev/canvas-visualizer');

var canvasVizualizer = new CanvasVizualizer(document.querySelector('.canvas-visualizer > canvas'));

var WIDTH = visualizerEl.offsetWidth;
var HEIGHT = visualizerEl.offsetHeight;

var SIZE = 8;//number of elements in the cube

var renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);

visualizerEl.appendChild(renderer.domElement);

var stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
stats.domElement.style.right = '0px';
stats.domElement.style.zIndex = 100;
document.body.appendChild(stats.domElement);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
camera.position.set(0, 10, 35);
scene.add(camera);

//var orbitControls = new THREE.OrbitControls(camera);
//orbitControls.damping = 0.2;
//orbitControls.addEventListener( 'change', render );

var light = new THREE.PointLight(0xffffff, 1, 0);
light.position.set( 10, 20, 30 );
scene.add(light);

var cube = new Cube(SIZE, 2);
cube.rotation.x = .5;
scene.add(cube);

var render = function() {
  requestAnimationFrame(render);
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
  stats.update();
}

var update = function(data) {
  cube.update(normalizer(data, SIZE * SIZE));
  canvasVizualizer.update(data);
}

render();

module.exports = {
  update: update
}
