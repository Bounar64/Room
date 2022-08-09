import * as THREE from 'three';
import Experience from '../Experience.js';
import GSAP from 'gsap';

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.resources.time;
        this.camera = this.experience.camera;
    }

    resize() {}

    update() {}
}