import React, { createContext, useEffect, useState } from 'react'

const initialContext = {
    appState: {
        currentStep: 0,
    },
    setAppState: () => null,
}

export const AppContext = createContext(initialContext)

export const ContextProviderApp = (props) => {
    const [appState, setAppState] = useState({
        currentStep: 0,
    })

    const goToStep = function (stepIndex) {
        setAppState((prevState) => ({
            ...prevState,
            currentStep: stepIndex,
        }))
    }

    useEffect(() => {
        console.log('current step', appState.currentStep)
    }, [appState.currentStep])

    return (
        <AppContext.Provider
            value={{
                appState,
                setAppState,
                goToStep,
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}
export default ContextProviderApp
