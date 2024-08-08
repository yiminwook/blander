import * as THREE from "three";
import gsap from "gsap";
import Stats from "stats.js";
import dat from "dat.gui";

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
  const meterial = new THREE.MeshStandardMaterial({ color: "hotpink" });

  const group1 = new THREE.Group();
  const box1 = new THREE.Mesh(geometry, meterial);

  const group2 = new THREE.Group();
  const box2 = box1.clone();
  box2.scale.set(0.3, 0.3, 0.3);
  group2.position.set(2, 0, 0);

  const group3 = new THREE.Group();
  const box3 = box2.clone();
  box3.scale.set(0.15, 0.15, 0.15);
  group3.position.set(0.5, 0, 0);

  group3.add(box3);

  group2.add(group3);
  group2.add(box2);

  group1.add(box1);
  group1.add(group2);

  scene.add(group1);

  const camera = new THREE.PerspectiveCamera(
    75, // FOV
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near
    1000 // Far
  );
  camera.position.set(1, 5, 5);
  camera.lookAt(box1.position);
  scene.add(camera);

  const gui = new dat.GUI();
  gui.add(box1.position, "y", -5, 5, 0.01).name("이동거리 - Y");
  gui
    .add(box1.rotation, "y")
    .min(0)
    .max(2 * Math.PI)
    .step(0.01)
    .name("회전 - Y");

  gui.add(camera.position, "z").min(0).max(10).step(1).name("카메라이동 - z");

  const clock = new THREE.Clock();

  function draw() {
    // 360도 === 2 * Math.PI
    // 1초에 360도 회전
    // Math.PI / 180 = 1도
    const delta = clock.getDelta();
    // group2.rotation.reorder("YXZ");
    group3.rotation.y += delta;
    group2.rotation.y += delta;
    group1.rotation.y += delta;
    camera.lookAt(box1.position);
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
