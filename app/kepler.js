// 1 unit here is 1 billion meters in Real Life.

var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;

// Astronomy.
var G = 6.67384e-11; // m3 kg-1 s-2

function createCamera() {
  camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  camera.position.set(0, 20, 0);
  return camera;
}

function createRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
  var container = document.getElementById("canvas");
  container.appendChild(renderer.domElement);
  return renderer;
}

function createSphere(r, x, y, z, textureUrl, astro) {
  var geometry = new THREE.SphereGeometry(r, 32, 16);
  var texture = THREE.ImageUtils.loadTexture(textureUrl);
  var material = new THREE.MeshBasicMaterial({ map: texture });
  var sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(x, y, z);
  sphere.astro = astro;
  return sphere;
}

function orbit(planet, star) {
}

var scene = new THREE.Scene();

var camera = createCamera();
scene.add(camera);
// Configure zoom of camera.
camera.lookAt(scene.position);

var controls = new THREE.OrbitControls(camera);

// Light.
var ambientLight = new THREE.AmbientLight(0xCCCCCC);
scene.add(ambientLight);

var renderer = createRenderer();

var star = createSphere(3, 0, 0, 0, "/fur-wallpaper-8.jpg", { mass: 1.988435e30 });
scene.add(star);
var planet = createSphere(3, 150, 0, 0, "/planet.jpg", { mass: 5.9721986e24 });
planet.angle = 0;
scene.add(planet);

function animate() {
  // render texture
  renderer.render(scene, camera);

  // rotate star
  star.rotation.y += 0.05;

  // make the planet orbit the star
  orbit(planet, star);

  window.requestAnimationFrame(animate);
}

window.requestAnimationFrame(animate);