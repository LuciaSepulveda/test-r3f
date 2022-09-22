import * as THREE from 'three'
import React from 'react'
import { DoubleSide } from 'three'
import { useLoader } from '@react-three/fiber'
// import PropTypes from 'prop-types';

const Plane = ({ position, onClick, rotation, texture }) => {
    const wireframe = useLoader(THREE.TextureLoader, '/models/plane/wireframe.png')
    const wireframe2 = useLoader(THREE.TextureLoader, '/models/plane/wireframe3.png')
    const alpha = useLoader(THREE.TextureLoader, '/models/plane/alpha.jpg')
    const height = useLoader(THREE.TextureLoader, '/models/plane/height.png')

    return (
        !!wireframe && (
            <mesh receiveShadow rotation={[-0.5*Math.PI,0,0]} >
            <planeGeometry args={[250,470,64,64]} />
            <meshStandardMaterial
                depthTest = {true}
                transparent= {true}
                side = {THREE.DoubleSide}
                map = {texture? wireframe2:wireframe}
                displacementMap = {height}
                displacementScale = {.5}
                alphaMap = {alpha}
            />
            </mesh>
        )
    )
}

export default Plane
