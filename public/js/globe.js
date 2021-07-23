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

atmosphere.scale.set(1.2, 1.2, 1.2);

scene.add(atmosphere);

let group = new THREE.Group();
group.add(sphere);
scene.add(group);

//create stars
const getRandomParticelPos = (particleCount) => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      arr[i] = (Math.random() - 0.5) * 30;
    }
    return arr;
};

renderer.setClearColor(new THREE.Color("#000000"));

// light source
const color = 0xffffff;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

// star geometry
const geometrys = [new THREE.BufferGeometry(), new THREE.BufferGeometry()];

geometrys[0].setAttribute(
    "position",
    new THREE.BufferAttribute(getRandomParticelPos(350), 3)
);
geometrys[1].setAttribute(
    "position",
    new THREE.BufferAttribute(getRandomParticelPos(1500), 3)
);

const loader = new THREE.TextureLoader();

// star material
const materials = [
    new THREE.PointsMaterial({
        size: 0.15,
        map: loader.load("https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp1.png"),
        transparent: true,
        color: "#ffffff"
    }),
    new THREE.PointsMaterial({
        size: 0.15,
        map: loader.load("https://raw.githubusercontent.com/Kuntal-Das/textures/main/sp2.png"),
        transparent: true,
        color: "#ffffff"
    })
];

const starsT1 = new THREE.Points(geometrys[0], materials[0]);
const starsT2 = new THREE.Points(geometrys[1], materials[1]);
scene.add(starsT1);
scene.add(starsT2);

camera.position.z = 15;

let animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    sphere.rotation.y += 0.003;
    controls.update();
};
animate();