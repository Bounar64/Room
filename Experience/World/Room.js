import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.debug = this.experience.debug;

        this.setModel();

        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Room');
        }
        if(this.debug.active) {
            this.debugFolder.add(this.actualRoom.rotation, 'y').min(-20).max(20).step(0.01);
            this.debugFolder.add(this.actualRoom.position, 'x').min(-20).max(20).step(0.01);
            this.debugFolder.add(this.actualRoom.position, 'z').min(-20).max(20).step(0.01);
        }
    }

    /**
     * Room
     */
    setModel() {
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                    groupchild.material.envMapIntensity = 0.5;
                })
            }

            // if(child.name === 'screen_desktop') {
            //     child.material = new THREE.MeshBasicMaterial({
            //         map: this.resources.items.screen_desktop
            //     })
            // }
        })

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.3, 0.3, 0.3);
    }

    resize() {}

    update() {}
}