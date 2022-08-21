import * as THREE from 'three';
import Experience from '../Experience.js';
import gsap from 'gsap';

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};
        
        this.lerp = {
            current : 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        this.onMouseMove();
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
                    groupchild.material.envMapIntensity = 1;
                })
            }
            if(child.name === 'screen_desktop') {
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen_desktop          
                })
            }

            child.scale.set(0, 0, 0);

            if(child.name === 'Cube') {
                child.position.y = 1.5
            }

            if(child.name === 'screen_photo') {
                this.texture = new THREE.TextureLoader().load('textures/paris.jpg');
                child.material = new THREE.MeshBasicMaterial({
                    map:  this.texture
                });
            }

            this.roomChildren[child.name.toLowerCase()] = child;
        });

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.3, 0.3, 0.3);
        this.actualRoom.position.y = -0.4;
    }

    /**
     * Rotation Room on horizontal mouse move 
     */
    onMouseMove() {
        window.addEventListener('mousemove', (e) => {
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        })
    }

    resize() {}

    update() {

        this.lerp.current = gsap.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.target;
    }
        
}