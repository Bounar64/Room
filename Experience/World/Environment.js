import * as THREE from 'three';
import Experience from '../Experience.js';
import gsap from 'gsap';
import GUI from 'lil-gui';

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // this.gui = new GUI({ container: document.querySelector('.hero-main') });
        // this.obj = {
        //     colorObj : {r: 0, g: 0, b: 0},
        //     intensity: 3,
        // }

        // this.setGUI();
        this.setSunLight();
        this.environmentMap();
    }

    /**
     * Debug
     */
    // setGUI() {
    //     this.gui.addColor(this.obj, 'colorObj').onChange(() => {
    //         this.sunLight.color.copy(this.obj.colorObj);
    //         this.ambiantLight.color.copy(this.obj.colorObj);
    //     });
    //     this.gui.add(this.obj, 'intensity', -10, 10).onChange(() => {
    //         this.sunLight.intensity = this.obj.intensity;
    //         this.ambiantLight.intensity = this.obj.intensity;
    //     })
    // }

    
    /**
     * Light
     */
    setSunLight() {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 10;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(0.5, 2.3, 5.7);
        this.scene.add(this.sunLight);

        this.ambiantLight = new THREE.AmbientLight('#ffffff', 0.5);
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

    switchTheme(theme) {
        if(theme === 'dark') {
            gsap.to(this.sunLight.color, {
                r: 66,
                g: 41, 
                b: 255
            })
            gsap.to(this.ambiantLight.color, {
                r: 66,
                g: 41, 
                b: 255
            })
            gsap.to(this.sunLight, {
                intensity: 0.01,
            })
            gsap.to(this.ambiantLight, {
                intensity: 0.005,
            })
        }else {   
            gsap.to(this.sunLight.color, {
                r: 255 / 255,
                g: 255 / 255, 
                b: 255 / 255
            })
            gsap.to(this.ambiantLight.color, {
                r: 255 / 255,
                g: 255 / 255, 
                b: 255 / 255
            })
            gsap.to(this.sunLight, {
                intensity: 3,
            })
            gsap.to(this.ambiantLight, {
                intensity: 0.5,
            })
        }
    }

    resize() {}

    update() {}
}