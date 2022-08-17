import * as THREE from 'three';
import Experience from './Experience.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createPerspectiveCamera();
        this.setOrbitControls();
    }

    createPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35, 
            this.sizes.aspect, 
            0.1, 
            1000
        );
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.set(5, 3, 5);

        // this.helper = new THREE.CameraHelper(this.orthographicCamera);
        // this.scene.add(this.helper);
    
        // Grid Helpers
        // const size = 20;
        // const divisions = 20;
    
        // const gridHelper = new THREE.GridHelper(size, divisions);
        // this.scene.add(gridHelper);
    
        // Axis Helpers
        // const axesHelper = new THREE.AxesHelper(10);
        // this.scene.add(axesHelper);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
    }

    resize() {
        // Update Perspective Camera on Resize
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        // Update Orthographic Camera on Resize
        // this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2;
        // this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2;
        // this.orthographicCamera.top = this.sizes.frustrum / 2;
        // this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
        // this.orthographicCamera.updateProjectionMatrix();
    }

    update() {
        this.controls.update();
        //console.log(this.perspectiveCamera.position);

        // this.helper.matrixWorldNeedsUpdate = true;
        // this.helper.update();
        // this.helper.position.copy(this.orthographicCamera.position);
        // this.helper.position.copy(this.orthographicCamera.rotation);
    }
}