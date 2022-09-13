import React, { Fragment, useContext, useEffect } from 'react'
// import { FadeInOut, Staggers } from '../../helpers/framer-animations'
import { AppContext } from '../../context/appContext'
import Icon from '../Icons'
// import { Container, BtnsContainer, ButtonContainer } from './stepIntroStyles'
import { useProgress, Html } from '@react-three/drei'

const StepLoader = ({ step }) => {
    const { goToStep, appState, setAppState } = useContext(AppContext)
    const { active, progress } = useProgress()

    useEffect(() => {
        if (active) {
            setAppState((prevState) => ({
                ...prevState,
                loading: true,
            }))
        } else {
            setAppState((prevState) => ({
                ...prevState,
                loading: false,
            }))
            goToStep(step)
        }
    }, [active, goToStep, step, appState, setAppState])

    return (
        <Fragment>
            <Html
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Icon name="genoshaIsotipo" width={'150px'} height={'fit-content'} />
                <p>{progress} % loaded</p>
            </Html>
        </Fragment>
    )
}

export default StepLoader
