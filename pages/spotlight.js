import { Canvas } from '@react-three/fiber'
import React, {
    Fragment,
    Suspense,
    useEffect,
    useState,
} from 'react'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { AxesHelper } from 'three'
import SpotlightComponent from '../components/Spotlight'
import Plane from '../components/Models/Plane'
import { SheetProvider, editable } from '@theatre/r3f'
import studio from '@theatre/studio'
import { getProject } from '@theatre/core'

studio.initialize()
const demoSheet = getProject('Demo').sheet('Demo')

const EditableCamera = editable(PerspectiveCamera, 'perspectiveCamera')

export const SpotlightPage = () => {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Canvas shadows>
                <SheetProvider sheet={demoSheet}>
                    <Fragment>
                        <Suspense fallback={null}>
                            {/* <ambientLight intensity={0.1} /> */}
                            <editable.pointLight theatreKey="point light" intensity={1} position={[7, 5, 1]} />
                            <EditableCamera
                                far={1000}
                                near={5}
                                fov={55}
                                makeDefault
                                position={[50, 50, 50]}
                                rotation={[0, 0, 0]}
                                theatreKey="perspectiveCamera"
                            />
                            <editable.mesh theatreKey="box">
                                <boxBufferGeometry position={[0, 0, 0]} />
                                <meshBasicMaterial color="blue" />
                            </editable.mesh>
                            <primitive object={new AxesHelper(1000)} />
                            <SpotlightComponent />
                            <Plane rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} />
                        </Suspense>
                        <OrbitControls />
                    </Fragment>
                </SheetProvider>
            </Canvas>
        </div>
    )
}

export default SpotlightPage
