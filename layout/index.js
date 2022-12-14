import React, { useContext, Suspense } from 'react'

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

export const DefaultLayout = ({ children }) => {
    const { appState, goToStep, setAppState } = useContext(AppContext)

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

    return (
        <Root>
            <Content>
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
                        {/* CANVAS */}

                        <div style={{ width: '100%', height: '100vh' }}>
                            <Canvas shadows camera={{ position: [2, 2, 2], fov: 90 }}>
                                <AppContext.Provider
                                    value={{
                                        appState,
                                        goToStep,
                                        setAppState,
                                    }}
                                >
                                    {appState.currentStep === 0 ? (
                                        <Scene />
                                    ) : (
                                        appState.currentStep === 1 && <SceneProjects />
                                    )}
                                </AppContext.Provider>
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
