import * as THREE from 'three';
import { Float32BufferAttribute } from 'three';
// let gsap = require('gsap.js');
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import Stats from 'three/examples/jsm/libs/stats.module';

let vertexShader = document.getElementById("vertex_shader").textContent;
let fragmentShader = document.getElementById("fragment_shader").textContent;
let atmosphereVertexShader = document.getElementById("atmosphere_vertex").textContent;
let atmosphereFragmentShader = document.getElementById("atmosphere_fragment").textContent;
let canvasContainer = document.querySelector('#canvasContainer');

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, canvasContainer.offsetWidth / canvasContainer.offsetHeight, 0.1, 100);
let renderer = new THREE.WebGLRenderer({antialias: true, canvas: document.querySelector('canvas')});
renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
renderer.setPixelRatio(window.devicePixelRatio);
// document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;
controls.enablePan = false;

//create sphere
let sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            globeTexture: {
                value: new THREE.TextureLoader().load('../images/world_texture3.jpg')
            }
        }
    })
);

scene.add(sphere);

//create atmosphere
let atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    })
);

atmosphere.scale.set(1.1, 1.1, 1.1);

scene.add(atmosphere);

let group = new THREE.Group();
group.add(sphere);
scene.add(group);

let starGeometry = new THREE.BufferGeometry();
let starMaterial = new THREE.PointsMaterial({
    color: 0xffffff
});

// let starVerticies = [];
// for(let i = 0; i < 10000; i++) {
//     let x = (Math.random() - 0.5) * 250;
//     let y = (Math.random() - 0.5) * 250;
//     let z = -Math.random() * 3000;
//     starVerticies.push(x, y, z);
// }
// starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVerticies, 3));
// console.log(starVerticies);
// let stars = new THREE.Points(starGeometry, starMaterial);
// scene.add(stars);

camera.position.z = 15;

let mouse = {
    x: undefined,
    y: undefined
}

let animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    sphere.rotation.y += 0.003;
    controls.update();
    // group.rotation.y = mouse.x * 0.5
    // group.rotation.x = mouse.y * 0.5
};
animate();

// addEventListener('mousemove', () => {
//     mouse.x = (event.clientX / innerWidth * 2 - 1)
//     mouse.y = (event.clientY / innerHeight * 2 + 1)
// })