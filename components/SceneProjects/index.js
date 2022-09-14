import React, { Fragment, useContext, Suspense, useEffect, useState, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, ScrollControls, Sky } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import CameraProyects from '../Camera/cameraProyects'
import Cat from '../Models/Cat'
import Plane from '../Models/Plane'
import Totem from '../Models/Totem'
import Cube from '../Models/Cube/index'
import Cube2 from '../Models/Cube/index2'
import CardboardBox from '../Models/CardboardBox'
import Room from '../Models/Room'
import Sticker from '../Models/Sticker'
import { useLoader } from '@react-three/fiber'
import ButtonMesh from '../Models/Button'
import { PerspectiveCamera, useScroll } from "@react-three/drei"
import StepLoader from '../StepLoader'
import { AppContext } from '../../context/appContext'
import { CubeTextureLoader } from "three";
gsap.registerPlugin(ScrollTrigger)

const SceneProjects = () => {
    const { goToStep } = useContext(AppContext)
    const [initialized, setInitialized] = useState(false)
    // const { camera } = useThree()
    // const [rotation, setRotation] = useState({
    //     x: -Math.PI / 2,
    //     y: 0,
    //     z: Math.PI,
    // })
    // const [position, setPosition] = useState({ x: 0, y: 10, z: -25 })
    // const [lookAt, setLookAt] = useState({ x: 10, y: 10, z: 10 })
    // const [start, setStart] = useState(false)
    
    const cat = useRef()

    
    function handleStart() {
        setInitialized(true)
        let timeline = gsap.timeline()
        timeline
            .to(position, { duration: 0.2 })
            .to(position, {
                y: 2,
                z: -10,
                duration: 3,
                onUpdate: function () {
                    setLookAt({ x: 0, y: 0, z: -1 })
                    setPosition(position)
                },
            })
            .to(
                rotation,
                {
                    x: Math.PI,
                    duration: 3,
                    onUpdate: function () {
                        setLookAt({ x: 0, y: 0, z: -1 })
                        setRotation(rotation)
                    },
                },
                '<'
            )
            .to(position, {
                duration: 0.1,
                onComplete: function () {
                    setStart(true)
                    console.log('Seteo start en true')
                },
            })
    }

    // function CameraHelper() {
    //     const camera = new PerspectiveCamera(60, 1, 1, 3)
    //     return (
    //         // rotation={[110, 0, 0]} -> vista trasera horizontal
    //         <group position={[0, 2, -8]} rotation={[Math.PI, 0, 0]}>
    //             <cameraHelper args={[camera]} />
    //         </group>
    //     )
    // }

    function back() {
        goToStep(0)
    }
    
    function SkyBox() {
        const { scene } = useThree();
        const loader = new CubeTextureLoader();
        
        const texture = loader.load([
          'models/skybox/right.png',
          'models/skybox/left.png',
          'models/skybox/top.png',
          'models/skybox/bottom.png',
          'models/skybox/front.png',
          'models/skybox/back.png',
      ]);
    
        scene.background = texture;
        return null;
      }

    return (
        <Fragment>
            <Suspense fallback={<StepLoader step={1} />}>
                <ScrollControls pages={4} distance={1} damping={4} horizontal={false}>
                    <CameraProyects makeDefault position={[0,10,-25]}/> 
                    {!initialized && <ButtonMesh handleButtonClicked={back} />} 
                    <PerspectiveCamera  position={[0,10,-25]} fov={55} far={1000}/>
                    <SkyBox/>
                    <ambientLight intensity={0.1} />
                    <pointLight intensity={2} position={[7, 5, 1]} />
                    <group ref={cat} position={[-9,3.5,-9]} rotation={[-0.25*Math.PI,0,0]}>
                        <Cat />
                    </group>
                    <Plane texture onClick={() => {}} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} />
                    <CardboardBox position={[-9,1.1,-12]}/>
                    <Totem position={[-9,1.1,0]} rotation={[0,0.75*Math.PI,0]} scale={[2.5,2.5,2.5]} />
                    <Room   scale={[5,5,5]}  receiveShadow position={[9, 0.2, 13]} rotation ={[0,-0.5*Math.PI,0]}/>
                    <Sticker position={[9, 7, 18]} rotation={[0,0.5*Math.PI,0]} />
                    <Cube position={[9,4,15]} rotation={[0, -Math.PI / 2, 0]} />
                    <Cube2 position={[11,3,11]} rotation={[0, -Math.PI / 2, 0]} />
                    {/* <CameraHelper /> */}
                </ScrollControls>
            </Suspense>
            <OrbitControls/>
            {/* can't move camera rotation and zoom */}
            {/* <OrbitControls enableRotate={false} enableZoom={false} /> */}
        </Fragment>
    )
}

export default SceneProjects
