import React, { Fragment, useContext, Suspense, useEffect, useState, useRef } from 'react'
import { useThree, useFrame, useResource } from '@react-three/fiber'
import { OrbitControls, ScrollControls, Sky, useScroll, PerspectiveCamera } from '@react-three/drei'
import { gsap, Power0 } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import CameraProjects from '../Camera/cameraProjects'
import Cat from '../Models/Cat'
import Plane from '../Models/Plane'
import CardboardBox from '../Models/CardboardBox'
import Gargoyle from '../Models/Gargoyle'
import Car from '../Models/Car'
import Iphone from '../Models/Iphone'
import ButtonMesh from '../Models/Button'
import StepLoader from '../StepLoader'
import { AppContext } from '../../context/appContext'
import { CubeTextureLoader } from 'three'
import { degToRad } from 'three/src/math/MathUtils'
gsap.registerPlugin(ScrollTrigger)
import { LayerMaterial, Depth, Noise } from 'lamina'
import * as THREE from 'three'
import { editable } from '@theatre/r3f'
import Text from '../Models/text'

const SceneProjects = () => {
    const { goToStep } = useContext(AppContext)
    const { appState } = useContext(AppContext)
    const [startProjects, setStartProjects] = useState(false)

    const EditableCamera = editable(PerspectiveCamera, 'perspectiveCamera')
    const [elementScroll, setElementScroll] = useState()

    /*const scroll = useScroll()
    
    if (appState.currentStep === 1 ) {
        setTimeout(() => demoSheet.sequence.play(), 2000)
    }
    
    useFrame(()=>{
       if (appState.currentStep === 1) {
           console.log('scroll:');
           console.log(scroll.offset)
   
       }
       //console.log(demoSheet.sequence.position)
       
   })*/
    function back() {
        goToStep(0)
    }

    function SkyBox() {
        const { scene } = useThree()
        const loader = new CubeTextureLoader()

        const texture = loader.load([
            'models/skybox/right.png',
            'models/skybox/left.png',
            'models/skybox/top.png',
            'models/skybox/bottom.png',
            'models/skybox/front.png',
            'models/skybox/back.png',
        ])

        scene.background = texture
        return null
    }

    function NoiseEffect() {
        return (
            <editable.mesh theatreKey="Background Noise" scale={10000} position={[0, 0, 40]}>
                <boxGeometry args={[1, 1, 1]} />
                <LayerMaterial side={THREE.BackSide}>
                    <Depth
                        colorB="hotpink"
                        colorA="skyblue"
                        alpha={1}
                        mode="normal"
                        near={130}
                        far={200}
                        origin={[100, 100, -100]}
                    />
                    <Noise
                        mapping="local"
                        type="white"
                        scale={1000}
                        colorA="white"
                        colorB="black"
                        mode="subtract"
                        alpha={0.2}
                    />
                </LayerMaterial>
            </editable.mesh>
        )
    }

    function Wireframe() {
        return (
            <mesh receiveShadow rotation={[-0.5 * Math.PI, 0, 0]} position={[0, 0.2, 0]}>
                <planeGeometry args={[2000, 2000, 64]} />
                <meshStandardMaterial
                    depthTest={true}
                    transparent={true}
                    side={THREE.DoubleSide}
                    wireframe
                    wireframeLinecap="butt"
                    wireframeLinejoin="miter"
                    wireframeLinewidth={0.1}
                    opacity={0.3}
                />
            </mesh>
        )
    }

    return (
        <Fragment>
            <Suspense fallback={<StepLoader step={1} />}>
                <Text />
                <NoiseEffect theatreKey={'Background Noise'} />
                
                    <EditableCamera
                        makeDefault
                        theatreKey="Camera Projects"
                        fov={100}
                        far={10000}
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                    />
                    <ambientLight intensity={0.3} color={'hotpink'} />
                    <editable.pointLight
                        theatreKey="Point Light - Scene"
                        castShadow
                        intensity={7}
                        position={[1, 5, 1]}
                        color={'hotpink'}
                        penumbra={1}
                    />
                    <editable.pointLight
                        theatreKey="Point Light - Gargoyle"
                        castShadow
                        intensity={7}
                        position={[1, 5, 1]}
                        color={'hotpink'}
                    />
                    <editable.pointLight
                        theatreKey="Point Light - Car"
                        castShadow
                        intensity={7}
                        position={[1, 5, 1]}
                        color={'hotpink'}
                    />
                    <editable.pointLight
                        theatreKey="Point Light - Iphone"
                        castShadow
                        intensity={7}
                        position={[1, 5, 1]}
                        color={'hotpink'}
                    />
                    <Cat
                        demoSheet={appState.projectState}
                        setStartProjects={setStartProjects}
                        startProjects={startProjects}
                        scene={1}
                        position={[2.679999999999992,0.85,220]}
                    />
                    <group rotation={[0, -0.5 * Math.PI, 0]} scale={[0.5, 0.5, 0.5]}>
                        <Wireframe />
                    </group>
                    <group scale={[0.5, 0.5, 0.5]}>
                        <Wireframe />
                    </group>
                    <Plane texture onClick={() => {}} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} />
                    <CardboardBox demoSheet={appState.projectState} />
                    <Gargoyle
                        demoSheet={appState.projectState}
                        scale={[15, 15, 15]}
                        position={[-10, 15, 5]}
                        rotation={[0, Math.PI / 2, 0]}
                    />
                    <Car
                        demoSheet={appState.projectState}
                        scale={[4, 4, 4]}
                        position={[6, 3, 10]}
                        rotation={[0, -Math.PI / 2, 0]}
                    />
                    <Iphone
                        demoSheet={appState.projectState}
                        scale={[5, 5, 5]}
                        position={[-10, 3, 15]}
                        rotation={[-0, -Math.PI / 2, 0]}
                    />
              
            </Suspense>
            {/* <OrbitControls/>    */}
            {/* can't move camera rotation and zoom */}
            {/* <OrbitControls ref={controls} enableRotate={false} enableZoom={false} /> */}
        </Fragment>
    )
}

export default SceneProjects
