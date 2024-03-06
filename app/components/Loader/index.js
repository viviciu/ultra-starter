import React, { useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, Float, Lightformer, Text, Html, ContactShadows, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import { EffectComposer, N8AO, TiltShift2 } from "@react-three/postprocessing";
import { words } from "./data";
import { gsap } from "gsap";
import { useControls } from "leva";
import * as THREE from "three";

import styles from "./Loader.module.scss";
import { collapseWords, introAnimation, progressAnimation } from "./anim.js";


const Loader = ({ timeline }) => {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);
  const progressNumberRef = useRef(null);
  const wordGroupRef = useRef(null);

  useEffect(() => {
    timeline &&
      timeline
        .add(introAnimation(wordGroupRef))
        .add(progressAnimation(progressRef, progressNumberRef), 0); // 0 is the position of the animation in the timeline. So it starts when the prev. .add begins, but the next .add happens after.
    // .add(collapseWords(loaderRef), "-=1"); // 1 second before the previous animation ends.
  }, [timeline]);

  // R3F Stuff
  const ref = useRef();
  function Box(props) {
    const { camera, raycaster, pointer, viewport } = useThree();
    const config = useControls({
      meshPhysicalMaterial: false,
      transmissionSampler: false,
      backside: true,
      samples: { value: 16, min: 1, max: 32, step: 1 },
      resolution: { value: 2048, min: 256, max: 2048, step: 256 },
      transmission: { value: 1.0, min: 0, max: 1 },
      roughness: { value: 0.19, min: 0, max: 1, step: 0.01 },
      thickness: { value: 5.95, min: 0, max: 10, step: 0.01 },
      ior: { value: 1.15, min: 1, max: 5, step: 0.01 },
      chromaticAberration: { value: 0.39, min: 0, max: 1 },
      anisotropy: { value: 0.03, min: 0, max: 1, step: 0.01 },
      anisotropicBlur: { value: 0.88, min: 0, max: 1, step: 0.01 },
      distortion: { value: 0.18, min: 0, max: 1, step: 0.01 },
      distortionScale: { value: 0.4, min: 0.01, max: 1, step: 0.01 },
      temporalDistortion: { value: 0.1, min: 0, max: 1, step: 0.01 },
      clearcoat: { value: 0.26, min: 0, max: 1 },
      attenuationDistance: { value: 1.6, min: 0, max: 10, step: 0.01 },
      attenuationColor: "#ffffff",
      color: "#8f8f8f",
      bg: "#ffffff", 
    });



    useFrame((state, delta) => {
      if (ref.current) {
        // Project the mesh's 3D position to 2D
        const projectedPosition = ref.current.position.clone().project(camera);

        // Calculate the 2D distance between the pointer and the projected position
        const dx = pointer.x - projectedPosition.x;
        const dy = pointer.y - projectedPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);


        ref.current.rotation.x += delta / distance;
        ref.current.rotation.y += delta / distance;
      }
    });

    const [hovered, hover] = useState(false);
    return (
      <mesh
        {...props}
        castShadow
        ref={ref}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        {/* <meshPhysicalMaterial color={hovered ? 'hotpink' : 'orange'} /> */}
        <MeshTransmissionMaterial
          {...config}
        />
      </mesh>
    );
  }

  function Shadows(props) {
    const { viewport } = useThree();
    return (
      <mesh
        receiveShadow
        scale={[viewport.width, viewport.height, 1]}
        {...props}
      >
        <planeGeometry />
        <shadowMaterial transparent opacity={0.5} />
      </mesh>
    );
  }

  return (
    <div className={styles.loader__wrapper}>
      <div className={styles.loader__progressWrapper}>
        <div className={styles.loader__progress} ref={progressRef}></div>
        <span className={styles.loader__progressNumber} ref={progressNumberRef}>
          0
        </span>
      </div>

      <div className={styles.loader} ref={loaderRef}>
        <div className={styles.loader__words}>
          <div className={styles.loader__overlay}></div>
          <div className={styles.loader__wordsGroup} ref={wordGroupRef}>
            {words.map((word, index) => {
              return (
                <span key={index} className={styles.loader__word}>
                  {word}
                </span>
              );
            })}
          </div>
        </div>
        <Canvas
          onMouseMove={(e) => {}}
          shadows
          camera={{ position: [0, 0, 4] }}

          // In order for two dom nodes to be able to receive events they must share
          // the same source. By re-connecting the canvas to a parent that contains the
          // text content as well as the canvas we do just that.
        >
          
          <color attach="background" args={["#e0e0e0"]} />
          <spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2} />
          {/* <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            castShadow
            shadow-mapSize={[2024, 2024]}
          />
          <pointLight position={[10, 0, 0]} /> */}
          <Box position={[0, 0, 0]} />
          {/* <Shadows position={[0, 0, -0.5]} /> */}
          <ContactShadows scale={100} position={[0, -7.5, 0]} blur={1} far={100} opacity={0.85} />
          <Environment resolution={256} preset="city">
            <group rotation={[-Math.PI / 3, 0, 1]}>
              <Lightformer form="circle" intensity={100} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
              <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
              <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
              <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
              <Lightformer form="ring" color="#4060ff" intensity={80} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[10, 10, 0]} scale={10} />
            </group>
          </Environment>
          <EffectComposer disableNormalPass>
            {/* <N8AO aoRadius={1} intensity={2} /> */}
            {/* <TiltShift2 blur={0.2} /> */}
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
};

export default Loader;
