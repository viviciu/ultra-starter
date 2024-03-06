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
    }).to(progressNumRef.current, {
      x: "100vw",
      duration: 5,
      ease: "power3.inOut"
    },
    "0"
    ).to(progressNumRef.current, {
      textContent: "100",
      duration: 5,
      ease: "power3.inOut",
      roundProps: "textContent"
    }, "0").to(progressNumRef.current, {
      y: 24,
      autoAlpha: 0
    })

return tl
};


export const collapseWords = (loaderRef) => {
  const tl = gsap.timeline();

  tl.to(loaderRef.current, {
    "clip-path": "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
    duration: 3,
    ease: "expo.inOut"
  })

  return tl;
};
