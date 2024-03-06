"use client";

import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import { useLayoutEffect, useState } from "react";
import { gsap } from "gsap";

const Home = () => {
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [timeline, setTimeline] = useState(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setLoaderFinished(true);
        },
      });

      setTimeline(tl);
    });

    // Runs once it mounts and unmounts a component. it cleans up everything.
    return () => context.revert();
  }, []);

  return (
    <main>
      {/* If loaderFinished = True, we will render hero. */}
      {loaderFinished ? <Hero /> : <Loader timeline={timeline} />}
    </main>
  );
};

export default Home;
