const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
const controls = new THREE.OrbitControls(camera, renderer.domElement);

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 45, 70);
controls.update();

function animate() {
  requestAnimationFrame(animate);
  light.position.set(
    camera.position.x + 10,
    camera.position.y + 10,
    camera.position.z + 10
  );

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  renderer.render(scene, camera);
}

const loader = new THREE.GLTFLoader();

loader.load(
  "/model/3D_Map3_V7.gltf",
  function (gltf) {
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
scene.add(hemiLight);

light = new THREE.SpotLight(0xffa95c, 4);
light.position.set(-50, 50, 50);
light.castShadow = true;
scene.add(light);

scene.traverse((n) => {
  if (n.isMesh) {
    n.castShadow = true;
    n.receiveShadow = true;
    if (n.material.map) n.material.map.anisotropy = 16;
  }
});

function update() {
  renderer.render(scene, camera);
  requestAnimationFrame(update);
}
update();
