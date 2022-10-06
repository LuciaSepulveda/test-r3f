/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { editable as e } from '@theatre/r3f'

const Text = (props) => {
    const { nodes, materials } = useGLTF('./models/text/text.gltf')
    return (
        <e.group theatreKey="text" {...props} dispose={null} position={[0, 100, 0]}>
            <mesh
                geometry={nodes.Texto.geometry}
                material={materials['Material.001']}
                rotation={[Math.PI / 2, 0, 0]}
                scale={[1, 20, 1]}
            />
        </e.group>
    )
}

useGLTF.preload('./models/text/text.gltf')

export default Text
