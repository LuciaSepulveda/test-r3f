/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect} from 'react'
import { useGLTF } from '@react-three/drei'

const Room = (props) => {
  const { nodes, materials } = useGLTF('./models/room/scene.gltf') 

  const ref = useRef()

  
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Plano.geometry} material={materials['Material.001']} />
      <mesh castShadow  geometry={nodes.Cubo.geometry} material={materials['Material.002']} position={[0, -0.01, 0]} />
    </group>
  )
}

useGLTF.preload('./models/room/scene.gltf')

export default Room