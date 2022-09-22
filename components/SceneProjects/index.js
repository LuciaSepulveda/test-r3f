import React, { Fragment, useContext, Suspense, useEffect, useState, useRef } from 'react'
import { useThree, useFrame, useResource } from '@react-three/fiber'
import { OrbitControls, ScrollControls, Sky, useScroll } from '@react-three/drei'
import { gsap, Power0} from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import CameraProjects from '../Camera/cameraProjects'
import Cat from '../Models/Cat'
import Plane from '../Models/Plane'
import Totem from '../Models/Totem'
import Cube from '../Models/Cube/index'
import Cube2 from '../Models/Cube/index2'
import CardboardBox from '../Models/CardboardBox'
import Room from '../Models/Room'
import Sticker from '../Models/Sticker'
import Logo from '../Models/Logo'
import ButtonMesh from '../Models/Button'
import StepLoader from '../StepLoader'
import { AppContext } from '../../context/appContext'
import { CubeTextureLoader } from "three";
import { degToRad } from 'three/src/math/MathUtils';
gsap.registerPlugin(ScrollTrigger)
import { LayerMaterial, Depth, Noise } from 'lamina'
import * as THREE from 'three'

const SceneProjects = () => {
    const { goToStep } = useContext(AppContext)
    const [initialized, setInitialized] = useState(false)
    const [startProjects, setStartProjects] = useState(false)
    const [rotation, setRotation] = useState({x: Math.PI/6, y: Math.PI, z: 0})
    const [position, setPosition] = useState({ x: 0, y: 5, z: -10 })
    const [lookAt, setLookAt] = useState({ x: 0, y: 0, z: 0 })
    
    const scroll = useScroll()
    const cat = useRef()
    const controls = useRef()
        

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

    function NoiseEffect() {
        return (
          <mesh scale={100} position={[0,0,40]}>
            <boxGeometry args={[1, 1, 1]} />
            <LayerMaterial side={THREE.BackSide}>
              <Depth colorB="hotpink" colorA="skyblue" alpha={1} mode="normal" near={130} far={200} origin={[100, 100, -100]} />
              <Noise mapping="local" type="white" scale={1000} colorA="white" colorB="black" mode="subtract" alpha={0.2} />
            </LayerMaterial>
          </mesh>
        )
    }

    function Wireframe(){
        return(
            <mesh receiveShadow rotation={[-0.5*Math.PI,0,0]} position={[0, 0.2, 0]} >
            <planeGeometry args={[250,470,64]} />
            <meshStandardMaterial
                depthTest = {true}
                transparent= {true}
                side = {THREE.DoubleSide}
                wireframe
                wireframeLinecap='butt'
                wireframeLinejoin='miter'
                wireframeLinewidth={0.1}
                opacity={0.3}
            />
            </mesh>
        )
    }
      

    return (
        <Fragment>
            <Suspense fallback={<StepLoader step={1} />}>
            <NoiseEffect/>
                <ScrollControls pages={4} distance={1} damping={4} horizontal={false}>
                    <CameraProjects lookAt={lookAt} position={position} rotation={rotation} startProjects={startProjects} setStartProjects={setStartProjects} /> 
                    {!initialized && <ButtonMesh handleButtonClicked={back} />} 
                    
                    <ambientLight intensity={0.3} color={'hotpink'} />
                    <pointLight intensity={7} position={[7, 5, 1]} color={'hotpink'} />
                    <Cat ref={cat} setStartProjects={setStartProjects} startProjects={startProjects} scene={1}/>
                    <group rotation={[0,-0.5*Math.PI,0]}>
                        <Wireframe/>
                    </group>
                        <Wireframe/>
                    <Plane texture onClick={() => {}} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} />
                    <CardboardBox position={[0,1.1,-3]}/>
                        <Totem position={[-9,1.1,30]} rotation={[0,0.75*Math.PI,0]} scale={[3,3,3]} />
                    <group position={[7, 0, 50]}>    
                        <Room   scale={[5,5,5]}  receiveShadow position={[9, 0.2, 13]} rotation ={[0,-0.5*Math.PI,0]}/>
                        <Sticker position={[9, 7, 18]} rotation={[0,0.5*Math.PI,0]} />
                        <Cube position={[9,4,15]} rotation={[0, -Math.PI / 2, 0]} />
                        <Cube2 position={[11,3,11]} rotation={[0, -Math.PI / 2, 0]} />
                        <Logo scale={[1.4,1.4,1.4]} position={[9,6,15]} rotation={[0, -Math.PI / 2, 0]}/>
                    </group>
                    {/* <CameraHelper /> */}
                </ScrollControls>
            </Suspense>
             {/* <OrbitControls/>  */}
            {/* can't move camera rotation and zoom */}
             {/* <OrbitControls ref={controls} enableRotate={false} enableZoom={false} /> */}
        </Fragment>
    )
}

export default SceneProjects
