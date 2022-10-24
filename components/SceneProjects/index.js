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
import Totem1 from '../Models/Totem1'
import ButtonMesh from '../Models/Button'
import StepLoader from '../StepLoader'
import { AppContext } from '../../context/appContext'
import { CubeTextureLoader } from 'three'
import { degToRad } from 'three/src/math/MathUtils'
gsap.registerPlugin(ScrollTrigger)
import { LayerMaterial, Depth, Noise } from 'lamina'
import * as THREE from 'three'
import { editable } from '@theatre/r3f'

import * as handPoseDetection from '@tensorflow-models/hand-pose-detection'
import * as handpose from '@tensorflow-models/handpose'
import * as tf from '@tensorflow/tfjs-core'
import '@tensorflow/tfjs-backend-webgl'
import '@tensorflow/tfjs-core'
import * as mpHands from '@mediapipe/hands'
import * as fp from 'fingerpose'

const connections = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [0, 5],
    [5, 6],
    [6, 7],
    [7, 8],
    [0, 9],
    [9, 10],
    [10, 11],
    [11, 12],
    [0, 13],
    [13, 14],
    [14, 15],
    [15, 16],
    [0, 17],
    [17, 18],
    [18, 19],
    [19, 20],
]

const fingerLookupIndices = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20],
}

