import { Canvas } from '@react-three/fiber'
import React, {
    Fragment,
    // useContext,
    Suspense,
    useEffect,
    useState,
    //   useRef,
} from 'react'
import { OrbitControls, Html, PerspectiveCamera, Box } from '@react-three/drei'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { SheetProvider, editable as e } from '@theatre/r3f'
import { getProject } from '@theatre/core'
import demoProjectState from './../public/state.json'

studio.initialize()
//studio.extend(extension)

const demoSheet = getProject('Demo Project', { state: demoProjectState }).sheet('Demo Sheet')

export const Boca = () => {
    useEffect(() => {
        demoSheet.sequence.play({ iterationCount: Infinity, range: [0, 1] })
    }, [])
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Canvas shadows>
                <SheetProvider sheet={demoSheet}>
                    <Fragment>
                        <Suspense fallback={null}>
                            <ambientLight intensity={0.1} />
                            <pointLight intensity={1} position={[7, 5, 1]} />

                            <PerspectiveCamera
                                far={10000}
                                near={5}
                                fov={55}
                                makeDefault
                                position={[44, 40, 59]}
                                rotation={[0, 0, 0]}
                            />
                            {/* <primitive object={new AxesHelper(1000)} /> */}
                            <e.mesh theatreKey="Cube" position={[0, 0, 0]} rotation={[0, 0, 0]}>
                                <boxGeometry args={[1, 1, 1]} />
                                <meshBasicMaterial color="hotpink" />
                            </e.mesh>
                        </Suspense>
                        <OrbitControls />
                    </Fragment>
                </SheetProvider>
            </Canvas>
        </div>
    )
}

export default Boca
