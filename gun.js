import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

let scene, camera, renderer, light

// We need to add 8 objects to the scene, 2 lights and shaders to it.

function init() {
    // creating the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x8a9a9a);

    // creating the camera
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
    camera.rotation.y = 45 / 180 * Math.PI;
    camera.position.x = 700;
    camera.position.y = 1500;
    camera.position.z = 1000;

    // creating the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement)

    // creating the controls for the mouse
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.addEventListener('change', renderer);

    // creating the lights
    light = new THREE.AmbientLight(0x111111, 100);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0x111111, 100);
    directionalLight.position.set(0,1,0)
    directionalLight.castShadow = true;
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0xc6c6c6, 1);
    pointLight.position.set(0,300,500);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xc6c6c6,1);
    pointLight2.position.set(500,100,0);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xc6c6c6, 1);
    pointLight3.position.set(0,100,-500);
    scene.add(pointLight3);

    const pointLight4 = new THREE.PointLight(0xc6c6c6, 10);
    pointLight4.position.set(-500,300,0);
    scene.add(pointLight4);

    // loading the model
    const loader = new GLTFLoader();
    loader.load('./assets/mp7.gltf', function (gltf) {
        const obj = gltf.scene.children[0];
        obj.scale.set(.7,.7,.7);
        scene.add(gltf.scene);
        animate();
    });
    const cubeGeometry = new THREE.BoxGeometry()
    const cubeMaterial = new THREE.MeshBasicMaterial({color: '#662589'})
    const cube = new THREE.Mesh(cubeGeometry,cubeMaterial)
    scene.add(cube)
}

// rendering the scene
function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

init();