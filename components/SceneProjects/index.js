import React, { Fragment, useContext, Suspense, useEffect, useState, useRef } from 'react'
import { useThree, useFrame, useResource } from '@react-three/fiber'
import { OrbitControls, ScrollControls, Sky, useScroll, PerspectiveCamera } from '@react-three/drei'
import { gsap, Power0} from 'gsap'
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
import { CubeTextureLoader } from "three";
import { degToRad } from 'three/src/math/MathUtils';
gsap.registerPlugin(ScrollTrigger)
import { LayerMaterial, Depth, Noise } from 'lamina'
import * as THREE from 'three'
import { editable } from '@theatre/r3f'


const SceneProjects = ({demoSheet}) => {
    const { goToStep } = useContext(AppContext)
    const { appState } = useContext(AppContext)
    const [startProjects, setStartProjects] = useState(false)
        
    const EditableCamera = editable(PerspectiveCamera, 'perspectiveCamera')

     // const [scroll, setScroll] = useState(0)
    // const prevScroll = usePrevious(scroll)
    
    const scrollY = useScroll()
        
     if (appState.currentStep === 1 ) {
      //  setTimeout(() => demoSheet.sequence.play(), 2000)
    }
    
    /*function usePrevious(value) {
        const ref = useRef()
        useEffect(() => {
            ref.current = value
        })
        return ref.current
    }*/
    /*
     useEffect(() => {
         if (!scroll && !prevScroll) return

         if (scroll && prevScroll) {
             const difference = scroll - prevScroll

             if (Math.abs(difference) > 0.0001) {
                 setWalk(true)
             } else {
                 setWalk(false)
             }
         }
     }, [scroll])*/
    
     useFrame(()=>{
        if (appState.currentStep === 1 ){
            console.log('1:' +scrollY.range(0,1/18)); // 0 - 8.35 (8.35t)
            console.log('2:' +scrollY.range(1/18,1/18)); // 8.35 - 12 (3.25t) 1°totem
            console.log('3:' +scrollY.range(2/18,1/18)); // 12 - 22.34 (10.34t)
            console.log('4:' +scrollY.range(3/18,1/18)); // 22.34 - 26 (3.26t) 2°totem
            console.log('5:' +scrollY.range(4/18,1/18)); // 26 - 36 (10t)
            console.log('6:' +scrollY.range(5/18,1/18)); // 36 - 40 (4t) 3°totem
            
             
            // 1° scroll (yendo al 1)
            if (scrollY.range(0,1/18) < 1 )
                demoSheet.sequence.position = scrollY.range(0,1/18)*8.35 //tiene que llegar a la posición 8.35
            // 2° scroll (1°totem)
            if (scrollY.range(0,1/18) === 1  && scrollY.range(1/18,1/18) < 1 )
                demoSheet.sequence.position = 8.35 + scrollY.range(1/18,1/18)*3.65
            // 3°scroll (yendo al 2)                
            if (scrollY.range(1/18,1/18) === 1  && scrollY.range(2/18,1/18) < 1 )
            demoSheet.sequence.position = 12  + scrollY.range(2/18,1/18)*10.34
            // 4°scroll (2°totem)
            if (scrollY.range(2/18,1/18) === 1  && scrollY.range(3/18,1/18) < 1 )
            demoSheet.sequence.position = 22.34 + scrollY.range(3/18,1/18)*3.26
            // 5° scroll (yendo al 3)
            if (scrollY.range(3/18,1/18) === 1  && scrollY.range(4/18,1/18) < 1 )
            demoSheet.sequence.position = 26 + scrollY.range(4/18,1/18)*10
            // 6° scroll (3°totem)
            if (scrollY.range(4/18,1/18) === 1  && scrollY.range(5/18,1/18) < 1 )
            demoSheet.sequence.position = 36 + scrollY.range(5/18,1/18)*4
        }
        

    },)

    /*prevScroll < scrollY.range(0, 1 / 6)
        ? prevScroll * 7 : scrollY.range(0, 1 / 6) * 7,
    prevScroll < scrollY.range(0, 1 / 6)
        ? scrollY.range(0, 1 / 6) * 7 : prevScroll * 7,*/


    
    useFrame(()=>{
       if (appState.currentStep === 1) { 
          console.log(demoSheet.sequence.position)
       }
    })

    

    
    
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
          <editable.mesh theatreKey='Background Noise' scale={10000}  position={[0,0,40]}>
            <boxGeometry args={[1, 1, 1]} />
            <LayerMaterial side={THREE.BackSide}>
              <Depth colorB="hotpink" colorA="skyblue" alpha={1} mode="normal" near={130} far={200} origin={[100, 100, -100]} />
              <Noise mapping="local" type="white" scale={1000} colorA="white" colorB="black" mode="subtract" alpha={0.2} />
            </LayerMaterial>
          </editable.mesh>
        )
    }

    function Wireframe(){
        return(
            <mesh receiveShadow rotation={[-0.5*Math.PI,0,0]} position={[0, 0.2, 0]} >
            <planeGeometry args={[2000,2000,64]} />
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
            <NoiseEffect theatreKey={'Background Noise'}/>
                    <EditableCamera makeDefault theatreKey="Camera Projects" fov={100} far={10000} position={[0, 0, 0]} rotation={[0, 0, 0]}/>
                    <ambientLight intensity={0.3} color={'hotpink'} />
                    <editable.pointLight theatreKey="Point Light - Scene" castShadow intensity={7} position={[1, 5, 1]} color={'hotpink'}  penumbra={1} />
                    <editable.pointLight theatreKey="Point Light - Gargoyle" castShadow intensity={7} position={[1, 5, 1]} color={'hotpink'} />
                    <editable.pointLight theatreKey="Point Light - Car" castShadow intensity={7} position={[1, 5, 1]} color={'hotpink'} />
                    <editable.pointLight theatreKey="Point Light - Iphone" castShadow intensity={7} position={[1, 5, 1]} color={'hotpink'} />
                    <Cat demoSheet={demoSheet} setStartProjects={setStartProjects} startProjects={startProjects} scene={1}/>
                    <group rotation={[0,-0.5*Math.PI,0]} scale={[0.5,0.5,0.5]} >
                        <Wireframe/>
                    </group>
                    <group scale={[0.5,0.5,0.5]}>
                        <Wireframe/>
                    </group>
                    <Plane texture onClick={() => {}} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} />
                    <CardboardBox demoSheet={demoSheet}/>
                    <Gargoyle demoSheet={demoSheet} scale={[15,15,15]} position={[-10,15,5]} rotation={[0, Math.PI / 2, 0]}/>
                    <Car demoSheet={demoSheet} scale={[4,4,4]} position={[6,3,10]} rotation={[0, -Math.PI / 2, 0]}/>
                    <Iphone demoSheet={demoSheet} scale={[5,5,5]}position={[-10,3,15]} rotation={[-0, -Math.PI / 2, 0]}/>
            </Suspense>
              {/* <OrbitControls/>    */}
            {/* can't move camera rotation and zoom */}
             {/* <OrbitControls ref={controls} enableRotate={false} enableZoom={false} /> */}
        </Fragment>
    )
}

export default SceneProjects
