import React, { createContext, useEffect, useState } from 'react'
import moment2 from '../public/momento2desk.json'
import moment3 from '../public/momento3desk.json'
import { getProject } from '@theatre/core'

const demoSheet = getProject('Momento 2 Desk', { state: moment2 }).sheet('Momento 2 sheet')
const demoSheet2 = getProject('Momento 3 Desk', { state: moment3 }).sheet('Momento 3 sheet')

const initialContext = {
    appState: {
        currentStep: 0,
        loading: true,
        projectState: demoSheet,
    },
    setAppState: () => null,
}

export const AppContext = createContext(initialContext)

export const ContextProviderApp = (props) => {
    const [appState, setAppState] = useState({
        currentStep: 0,
        loading: true,
        projectState: demoSheet,
    })

    const goToStep = function (stepIndex) {
        setAppState((prevState) => ({
            ...prevState,
            currentStep: stepIndex,
        }))
    }

    const changeStateProject = function (moment) {
        setAppState((prevState) => ({
            ...prevState,
            projectState: moment === 2 ? demoSheet : demoSheet2,
        }))
    }

    useEffect(() => {
        console.log('current step', appState.currentStep, appState.loading, appState.projectState)
    }, [appState.currentStep, appState.loading, appState.projectState])

    return (
        <AppContext.Provider
            value={{
                appState,
                setAppState,
                goToStep,
                changeStateProject,
            }}
        >
            {props.children}
        </AppContext.Provider>
    )
}
export default ContextProviderApp
