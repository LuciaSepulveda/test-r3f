import React, { useContext, Suspense, useEffect } from 'react'

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
import { useProgress, Html } from '@react-three/drei'
import SceneProjects from '../components/SceneProjects'
import studio from '@theatre/studio'
import { SheetProvider } from '@theatre/r3f'
import { getProject } from '@theatre/core'
import extension from '@theatre/r3f/dist/extension'
import projectState from '../public/momento2desk.json'
import { Timeline } from '../components/Timeline/Timeline'

studio.initialize()
//   studio.extend(extension)
//const demoSheet = getProject('Momento 2 Desk', { state: projectState }).sheet('Momento 2 sheet')
//const demoSheet = getProject('Momento 2').sheet('Momento 2 sheet')

export const DefaultLayout = ({ children }) => {
    const { appState, goToStep, setAppState, changeStateProject } = useContext(AppContext)

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

    return (
        <Root>
            <div style={{ width: '100%', height: '1200vh' }}>
                {/* STEPS LAYOUT */}
                <button style={{ position: 'fixed', top: 10, left: 60, zIndex: 10 }} onClick={() => goToScroll()}>
                    BOTON
                </button>
                <Timeline/>
                <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0 }}>
                    {/* CANVAS */}

                    <Canvas shadows gl={{ preserveDrawingBuffer: true }}>
                        <SheetProvider sheet={appState.projectState}>
                            <AppContext.Provider
                                value={{
                                    appState,
                                    goToStep,
                                    setAppState,
                                    changeStateProject,
                                }}
                            >
                                {appState.currentStep === 0 ? (
                                    <Scene demoSheet={appState.projectState} />
                                ) : (
                                    appState.currentStep === 1 && <SceneProjects />
                                )}
                            </AppContext.Provider>
                        </SheetProvider>
                    </Canvas>
                </div>
            </div>
        </Root>
    )
}

const LayoutWrapper = (props) => <DefaultLayout {...props}>{props.children}</DefaultLayout>

export default LayoutWrapper
