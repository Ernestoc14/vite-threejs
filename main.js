import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 , wireframe: true} );
const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
scene.background = new THREE.Color( 'gray' );

camera.position.z = 5;

const loader = new GLTFLoader();
// ./assets/zoro.gltf
loader.load('mp5.glb', function(gltf){
    scene.add(gltf.scene);
    gltf.scene.scale.set(5, 5, 5);
}, undefined, function(error){
    console.error(error);
});

function animate() {
	requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
	renderer.render( scene, camera );
}
animate();