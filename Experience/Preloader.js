import { EventEmitter } from 'events';
import Experience from './Experience';
import gsap from 'gsap';

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
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;

        console.log(this.roomChildren)
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
        });
    }

    secondIntro() {
        return new Promise ((resolve) => {    
            this.secondTimeline = new gsap.timeline();
    
            if(this.device === 'desktop') {
                this.secondTimeline.to(this.room.position, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: 'power1.out',
                    onComplete: resolve
                }, 'same')
                .to(this.room.rotation, {
                    y: 2 * Math.PI 
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
                    duration: 0.5,
                }, "desk")
                .to(this.roomChildren.drawer.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(1.5)',
                    duration: 0.5,
                }, "desk")
                .to(this.roomChildren.tv.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5,
                }, 'tv')
                .to(this.roomChildren.screen_tv.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5,
                }, 'tv')
                .to(this.roomChildren.computer.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(1)',
                    duration: 0.5,
                }, 'computer')
                .to(this.roomChildren.screen_desktop.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(1)',
                    duration: 0.5,
                }, 'computer')
                .to(this.roomChildren.desk_stuff_3.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(1)',
                    duration: 0.5,
                }, "photo")
                .to(this.roomChildren.screen_photo.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(1)',
                    duration: 0.5,
                }, "photo")
                .to(this.roomChildren.desk_stuff_1.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(1)',
                    duration: 0.5,
                })
                .to(this.roomChildren.desk_stuff_2.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(1)',
                    duration: 0.5,
                }, 'ben')
                .to(this.roomChildren.ben.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5,
                }, 'ben')
                .to(this.roomChildren.foot_chair.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: 'back.out(2.2)',
                    duration: 0.5,
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
                }, 'chair')
            }else {
                this.secondTimeline.to(this.roomChildren.cube.scale, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: 'power1.out',
                    onComplete: resolve
                })
                .to(this.room.scale, {
                    x: 0.2,
                    y: 0.2,
                    z: 0.2
                })
            } 
        });
    }

    onScroll(e) {
        if(e.deltaY > 0) {
            window.removeEventListener('wheel', this.scrollOnceEvent);
            this.playSecondIntro();
        }
    }

    async playIntro() {
        await this.firstIntro();
        this.scrollOnceEvent = this.onScroll.bind(this);
        window.addEventListener('wheel', this.scrollOnceEvent);
    }

    async playSecondIntro() {
        await this.secondIntro();
    }
}


