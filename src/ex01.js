import * as THREE from "three";
import gsap from "gsap";

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

  scene.background = new THREE.Color("blue");
  scene.fog = new THREE.Fog("blue", 8, 12);

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 2, 10);
  scene.add(light);

  const perspectiveCamera = new THREE.PerspectiveCamera(
    75, // FOV
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near
    1000 // Far
  );
  perspectiveCamera.position.set(0, 2, 10);
  scene.add(perspectiveCamera);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const meterial = new THREE.MeshStandardMaterial({ color: "red" });

  const meshs = Array.from({ length: 10 }, (_, i) => i).map((i) => {
    const mesh = new THREE.Mesh(geometry, meterial);
    mesh.position.x = i * 2 - 10;
    scene.add(mesh);
    return mesh;
  });

  const clock = new THREE.Clock();

  function draw() {
    // 360도 === 2 * Math.PI
    // 1초에 360도 회전
    // Math.PI / 180 = 1도
    const delta = clock.getDelta();
    meshs.forEach((mesh, i) => {
      gsap.to(mesh.position, {
        duration: 1, // 1초
        y: 2 * i,
        z: 3,
      });
    });
    // console.log(delta);
    // mesh.rotation.y += delta;
    // mesh.position.y += delta;
    // if (mesh.position.y > 3) {
    //   mesh.position.y = 0;
    // }
    renderer.render(scene, perspectiveCamera); // 복수의 카메라를 사용할 수 있음
    // window.requestAnimationFrame(draw);
    renderer.setAnimationLoop(draw);
  }

  window.addEventListener("resize", () => {
    perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
    perspectiveCamera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    renderer.render(scene, perspectiveCamera);
  });

  draw();
}
