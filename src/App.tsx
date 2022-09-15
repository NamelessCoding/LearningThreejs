import logo from './logo.svg';
import { createRoot } from 'react-dom/client';
import React, { HTMLAttributes, useRef, useState } from 'react';
import { Canvas, MeshProps, useFrame, useLoader } from '@react-three/fiber';
import './App.css';
import {
  Environment,
  Sky,
  Stars,
  OrbitControls,
  FlyControls,
} from '@react-three/drei';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

function Box(props: MeshProps & { extra?: string }) {
  // let a: number = 1;
  // let b: string = 'asduhoiuw';
  // let c: boolean = false;
  // let d: any;
  // let e: number[] = [1, 2, 3, 4, 5];
  // let f = {
  //   a: 1,
  //   b: {
  //     c: 'asd',
  //   },
  //   d: [1, 2, 3, 4],
  // };
  // f.a = 1;
  // f.b.c = 'dsa';
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, setClicked] = useState(false);
  let a: number = 1;
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => ((ref.current as any).rotation.x += 0.01));
  // Return the view, these are regular Threejs elements expressed in JSX

  return (
    <mesh
      {...props}
      ref={ref as any}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => {
        console.log('click', event);
        return setClicked(!clicked);
      }}
      onPointerOver={(event) => hover(true)}
      // onPointerOver={(event) => { return hover(true); } }
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

function Custom(props: any) {
  // const obj = useLoader(
  //   OBJLoader,
  //   'https://groups.csail.mit.edu/graphics/classes/6.837/F03/models/teapot.obj'
  // );
  const mtl = useLoader(MTLLoader, 'piano.mtl');
  const obj = useLoader(OBJLoader, '/piano.obj', (loader) => {
    mtl.preload();
    loader.setMaterials(mtl);
    console.log('paiowehfpaowihfpaoiwehfpio');
  });

  return (
    // <mesh geometry={obj} material={mtl} />
    <primitive object={obj} material={mtl}>
      <meshStandardMaterial />
    </primitive>
  );
}

function Button(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      style={{
        width: 100,
        height: 20,
        borderRadius: 4,
        // backgroundColor: 'blue',
      }}
      onClick={() => {
        console.log('click');
      }}
    ></div>
  );
}

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <OrbitControls />
        <Environment preset="night" />
        <Stars radius={100} depth={2} count={5000} factor={4} fade />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
        <Custom />
        <pointLight
          // color="red"
          position={[0, 0, 0]}
          // intensity={50}
          // castShadow={true}
          // shadow-bias={0.000001}
          // shadow-normalBias={0.08}
          // shadow-mapSize-height={512}
          // shadow-mapSize-width={512}
          // shadow-camera-near={0.1}
          // shadow-camera-far={30}
        />
        <directionalLight rotation={[0.5, 0.5, 0]} />
        <Sky
          distance={200}
          sunPosition={[1, -0.03, 0.5]}
          inclination={0}
          azimuth={0.5}
        />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
      </Canvas>
      <div
        style={{
          position: 'absolute',
          top: '2%',
          left: '2%',
          // width: '96%',
          backgroundColor: '#00000088',
          height: '10%',
          borderRadius: '10px',
          padding: 20,
        }}
      >
        <Button style={{ color: 'red' }} />
        {[1, 2, 3].map((item) => {
          return <Button style={{ color: 'yellow' }} />;
        })}
      </div>
    </div>
  );
}

export default App;
