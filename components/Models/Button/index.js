import React, { useRef, useState } from 'react'
import { Text } from '@react-three/drei'

const ButtonMesh = ({ handleButtonClicked }) => {
    const ref = useRef()
    const [hovered, hover] = useState(false)

    return (
        <group>
            <mesh
                ref={ref}
                scale={1}
                // scale={hovered ? 1.2 : 1}
                onClick={handleButtonClicked}
                onPointerOver={(event) => hover(true)}
                onPointerOut={(event) => hover(false)}
                rotation={[Math.PI / 2, Math.PI, 0]}
                position={[0, 0.124, 1]}
            >
                <Text color={hovered ? 'white' : '#F10262'} anchorX="center" anchorY="middle" fontSize="0.2">
                    COMENZAR
                </Text>
            </mesh>

            <mesh
                ref={ref}
                scale={1}
                // scale={hovered ? 1.2 : 1}
                onClick={handleButtonClicked}
                onPointerOver={(event) => hover(true)}
                onPointerOut={(event) => hover(false)}
                rotation={[Math.PI / 2, 0, 0]}
                position={[0, 0.08, 1]}
            >
                <boxGeometry attach="geometry" args={[1.4, 0.4, 0.08]} />
                <meshStandardMaterial attach="material" color={hovered ? '#F10262' : 'white'} />
            </mesh>
        </group>
    )
}

export default ButtonMesh
