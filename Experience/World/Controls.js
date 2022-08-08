import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.resources.time;

        this.setPath();
    }

    setPath() {
        
    }

    resize() {}

    update() {}
}