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
import { useProgress, Html } from '@react-three/drei'
import SceneProjects from '../components/SceneProjects'
import studio from '@theatre/studio'
import extension from '@theatre/r3f/dist/extension'
import { SheetProvider } from '@theatre/r3f'
import { getProject } from '@theatre/core'
import projectState from '../public/state2.json'
import Webcam from 'react-webcam'

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
                            onClick={() => setStartDetection(!startDetection)}
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
                            <Canvas shadows camera={{ position: [2, 2, 2], fov: 90 }}>
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
                                            />
                                        ) : (
                                            appState.currentStep === 1 && <SceneProjects />
                                        )}
                                    </AppContext.Provider>
                                </SheetProvider>
                            </Canvas>
                        </div>
                    </StepContent>
                </FadeInOut>
            </Content>
        </Root>
    )
}

const LayoutWrapper = (props) => <DefaultLayout {...props}>{props.children}</DefaultLayout>

export default LayoutWrapper
