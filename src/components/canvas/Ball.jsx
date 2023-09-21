import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

import PropTypes from "prop-types";
const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);  /**?????? */


//eslint unknown property error removed by ignoring this errors in elsint.cjs file
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      {/*  lightEffect on 3d balls */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />

      {/* creating hexagonal balls */}
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        {/* moving dark shadow effect */}
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        {/* icons on balls */}
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

// Tech.jsx used to pass icons by map method
const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} /> {/* Getting skills icons on hexagonal floating Balls */}
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

// solving props validation errors for different components
Ball.propTypes = {
  imgUrl: PropTypes.string.isRequired,
};

BallCanvas.propTypes = {
  icon: PropTypes.string.isRequired,
};

// export BallCanvas rather than Ball
export default BallCanvas;
