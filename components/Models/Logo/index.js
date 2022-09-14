
import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import {useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

const Logo = (props) => {
  const ref = useRef()

  
  return (
    <mesh ref={ref} position={[4, 3.1, -0.4]} rotation={[-3,-6.5,-9.6]} raycast={console.log('hola')}>
      <planeBufferGeometry args={[5,1]} />
      <meshBasicMaterial
        map = {useLoader(TextureLoader, 'genosha-logo.png')}
        transparent={true}
      />
    </mesh>
  );
};
export default Logo;
