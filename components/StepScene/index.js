import React from 'react' // Suspense, // useContext,
import { Canvas } from '@react-three/fiber'
import Scene from '../Scene'
import { AxesHelper } from 'three'
import { AppContext } from '../../context/appContext'
import { useContext } from 'react'

const StepScene = () => {
    //   const {
    //     // appState,
    //     // setAppState,
    //     goToStep,
    //     // setLanguage,
    //     // cleanStorage,
    //   } = useContext(AppContext);

    const { goToStep } = useContext(AppContext)

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Canvas shadows camera={{ position: [2, 2, 2], fov: 90 }}>
                {/* <primitive object={new AxesHelper(10)} /> */}
                <Scene click={() => goToStep(2)} />
            </Canvas>
        </div>
    )
}

export default StepScene
