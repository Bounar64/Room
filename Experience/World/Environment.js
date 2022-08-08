import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.debug = this.experience.debug;

        this.setSunlight();

        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('sunLight');
        }
        if(this.debug.active) {
            this.debugFolder.add(this.sunLight, 'intensity').min(1).max(10).step(0.01);
            this.debugFolder.add(this.sunLight.position, 'x').min(-20).max(20).step(0.01);
            this.debugFolder.add(this.sunLight.position, 'y').min(-20).max(20).step(0.01);
            this.debugFolder.add(this.sunLight.position, 'z').min(-20).max(20).step(0.001);
        }

        this.environmentMap();
    }

    /**
     * Light
     */
    setSunlight() {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 10;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(4.3, 2.3, 5.7);
        this.scene.add(this.sunLight);

        this.ambiantLight = new THREE.AmbientLight('#ffffff', 1);
        this.scene.add(this.ambiantLight);
    }
    
    /**
     * EnvironmentMap
     */
    environmentMap() {
        this.cubeTextureLoader = new THREE.CubeTextureLoader();

        this.environmentMap = this.cubeTextureLoader.load([
            '/textures/environmentMap/px.png',
            '/textures/environmentMap/nx.png',
            '/textures/environmentMap/py.png',
            '/textures/environmentMap/ny.png',
            '/textures/environmentMap/pz.png',
            '/textures/environmentMap/nz.png',
        ])

        this.environmentMap.encoding = THREE.sRGBEncoding;
        this.environmentMapIntensity = 0.5;
        this.scene.environment = this.environmentMap;
    }

    resize() {}

    update() {}
}