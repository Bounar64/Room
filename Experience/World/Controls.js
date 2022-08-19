import * as THREE from "three";
import Experience from "../Experience.js";
import gsap from "gsap";
import GUI from 'lil-gui';
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from '@ashthornton/asscroll';

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
        this.circle = this.experience.world.floor.circle;
        this.floor = this.experience.world.floor.plane;
        gsap.registerPlugin(ScrollTrigger);

        // this.gui = new GUI();

        document.querySelector('body').style.overflow = 'visible';

        this.setSmoothScroll();
        this.setScrollTrigger();

    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
          disableRaf: true,
          ease: 0.3
        });
    
        gsap.ticker.add(asscroll.update);
      
        ScrollTrigger.defaults({
          scroller: asscroll.containerElement 
        });
      
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
          scrollTop(value) {
            if (arguments.length) {
              asscroll.currentPos = value;
              return;
            }
            return asscroll.currentPos;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          fixedMarkers: true });
      
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
      
        requestAnimationFrame(() => {
          asscroll.enable({
            newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]") });
        })
    }

    setSmoothScroll() {
        this.asscroll = this.setupASScroll();
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
                    }, "same")

                    .to(this.floor.position, {
                        y: -1.5,
                    }, "same")

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
                this.mixer = new THREE.AnimationMixer(this.room);
                ScrollTrigger.create({
                        trigger: '.third-move',
                        start: 'top-=100 top',
                        end: 'bottom bottom',
                        onEnter: () => {
                                this.drawerClip = this.mixer.clipAction(this.file.animations[0]);
                                this.mailClip = this.mixer.clipAction(this.file.animations[1]);
                                this.drawerClip.play();
                                this.drawerClip.repetitions = 1;
                                this.mailClip.play();
                                this.mailClip.repetitions = 1;
                                this.mailClip.clampWhenFinished = true;
                        },  
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                }) 
            },

            // all
            all: () => {
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section) => {
                    this.progressWrapper = section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if(section.classList.contains("right")) {
                        gsap.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.5,
                            }
                        })
                        gsap.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.5,
                            }
                        })
                    }else {
                        gsap.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.5,
                            }
                        })
                        gsap.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.5,
                            }
                        })
                    }

                    gsap.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressBar,
                            pinSpacing: false
                        }
                    });
                });


                // Circle animations ------------------
                // First Section ----------------------------------------
                this.firstMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.first-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    }
                }).to(this.circle.scale, {
                    x: 3,
                    y: 3,
                    z: 3
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
                }).to(this.circle.scale, {
                    x: 0,
                    y: 0,
                    z: 0
                })
        
                // Third Section ----------------------------------------
                this.thirdMoveTimeline = new gsap.timeline({
                    scrollTrigger: {
                        trigger: '.third-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                }).to(this.circle.scale, {
                    x: 3,
                    y: 3,
                    z: 3
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
                    },
                    delay: 0.5
                }).to(this.room.scale, {
                        x: 0.5,
                        y: 0.5,
                        z: 0.5
                    }, 'same')
                
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

                // Drawer animation (setAnimationDrawer) -----------------
                this.mixer = new THREE.AnimationMixer(this.room);
                ScrollTrigger.create({
                        trigger: '.third-move',
                        start: 'top+=1300 top',
                        end: 'bottom bottom',
                        onEnter: () => {
                                this.drawerClip = this.mixer.clipAction(this.file.animations[0]);
                                this.mailClip = this.mixer.clipAction(this.file.animations[1]);
                                this.drawerClip.play();
                                this.drawerClip.repetitions = 1;
                                this.mailClip.play();
                                this.mailClip.repetitions = 1;
                                this.mailClip.clampWhenFinished = true;
                        },  
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                });
            }
        }); 
    }
    
    resize() {}

    update() {
        this.mixer.update(this.time.delta * 0.001);
    }
}
