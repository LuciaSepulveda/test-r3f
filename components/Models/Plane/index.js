import * as THREE from 'three'
import React from 'react'
import { DoubleSide } from 'three'
import { useLoader } from '@react-three/fiber'
// import PropTypes from 'prop-types';

const Plane = ({ position, onClick, rotation }) => {
    const texture = useLoader(THREE.TextureLoader, '/models/plane/wireframe.png')
    const alpha = useLoader(THREE.TextureLoader, '/models/plane/alpha.jpg')
    const height = useLoader(THREE.TextureLoader, '/models/plane/height.png')

    return (
        !!texture && (
            <mesh onClick={onClick} position={position} rotation={rotation}>
                <planeBufferGeometry attach="geometry" args={[500, 500]} />
                <meshStandardMaterial
                    attach="material"
                    color="pink"
                    opacity={0.5}
                    transparent
                    side={DoubleSide}
                    depthTest={true}
                    displacementScale={0.5}
                    map={texture}
                    alphaMap={alpha}
                    displacementMap={height}
                />
            </mesh>
        )
    )
}

export default Plane
