import { Canvas } from '@react-three/fiber'
import { Suspense, useContext, useEffect } from 'react'
import { AppContext } from '../../context/appContext'
import { Box, OrbitControls, Html, useProgress } from '@react-three/drei'

const Loader = () => {
    const { appState, setAppState, goToStep, changeStateProject } = useContext(AppContext)
    const { active, progress } = useProgress()

    const LoaderNew = () => {
        useEffect(() => {
            if (active) {
                setAppState((prevState) => ({
                    ...prevState,
                    loadingNew: true,
                }))
            } else {
                setAppState((prevState) => ({
                    ...prevState,
                    loadingNew: false,
                }))
            }
        }, [active, setAppState])

        return (
            <Html>
                <p style={{ fontSize: '40px', color: 'red' }}>{progress} % loaded</p>
            </Html>
        )
    }

    return (
        <div
            style={{
                background: 'black',
                width: '100%',
                height: '100vh',
                position: 'fixed',
                top: 0,
                zIndex: 5,
            }}
        >
            <Canvas>
                <AppContext.Provider
                    value={{
                        appState,
                        goToStep,
                        setAppState,
                        changeStateProject,
                    }}
                >
                    <Suspense fallback={<LoaderNew />}>
                        <Box />
                        <OrbitControls />
                    </Suspense>
                </AppContext.Provider>
            </Canvas>
            hola
        </div>
    )
}

export default Loader
