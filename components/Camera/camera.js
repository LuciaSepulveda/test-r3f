import React from 'react'
import { useRef, useEffect } from 'react'
import { PerspectiveCamera, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const Camera = ({ position, rotation, lookAt, start }) => {
    const ref = useRef()

    const scrollY = useScroll()

    useFrame(() => {
        if (ref.current) {
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
                //console.log("POS", position, "ROT", rotation)
            } else {
                //ref.current.position.x = scrollY.range(0, 2 / 4) * 10

                if (scrollY.visible(0, 2 / 4)) {
                    ref.current.position.y = 2 + scrollY.range(0, 2 / 4)
                    ref.current.position.z = -10 + scrollY.range(0, 2 / 4) * 2
                    //ref.current.rotation.x = +scrollY.range(0, 2 / 4) * (1 / 2)
                    //ref.current.rotation.y = scrollY.range(0, 0.3) * (1 / 2)
                    //ref.current.rotation.z = scrollY.range(0, 2 / 4) * 1 / 2
                    // ref.current.lookAt.x = 0
                    // ref.current.lookAt.y = 0
                    // ref.current.lookAt.z = -1
                }

                if (scrollY.visible(0.7, 0.2)) {
                    ref.current.position.z = -8 + scrollY.range(0.7, 0.2) * 18
                    ref.current.position.x = scrollY.range(0.7, 0.2) * 10
                    ref.current.rotation.y = scrollY.range(0.7, 0.2) * 1.3

                    // console.log(
                    //     'X: ',
                    //     ref.current.position.x,
                    //     'Y: ',
                    //     ref.current.position.y,
                    //     'Z: ',
                    //     ref.current.position.z
                    // )
                }

                if (scrollY.visible(0.9, 0.1)) {
                    ref.current.position.z = 10 + scrollY.range(0.9, 0.1) * 8
                    ref.current.position.x = 10 - scrollY.range(0.9, 0.1) * 15
                }
            }
        }
    })

    return (
        <PerspectiveCamera
            makeDefault
            position={[position.x, position.y, position.z]}
            rotation={[rotation.x, rotation.y, rotation.z]}
            fov={40}
            far={100}
            ref={ref}
        />
    )
}

export default Camera
