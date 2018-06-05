var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xff1493);
document.body.appendChild( renderer.domElement );

var animate = function() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();
