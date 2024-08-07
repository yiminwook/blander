import * as THREE from "three";
import gsap from "gsap";
import Stats from "stats.js";

// const orthographicCamera = new THREE.OrthographicCamera(
//   -(window.innerWidth / window.innerHeight), //left
//   window.innerWidth / window.innerHeight, //right
//   1, // top
//   -1, // bottom
//   0.1, // Near
//   1000 // Far
// );
// orthographicCamera.position.x = 1;
// orthographicCamera.position.y = 2;
// orthographicCamera.position.z = 5;
// orthographicCamera.lookAt(0, 0, 0);
// orthographicCamera.zoom = 0.5;
// orthographicCamera.updateProjectionMatrix();

export default function example() {
  const canvas = document.getElementById("three-canvas");

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    // alpha: true,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // 레티나 디스플레이 대응
  // renderer.setClearAlpha(0); // 캔버스 배경 투명하게, opacity
  // renderer.setClearColor(0x00ff00, 1); // 캔버스 배경 투명하게, hex, opacity

  const scene = new THREE.Scene();
  // scene.background = new THREE.Color("blue");
  // scene.fog = new THREE.Fog("blue", 8, 12);

  const axexHelper = new THREE.AxesHelper(3);
  scene.add(axexHelper);

  const gridHelper = new THREE.GridHelper(5, 5);
  scene.add(gridHelper);

  const stats = new Stats();
  document.body.appendChild(stats.dom);

  const derectionalLight = new THREE.DirectionalLight("white", 1);
  derectionalLight.position.set(1, 0, 2);
  scene.add(derectionalLight);

  const ambientLight = new THREE.AmbientLight("white", 0.5); // 전체적인 조명
  scene.add(ambientLight);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const meterial = new THREE.MeshStandardMaterial({ color: "seagreen" });
  const mesh = new THREE.Mesh(geometry, meterial);
  mesh.position.set(1, 0, 0);
  scene.add(mesh);

  const camera = new THREE.PerspectiveCamera(
    75, // FOV
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near
    1000 // Far
  );
  camera.position.set(1, 5, 5);
  camera.lookAt(mesh.position);
  scene.add(camera);

  const clock = new THREE.Clock();

  function draw() {
    // 360도 === 2 * Math.PI
    // 1초에 360도 회전
    // Math.PI / 180 = 1도
    const delta = clock.getDelta();
    mesh.rotation.y += delta;
    renderer.render(scene, camera); // 복수의 카메라를 사용할 수 있음
    stats.update();
    renderer.setAnimationLoop(draw);
  }

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    renderer.render(scene, camera);
  });

  draw();
}
