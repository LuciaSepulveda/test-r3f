import React, { Fragment, useContext, Suspense, useEffect, useState, useRef } from 'react'
import { useThree, useFrame, useResource } from '@react-three/fiber'
import {
    OrbitControls,
    ScrollControls,
    Sky,
    useScroll,
    useTexture,
    PerspectiveCamera,
    Text3D,
    Spotlight,
    Box,
    Cone,
    Cylinder,
    ScreenQuad,
    Dodecahedron,
    RenderTexture,
    Text,
    Segments,
    Segment,
    Mask,
    PivotControls,
    Bounds,
    Float,
    useVideoTexture,
    useMask,
    SpotLight,
} from '@react-three/drei'
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
import { CubeTextureLoader, Triangle } from 'three'
import { degToRad } from 'three/src/math/MathUtils'
gsap.registerPlugin(ScrollTrigger)
import { LayerMaterial, Depth, Noise } from 'lamina'
import * as THREE from 'three'
import { editable } from '@theatre/r3f'
//import Text from '../Models/text'
import SpotlightComponent from '../Spotlight'

const words = ['PRODUCTO DIGITAL', 'EXPERIENCIAS INTERACTIVAS', 'NUEVAS TECNOLOGIAS', 'INNOVACION']

const cutWord = (word) => {
    return word.split(' ')
}

