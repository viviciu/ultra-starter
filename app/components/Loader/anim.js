import { gsap } from "gsap";

export const introAnimation = (wordGroupRef) => {
    const tl = gsap.timeline();
    
    tl.to(wordGroupRef.current, {
      y: -160,
      duration: 5,
      ease: "expo.inOut"
    });

return tl
}

export const progressAnimation = (progressRef, progressNumRef) => {
    const tl = gsap.timeline();

    tl.to(progressRef.current, {
      scaleX: 1,
      duration: 5,
      ease: "power3.inOut"
    });

return tl
}
