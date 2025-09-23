import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347, wireframe: true });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

//neptune :D
const sphere_geo = new THREE.SphereGeometry(3, 32, 32);
const sphere_mat = new THREE.MeshStandardMaterial({ wireframe: false });
const sphere = new THREE.Mesh(sphere_geo, sphere_mat);
sphere.position.set(-10, 0, 30);
const sphere_texture = new THREE.TextureLoader().load('/2k_neptune.jpg');
sphere.material.map = sphere_texture;
scene.add(sphere);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


const controls = new OrbitControls(camera, renderer.domElement);

const SpaceTexture = new THREE.TextureLoader().load('/2k_stars.jpg');
scene.background = SpaceTexture;

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
