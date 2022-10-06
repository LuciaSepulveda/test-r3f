import React, {
    Fragment,
    useContext,
    Suspense,
    useEffect,
    useState,
    //   useRef,
} from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, ScrollControls, Sky } from '@react-three/drei'
import Camera from '../Camera/camera'
import Cat from '../Models/Cat'
import Plane from '../Models/Plane'
import Totem from '../Models/Totem'
import ButtonMesh from '../Models/Button'
import { PerspectiveCamera } from 'three'
import StepLoader from '../StepLoader'
import { AppContext } from '../../context/appContext'
import Icon from '../Icons'

const SceneProjects = () => {
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

    function handleStart() {
        setInitialized(true)
        // let timeline = gsap.timeline()
        // timeline
        //     .to(position, { duration: 0.2 })
        //     .to(position, {
        //         y: 2,
        //         z: -10,
        //         duration: 3,
        //         onUpdate: function () {
        //             setLookAt({ x: 0, y: 0, z: -1 })
        //             setPosition(position)
        //         },
        //     })
        //     .to(
        //         rotation,
        //         {
        //             x: Math.PI,
        //             duration: 3,
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

    return (
        <Fragment>
            <Suspense fallback={<StepLoader step={1} />}>
                <ScrollControls pages={4} distance={1} damping={4} horizontal={false}>
                    <ambientLight intensity={0.1} />
                    <pointLight intensity={2} position={[7, 5, 1]} />
                    <Sky sunPosition={[7, 5, 1]} />
                    <Camera lookAt={lookAt} position={position} rotation={rotation} start={start} />
                    {!initialized && <ButtonMesh handleButtonClicked={back} />}
                    <Cat start={start} />
                    <Totem />
                    <Plane onClick={() => {}} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} />
                    <Plane onClick={() => {}} rotation={[-Math.PI / 2, 0, 0]} position={[10, 10, 0]} />
                    {/* <CameraHelper /> */}
                </ScrollControls>
            </Suspense>
            {/* can't move camera rotation and zoom */}
            {/* <OrbitControls enableRotate={false} enableZoom={false} /> */}
            {/* <OrbitControls /> */}
        </Fragment>
    )
}

export default SceneProjects
