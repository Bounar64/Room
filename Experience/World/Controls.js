import * as THREE from "three";
import Experience from "../Experience.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.resources.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        gsap.registerPlugin(ScrollTrigger);

        this.setPath();
    }

    setPath() {
        this.timeline = new gsap.timeline();
        this.timeline.to(this.room.position, {
            x: () => {
                return this.sizes.width * 0.0009;
            },
            z: () => {
                return -(this.sizes.width * 0.0009);
            },
            scrollTrigger: {
                trigger: '.first-move',
                markers: true,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5,
                invalidateOnRefresh: true,
            }
        });
    }

    resize() {}

    update() {}
}