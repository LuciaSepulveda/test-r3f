import React, { Fragment, useContext, Suspense, useEffect, useState, useRef } from 'react'
import { useThree, useFrame, useResource, useLoader } from '@react-three/fiber'
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
import Totem1 from '../Models/Totem1/Totem_1_NUEVAS_NUBES'
import ButtonMesh from '../Models/Button'
import StepLoader from '../StepLoader'
import { AppContext } from '../../context/appContext'
import { CubeTextureLoader, RepeatWrapping, TextureLoader } from "three";
import { degToRad } from 'three/src/math/MathUtils';
gsap.registerPlugin(ScrollTrigger)
import { LayerMaterial, Depth, Noise } from 'lamina'
import * as THREE from 'three'
import { editable } from '@theatre/r3f'


const SceneProjects = ({demoSheet}) => {
    const { goToStep } = useContext(AppContext)
    const { appState } = useContext(AppContext)
    const [startProjects, setStartProjects] = useState(false)
    const [startScroll, setStartScroll] = useState(false)
    const [scrollTop, setScrollTop] = useState(false)
        
    const EditableCamera = editable(PerspectiveCamera, 'perspectiveCamera')
            
    const scrollY = useScroll()
        
    useEffect(()=>{
        if (appState.currentStep === 1 ) {
            setTimeout(() =>demoSheet.sequence.play({ range: [0, 4], iterationCount: 1 }), 4000)
           //setTimeout(() =>demoSheet.sequence.play(), 5000)
           //demoSheet.sequence.play({ range: [0, 4], iterationCount: 1 })
           
        }
    },[]) 

    /*useEffect(() => {
        const scrollToTop = () => {
          const scrollY = window.scrollY || window.pageYOffset;
          if (scrollY > 0) {
            window.scrollTo(0, 0);
          }
        };
        scrollToTop();
      }, [scrollTop]);*/
   
    
     useFrame(()=>{
        if (appState.currentStep === 1 && startScroll ){
            console.log('1:' +scrollY.range(0,1/18)); // 4 - 12.35 (8.35t)
            console.log('2:' +scrollY.range(1/18,1/18)); // 12.35 - 16 (3.25t) 1°totem
            console.log('3:' +scrollY.range(2/18,1/18)); // 16 - 26.34 (10.34t)
            console.log('4:' +scrollY.range(3/18,1/18)); // 26.34 - 30 (3.26t) 2°totem
            console.log('5:' +scrollY.range(4/18,1/18)); // 30 - 40 (10t)
            console.log('6:' +scrollY.range(5/18,1/18)); // 40 - 44 (4t) 3°totem

            // console.log(demoSheet.sequence.position)
                         
            // 1° scroll (yendo al 1)
            if (scrollY.range(0,1/18) < 1 )
                demoSheet.sequence.position = 4 + scrollY.range(0,1/18)*8.35 //tiene que llegar a la posición 12.35
            // 2° scroll (1°totem)
            if (scrollY.range(0,1/18) === 1  && scrollY.range(1/18,1/18) < 1 )
                demoSheet.sequence.position = 12.35 + scrollY.range(1/18,1/18)*3.65 // tiene que llegar a la posición 12
            // 3°scroll (yendo al 2)                
            if (scrollY.range(1/18,1/18) === 1  && scrollY.range(2/18,1/18) < 1 )
                demoSheet.sequence.position = 16  + scrollY.range(2/18,1/18)*10.34
            // 4°scroll (2°totem)
            if (scrollY.range(2/18,1/18) === 1  && scrollY.range(3/18,1/18) < 1 )
                demoSheet.sequence.position = 26.34 + scrollY.range(3/18,1/18)*3.26
            // 5° scroll (yendo al 3)
            if (scrollY.range(3/18,1/18) === 1  && scrollY.range(4/18,1/18) < 1 )
                demoSheet.sequence.position = 30 + scrollY.range(4/18,1/18)*10
            // 6° scroll (3°totem)
            if (scrollY.range(4/18,1/18) === 1  && scrollY.range(5/18,1/18) < 1 )
                demoSheet.sequence.position = 40 + scrollY.range(5/18,1/18)*4
        }
        

    },)
    

    function back() {
        goToStep(0)
    }
    
    function SkyBox() {
        /*const { scene } = useThree();
        const loader = new CubeTextureLoader();

        
        const texture = loader.load([
          'models/skybox/right.png',
          'models/skybox/left.png',
          'models/skybox/top.png',
          'models/skybox/bottom.png',
          'models/skybox/front.png',
          'models/skybox/back.png',
      ]);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set( 4, 4 );
        scene.background = texture;*/

    const loader = new THREE.CubeTextureLoader();
    loader.setPath( 'models/skybox/' );

    const textureCube = loader.load( [
        'right.png', 'left.png',
        'top.png', 'bottom.png',
        'front.png', 'back.png'
    ] );

    //const material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );

            const texture_1 = useLoader(TextureLoader, 'models/skybox/right.png')
            const texture_2 = useLoader(TextureLoader, 'models/skybox/left.png')
            const texture_3 = useLoader(TextureLoader, 'models/skybox/top.png')
            const texture_4 = useLoader(TextureLoader, 'models/skybox/bottom.png')
            const texture_5 = useLoader(TextureLoader, 'models/skybox/front.png')
            const texture_6 = useLoader(TextureLoader, 'models/skybox/back.png')
        return (
            <mesh  position={[0,0,40]}>
                <meshBasicMaterial attachArray="material" map={texture_1} side={THREE.BackSide}/>
                <meshBasicMaterial attachArray="material" map={texture_2} side={THREE.BackSide}/>
                <meshBasicMaterial attachArray="material" map={texture_3} side={THREE.BackSide}/>
                <meshBasicMaterial attachArray="material" map={texture_4} side={THREE.BackSide}/>
                <meshBasicMaterial attachArray="material" map={texture_5} side={THREE.BackSide}/>
                <meshBasicMaterial attachArray="material" map={texture_6} side={THREE.BackSide}/>
                <boxGeometry args={[1500, 1500, 1500]} />
            </mesh>
        );
    }

    function NoiseEffect() {
        return (
          <editable.mesh theatreKey='Background Noise' scale={100}  position={[0,0,40]} >
            <boxGeometry args={[1, 1, 1]} />
            <LayerMaterial side={THREE.BackSide}>
              <Depth colorB="hotpink" colorA="skyblue" alpha={1} mode="normal" near={130} far={200} origin={[100, 100, -100]} />
              <Noise mapping="local" type="white" scale={1000} colorA="white" colorB="black" mode="subtract" alpha={0.2}  />
            </LayerMaterial>
          </editable.mesh>
        )
    }

    function Wireframe(){
        return(
            <mesh receiveShadow rotation={[-0.5*Math.PI,0,0]} position={[0, 0.2, 0]} >
            <planeGeometry args={[10000,10000,256]} />
            <meshStandardMaterial
                depthTest = {true}
                transparent= {true}
                side = {THREE.DoubleSide}
                wireframe
                wireframeLinecap='butt'
                wireframeLinejoin='miter'
                wireframeLinewidth={0.1}
                opacity={0.5}
            />
            </mesh>
        )
    }
      

    return (
        <Fragment>
            <Suspense fallback={<StepLoader step={1} />}>            
                <SkyBox/>
                    <NoiseEffect/>
                <editable.group theatreKey='EDITAR SKYBOX'>
                    <editable.group theatreKey="Camera Projects - ROTATION X">
                            <EditableCamera makeDefault theatreKey="Camera Projects" fov={100} far={100000} position={[0, 0, 0]} rotation={[0, 0, 0]}/>
                    </editable.group>
                    {/* <ambientLight intensity={0.3} color={'hotpink'} /> */}
                    <ButtonMesh handleButtonClicked={() => back(0)} position={[-4, 1, -240]} />
                    <editable.group theatreKey='btn gargoyle' rotation={[0,-0.5*Math.PI,0]}>
                        <ButtonMesh handleButtonClicked={() => back(0)}  />
                    </editable.group>
                    <editable.group theatreKey='btn car' rotation={[Math.PI,-0.5*Math.PI,0]}>
                        <ButtonMesh handleButtonClicked={() => back(0)}  />
                    </editable.group>
                    <editable.group theatreKey='btn phone' rotation={[Math.PI,-0.5*Math.PI,0]}>
                        <ButtonMesh handleButtonClicked={() => back(0)}  />
                    </editable.group>
                        
                        <editable.directionalLight theatreKey="Directional Light - Diego" castShadow intensity={.5}  color={'hotpink'} position={[0,1,0]}/>
                        <editable.pointLight theatreKey="Point Light - Diego" castShadow intensity={4} color={'hotpink'} />
                    {/*
                    <editable.pointLight theatreKey="Point Light - Scene" castShadow intensity={2} position={[1, 5, 1]} scale={[5,5,5]}  penumbra={1} />
                    
                    <editable.pointLight theatreKey="Point Light - Car" castShadow intensity={7} position={[1, 5, 1]} color={'hotpink'} />
                    <editable.pointLight theatreKey="Point Light - Iphone" castShadow intensity={7} position={[1, 5, 1]} color={'hotpink'} /> */}
                    <Cat setScrollTop={setScrollTop} demoSheet={demoSheet} setStartScroll={setStartScroll} setStartProjects={setStartProjects} startProjects={startProjects} scene={1}/>
                    <group rotation={[0,-0.5*Math.PI,0]} scale={[0.5,0.5,0.5]} >
                        <Wireframe/>
                    </group>
                    <group scale={[0.5,0.5,0.5]}>
                        <Wireframe/>
                    </group>
                    
                    <Plane texture onClick={() => {}} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} />
                    <CardboardBox demoSheet={demoSheet}/>
                    <Totem1 demoSheet={demoSheet} scale={[15,15,15]} position={[-10,15,5]} rotation={[0, Math.PI / 2, 0]}/>
                    
                    <Car demoSheet={demoSheet} scale={[4,4,4]} position={[6,3,10]} rotation={[0, -Math.PI / 2, 0]}/>
                    <Iphone demoSheet={demoSheet} scale={[5,5,5]}position={[-10,3,15]} rotation={[-0, -Math.PI / 2, 0]}/>
                </editable.group>
            </Suspense>
               {/* <OrbitControls/>     */}
            {/* can't move camera rotation and zoom */}
             {/* <OrbitControls ref={controls} enableRotate={false} enableZoom={false} /> */}
        </Fragment>
    )
}

export default SceneProjects
