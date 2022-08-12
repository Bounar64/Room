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

        this.setScrollTrigger();
    }

    setScrollTrigger() {
        // this.timeline = new gsap.timeline();
        // this.timeline.to(this.room.position, {
        //     x: () => {
        //         return this.sizes.width * 0.0009;
        //     },
        //     z: () => {
        //         return -(this.sizes.width * 0.0009);
        //     },
        //     scrollTrigger: {
        //         trigger: '.first-move',
        //         markers: true,
        //         start: 'top top',
        //         end: 'bottom bottom',
        //         scrub: 0.5,
        //         invalidateOnRefresh: true,
        //     }
        // });

        ScrollTrigger.matchMedia({
            // Desktop
            "(min-width: 969px)": () => {

                // First Section ----------------------------------------
                this.firstMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.first-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    }
                })
                    .to(this.room.position, {
                        x: () => {
                            return -(this.sizes.width * 0.0009);
                        },
                        z: () => {
                            return this.sizes.width * 0.0009;
                        },
                    });

                // Second Section ----------------------------------------
                this.SecondMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.second-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    }
                })
                    .to(this.room.position, {
                        x: 2,
                        z: 2,
                    }, "same")

                    .to(this.room.scale, {
                        x: 0.6,
                        y: 0.6,
                        z: 0.6,
                    }, "same");

                // Third Section ----------------------------------------
                this.ThirdMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.third-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                })

                    .to(this.camera.perspectiveCamera.position, {
                        x: 1.7,
                        y: 2
                    })
            },

            

            // Mobile
            "(max-width: 968px)": () => {

                // Resets
                this.room.scale.set(0.15, 0.15, 0.15);

                // First Section ----------------------------------------
                this.firstMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.first-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    }
                })
                    .to(this.room.scale, {
                        x: 1,
                        y: 1,
                        z: 1
                    }, "same")
                    
                    .to(this.room.position, {
                        x: -3.5,
                    }, "same")

                    .to(this.scene.position, {
                        y: -2
                    }, "same")


                // Second Section ----------------------------------------
                this.SecondMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.second-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    }
                })

                // Third Section ----------------------------------------
                this.ThirdMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.third-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    }
                })
            }
        }); 
    }

    resize() {}

    update() {}
}