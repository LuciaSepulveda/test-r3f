import React from "react"
import { useRef, useEffect } from "react"
import { PerspectiveCamera, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"

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
        // ref.current.position.x = scrollY.range(0, 2 / 4) * 0.10797822909431119
         ref.current.position.y = 2 + scrollY.range(0, 2 / 4) * 2
         ref.current.position.z = -10 - scrollY.range(0, 2 / 4) * 3
        // ref.current.rotation.x =
        //   -(Math.PI / 2) + scrollY.range(0, 2 / 4) * 1.569608583
        // ref.current.rotation.y = scrollY.range(0, 2 / 4) * 2
        // ref.current.rotation.z = scrollY.range(0, 2 / 4) * 2
        // ref.current.lookAt.x = 0
        // ref.current.lookAt.y = 0
        // ref.current.lookAt.z = -1
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
