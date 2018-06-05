var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshPhongMaterial({ color: 0xff1493 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

var light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(100, 100, 100);
scene.add(light);

camera.position.z = 5;

var animate = function() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.025;
  cube.rotation.y += 0.025;
  renderer.render(scene, camera);
};

animate();
