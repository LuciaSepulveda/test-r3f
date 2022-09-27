import React, { useState } from "react"
import { useRef, useEffect } from "react"
import { PerspectiveCamera, useScroll } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { degToRad } from 'three/src/math/MathUtils'
import { editable as e } from '@theatre/r3f'

const EditableCameraProjects = e(PerspectiveCamera, 'Camera Projects')

// gsap.registerPlugin(ScrollTrigger);


const CameraProjects = ({position, rotation}) => {
    return (
    <EditableCameraProjects
      theatreKey="Camera Projects"
      makeDefault
      fov={100}
      far={10000}
    />
  )
}

export default CameraProjects
