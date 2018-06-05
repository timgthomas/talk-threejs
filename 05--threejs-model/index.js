var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let loader = new THREE.ColladaLoader();
let barrel;
loader.load('barrel.dae', model => {
  barrel = model.scene;
  barrel.scale.set(1, 1, 1)
  scene.add(model.scene);
});

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

var frontLight = new THREE.PointLight(0x7fff00, 1, 1000);
frontLight.position.set(100, 100, 100);
scene.add(frontLight);

var backLight = new THREE.PointLight(0xff1493, 1, 1000);
backLight.position.set(-100, -100, -100);
scene.add(backLight);

camera.position.z = 5;

var animate = function() {
  requestAnimationFrame(animate);
  if (!barrel) { return; }
  barrel.rotation.x += 0.025;
  barrel.rotation.y += 0.025;
  renderer.render(scene, camera);
};

animate();
