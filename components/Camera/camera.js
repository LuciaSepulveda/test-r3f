import React from 'react'
import { useRef, useEffect, useState } from 'react'
import { PerspectiveCamera, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { editable } from '@theatre/r3f'

const EditableCamera = editable(PerspectiveCamera, 'perspectiveCamera')

const Camera = ({ position, rotation, lookAt, start, demoSheet }) => {
    const ref = useRef()
    const [scroll, setScroll] = useState(0)
    const prevScroll = usePrevious(scroll)

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

    return (
        <EditableCamera
            makeDefault
            fov={40}
            far={100}
            //ref={ref}
            theatreKey="perspectiveCamera"
        />
    )
}

function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
        ref.current = value
    })
    return ref.current
}

export default Camera
