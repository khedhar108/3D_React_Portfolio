import React,{ Suspense } from "react"; // 

import { Canvas } from "@react-three/fiber";  // root component from React fiber that use Three.js for 3D graphics---connection b/w Three.js & React Fiber
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";  // utility functions helper library - Three.js

// import CanvasLoader from "../Loader";
const CanvasLoader = React.lazy(() => import("../Loader"));

/**every property like scale , position , camera, dpr , gl  , shadow -----part of Three.js bydefault  */


// component Earth is used only to get Earth 3D model and show it  inside Earth canvas
const Earth = () => {
  // useGLTF - main hook for implementing 3d obj in react application
  const earth = useGLTF("./planet/scene.gltf");

  return (
    // Getting the 3d model so use in canvas further
    <mesh>
       <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
    </mesh>
   
  );
};

// using Earth react component inside CanvasComponent
const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      // camera angles
      camera={{
        fov: 45,   // field of view
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate        //enables automatic rotation of the scene around its center point.
          enableZoom={false}   //zooming is disabled.
          // viewer cann't see 3d model from top and bottom side when use mouse to control model----more info ??????{link ?}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
          <Earth />
          {/* all importnat assests , textures loaded only when needed */}
        <Preload all />       
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;



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