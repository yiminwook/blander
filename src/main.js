import * as THREE from "three";

const canvas = document.getElementById("three-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();

// const perspectiveCamera = new THREE.PerspectiveCamera(
//   75, // FOV
//   window.innerWidth / window.innerHeight, // Aspect ratio
//   0.1, // Near
//   1000 // Far
// );
// perspectiveCamera.position.x = 1;
// perspectiveCamera.position.y = 2;
// perspectiveCamera.position.z = 5;
// scene.add(perspectiveCamera);

const orthographicCamera = new THREE.OrthographicCamera(
  -(window.innerWidth / window.innerHeight), //left
  window.innerWidth / window.innerHeight, //right
  1, // top
  -1, // bottom
  0.1, // Near
  1000 // Far
);
orthographicCamera.position.x = 1;
orthographicCamera.position.y = 2;
orthographicCamera.position.z = 5;
orthographicCamera.lookAt(0, 0, 0);
orthographicCamera.zoom = 0.5;
orthographicCamera.updateProjectionMatrix();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const meterial = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, meterial);

scene.add(mesh);

renderer.render(scene, orthographicCamera); // 복수의 카메라를 사용할 수 있음
