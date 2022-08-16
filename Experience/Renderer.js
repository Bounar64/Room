import * as THREE from 'three';
import Experience from './Experience.js';

export default class Renderer {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;

        this.setRenderer();
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
        });

        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.75;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
        this.renderer.setClearColor(0xE7E8EA, 1);
        
        this.button = document.querySelector('.toggle-button');
        this.body = document.querySelector('body');

        this.button.addEventListener('click', () => {
            
            if(this.body.className ==='dark-theme') {
                // console.log('light-theme enable')
                this.renderer.setClearColor(0xF0F0F1, 1);
            }else {
                // console.log('dark-theme enable')
                this.renderer.setClearColor(0xDDDCEC, 1);
            }
        })
        
    }

    resize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    update() {
        // this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height);
        this.renderer.render(this.scene, this.camera.perspectiveCamera);
        
        // Second screen
        //this.renderer.setScissorTest(true);
        // this.renderer.setViewport(
        //     this.sizes.width - this.sizes.width / 3, 
        //     this.sizes.height - this.sizes.height / 3, 
        //     this.sizes.width / 3, 
        //     this.sizes.height / 3
        // );

        // this.renderer.setScissor(
        //     this.sizes.width - this.sizes.width / 3, 
        //     this.sizes.height - this.sizes.height / 3, 
        //     this.sizes.width / 3, 
        //     this.sizes.height / 3
        // );
        // this.renderer.render(this.scene, this.camera.orthographicCamera);
        // this.renderer.setScissorTest(false);
    } 
}