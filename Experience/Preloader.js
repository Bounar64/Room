import { EventEmitter } from 'events';
import Experience from './Experience';
import gsap from 'gsap';
import convert from './Utils/convert';

export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on('switchdevice', (device) => {
            this.device = device;
        })

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets() {
        convert(document.querySelector('.intro-text'));
        convert(document.querySelector('.hero-main-title'));
        convert(document.querySelector('.hero-main-description'));
        convert(document.querySelector('.hero-second-subheading'));
        convert(document.querySelector('.second-sub'));
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
    }

    firstIntro() {
        return new Promise ((resolve) => {
            this.timeline = new gsap.timeline();

            if(this.device === 'desktop') {
                this.timeline.to(this.room.scale, {
                    x: 0.05,
                    y: 0.055,
                    z: 0.05,
                    ease: 'back.out(2.5)',
                    duration: 0.7
                })
                .to(this.room.position, {
                    x: -1,
                    z: 1,
                    ease: 'power1.out',
                    duration: 0.7,
                    onComplete: resolve
                })
            }else {
                this.timeline.to(this.room.scale, {
                    x: 0.05,
                    y: 0.055,
                    z: 0.05,
                    ease: 'back.out(2.5)',
                    duration: 0.7
                })
                .to(this.room.position, {
                    x: -0.3,
                    y: 0.3,
                    z: -0.3,
                    ease: 'power1.out',
                    duration: 0.7,
                    onComplete: resolve
                })
            }

            this.timeline.to('.intro-text .animated', {
                yPercent: -100,
                stagger: 0.07,
                ease: 'back.out(1.2)',
                onComplete: resolve
            })
        });
    }

    secondIntro() {
        return new Promise ((resolve) => {    
            this.secondTimeline = new gsap.timeline();
            
                if(this.device === 'mobile') {
                    this.timeline.to(this.room.scale, {
                        x: 0.15,
                        y: 0.15,
                        z: 0.15,
                        ease: 'back.out(2.5)',
                        duration: 0.7
                    });  
                }

                this.secondTimeline.to(this.room.position, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: 'power1.out'
                }, 'same')
                .to(this.room.rotation, {
                    y: 2 * Math.PI,
                    duration: 0.7
                }, 'same')
                .to(this.room.scale, {
                    x: 0.3,
                    y: 0.3,
                    z: 0.3
                }, 'same')
                .to(this.room.position, {
                    y: -0.7,
                }, 'same')
                .to(this.roomChildren.cube.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: 'power1.in'
                })
                .to(this.roomChildren.desk.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(1.5)',
                    duration: 0.5
                }, "desk")
                .to(this.roomChildren.drawer.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(1.5)',
                    duration: 0.5
                }, "desk")
                .to(this.roomChildren.mail.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(1.5)',
                    duration: 0.5
                }, "desk")
                .to(this.roomChildren.tv.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5
                }, 'tv')
                .to(this.roomChildren.screen_tv.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5
                }, 'tv')
                .to(this.roomChildren.computer.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(1)',
                    duration: 0.5
                }, 'computer')
                .to(this.roomChildren.screen_desktop.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(1)',
                    duration: 0.5
                }, 'computer')
                .to(this.roomChildren.desk_stuff_3.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(1)',
                    duration: 0.5
                }, "photo")
                .to(this.roomChildren.screen_photo.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(1)',
                    duration: 0.5
                }, "photo")
                .to(this.roomChildren.desk_stuff_1.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(1)',
                    duration: 0.5
                })
                .to(this.roomChildren.desk_stuff_2.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(1)',
                    duration: 0.5
                }, 'ben')
                .to(this.roomChildren.ben.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5
                }, 'ben')
                .to(this.roomChildren.foot_chair.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.3,
                })
                .to(this.roomChildren.chair.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5,
                }, 'chair').to(this.roomChildren.chair.rotation, {
                    y: 4 * Math.PI + Math.PI / 2.5,
                    ease: 'back.out(2.2)',
                    duration: 2,
                    onComplete: resolve
                }, 'chair')
        });
    }

    onScroll(e) {
        if(e.deltaY > 0) {
            this.removeEventListener();
            this.playSecondIntro();
        }
    }

    onTouch(e) {
        this.initialY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if(difference > 0) {
            console.log('swipped up');
            this.removeEventListener();
            this.playSecondIntro();
        }
        this.initialY = null;
    }

    removeEventListener() {
        window.removeEventListener('wheel', this.scrollOnceEvent);
        window.removeEventListener('touchstart', this.touchStart);
        window.removeEventListener('touchmove', this.touchMove);
    }

    async playIntro() {
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener('wheel', this.scrollOnceEvent);
        window.addEventListener('touchstart', this.touchStart);
        window.addEventListener('touchmove', this.touchMove);
    }

    async playSecondIntro() {
        this.moveFlag = false;
        this.scaleFlag = true;
        await this.secondIntro();
        this.scaleFlag = false; 
        this.emit('enablecontrols');
    }

    move() {
        if(this.device === 'desktop') {
            this.room.position.set(-1, -0.4, 1);
        }else {
            this.room.position.set(-0.3, 0.3, -0.3);
        }
    }

    scale() {
        if(this.device === 'desktop') {
            this.room.scale.set(0.3, 0.3, 0.3);
        }else {
            this.room.scale.set(0.15, 0.15, 0.15);
        }
    }

    update() {
       if(this.moveFlag) {
        this.move();
       }

       if(this.scaleFlag) {
        this.scale();
       }
    }
}


