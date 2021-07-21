import * as THREE from 'three';
// const gsap = require('gsap.js');
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// import Stats from 'three/examples/jsm/libs/stats.module';

let vertexShader = document.getElementById("vertex_shader").textContent;
let fragmentShader = document.getElementById("fragment_shader").textContent;
let atmosphereVertexShader = document.getElementById("atmosphere_vertex").textContent;
let atmosphereFragmentShader = document.getElementById("atmosphere_fragment").textContent;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

//create sphere
const sphere = new THREE.Mesh(
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
const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(5, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    })
);

atmosphere.scale.set(1.1, 1.1, 1.1)

scene.add(atmosphere);

let group = new THREE.Group()
group.add(sphere)
scene.add(group)

camera.position.z = 15;

let mouse = {
    x: undefined,
    y: undefined
}

let animate = function () {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    sphere.rotation.y += 0.005
    // group.rotation.y = mouse.x * 0.5
    // group.rotation.x = mouse.y * 0.5
};
animate();

// addEventListener('mousemove', () => {
//     mouse.x = (event.clientX / innerWidth * 2 - 1)
//     mouse.y = (event.clientY / innerHeight * 2 + 1)
// })