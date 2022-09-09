import React, { useContext, useEffect } from 'react'
import { FadeInOut, Staggers } from '../../helpers/framer-animations'
import { AppContext } from '../../context/appContext'
import Icon from '../Icons'
import { Container, BtnsContainer, ButtonContainer } from './stepIntroStyles'
// import IntroAudio from '../../../assets/audios/01-first-open.mp3';

const StepLoader = () => {
    const { goToStep } = useContext(AppContext)

    useEffect(() => {
        setTimeout(() => {
            goToStep(1)
        }, 3000)
    })

    return (
        <Staggers key="StepLoader" component={Container} isNested={true} visibleStaggers={0.2}>
            <FadeInOut component={BtnsContainer} element={'div'} isNested={true} key="btnsContainers">
                <ButtonContainer onClick={() => goToStep(1)}>
                    <Icon name="genoshaLogo" width={'550px'} height={'fit-content'} />
                </ButtonContainer>
            </FadeInOut>
        </Staggers>
    )
}

export default StepLoader
