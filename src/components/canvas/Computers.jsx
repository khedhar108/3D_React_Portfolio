import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber"; // root component- connection b/w Three.js and React fiber
import { OrbitControls, Preload, useGLTF } from "@react-three/drei"; //helper tools  - three.js
// useGLTF allow us to import 3d models in react application
import CanvasLoader from "../Loader";
// prop-validation Error removed by propTypes
import PropTypes from "prop-types";

// unkonw propertie- error removed by adding all properties in ignore of eslint

/*three.js --propeties used here and in canvas -React fiber */
const Computers = ({ isMobile }) => {
  // 3d model im public folder-- accessed by useGLTF hook in react applicatoin
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    // All Lights are BuiltIn part of three.js used without import throughout the project
    <mesh>
      <hemisphereLight intensity={3.15} />
      {/* light on keyboard area */}
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      {/* light on pc screen */}
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        // different size of 3d model for mobile and other platforms
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

// Canvas is used to connect React fiber {component based} with three.js
const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    // Canvas connecition b/w Three.js and React fiber
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]} /**?????? */
      camera={{ position: [20, 3, 5], fov: 25 }} // camera position when watch 3d model
      gl={{ preserveDrawingBuffer: true }} /**?????? */
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* orbitalcontrol - controls the movement of 3d object */}
        <OrbitControls
          //3d model is not zoomable
          enableZoom={false}
          // contorls top and bottom view feature ---??????
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      {/* loading all textures for 3d obj when required */}
      <Preload all />
    </Canvas>
  );
};

Computers.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default ComputersCanvas;


// --------------------------{ Canvas }--------------------------------------
/**import { Canvas } from "@react-three/fiber";

The Canvas component is typically used as the root component of a React application that uses Three.js for 3D graphics. */
// --------------------------{ Canvas }--------------------------------------





// ----------------{ OrbitControls, Preload, useGLTF }------------------------------------------------
/**import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

The first module imported is "OrbitControls", which provides a set of controls for navigating a 3D scene using the mouse or touch screen.

The second module imported is "Preload", which is used to preload assets such as textures and models before they are needed.

The third module imported is "useGLTF", which is a hook that allows you to load and use 3D models in your React application.
 */
// ----------------{ OrbitControls, Preload, useGLTF }------------------------------------------------

// ---------------{mesh}--------------------------------
/**
  In Three.js, a mesh is a 3D object that is composed of vertices, faces, and edges. It is the basic building block of a 3D scene.
 */
// ----------------------------------------------------------------


// --------------------------{ Suspence}--------------------------------------
/**import { Suspense } from "react"; 

 Suspense is a feature that allows you to defer the loading of a component until it is needed.

Suspense, you can define a fallback component that will be displayed while the main component is being loaded. This can be useful for displaying a loading indicator or other message to the user while the main component is being fetched from the server. */
// --------------------------{ Suspence}--------------------------------------