const SceneProjects = () => {
    const { goToStep } = useContext(AppContext)
    const { appState } = useContext(AppContext)
    const [startProjects, setStartProjects] = useState(false)

    const EditableCamera = editable(PerspectiveCamera, 'perspectiveCamera')
    const EditableSpotlight = editable(Spotlight, 'spotLight')
    const [elementScroll, setElementScroll] = useState()

    const EditableText3D = editable(Text3D, 'text3d')

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

    // let materials = [
    //     new THREE.MeshLambertMaterial({
    //         map: useTexture('./boca1.jpg'),
    //     }),
    //     new THREE.MeshLambertMaterial({
    //         map: useTexture('./boca2.jpg'),
    //     }),
    //     new THREE.MeshLambertMaterial({
    //         map: useTexture('./boca3.jpg'),
    //     }),
    //     new THREE.MeshLambertMaterial({
    //         map: useTexture('./boca4.jpg'),
    //     }),
    //     new THREE.MeshLambertMaterial({
    //         map: useTexture('./colors.png'),
    //     }),
    //     new THREE.MeshLambertMaterial({
    //         map: useTexture('./boca5.jpg'),
    //     }),
    // ]

    const textRef = useRef()
    useFrame((state) => {
        if (textRef.current !== undefined) {
            textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 2
        }
    })

    const vertices = new Float32Array([1, 1, 1, 200, 200, 200, 40, 40, 40])

    const triangleShape = new THREE.Shape([
        new THREE.Vector2(0, 0),
        new THREE.Vector2(50, 100),
        new THREE.Vector2(100, 0),
    ])

    const stencil = useMask(1, false)

    const textureVideo = useVideoTexture('./test2.mp4')
    const textureVideo2 = useVideoTexture('./test.mp4')

    return (
        <Fragment>
            <Suspense fallback={<StepLoader step={1} />}>
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
                    position={[2.679999999999992, 0.85, 220]}
                />
                <editable.group rotation={[0, 3.14, 0]} position={[14, 1000, 320]} theatreKey={'QueHacemos'}>
                    <Text3D
                        curveSegments={32}
                        bevelEnabled
                        bevelSize={0.09}
                        size={2}
                        height={0.8}
                        lineHeight={0.5}
                        letterSpacing={-0.06}
                        font="./inter_bold.json"
                    >
                        {`SERVICIOS`}
                        <meshNormalMaterial />
                    </Text3D>
                </editable.group>
                <editable.group rotation={[0, 3.14, 0]} position={[14, 1000, 420]} theatreKey={'Ux'}>
                    <Text3D
                        curveSegments={32}
                        bevelEnabled
                        bevelSize={0.09}
                        size={2}
                        height={0.8}
                        lineHeight={0.5}
                        letterSpacing={-0.06}
                        font="./inter_bold.json"
                    >
                        UX
                        <meshNormalMaterial />
                    </Text3D>
                </editable.group>
                <editable.group rotation={[0, 3.14, 0]} position={[14, 1000, 400]} theatreKey={'Machine'}>
                    <Text3D
                        curveSegments={32}
                        bevelEnabled
                        bevelSize={0.09}
                        size={2}
                        height={0.8}
                        lineHeight={0.5}
                        letterSpacing={-0.06}
                        font="./inter_bold.json"
                    >
                        MACHINE LEARNING
                        <meshNormalMaterial />
                    </Text3D>
                </editable.group>
                <editable.group rotation={[0, 3.14, 0]} position={[14, 1000, 450]} theatreKey={'Machine2'}>
                    <Text3D
                        curveSegments={32}
                        bevelEnabled
                        bevelSize={0.09}
                        size={2}
                        height={0.8}
                        lineHeight={0.5}
                        letterSpacing={-0.06}
                        font="./inter_bold.json"
                    >
                        MACHINE LEARNING2
                        <meshNormalMaterial />
                    </Text3D>
                </editable.group>
                {/* <EditableText3D theatreKey="ux" font="/inter_bold.json">
                    UX
                </EditableText3D>
                <EditableText3D theatreKey="machine1" font="/inter_bold.json">
                    MACHINE LEARNING
                </EditableText3D>
                <EditableText3D theatreKey="machine2" font="/inter_bold.json">
                    MACHINE LEARNING
                </EditableText3D> */}
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
                <editable.mesh theatreKey="Cone" position={[0, 20, -180]}>
                    <coneGeometry args={[50, 50, 4]} />
                    <meshStandardMaterial color="#ffffff" />
                </editable.mesh>
                <SpotlightComponent id="1" video={textureVideo} />
                <SpotlightComponent id="2" video={textureVideo2} />
                {words.map((word, index) => (
                    <>
                        {cutWord(word).map((w, i) => (
                            <group
                                key={w}
                                rotation={[0, 3.14, 0]}
                                position={[-44, 10, -250 + index * 20 + i * 10]}
                                theatreKey={'word' + w}
                            >
                                <Text3D
                                    curveSegments={32}
                                    bevelEnabled
                                    bevelSize={0.09}
                                    size={2}
                                    height={0.8}
                                    lineHeight={0.5}
                                    letterSpacing={-0.06}
                                    font="./inter_bold.json"
                                >
                                    {w}
                                    <meshNormalMaterial />
                                </Text3D>
                            </group>
                        ))}
                    </>
                ))}
                <instancedMesh args={[null, null, 10]}>
                    <bufferGeometry attach="geometry">
                        <bufferAttribute attachObject={['attributes', 'position']} args={[vertices, 3]} />
                    </bufferGeometry>
                    <meshBasicMaterial attach="material" side={THREE.DoubleSide} color="#555" />
                </instancedMesh>
                {/* <mesh position={[-100, 40, 50]} rotation={[-Math.PI / 6, 0, 0]}>
                    <shapeGeometry args={[triangleShape, 12]} />
                    // <boxGeometry args={[50, 50, 50]} /> 
                    <meshStandardMaterial side={THREE.DoubleSide}>
                        <RenderTexture attach="map" anisotropy={16}>
                            <EditableCamera
                                theatreKey="cameraTest"
                                makeDefault
                                manual
                                aspect={1 / 1}
                                position={[0, 0, 10]}
                            />
                            // <color attach="background" args={['orange']} /> 
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[10, 10, 5]} />
                            // <SpotlightComponent id="test" position={[0, 0, -5]} />
                            //<editable.mesh theatreKey="planeTest">
                            //    <planeGeometry args={[20, 20]} />
                            //    <meshBasicMaterial
                            //        color="#16e960"
                            //        side={THREE.DoubleSide}
                           //         transparent={false}
                                    opacity={1}
                          //      />
                           // </editable.mesh> 
                            <editable.mesh theatreKey="sphere texture" position={[0, 0, 5]} rotation={[0, 0, 0]}>
                                <sphereGeometry args={[1, 64, 32]} />
                                <meshLambertMaterial side={THREE.DoubleSide} {...stencil} map={textureVideo} />
                            </editable.mesh>
                        </RenderTexture>
                    </meshStandardMaterial>
                </mesh> */}
                {/* <mesh position={[0, 10, -125]}>
                    <shapeGeometry position={[0, 10, -120]} args={[triangleShape, 12]} />
                    <meshNormalMaterial side={THREE.DoubleSide} />
                </mesh> */}
                {/* ESTO ES LA FORMA DE LA MASK:  */}
                {/* <mesh position={[0, 10, -50]}>
                        <ringGeometry args={[3.5, 3.6, 64]} />
                        <meshPhongMaterial color="black" />
                    </mesh> */}
                <mesh position={[0, 10, -50]} rotation={[-Math.PI / 6, 0, 0]}>
                    <shapeGeometry args={[triangleShape, 12]} />
                    <meshPhongMaterial transparent={true} opacity={0.5} />
                </mesh>
                <Mask id={1} position={[0, 10, -50]} rotation={[-Math.PI / 6, 0, 0]}>
                    {/* <circleGeometry args={[4, 64]} /> */}

                    <shapeGeometry args={[triangleShape, 12]} />
                    {/* <meshPhongMaterial transparent={true} opacity={0.5} /> */}
                </Mask>

                <Bounds fit clip observe>
                    {/* <Text3D
                        curveSegments={32}
                        bevelEnabled
                        bevelSize={0.09}
                        size={4}
                        height={0.8}
                        lineHeight={0.5}
                        letterSpacing={-0.06}
                        font="./inter_bold.json"
                        position={[0, 10, -55]}
                    >
                        hola
                        <meshNormalMaterial {...stencil} />
                    </Text3D> */}
                    {/* SPHERE WITH VIDEO */}
                    <editable.mesh theatreKey="Sphere mask" position={[10, 70, -25]} rotation={[0, 0, 0]}>
                        <sphereGeometry args={[80, 64, 32]} />
                        <meshLambertMaterial side={THREE.DoubleSide} {...stencil} map={textureVideo} />
                    </editable.mesh>
                    {/* <mesh position={[30, 30, -45]}>
                        <planeGeometry args={[100, 100]} />
                        <meshLambertMaterial side={THREE.DoubleSide} {...stencil} map={textureVideo} />
                    </mesh> */}
                    {/* <mesh>
                        <latheGeometry />
                        <meshLambertMaterial {...stencil} map={textureVideo} />
                    </mesh> */}
                </Bounds>

                {/* <boxGeometry args={[4, 4, 4]} /> */}
                <Dodecahedron position={[10, 20, -260]} args={[4]}>
                    <meshStandardMaterial>
                        <RenderTexture attach="map" anisotropy={16}>
                            <PerspectiveCamera makeDefault manual aspect={1 / 1} position={[0, 0, 1]} />
                            <color attach="background" args={['orange']} />
                            <ambientLight intensity={0.5} />
                            <directionalLight position={[10, 10, 5]} />
                            <Text ref={textRef} fontSize={4} color="#555">
                                hello
                            </Text>
                        </RenderTexture>
                    </meshStandardMaterial>
                </Dodecahedron>

                {/*
                <Box material={materials} position={[5, 4, -240]} />
               <Cone rotation={[0, 15, 0]} args={[4, 4, 4]} material={materialsCone} position={[5, 12, -240]} />
                <Cylinder args={[0, 15, 14, 4]} material={materials} position={[6, 15, -240]} />
                <mesh>
                  
                    <meshNormalMaterial />
                </mesh>
                */}
            </Suspense>
            <OrbitControls />
            {/* can't move camera rotation and zoom */}
            {/* <OrbitControls ref={controls} enableRotate={false} enableZoom={false} /> */}
        </Fragment>
    )
}

export default SceneProjects
