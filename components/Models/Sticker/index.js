/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { useGLTF, PivotControls } from '@react-three/drei'

const Sticker = (props) => {
  const { nodes, materials } = useGLTF('./models/sticker/prueba-sticker.gltf')
  const ref = useRef()


  return (
      <group {...props} dispose={null} ref={ref}>
        <mesh castShadow  geometry={nodes.Cube.geometry} material={materials.Material} />
        <mesh castShadow  geometry={nodes['giphy_1_(4)'].geometry} material={materials['giphy 1 (4)']} position={[1.5, 0, 0]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} />
      </group>
  )
}

useGLTF.preload('./models/sticker/prueba-sticker.gltf')

export default Sticker
