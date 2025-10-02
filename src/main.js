import './style.css'
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setClearColor(0x000000, 0); // Set background color to black
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
const bloomParams = {
    exposure: 1,
    bloomStrength: 0.5,
    bloomRadius: 0.4,
    bloomThreshold: 0.85
};
const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), bloomParams.bloomStrength, bloomParams.bloomRadius, bloomParams.bloomThreshold);
composer.addPass(bloomPass);
composer.setSize(window.innerWidth, window.innerHeight);
composer.setPixelRatio(window.devicePixelRatio);



renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(0);
camera.position.setX(0);
camera.rotation.y = Math.PI

renderer.render(scene, camera);

//donut
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xe8f7e, wireframe: true, emissive: 0xe8f7ee, emissiveIntensity: 0.5 });
const torus = new THREE.Mesh(geometry, material);
torus.position.set(0, 0, 10);
scene.add(torus);



//my face :D
const sphere_geo = new THREE.SphereGeometry(3, 32, 32);
const sphere_mat = new THREE.MeshBasicMaterial({ wireframe: false });
const face = new THREE.Mesh(sphere_geo, sphere_mat);
face.position.set(-100, 0, 60);
const sphere_texture = new THREE.TextureLoader().load('divit.jpg');
face.material.map = sphere_texture;
scene.add(face);

//lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);




////skybox like unity ;p
//const space_geo = new THREE.SphereGeometry(500, 60, 40); 
//const space_mat = new THREE.MeshBasicMaterial({
//  map: new THREE.TextureLoader().load('8k_stars_milky_way.jpg'),
//  side: THREE.BackSide 
//});
//const skysphere = new THREE.Mesh(space_geo, space_mat);
//scene.add(skysphere);
scene.background = new THREE.Color(0x02010a);

function addStar(){
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
    star.position.set(
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000
    );
    scene.add(star);
}
Array(2000).fill().forEach(addStar);

// Skills section
//python logo
const python_texture = new THREE.TextureLoader().load('python_logo.png');
const python_mat = new THREE.MeshBasicMaterial({ map: python_texture, side:THREE.DoubleSide });
const python_geo = new THREE.PlaneGeometry(3, 3);
const python_logo = new THREE.Mesh(python_geo, python_mat);
python_logo.position.set(30, -25, 0);
scene.add(python_logo);

//unity logo
const unity_texture = new THREE.TextureLoader().load('unity_logo.jpg');
const unity_mat = new THREE.MeshBasicMaterial({ map: unity_texture, side:THREE.DoubleSide });
const unity_geo = new THREE.PlaneGeometry(3, 3);
const unity_logo = new THREE.Mesh(unity_geo, unity_mat);
unity_logo.position.set(30, -20, 0);
scene.add(unity_logo);

//C# logo
// const csharp_texture = new THREE.TextureLoader().load('C#_logo.png');
// const csharp_mat = new THREE.MeshBasicMaterial({ map: csharp_texture, transparent: true, side:THREE.DoubleSide });
// const csharp_geo = new THREE.PlaneGeometry(3, 3);
// const csharp_logo = new THREE.Mesh(csharp_geo, csharp_mat);
// csharp_logo.position.set(35, -20, 20);
// scene.add(csharp_logo);


//cpp logo
const cpp_texture = new THREE.TextureLoader().load('cpp_logo.jpg');
const cpp_mat = new THREE.MeshBasicMaterial({ map: cpp_texture, side:THREE.DoubleSide });
const cpp_geo = new THREE.PlaneGeometry(3, 3);
const cpp_logo = new THREE.Mesh(cpp_geo, cpp_mat);
cpp_logo.position.set(30, -15, 0);
scene.add(cpp_logo);


function animate(){
    requestAnimationFrame(animate);
    composer.render();

    face.rotation.y += 0.01;
    //skills rotation
    cpp_logo.rotation.y += 0.01;
    python_logo.rotation.y += 0.01;
    unity_logo.rotation.y += 0.01;
    //rotate donut
    torus.rotation.x += 0.002;
    torus.rotation.y += 0.002;
    torus.rotation.z += 0.002;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
    document.documentElement.style.setProperty('--vw', `${window.innerWidth}px`);
}
window.addEventListener('resize', onWindowResize, false);
onWindowResize();

function MoveCamera(){
    const t = document.body.getBoundingClientRect().top;  
    const scroll_position = -t;
    console.log(scroll_position);
    if(scroll_position<1205){

        face.rotation.y += 0.075;

        camera.position.z = scroll_position * 0.040;
        camera.rotation.z = scroll_position * 0.00002;
        camera.rotation.y = Math.PI;
        face.position.x = -100 + scroll_position * 0.078;
        unity_logo.position.z = scroll_position * 0.03;
        python_logo.position.z = scroll_position * 0.03;
        cpp_logo.position.z = scroll_position * 0.03;
}
    else if(scroll_position<1795){
        camera.rotation.y = Math.PI + (scroll_position-1205) * Math.PI/(2*(-1205 +1795)); //rotate 90 degrees over next 900px aka the span of this animation;
        camera.position.y = -(scroll_position-1205) * 0.02;
        camera.position.x = (scroll_position-1205) * 0.02;
}
    else if(scroll_position<2325){
        camera.position.y = -(scroll_position-1205) * 0.02;
}
    else if(scroll_position>=2355){ 
        camera.position.y = -(scroll_position-1205) * 0.02;
    }
}

document.body.onscroll = MoveCamera;
animate();
