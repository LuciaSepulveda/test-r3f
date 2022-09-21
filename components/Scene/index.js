import React, { Fragment, useContext, Suspense, useEffect, useState, useRef } from 'react'
import { AppContext } from '../../context/appContext'
import { useFrame, useThree } from '@react-three/fiber'
import { Box, OrbitControls, ScrollControls, Sky, SpotLight, useTexture, useVideoTexture } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Camera from '../Camera/camera'
import Cat from '../Models/Cat'
import Plane from '../Models/Plane'
import ButtonMesh from '../Models/Button'
import { PerspectiveCamera } from 'three'
import StepLoader from '../StepLoader'
import Room from '../Models/Room'
import * as THREE from 'three'
import Cardbox from '../Models/Cardbox'
import { editable } from '@theatre/r3f'
gsap.registerPlugin(ScrollTrigger)

const Scene = ({ demoSheet }) => {
    const { goToStep } = useContext(AppContext)
    const [initialized, setInitialized] = useState(false)
    const { camera } = useThree()
    const [rotation, setRotation] = useState({
        x: -Math.PI / 2,
        y: 0,
        z: Math.PI,
    })
    const [position, setPosition] = useState({ x: 0, y: 10, z: -1 })
    const [lookAt, setLookAt] = useState({ x: 0, y: 0, z: 0 })
    const [start, setStart] = useState(false)
    const [positionLight, setPositionLight] = useState({ x: 0, y: 10, z: -4 })
    const refLight = useRef()

    // useEffect(() => {
    //     setPosition({ x: -20, y: 5, z: 6 })
    //     //setRotation({ x: -Math.PI / 2, y: 0, Z: Math.PI })
    // }, [])

    // useEffect(() => {
    //     setRotation({ x: -Math.PI / 2, y: - Math.PI / 2, z: - Math.PI / 2 })
    // }, [])

    // gsap.to(positionLight, {
    //     x: 8,
    //     duration: 2,
    //     repeat: Infinity,
    //     onUpdate: function () {
    //         setPositionLight(positionLight)
    //         if (refLight.current !== undefined && refLight.current !== null) {
    //             refLight.current.position.x = positionLight.x
    //         }
    //     },
    // })

    const vec = new THREE.Vector3()
    const viewport = useThree((state) => state.viewport)

    useFrame((state) => {
        if (refLight.current !== undefined && refLight.current !== null) {
            refLight.current.target.position.lerp(
                vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0),
                0.1
            )
            refLight.current.target.updateMatrixWorld()
        }
    })

    function handleStart() {
        setInitialized(true)
        // let timeline = gsap.timeline()
        // timeline
        //     .to(position, { duration: 0.2 })
        //     .to(position, {
        //         x: -20,
        //         y: 5,
        //         z: 6,
        //         duration: 3,
        //         onUpdate: function () {
        //             setLookAt({ x: 0, y: 0, z: -1 })
        //             setPosition(position)
        //         },
        //     })
        //     .to(
        //         rotation,
        //         {
        //             y: -Math.PI / 2,
        //             //z: Math.PI / 2,
        //             duration: 1.5,
        //             onUpdate: function () {
        //                 setLookAt({ x: 0, y: 0, z: -1 })
        //                 setRotation(rotation)
        //             },
        //         },
        //         '<'
        //     )
        //     .to(
        //         rotation,
        //         {
        //             //y: -Math.PI / 2,
        //             //z: 0,
        //             x: -Math.PI,
        //             duration: 1.5,
        //             onUpdate: function () {
        //                 setLookAt({ x: 0, y: 0, z: -1 })
        //                 setRotation(rotation)
        //             },
        //         },
        //         '<'
        //     )
        //     .to(position, {
        //         duration: 0.1,
        //         onComplete: function () {
        //             setStart(true)
        //             console.log('Seteo start en true')
        //         },
        //     })

        //ejecuta las animaciones del json de 0 a 3 segundos
        demoSheet.sequence.play({ iterationCount: 1, range: [0, 3] }).then(() => {
            setLookAt({ x: 0, y: 0, z: -1 })
            setStart(true)
        })
    }

    function CameraHelper() {
        const camera = new PerspectiveCamera(60, 1, 1, 3)
        return (
            // rotation={[110, 0, 0]} -> vista trasera horizontal
            <group position={[0, 2, -8]} rotation={[Math.PI, 0, 0]}>
                <cameraHelper args={[camera]} />
            </group>
        )
    }

    const texture = useTexture('./colors.png')
    const textureVideo = useVideoTexture('/video.mp4')

    const EditableSpotLight = editable(SpotLight, 'spotLight')

    return (
        <Fragment>
            <Suspense fallback={<StepLoader step={0} />}>
                <ScrollControls pages={3} distance={1} damping={4} horizontal={false}>
                    {/* <ambientLight intensity={0.1} visible="editor" /> */}
                    {/* <e.pointLight intensity={2} position={[7, 5, 1]} /> */}
                    <editable.pointLight theatreKey="point light" position={[10, 10, 10]} />
                    <Sky sunPosition={[7, 5, 1]} />
                    <Camera demoSheet={demoSheet} start={start} />
                    {!initialized && <ButtonMesh handleButtonClicked={handleStart} />}
                    <Cat demoSheet={demoSheet} start={start} scene={0} />
                    <Room />
                    <Plane rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} />
                    <CameraHelper />
                    <EditableSpotLight
                        map={textureVideo}
                        position={[0, 9, -8]}
                        angle={Math.PI / 5}
                        penumbra={1}
                        distance={80}
                        intensity={10}
                        ref={refLight}
                        //radiusTop={0.2}
                        //radiusBottom={0.6}
                        anglePower={4}
                        castShadow
                        theatreKey="spotLight"
                    />
                    <Cardbox position={[4, 0.85, 20]} />
                    <ButtonMesh handleButtonClicked={() => goToStep(1)} position={[0, 0.124, 0.5]} />
                </ScrollControls>
            </Suspense>
            {/* can't move camera rotation and zoom */}
            {/* <OrbitControls enableRotate={false} enableZoom={false} /> */}
            {/* <OrbitControls /> */}
        </Fragment>
    )
}

export default Scene
