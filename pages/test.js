import { Canvas } from '@react-three/fiber'
import React, {
    Fragment,
    // useContext,
    Suspense,
    useEffect,
    useState,
    //   useRef,
} from 'react'
import { OrbitControls, Html, PerspectiveCamera } from '@react-three/drei'
import Room from '../components/Models/Room'
import { AxesHelper } from 'three'

export const Test = () => {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Canvas shadows>
                <Fragment>
                    <Suspense fallback={null}>
                        {/* <ambientLight intensity={0.1} />
                        <pointLight intensity={1} position={[7, 5, 1]} /> */}

                        <PerspectiveCamera
                            far={10000}
                            near={5}
                            fov={55}
                            makeDefault
                            position={[440.57, 694.1, 593.92]}
                            rotation={[0, 0, 0]}
                        />
                        {/* <primitive object={new AxesHelper(1000)} /> */}

                        <Room scale={1} position={[0, 0, 0]} rotation={[0, 0, 0]} />

                    </Suspense>

                    <OrbitControls />
                </Fragment>
            </Canvas>
        </div>
    )
}

export default Test
