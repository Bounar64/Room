import * as THREE from "three";
import Experience from "../Experience.js";
import gsap from "gsap";
import GUI from 'lil-gui';
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.file = this.resources.items.room;
        gsap.registerPlugin(ScrollTrigger);

        // this.gui = new GUI();

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

        // Helpers
        // this.gui.add(this.camera.perspectiveCamera.position, 'x', -10, 10, 0.001).name('camera X');
        // this.gui.add(this.camera.perspectiveCamera.position, 'y', -10, 10, 0.001).name('camera Y');
        // this.gui.add(this.camera.perspectiveCamera.position, 'z', -10, 10, 0.001).name('camera Z');

        // this.gui.add(this.room.position, 'x', -10, 10, 0.001).name('room X');
        // this.gui.add(this.room.position, 'y', -10, 10, 0.001).name('room Y');
        // this.gui.add(this.room.position, 'z', -10, 10, 0.001).name('room Z');

        // this.gui.add(this.room.rotation, 'x', -10, 10, 0.001).name('room X');
        // this.gui.add(this.room.rotation, 'y', -10, 10, 0.001).name('room Y');
        // this.gui.add(this.room.rotation, 'z', -10, 10, 0.001).name('room Z');

        ScrollTrigger.matchMedia({

            // Desktop
            "(min-width: 969px)": () => {

                // Resets
                this.room.scale.set(0.3, 0.3, 0.3);         

                // First Section ----------------------------------------
                this.firstMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.first-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.position, {
                        x: () => {
                            return -(this.sizes.width * 0.0009);
                        },
                        z: () => {
                            return this.sizes.width * 0.0009;
                        },
                    });

                // Second Section ----------------------------------------
                this.secondMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.second-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.position, {
                        x: 2,
                        z: 2,
                    }, "same")

                    .to(this.room.scale, {
                        x: 0.6,
                        y: 0.6,
                        z: 0.6,
                    }, "same");

                // Third Section ----------------------------------------
                this.thirdMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.third-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                }).to(this.camera.perspectiveCamera.position, {
                        x: 1.7,
                        y: 2
                    })

                // Drawer animation (setAnimationDrawer) -----------------
                this.room.children.forEach((child) => {
                    if(child instanceof THREE.Group) { 
                        if(child.name === 'drawer') {
                            this.drawer = child
                        }

                        if(child.name === 'mail') {
                            this.mail = child
                        }
                    }
                })

                this.AnimationTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.third-move',
                        markers: true,
                        start: 'top-=100 top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    }
                }).to(this.drawer.position, {
                    x: -0.71132,
                    y: 1.01173, 
                    }, "same")
                .to(this.mail.position, {
                    x: -1.77463,
                    y: 1.34751,
                }, "same")
                .to(this.mail.position, {
                    x: -1.57463,
                    y: 2.2
                }, "same2")
                .to(this.drawer.position, {
                    x: -1.6988292932510376, 
                    y: 1.0117310285568237, 
                    z: -0.8414605855941772
                }, "same2")
                .to(this.mail.rotation, {
                    z: -1
                }, "same2")
                .to(this.mail.position, {
                    x: -1.87463,
                    y: 2.3,
                }, "same3")
                .to(this.mail.rotation, {
                    z: 0.05
                }, "same3")
                .to(this.mail.position, {
                    x: -2.3,
                    y: 2.3,
                }, "same4")
                .to(this.mail.rotation, {
                    y: 0.2,
                }, "same4")
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
                    },
                    delay: 0.5
                }).to(this.room.scale, {
                        x: 0.5,
                        y: 0.5,
                        z: 0.5
                    })
                    
                // Second Section ----------------------------------------
                this.secondMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.second-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.scale, {
                        x: 1,
                        y: 1,
                        z: 1
                    }, "same")
                    
                    .to(this.room.position, {
                        x: -3.2,
                    }, "same")

                    .to(this.scene.position, {
                        y: -2
                    }, "same")


                // Third Section ----------------------------------------
                this.thirdMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.third-move',
                        start: 'top top',
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    }
                }).to(this.room.position, {
                        x: 1.5,
                        z: -4,
                    }, "same")

                    .to(this.room.scale, {
                            x: 1.5,
                            y: 1.5,
                            z: 1.5,
                    }, "same")

                    .to(this.room.rotation, {
                        z: -0.2,
                        x: 0.2,
                    }, "same")
            }
        }); 
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.room);
        this.clip = this.mixer.clipAction(this.file.animations[0]);
        this.clip.play();
    }
    
    resize() {}

    update() {
        //this.mixer.update(this.time.delta * 0.0001);
    }
}