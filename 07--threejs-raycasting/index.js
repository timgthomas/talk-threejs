var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

let loader = new THREE.ColladaLoader();
let barrel, initialBarrelMaterial;
loader.load('barrel.dae', model => {
  barrel = model.scene;
  barrel.scale.set(1, 1, 1)
  scene.add(model.scene);
  initialBarrelMaterial = barrel.children[0].children[0].material;
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
  raycaster.setFromCamera(mouse, camera);
};

animate();

document.addEventListener('keydown', e => {
  if (!barrel) { return; }
  if (e.key === 'a') {
    barrel.position.x -= 0.1;
  } else if (e.key === 'd') {
    barrel.position.x += 0.1;
  } else if (e.key === 'w') {
    barrel.position.z -= 0.5;
  } else if (e.key === 's') {
    barrel.position.z += 0.5;
  }
});

document.addEventListener('mousemove', e => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
  let intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length) {
    barrel.children[0].children[0].material = new THREE.MeshBasicMaterial({ color: 0xff1493 });
  } else {
    barrel.children[0].children[0].material = initialBarrelMaterial;
  }
});
