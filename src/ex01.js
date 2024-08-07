import * as THREE from "three";

export default function example() {
  const canvas = document.getElementById("three-canvas");
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // 레티나 디스플레이 대응

  const scene = new THREE.Scene();

  const perspectiveCamera = new THREE.PerspectiveCamera(
    75, // FOV
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near
    1000 // Far
  );
  perspectiveCamera.position.x = 1;
  perspectiveCamera.position.y = 2;
  perspectiveCamera.position.z = 5;
  scene.add(perspectiveCamera);

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

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const meterial = new THREE.MeshBasicMaterial({ color: "red" });
  const mesh = new THREE.Mesh(geometry, meterial);

  scene.add(mesh);

  renderer.render(scene, perspectiveCamera); // 복수의 카메라를 사용할 수 있음

  window.addEventListener("resize", () => {
    perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
    perspectiveCamera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    renderer.render(scene, perspectiveCamera);
  });
}
