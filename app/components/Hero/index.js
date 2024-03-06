import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";


import styles from "./Hero.module.scss";
import { animateTitle, animateImage, revealMenu } from "./anim.js";

import Logo from "@/components/Logo";

const Hero = () => {


  const heroRef = useRef(null)
  const timeline = useRef(gsap.timeline())


  useEffect(() => {
    // runs once it is rendered. has its own timeline indept of the main page.js timeline.
    const tl = timeline.current;

    // when you add a heroRef ref to the largest parent div, now we can reference anything inside that wrapper by 
    // its data-name attribute. Like classes! So you don't need a ref for every element you want to animate.
    tl.add(animateTitle(), heroRef)
      .add(animateImage(), 0)
      .add(revealMenu(), '-=2')

    // cleanup animation for react
    return () => useContext.revert();
  }, []);
  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={styles.hero__top}>
        <div data-menu-item data-hidden>
          <Logo />
        </div>
        <span data-menu-item data-hidden>about</span>
        <span data-menu-item data-hidden>contact</span>
      </div>

      <h1 className={styles.hero__title}>
        <span data-title-first data-hidden>Ultra</span>
        <span data-hero-line className={styles.hero__line}></span>
        <span data-title-last data-hidden>agency</span>
      </h1>

      <div className={styles.hero__image}>
        <div data-image-overlay className={styles.hero__imageOverlay}></div>
        <Image
          
          data-image
          src="/images/blob.jpg"
          width={1728}
          height={650}
          alt="Blob"
          style={{ objectFit: "cover" }}
        />
      </div>
    </section>
  );
};

export default Hero;
