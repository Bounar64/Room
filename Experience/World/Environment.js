import * as THREE from 'three';
import Experience from '../Experience.js';
import gsap from 'gsap';
import GUI from 'lil-gui';

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.led = this.room.scene.children[14];

        // this.gui = new GUI({ width: 500 });
        // this.obj = {
        //     colorObjS : {r: 0, g: 0, b: 0},
        //     colorObjA : {r: 0, g: 0, b: 0},
        //     intensityS : 3,
        //     intensityA : 3,
        // }

        this.setSunLight();
        this.environmentMap();

        // this.setGUI();
    }

    /**
     * Debug
     */
    // setGUI() {
    //     this.gui.addColor(this.obj, 'colorObjS').onChange(() => {
    //         this.sunLight.color.copy(this.obj.colorObjS);
    //     });
    //     this.gui.addColor(this.obj, 'colorObjA').onChange(() => {
    //         this.ambiantLight.color.copy(this.obj.colorObjA);
    //     });
    //     this.gui.add(this.obj, 'intensityS', -10, 10, 0.001).onChange(() => {
    //         this.sunLight.intensity = this.obj.intensityS;
    //     })
    //     this.gui.add(this.obj, 'intensityA', -10, 10, 0.001).onChange(() => {
    //         this.ambiantLight.intensity = this.obj.intensityA;
    //     })
    
    /**
     * Light
     */
    setSunLight() {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 10;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(0, 3, 3);
        this.scene.add(this.sunLight);

        this.ambiantLight = new THREE.AmbientLight('#ffffff', 1.5);
        this.scene.add(this.ambiantLight);
        
        // Helpers
        // this.gui.add(this.sunLight.position, 'x', -10, 10, 0.0001).name('sun X');
        // this.gui.add(this.sunLight.position, 'y', -10, 10, 0.0001).name('sun Y');
        // this.gui.add(this.sunLight.position, 'z', -10, 10, 0.0001).name('sun Z');
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
                intensity: 0.001,
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
                intensity: 1.5,
            })
        }
    }

    resize() {}

    update() {}
}