const SceneProjects = ({ demoSheet, webcamRef, startDetection, canvasRef, setV, setOK, v, ok, webcamRefNew }) => {
    const { goToStep } = useContext(AppContext)
    const { appState } = useContext(AppContext)
    const [startProjects, setStartProjects] = useState(false)
    const [startScroll, setStartScroll] = useState(false)
    const [scrollTop, setScrollTop] = useState(false)

    const EditableCamera = editable(PerspectiveCamera, 'perspectiveCamera')

    const scrollY = useScroll()

    useEffect(() => {
        if (appState.currentStep === 1) {
            setTimeout(() => demoSheet.sequence.play({ range: [0, 4], iterationCount: 1 }), 4000)
            //setTimeout(() =>demoSheet.sequence.play(), 5000)
            //demoSheet.sequence.play({ range: [0, 4], iterationCount: 1 })
        }
    }, [])

    /*useEffect(() => {
        const scrollToTop = () => {
          const scrollY = window.scrollY || window.pageYOffset;
          if (scrollY > 0) {
            window.scrollTo(0, 0);
          }
        };
        scrollToTop();
      }, [scrollTop]);*/

    useFrame(() => {
        if (appState.currentStep === 1 && startScroll) {
            // console.log('1:' + scrollY.range(0, 1 / 18)) // 4 - 12.35 (8.35t)
            // console.log('2:' + scrollY.range(1 / 18, 1 / 18)) // 12.35 - 16 (3.25t) 1°totem
            // console.log('3:' + scrollY.range(2 / 18, 1 / 18)) // 16 - 26.34 (10.34t)
            // console.log('4:' + scrollY.range(3 / 18, 1 / 18)) // 26.34 - 30 (3.26t) 2°totem
            // console.log('5:' + scrollY.range(4 / 18, 1 / 18)) // 30 - 40 (10t)
            // console.log('6:' + scrollY.range(5 / 18, 1 / 18)) // 40 - 44 (4t) 3°totem

            // console.log(demoSheet.sequence.position)

            // 1° scroll (yendo al 1)
            if (scrollY.range(0, 1 / 18) < 1) demoSheet.sequence.position = 4 + scrollY.range(0, 1 / 18) * 8.35 //tiene que llegar a la posición 12.35
            // 2° scroll (1°totem)
            if (scrollY.range(0, 1 / 18) === 1 && scrollY.range(1 / 18, 1 / 18) < 1)
                demoSheet.sequence.position = 12.35 + scrollY.range(1 / 18, 1 / 18) * 3.65 // tiene que llegar a la posición 12
            // 3°scroll (yendo al 2)
            if (scrollY.range(1 / 18, 1 / 18) === 1 && scrollY.range(2 / 18, 1 / 18) < 1)
                demoSheet.sequence.position = 16 + scrollY.range(2 / 18, 1 / 18) * 10.34
            // 4°scroll (2°totem)
            if (scrollY.range(2 / 18, 1 / 18) === 1 && scrollY.range(3 / 18, 1 / 18) < 1)
                demoSheet.sequence.position = 26.34 + scrollY.range(3 / 18, 1 / 18) * 3.26
            // 5° scroll (yendo al 3)
            if (scrollY.range(3 / 18, 1 / 18) === 1 && scrollY.range(4 / 18, 1 / 18) < 1)
                demoSheet.sequence.position = 30 + scrollY.range(4 / 18, 1 / 18) * 10
            // 6° scroll (3°totem)
            if (scrollY.range(4 / 18, 1 / 18) === 1 && scrollY.range(5 / 18, 1 / 18) < 1)
                demoSheet.sequence.position = 40 + scrollY.range(5 / 18, 1 / 18) * 4
        }
    })

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

    const [model, setModel] = useState()
    const [start, setStart] = useState(false)

    const loadModel = async () => {
        try {
            //const modelHands = await handPoseDetection.SupportedModels.MediaPipeHands
            const modelHands = await handpose.load()
            // const detectorHands = await handPoseDetection.createDetector(modelHands, {
            //     runtime: 'mediapipe',
            //     solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${mpHands.VERSION}`,
            //     maxHands: 1,
            // })
            // setModel(detectorHands)
            setModel(modelHands)
        } catch (err) {
            console.log('ERR', err)
        }
    }

    const webcam_init = () => {
        console.log('WEB')
        if (typeof navigator !== 'undefined' && typeof window !== 'undefined' && webcamRefNew !== undefined) {
            console.log('web ini if')
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
            navigator.mediaDevices
                .getUserMedia({
                    audio: false,
                    video: {
                        facingMode: 'user',
                        height: 200,
                        width: 200,
                    },
                })
                .then((stream) => {
                    if (webcamRefNew !== null && webcamRefNew !== undefined && webcamRefNew.current !== undefined) {
                        webcamRefNew.current.srcObject = stream
                        webcamRefNew.current.addEventListener('loadeddata', (e) => {
                            console.log('LOADED')
                            detectHands()
                            webcamRefNew.current.play()
                        })
                    }
                })
        }
    }

    useEffect(() => {
        if (
            typeof window !== undefined &&
            canvasRef.current !== undefined &&
            canvasRef.current !== null &&
            canvasRef.current.getContext('2d') !== null
        ) {
            //canvasRef.current.getContext('2d').translate(300, 0)
            //canvasRef.current.getContext('2d').scale(-1, 1)
            console.log('ENTRA ENE L CANVAS')
        }
    }, [canvasRef.current])

    //mediapipe example

    const setupCamera = async (params) => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error('Browser API navigator.mediaDevices.getUserMedia not available')
        }
        const { targetFPS, sizeOption } = params
        const size = params.VIDEO_SIZE[sizeOption]
        const videoConfig = {
            audio: false,
            video: {
                facingMode: 'user',
            },
        }
    }

    const drawPoints = (ctx, y, x, r) => {
        ctx.beginPath()
        ctx.arc(x, y, r, 0, 2 * Math.PI)
        ctx.fill()
    }

    const drawKeypoints = (ctx, keypoints) => {
        keypoints.forEach((keypoint) => {
            const y = keypoint[0]
            const x = keypoint[1]
            drawPoints(ctx, x - 2, y - 2, 3)
        })

        const fingers = Object.keys(fingerLookupIndices)
        for (let i = 0; i < fingers.length; i++) {
            const finger = fingers[i]
            const points = fingerLookupIndices[finger].map((idx) => keypoints[idx])
            drawPath(ctx, points, false)
        }
    }

    const drawPath = (ctx, points, closePath) => {
        const region = new Path2D()
        region.moveTo(points[0][0], points[0][1])
        points.forEach((point) => {
            region.lineTo(point[0], point[1])
        })

        if (closePath) {
            region.closePath()
        }

        ctx.stroke(region)
    }

    useEffect(() => {
        console.log('MODEL', model)
    }, [model])

    useEffect(() => {
        tf.ready().then(() => {
            loadModel()
        })
    }, [])

    useEffect(() => {
        if (startDetection) {
            webcam_init()
        }
    }, [startDetection])

    const detectHands = async () => {
        if (typeof window !== undefined && webcamRefNew.current !== null) {
            //console.log('ENTRA EN DETECT HANDS')
            const predictions = await model.estimateHands(webcamRefNew.current)
            //const predictions = await model.estimateHands(webcamRef.current.video)
            setStart(true)
            //console.log('WEB: ', webcamRefNew.current)

            if (predictions) {
                predictionFunction(predictions)
                requestAnimationFrame(() => detectHands())
            }
        }
    }

    const makeLines = (prediction, ctx) => {
        connections.forEach((elem) => {
            ctx.beginPath()
            ctx.strokeStyle = '#ff000090'
            //ctx.moveTo(prediction.keypoints[elem[0]].x, prediction.keypoints[elem[0]].y)
            ctx.moveTo(prediction.landmarks[elem[0]][0], prediction.landmarks[elem[0]][1])
            ctx.lineTo(prediction.landmarks[elem[1]][0], prediction.landmarks[elem[1]][1])
            //ctx.lineTo(prediction.keypoints[elem[1]].x, prediction.keypoints[elem[1]].y)
            ctx.stroke()
        })
    }

    const predictionFunction = async (predictions) => {
        if (typeof window !== undefined && webcamRefNew.current !== undefined && canvasRef.current !== null) {
            // console.log('hay cvanvas y webcam')
            if (predictions.length > 0) {
                //console.log('PRED', predictions)
                const GE = new fp.GestureEstimator([fp.Gestures.VictoryGesture, fp.Gestures.ThumbsUpGesture])

                if (GE && GE !== undefined && GE !== null) {
                    const estimateGestures = GE.estimate(predictions[0].landmarks, 9)
                    if (estimateGestures.gestures.length > 0) {
                        //console.log('ESTIM', estimateGestures.gestures)
                        if (estimateGestures.gestures[0].name === 'thumbs_up') {
                            setOK(true)
                        } else {
                            setOK(false)
                            if (estimateGestures.gestures[0].name === 'victory') setV(true)
                            else setV(false)
                        }
                    } else {
                        setV(false)
                        setOK(false)
                    }
                }
            }
            if (model !== null) {
                const cnvs = canvasRef.current
                let ctx = cnvs.getContext('2d')
                //const predictions = await model.estimateHands(webcamRef.current.video)
                if (cnvs !== null && ctx !== null) {
                    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
                    //ctx.drawImage(webcamRefNew.current, 0, 0, 300, 200)

                    if (predictions.length > 0) {
                        // const finger1 = predictions[0].keypoints[4]
                        // const finger2 = predictions[0].keypoints[12]
                        // const finger3 = predictions[0].keypoints[20]
                        //setPoints(predictions[0].keypoints3D)
                        //console.log('PRED finger1 x: ', finger1.x)
                        //setX(finger1.x)
                        //setY(finger1.y)
                        //setZ(finger1.z)
                        // refCamera.current.position.x = finger1.x * 10
                        // refCamera.current.position.y = finger1.y * 10
                        // refCamera.current.position.z = finger1.z * 10
                        // if (finger1 && finger2 && finger3) {
                        //     let midval = (finger1.x + finger2.x + finger3.x) / 3
                        //     //setMidPoint({ val: midval, time: new Date().getTime() })
                        // }
                        predictions.forEach((pred) => {
                            if (ctx !== null) makeLines(pred, ctx)
                            pred.landmarks.map((elem) => {
                                const x = elem[0]
                                const y = elem[1]
                                ctx.strokeStyle = '#ff0000'
                                ctx.lineWidth = 2
                                ctx.strokeRect(x, y, 1, 1)
                            })
                            // if (ctx !== null) {
                            //     drawKeypoints(ctx, predictions[0].landmarks, predictions[0].annotations)
                            // }
                        })
                        //drawKeypoints(ctx, predictions[0].landmarks, predictions[0].annotations)
                    }
                }
            }
        }
    }

    return (
        <Fragment>
            <Suspense fallback={<StepLoader step={1} />}>
                <NoiseEffect theatreKey={'Background Noise'} />
                <editable.group theatreKey="Camera Projects - ROTATION X">
                    <EditableCamera
                        makeDefault
                        theatreKey="Camera Projects"
                        fov={100}
                        far={10000}
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                    />
                </editable.group>
                <ambientLight intensity={ok ? 0 : 0.3} color={'hotpink'} />
                <ButtonMesh handleButtonClicked={() => back(0)} position={[-4, 1, -240]} />
                <editable.group theatreKey="btn gargoyle" rotation={[0, -0.5 * Math.PI, 0]}>
                    <ButtonMesh handleButtonClicked={() => back(0)} />
                </editable.group>
                <editable.group theatreKey="btn car" rotation={[Math.PI, -0.5 * Math.PI, 0]}>
                    <ButtonMesh handleButtonClicked={() => back(0)} />
                </editable.group>
                <editable.group theatreKey="btn phone" rotation={[Math.PI, -0.5 * Math.PI, 0]}>
                    <ButtonMesh handleButtonClicked={() => back(0)} />
                </editable.group>

                <editable.pointLight
                    theatreKey="Point Light - Scene"
                    castShadow
                    intensity={ok ? 0 : 7}
                    position={[1, 5, 1]}
                    color={'hotpink'}
                    penumbra={1}
                />
                <editable.pointLight
                    theatreKey="Point Light - Diego"
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
                    setScrollTop={setScrollTop}
                    demoSheet={demoSheet}
                    setStartScroll={setStartScroll}
                    setStartProjects={setStartProjects}
                    startProjects={startProjects}
                    scene={1}
                    v={v}
                    ok={ok}
                />
                <group rotation={[0, -0.5 * Math.PI, 0]} scale={[0.5, 0.5, 0.5]}>
                    <Wireframe />
                </group>
                <group scale={[0.5, 0.5, 0.5]}>
                    <Wireframe />
                </group>
                <Plane texture onClick={() => {}} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} />
                <CardboardBox demoSheet={demoSheet} />
                <Totem1
                    demoSheet={demoSheet}
                    scale={[15, 15, 15]}
                    position={[-10, 15, 5]}
                    rotation={[0, Math.PI / 2, 0]}
                />

                <Car demoSheet={demoSheet} scale={[4, 4, 4]} position={[6, 3, 10]} rotation={[0, -Math.PI / 2, 0]} />
                <Iphone
                    demoSheet={demoSheet}
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
