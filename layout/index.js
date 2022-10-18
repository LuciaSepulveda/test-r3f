import React, { useState, useContext, Suspense, useEffect, useRef } from 'react'

import { AnimatePresence } from 'framer-motion'
import { FadeInOut } from '../helpers/framer-animations'
import Image from 'next/image'
import { AppContext } from '../context/appContext'
import {
    StepContent,
    Root,
    HeaderBlock,
    MenuContainer,
    Content,
    LogoGenoshaContainer,
    LayoutBackgroundContainer,
    StepShareBg,
} from './layoutStyle'
import Icon from '../components/Icons'
import { Canvas } from '@react-three/fiber'
import Scene from '../components/Scene'
import StepLoader from '../components/StepLoader'
import { useProgress, Html, PerformanceMonitor } from '@react-three/drei'
import SceneProjects from '../components/SceneProjects'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { SheetProvider } from '@theatre/r3f'
import { getProject } from '@theatre/core'
import projectState from '../public/state2.json'
import Webcam from 'react-webcam'
// import * as handPoseDetection from '@tensorflow-models/hand-pose-detection'
// import * as tf from '@tensorflow/tfjs-core'
// import '@tensorflow/tfjs-backend-webgl'
// import '@tensorflow/tfjs-core'
// import * as mpHands from '@mediapipe/hands'

const demoSheet = getProject('Demo Project', { state: projectState }).sheet('Demo sheet')

