import * as THREE from "three";

const canvas = document.getElementById("three-canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75, // FOV
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near
  1000 // Far
);

camera.position.x = 0;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const meterial = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, meterial);

scene.add(mesh);

renderer.render(scene, camera); // 복수의 카메라를 사용할 수 있음
