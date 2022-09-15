import logo from './logo.svg';
import { createRoot } from 'react-dom/client';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import './App.css';

function Box(props: any) {
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
      ref={ref}
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

function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  );
}

export default App;
