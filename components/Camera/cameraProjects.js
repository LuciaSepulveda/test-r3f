import React, { useState } from "react"
import { useRef, useEffect } from "react"
import { PerspectiveCamera, useScroll } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { degToRad } from 'three/src/math/MathUtils'

gsap.registerPlugin(ScrollTrigger);


const CameraProjects = ({position, rotation, lookAt, startProjects, setStartProjects}) => {
  const ref = useRef()
  const scrollY = useScroll()
  const { camera } = useThree()
  
  useEffect(()=>{
    let timeline = gsap.timeline();
          timeline
          .to(camera.rotation, {
            duration:3,
            x:0,
          },'+=1.25')
          .to(camera.position, {
            duration:2,
            z:-3,
            onComplete: function () {
              
            }
          },)
  })
  
  useFrame(()=> {
    if(startProjects){
        camera.position.x = 0
        camera.position.y = 5 
        camera.position.z = -3 + scrollY.range(0, 2 / 4) * 61
        
        if (camera.position.z > -2 && camera.position.z <18) {
          // camera.rotation.y = Math.PI - scrollY.range(0, 1 / 3)
          camera.rotation.y = Math.PI - scrollY.offset *2.5
          // console.log(scrollY.offset);
          // console.log('MATHPI ANTES '+ (Math.PI - scrollY.offset *2.5));
        } else if (camera.position.z >= 18 && camera.position.z <25) {
          camera.rotation.y = 2.7117 + ((scrollY.offset-0.1720)*4.5)
          //console.log(''+scrollY.offset);
          // console.log('MATHPI'+ (Math.PI - scrollY.offset *2.5));
          //console.log(camera.position.z);
        } else if (camera.position.z >= 25 && camera.position.z <35) {
          //console.log(camera.position.z);
          //camera.rotation.y = 2.7117 + ((scrollY.offset-0.1720)*4.5)
          // console.log(''+scrollY.offset);
          // console.log('MATHPI'+ (Math.PI - scrollY.offset *2.5));
          // console.log('RATATION '+camera.rotation.y);
          
        } else if (camera.position.z >= 35 && camera.position.z <55) {
          //console.log(camera.position.z);
          camera.rotation.y = 2.9667 + ((scrollY.offset-0.3120)*6.5)
          //console.log(''+scrollY.offset);
          // console.log('MATHPI'+ (Math.PI - scrollY.offset *2.5));
          
        }
    }
  })
  
  return (
    <PerspectiveCamera
      makeDefault
      fov={100}
      far={10000}
      position={[position.x, position.y, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
      ref={ref}
    />
  )
}

export default CameraProjects
