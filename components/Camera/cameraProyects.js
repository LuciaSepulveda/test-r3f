import React from "react"
import { useRef, useEffect } from "react"
import { PerspectiveCamera, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"


const CameraProyects = (props) => {
  const ref = useRef()
  
  const scrollY = useScroll()

  

  

  return (
    <PerspectiveCamera
      position={[0,10,-25]}
      // rotation={[rotation.x, rotation.y, rotation.z]}
      fov={55}
      far={1000}
      ref={ref}
    />
  )
}

export default CameraProyects
