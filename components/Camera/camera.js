import React from 'react'
import { useRef, useEffect, useState } from 'react'
import { PerspectiveCamera, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { editable } from '@theatre/r3f'
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection'
import * as tf from '@tensorflow/tfjs-core'
import '@tensorflow/tfjs-backend-webgl'
import '@tensorflow/tfjs-core'
import * as mpHands from '@mediapipe/hands'

const EditableCamera = editable(PerspectiveCamera, 'perspectiveCamera')

const Camera = ({ position, rotation, lookAt, demoSheet, webcamRef, startDetection }) => {
    const refCamera = useRef()
    const [scroll, setScroll] = useState(0)
    const prevScroll = usePrevious(scroll)
    const [model, setModel] = useState()
    const [midPoint, setMidPoint] = useState()
    const prevMidPoint = usePrevious(midPoint)
    const [rateState, setRate] = useState()
    const [direction, setDirection] = useState()
    const [start, setStart] = useState(false)
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [z, setZ] = useState(0)

    const loadModel = async () => {
        try {
            const modelHands = await handPoseDetection.SupportedModels.MediaPipeHands
            const detectorHands = await handPoseDetection.createDetector(modelHands, {
                runtime: 'mediapipe',
                solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${mpHands.VERSION}`,
                maxHands: 1,
            })

            setModel(detectorHands)
        } catch (err) {
            console.log('ERR', err)
        }
    }

    useEffect(() => {
        tf.ready().then(() => {
            loadModel()
        })
    }, [])

    useEffect(() => {
        if (startDetection) {
            detectHands()
        }
    }, [startDetection])

    const detectHands = async () => {
        if (typeof window !== undefined && webcamRef.current !== null) {
            console.log('ENTRA EN DETECT HANDS')
            const predictions = await model.estimateHands(webcamRef.current.video)
            setStart(true)
            if (predictions) {
                predictionFunction(predictions)
                requestAnimationFrame(() => detectHands())
            }
        }
    }

    const predictionFunction = async (predictions) => {
        if (typeof window !== undefined && webcamRef.current !== null) {
            if (model !== null) {
                //const predictions = await model.estimateHands(webcamRef.current.video)
                if (predictions.length > 0) {
                    const finger1 = predictions[0].keypoints[4]
                    const finger2 = predictions[0].keypoints[12]
                    const finger3 = predictions[0].keypoints[20]
                    //setPoints(predictions[0].keypoints3D)
                    console.log('PRED finger1 x: ', finger1.x)

                    setX(finger1.x)
                    setY(finger1.y)
                    setZ(finger1.z)
                    // refCamera.current.position.x = finger1.x * 10
                    // refCamera.current.position.y = finger1.y * 10
                    // refCamera.current.position.z = finger1.z * 10

                    if (finger1 && finger2 && finger3) {
                        let midval = (finger1.x + finger2.x + finger3.x) / 3
                        setMidPoint({ val: midval, time: new Date().getTime() })
                    }
                }
            }
        }
    }

    useEffect(() => {
        if (!midPoint && !prevMidPoint) return

        if (midPoint && prevMidPoint) {
            const rate = (midPoint.val - prevMidPoint.val) / (midPoint.time - prevMidPoint.time)
            setRate(rate)

            if (Math.abs(rate) > 0.6) {
                setDirection(rate)
            }
        }
    }, [midPoint])

    useEffect(() => {
        console.log('DIRECTION: ', direction)
    }, [direction])

    useFrame(() => {
        if (start && rateState && Math.abs(rateState) > 0.2) {
            refCamera.current.rotation.y = x / 30
            // refCamera.current.position.y = y
            // refCamera.current.position.z = z
        }
    })

    const scrollY = useScroll()
    {
        /*
    useFrame(() => {
        
            if (!start) {
                ref.current.position.x = position.x
                ref.current.position.y = position.y
                ref.current.position.z = position.z
                ref.current.rotation.x = rotation.x
                ref.current.rotation.y = rotation.y
                ref.current.rotation.z = rotation.z
                ref.current.lookAt.x = lookAt.x + 1
                ref.current.lookAt.y = lookAt.y
                ref.current.lookAt.z = lookAt.z
                console.log("POS", position, "ROT", rotation)
                if (scrollY.visible(0, 1)) {
                    console.log('OF', scrollY.offset)
                    if (scrollY.offset !== 0 && scrollY.offset >= 0 && prevScroll >= 0) {
                        setScroll(scrollY.offset)
                        demoSheet.sequence.play({ iterationCount: 1, range: [prevScroll * 3, scrollY.offset * 3] })
                        console.log('PREV', prevScroll, 'SCROL', scrollY.offset * 3)
                    }
                }
            } else {
                if (scrollY.visible(0, 1 / 2)) {
                    ref.current.position.x = -20 + scrollY.range(1 / 4, 1 / 4) * 3
                    //ref.current.position.y = 5 + scrollY.range(1 / 2, 1 / 2) * 1
                    ref.current.position.z = 6 + scrollY.range(1 / 4, 1 / 4) * 2

                    //console.log("x: ", ref.current.position.x, "Z: ", ref.current.position.z)
                }
                // ref.current.rotation.x =
                //   -(Math.PI / 2) + scrollY.range(0, 2 / 4) * 1.569608583

                if (scrollY.visible(1 / 2, 1 / 6)) {
                    // console.log(
                    //     'x: 2',
                    //     ref.current.position.x,
                    //     'Z: 2',
                    //     ref.current.position.z,
                    //     'ROT Y : ',
                    //     ref.current.rotation.y
                    // )
                    ref.current.rotation.y = -Math.PI / 2 + scrollY.range(1 / 2, 1 / 6) / 3
                    ref.current.position.x = -17 + scrollY.range(1 / 2, 1 / 6) * 6
                    ref.current.position.z = 8 - scrollY.range(1 / 2, 1 / 6) * 2
                }

                if (scrollY.visible(2 / 3, 1 / 6)) {
                    //console.log('x: 3', ref.current.position.x, 'Z: 3', ref.current.position.z)
                    ref.current.rotation.y = (-3 * Math.PI + 2) / 6 + scrollY.range(2 / 3, 1 / 6)
                    ref.current.position.x = -11 + scrollY.range(2 / 3, 1 / 6) * 17
                    ref.current.position.z = 6 - scrollY.range(2 / 3, 1 / 6) * 16
                }

                if (scrollY.visible(5 / 6, 1 / 6)) {
                    //console.log('x: 3', ref.current.position.x, 'Z: 3', ref.current.position.z)
                    ref.current.rotation.y = (-3 * Math.PI + 8) / 6 - scrollY.range(5 / 6, 1 / 6) * 1.5
                    ref.current.position.x = 6 - scrollY.range(5 / 6, 1 / 6) * 27
                    ref.current.position.z = -10 + scrollY.range(5 / 6, 1 / 6) * 36
                }
            }
        }
    )
    */
    }

    // useEffect(() => {
    //     if (scrollY.visible(0, 1)) {
    //         console.log('OF', scrollY.offset)
    //         if (scrollY.offset !== 0 && scrollY.offset >= 0 && prevScroll >= 0) {
    //             setScroll(scrollY.offset)
    //             demoSheet.sequence.play({ iterationCount: 1, range: [prevScroll * 30, scrollY.offset * 30] })
    //             console.log('PREV', prevScroll * 20, 'SCROL', scrollY.offset * 20)
    //         }
    //     }
    // }, [prevScroll, scroll])
    // useEffect(() => {
    //     demoSheet.sequence.play({ iterationCount: 1 })
    // }, [])

    return <EditableCamera makeDefault fov={40} far={100} ref={refCamera} theatreKey="perspectiveCamera" />
}

function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
        ref.current = value
    })
    return ref.current
}

export default Camera