//studio.initialize()
//studio.extend(extension)
export const DefaultLayout = ({ children }) => {
    const { appState, goToStep, setAppState } = useContext(AppContext)
    const [startDetection, setStartDetection] = useState(false)

    const backgroundAnimProps = {
        entryTransition: { duration: 1 },
        exitTransition: { duration: 1 },
        blur: false,
        animateY: false,
        isNested: false,
        containerProps: {
            style: {
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
            },
        },
    }

    let videoConstraints = {
        height: 200,
        width: 200,
        facingMode: 'user',
        frameRate: { ideal: 60 },
    }

    const webcamRef = useRef(null)
    const canvasRef = useRef(null)
    const [dpr, setDpr] = useState(1.5)

    // const [model, setModel] = useState()
    // const [start, setStart] = useState(false)

    // const loadModel = async () => {
    //     try {
    //         const modelHands = await handPoseDetection.SupportedModels.MediaPipeHands
    //         const detectorHands = await handPoseDetection.createDetector(modelHands, {
    //             runtime: 'mediapipe',
    //             solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${mpHands.VERSION}`,
    //             maxHands: 1,
    //         })
    //         setModel(detectorHands)
    //     } catch (err) {
    //         console.log('ERR', err)
    //     }
    // }

    // useEffect(() => {
    //     console.log('MODEL', model)
    // }, [model])

    // useEffect(() => {
    //     tf.ready().then(() => {
    //         loadModel()
    //     })
    // }, [])

    // useEffect(() => {
    //     if (startDetection) {
    //         detectHands()
    //     }
    // }, [startDetection])

    // const detectHands = async () => {
    //     if (typeof window !== undefined && webcamRef.current !== null) {
    //         console.log('ENTRA EN DETECT HANDS')
    //         const predictions = await model.estimateHands(webcamRef.current.video)
    //         setStart(true)
    //         if (predictions) {
    //             predictionFunction(predictions)
    //             requestAnimationFrame(() => detectHands())
    //         }
    //     }
    // }

    // const makeLines = (prediction, ctx) => {
    //     connections.forEach((elem) => {
    //         ctx.beginPath()
    //         ctx.strokeStyle = '#ff000090'
    //         ctx.moveTo(prediction.keypoints[elem[0]].x, prediction.keypoints[elem[0]].y)
    //         ctx.lineTo(prediction.keypoints[elem[1]].x, prediction.keypoints[elem[1]].y)
    //         ctx.stroke()
    //     })
    // }

    // const predictionFunction = async (predictions) => {
    //     if (typeof window !== undefined && webcamRef.current !== null && canvasRef.current !== null) {
    //         if (model !== null) {
    //             const cnvs = canvasRef.current
    //             let ctx = cnvs.getContext('2d')
    //             //const predictions = await model.estimateHands(webcamRef.current.video)
    //             if (cnvs !== null && ctx !== null) {
    //                 ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    //                 ctx.drawImage(webcamRef.current.video, 0, 0, 200, 200)
    //                 if (predictions.length > 0) {
    //                     const finger1 = predictions[0].keypoints[4]
    //                     const finger2 = predictions[0].keypoints[12]
    //                     const finger3 = predictions[0].keypoints[20]
    //                     //setPoints(predictions[0].keypoints3D)
    //                     console.log('PRED finger1 x: ', finger1.x)

    //                     //setX(finger1.x)
    //                     //setY(finger1.y)
    //                     //setZ(finger1.z)
    //                     // refCamera.current.position.x = finger1.x * 10
    //                     // refCamera.current.position.y = finger1.y * 10
    //                     // refCamera.current.position.z = finger1.z * 10

    //                     if (finger1 && finger2 && finger3) {
    //                         let midval = (finger1.x + finger2.x + finger3.x) / 3
    //                         //setMidPoint({ val: midval, time: new Date().getTime() })
    //                     }

    //                     predictions.forEach((pred) => {
    //                         if (ctx !== null) makeLines(pred, ctx)
    //                         pred.keypoints.map((elem) => {
    //                             const x = elem.x
    //                             const y = elem.y

    //                             ctx.strokeStyle = '#ff0000'
    //                             ctx.lineWidth = 2
    //                             ctx.strokeRect(x, y, 1, 1)
    //                         })
    //                     })
    //                 }
    //             }
    //         }
    //     }
    // }

    return (
        <Root>
            <Content>
                <Webcam
                    audio={false}
                    id="img"
                    ref={webcamRef}
                    videoConstraints={videoConstraints}
                    width={200}
                    height={200}
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        zIndex: 7,
                        visibility: 'hidden',
                    }}
                />
                <LayoutBackgroundContainer>
                    <AnimatePresence>
                        {appState.currentStep === 0 && (
                            <FadeInOut key="StepShareBg" {...backgroundAnimProps}>
                                {/* <StepShareBg desktopBg="./bg.jpg" mobileBg="./bg.jpg"></StepShareBg> */}
                                <Image alt="background" layout="fill" objectFit="cover" src="/bg.jpg" />
                            </FadeInOut>
                        )}
                    </AnimatePresence>
                    <div className="background-overlay"></div>
                </LayoutBackgroundContainer>

                {/* HEADER */}
                {appState.loading === false && appState.currentStep >= 0 && (
                    <HeaderBlock>
                        <FadeInOut component={LogoGenoshaContainer} isVisible={true} animatePresence={true}>
                            <Icon name="genoshaIsotipo" onClick={() => goToStep(0)} />
                        </FadeInOut>
                        <FadeInOut component={MenuContainer} isVisible={true} animatePresence={true}>
                            <Icon name="menu" />
                        </FadeInOut>
                    </HeaderBlock>
                )}

                {/* STEPS LAYOUT */}
                <FadeInOut component={StepContent} isVisible={true} animatePresence={true}>
                    <StepContent>
                        <button
                            onClick={() => setStartDetection(true)}
                            style={{ zIndex: 5, position: 'fixed', left: 60, bottom: 120 }}
                        >
                            Hands
                        </button>
                        {startDetection && (
                            <div style={{ color: 'red', zIndex: 5, position: 'fixed', left: 60, bottom: 90 }}>
                                Tocaste
                            </div>
                        )}
                        <div
                            style={{
                                background: 'red',
                                zIndex: 5,
                                width: '500px',
                                height: '10px',
                                display: 'flex',
                                margin: 'auto',
                                position: 'fixed',
                                left: 0,
                                right: 0,
                                top: 0,
                            }}
                        />
                        <div
                            style={{
                                background: 'red',
                                zIndex: 5,
                                width: '500px',
                                height: '10px',
                                display: 'flex',
                                margin: 'auto',
                                position: 'fixed',
                                left: 0,
                                right: 0,
                                bottom: 0,
                            }}
                        />
                        <div
                            style={{
                                background: 'red',
                                zIndex: 5,
                                width: '10px',
                                height: '100vh',
                                display: 'flex',
                                margin: 'auto',
                                position: 'fixed',
                                left: '500px',
                                right: 0,
                            }}
                        />
                        <div
                            style={{
                                background: 'red',
                                zIndex: 5,
                                width: '10px',
                                height: '100vh',
                                display: 'flex',
                                margin: 'auto',
                                position: 'fixed',
                                left: 0,
                                right: '500px',
                            }}
                        />
                        {/* CANVAS */}

                        <div style={{ width: '100%', height: '100vh' }}>
                            <Suspense fallback={<span>loading..</span>}>
                                <Canvas dpr={dpr} shadows camera={{ position: [2, 2, 2], fov: 90 }}>
                                    <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)}>
                                        <SheetProvider sheet={demoSheet}>
                                            <AppContext.Provider
                                                value={{
                                                    appState,
                                                    goToStep,
                                                    setAppState,
                                                }}
                                            >
                                                {appState.currentStep === 0 ? (
                                                    <Scene
                                                        startDetection={startDetection}
                                                        setStartDetection={setStartDetection}
                                                        demoSheet={demoSheet}
                                                        webcamRef={webcamRef}
                                                        canvasRef={canvasRef}
                                                    />
                                                ) : (
                                                    appState.currentStep === 1 && <SceneProjects />
                                                )}
                                            </AppContext.Provider>
                                        </SheetProvider>
                                    </PerformanceMonitor>
                                </Canvas>
                            </Suspense>
                        </div>
                    </StepContent>
                </FadeInOut>
                <canvas
                    id="canvas"
                    width={200}
                    height={200}
                    ref={canvasRef}
                    style={{ width: 200, height: 200, position: 'fixed', zIndex: 10, bottom: 0, right: 0 }}
                />
            </Content>
        </Root>
    )
}

const LayoutWrapper = (props) => <DefaultLayout {...props}>{props.children}</DefaultLayout>

export default LayoutWrapper
