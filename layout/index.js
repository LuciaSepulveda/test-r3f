import React, { useContext, useRef, useState, Suspense, useEffect } from 'react'

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
import { Canvas, useFrame } from '@react-three/fiber'
import Scene from '../components/Scene'
import StepLoader from '../components/StepLoader'
import { useProgress, Html, useScroll, ScrollControls, PerformanceMonitor } from '@react-three/drei'
import SceneProjects from '../components/SceneProjects'
import { SheetProvider } from '@theatre/r3f'
import extension from '@theatre/r3f/dist/extension'
import studio from '@theatre/studio'
import { getProject } from '@theatre/core'
import momento2desk from '../public/momento2desk.json'
import momento2mob from '../public/momento2mob.json'
import Webcam from 'react-webcam'

// studio.initialize()
// studio.extend(extension)
let demoSheet

export const DefaultLayout = ({ children }) => {
    const { appState, goToStep, setAppState, changeStateProject, isMobile } = useContext(AppContext)

    //const demoSheet = getProject('Momento 2').sheet('Momento 2 sheet')
    if (isMobile) {
        demoSheet = getProject('Momento 2 Mob', { state: momento2mob }).sheet('Momento 2 sheet mob')
    } else {
        demoSheet = getProject('Momento 2 Desk', { state: momento2desk }).sheet('Momento 2 sheet desk')
    }

    //const demoSheet = getProject('Momento 2 Desk', { state: momento2desk }).sheet('Momento 2 sheet')

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

    const goToScroll = () => {
        window.scrollTo(0, 0)
    }

    let videoConstraints = {
        height: 200,
        width: 200,
        facingMode: 'user',
        frameRate: { ideal: 60 },
    }

    const webcamRef = useRef(null)
    const canvasRef = useRef(null)
    const [startDetection, setStartDetection] = useState(false)
    const [dpr, setDpr] = useState(1.5)
    const [v, setV] = useState(false)
    const [ok, setOK] = useState(false)
    const webcamRefNew = useRef(null)

    return (
        <Root>
            <Content>
                <div
                    style={{
                        position: 'fixed',
                        zIndex: 10,
                        bottom: 0,
                        right: 0,
                        height: 200,
                        width: 200,
                    }}
                >
                    <video
                        style={{ transform: 'scaleX(-1)', WebkitTransform: 'scaleX(-1)'}}
                        playsInline
                        ref={webcamRefNew}
                        width={200}
                        height={200}
                        id="video"
                    />
                    <canvas
                        id="canvas"
                        ref={canvasRef}
                        style={{
                            transform: 'scaleX(-1)', WebkitTransform: 'scaleX(-1)',
                            zIndex: 11,
                            position: 'absolute',
                            right: 0,
                            bottom: 0
                        }}
                        width={200}
                        height={200}
                    />
                </div>
                {/* <Webcam
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
                    }}
                /> */}
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
                        {/*!isMobile ? (
                    <div>
                    <div
                            style={{
                                background: 'red',
                                zIndex: 5,
                                width: '500px',
                                height: '2px',
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
                                height: '2px',
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
                                width: '2px',
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
                                width: '2px',
                                height: '100vh',
                                display: 'flex',
                                margin: 'auto',
                                position: 'fixed',
                                left: 0,
                                right: '500px',
                            }}
                        /></div>):(null)*/}
                        {/* CANVAS */}

                        <div style={{ width: '100%', height: '100vh' }}>
                            <Canvas dpr={dpr} shadows gl={{ preserveDrawingBuffer: true }}>
                                <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)}>
                                    <SheetProvider sheet={demoSheet}>
                                        <AppContext.Provider
                                            value={{
                                                appState,
                                                goToStep,
                                                setAppState,
                                                isMobile,
                                            }}
                                        >
                                            <ScrollControls pages={18} distance={2} damping={3} horizontal={false}>
                                                {appState.currentStep === 0 ? (
                                                    <Scene demoSheet={demoSheet} />
                                                ) : (
                                                    appState.currentStep === 1 && (
                                                        <SceneProjects
                                                            startDetection={startDetection}
                                                            setStartDetection={setStartDetection}
                                                            demoSheet={demoSheet}
                                                            webcamRef={webcamRef}
                                                            canvasRef={canvasRef}
                                                            setV={setV}
                                                            setOK={setOK}
                                                            v={v}
                                                            ok={ok}
                                                            webcamRefNew={webcamRefNew}
                                                        />
                                                    )
                                                )}
                                            </ScrollControls>
                                        </AppContext.Provider>
                                    </SheetProvider>
                                </PerformanceMonitor>
                            </Canvas>
                        </div>
                    </StepContent>
                </FadeInOut>

                {v && (
                    <p
                        style={{
                            zIndex: 100,
                            position: 'fixed',
                            top: 80,
                            left: 100,
                            height: '60px',
                            display: 'inline',
                            fontSize: '50px',
                        }}
                    >
                        ✌🏻
                    </p>
                )}
                {ok && (
                    <p
                        style={{
                            zIndex: 100,
                            position: 'fixed',
                            top: 10,
                            left: 100,
                            height: '60px',
                            display: 'inline',
                            fontSize: '50px',
                        }}
                    >
                        👍
                    </p>
                )}
            </Content>
        </Root>
    )
}

const LayoutWrapper = (props) => <DefaultLayout {...props}>{props.children}</DefaultLayout>

export default LayoutWrapper
