import React, { Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AnimatePresenceContainer = ({ children, isVisible }) => {
    return <AnimatePresence>{isVisible && children}</AnimatePresence>
}

// TODO: esto debería ser una clase abstracta u otro patron de diseño que facilite
// la creacion de animaciones sin repetir sintaxis
export const AnimationHolder = ({
    /**
     *   @param {bool} isVisible
     *   Current visibility.
     */
    isVisible,
    /**
     *   @param {bool} animatePresence
     *   Indicates if the element should be removed from the dom when hidden
     */
    animatePresence = false,
    containerProps = {},
    element = 'div',
    component,
    componentProps = {},
    variants,
    initial = 'hidden',
    animate = 'visible',
    children,
    isNested,
    animKey,
}) => {
    const AnimatePresenceOrFragment = animatePresence ? AnimatePresenceContainer : Fragment
    let animatePresenceProps = {}
    let motionElemProps = {
        variants,
        // style,
        key: animKey,
    }

    if (animatePresence) {
        animatePresenceProps = {
            ...animatePresenceProps,
            isVisible,
        }
    }

    // user defined animation container props
    motionElemProps = {
        ...motionElemProps,
        ...containerProps,
        ...componentProps,
    }

    // When nested, the motion component will use the initial, exit and animate properties
    // of the parent to orchestrate the animations
    if (!isNested) {
        motionElemProps = {
            ...motionElemProps,
            initial,
            exit: initial,
            animate: isVisible || animatePresence ? animate : initial,
        }
    }

    const MotionComponent = component ?? motion[element]
    return (
        <AnimatePresenceOrFragment {...animatePresenceProps}>
            <MotionComponent {...motionElemProps} as={motion[element]}>
                {children}
            </MotionComponent>
        </AnimatePresenceOrFragment>
    )
}

export const FadeInOut = ({
    isVisible = true,
    children,
    element = 'div',
    component,
    componentProps = {},
    containerProps,
    entryTransition,
    exitTransition,
    animateY = true,
    blur = true,
    animatePresence = false,
    isNested,
    animKey,
}) => {
    const variants = {
        visible: {
            opacity: 1,
            filter: blur ? 'blur(0px)' : null,
            y: animateY ? 0 : null,
            transition: {
                duration: 0.4,
                when: 'beforeChildren',
                ...entryTransition,
            },
        },
        hidden: {
            opacity: 0,
            filter: blur ? 'blur(15px)' : null,
            y: animateY ? '50px' : null,
            transition: {
                duration: 0.4,
                when: 'afterChildren',
                ...exitTransition,
            },
        },
    }

    return (
        <AnimationHolder
            isVisible={isVisible}
            variants={variants}
            animatePresence={animatePresence}
            element={element}
            component={component}
            containerProps={containerProps}
            componentProps={componentProps}
            isNested={isNested}
            animKey={animKey}
        >
            {children}
        </AnimationHolder>
    )
}

export const HeightAuto = ({
    isVisible = true,
    children,
    element = 'div',
    component,
    componentProps = {},
    containerProps,
    entryTransition,
    exitTransition,
    blur = false,
    animatePresence = false,
    isNested,
    animKey,
}) => {
    const variants = {
        visible: {
            opacity: 1,
            height: 'auto',
            transition: {
                duration: 0.4,
                when: 'beforeChildren',
                ...entryTransition,
            },
        },
        hidden: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.4,
                when: 'afterChildren',
                ...exitTransition,
            },
        },
    }

    return (
        <AnimationHolder
            isVisible={isVisible}
            variants={variants}
            animatePresence={animatePresence}
            element={element}
            component={component}
            containerProps={containerProps}
            componentProps={componentProps}
            isNested={isNested}
            animKey={animKey}
        >
            {children}
        </AnimationHolder>
    )
}

export const Staggers = ({
    isVisible = true,
    children,
    element = 'div',
    component,
    componentProps = {},
    containerProps,
    entryTransition,
    exitTransition,
    animatePresence = false,
    isNested,
    animKey,
    visibleStaggers,
    hiddenStaggers,
}) => {
    const variants = {
        visible: {
            transition: {
                duration: 0,
                staggerChildren: visibleStaggers,
                ...entryTransition,
            },
        },
        hidden: {
            transition: {
                duration: 0,
                staggerChildren: hiddenStaggers,
                ...exitTransition,
            },
        },
    }

    return (
        <AnimationHolder
            isVisible={isVisible}
            variants={variants}
            animatePresence={animatePresence}
            element={element}
            component={component}
            containerProps={containerProps}
            componentProps={componentProps}
            isNested={isNested}
            animKey={animKey}
        >
            {children}
        </AnimationHolder>
    )
}
