import './style.css'
import * as THREE from 'three';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});



renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(0);
camera.position.setX(0);
camera.rotation.y = Math.PI

renderer.render(scene, camera);

//donut
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347,wireframe:true});
const torus = new THREE.Mesh(geometry, material);
torus.position.set(0, 0, 10);
scene.add(torus);



//my face :D
const sphere_geo = new THREE.SphereGeometry(3, 32, 32);
const sphere_mat = new THREE.MeshStandardMaterial({ wireframe: false });
const face = new THREE.Mesh(sphere_geo, sphere_mat);
face.position.set(-10, 0, 50);
const sphere_texture = new THREE.TextureLoader().load('../public/divit.jpg');
face.material.map = sphere_texture;
scene.add(face);

//lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);




//skybox like unity ;p
const space_geo = new THREE.SphereGeometry(500, 60, 40); 
const space_mat = new THREE.MeshBasicMaterial({
  map: new THREE.TextureLoader().load('../public/2k_stars.jpg'),
  side: THREE.BackSide 
});
const skysphere = new THREE.Mesh(space_geo, space_mat);
scene.add(skysphere);


function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    face.rotation.y += 0.01;
}

function MoveCamera(){
    const t = document.body.getBoundingClientRect().top;  
    const scroll_position = -t;
    //console.log(scroll_position);
    if(scroll_position<895){

        face.rotation.y += 0.075;

        camera.position.z = scroll_position * 0.040;
        camera.rotation.z = scroll_position * 0.00002;
}
}
document.body.onscroll = MoveCamera;
animate();
