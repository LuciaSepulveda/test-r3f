
import React, { useRef, useEffect, useLayoutEffect } from 'react'
import { useGLTF } from '@react-three/drei'

const Cardbox = (props) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/cardbox/scene.gltf')
  

  return (
    <group {...props} ref={group} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <mesh castShadow geometry={nodes.Cardboard_box_Colormap_0.geometry} material={materials.Colormap} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/cardbox/scene.gltf')

export default Cardbox;
