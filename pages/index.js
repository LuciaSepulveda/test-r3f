import React, { useContext, useState, useEffect, useRef } from 'react'
import { ThemeProvider } from 'styled-components'
import { FadeInOut } from '../helpers/framer-animations'
import { AnimatePresence } from 'framer-motion'
// import { useSearchByURLParams } from 'HELPERS/share/share';
import ContextApp, { AppContext } from '../context/appContext'
import { theme } from '../theme/theme'
import { Root } from '../styles/appStyles'
import LayoutWrapper from '../layout/index'
import { stepsList } from '../components/App/stepsList'

const App = () => {
    const { appState } = useContext(AppContext)
    const [onEntryStep, setOnEntryStep] = useState(true)
    const [step, setStep] = useState()
    const firstStepChange = useRef(true)
    // const { triggered: urlSearchTriggered } = useSearchByURLParams();

    useEffect(() => {
        setStep(appState.currentStep)
        if (!firstStepChange.current) {
            setOnEntryStep(false)
        } else firstStepChange.current = false
    }, [appState.currentStep])

    const steps = (currenStep) => {
        return (
            <FadeInOut
                animKey={`step-${currenStep}`}
                key={`step-${currenStep}`}
                animatePresence={false}
                isNested={false}
                entryTransition={{
                    duration: 0,
                    delay: onEntryStep ? 0.6 : 0,
                }}
                exitTransition={{ duration: 0 }}
                containerProps={{
                    style: {
                        width: '100%',
                        height: '100%',
                    },
                }}
            >
                {stepsList[currenStep]}
            </FadeInOut>
        )
    }

    return (
        <Root>
            {/* <AnimatePresence exitBeforeEnter>{steps()}</AnimatePresence> */}
            <AnimatePresence exitBeforeEnter>{steps(step)}</AnimatePresence>
        </Root>
    )
}

const AppWrapper = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <ContextApp>
                <LayoutWrapper>
                    <App>{children}</App>
                </LayoutWrapper>
            </ContextApp>
        </ThemeProvider>
    )
}

export default AppWrapper
