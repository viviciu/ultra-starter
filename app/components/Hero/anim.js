import {gsap} from "gsap";

export const animateTitle = () => {
    const tl = gsap.timeline({
        defaults: {
            ease: 'expo.out',
            duration: 2
        }
    });

    // css targeting with the brackets
    tl.to('[data-hero-line]', {
        scaleX: 1
    }).fromTo('[data-title-first]', {x:100, autoAlpha:0}, {x:0, autoAlpha:1}, '<5%')
    .fromTo('[data-title-last]', {x:-100, autoAlpha:0}, {x:0, autoAlpha:1}, '<') // '<' means it starts at the same time as the prev animation.

    return tl;
}

export const animateImage = () => {
    const tl = gsap.timeline({
        defaults: {
            ease: 'expo.out',
            duration: 1.5
        }
    })

    tl.to('[data-image-overlay]', {
        scaleY: 1,
    })
    .from('[data-image]', {
        yPercent: 100
    }, '<')
    .to('[data-image-overlay]', {
        scaleY: 0,
        transformOrigin: 'top center'
    })
    .from('[data-image]', {
        duration: 2,
        scale: 1.3,
        autoAlpha: 1
    }, '<')
    
    return tl
}

export const revealMenu = () => { 
    const tl = gsap.timeline()

    tl.fromTo('[data-menu-item]', {
        autoAlpha: 0,
        y: 32
    }, {
        autoAlpha: 1,
        y: 0,
        stagger: 0.2, // stagger is a gsap method that will stagger the animation of each element in the menu's array.
        ease: 'expo.out',
        duration: 2
    })
    
    
    return tl;
}