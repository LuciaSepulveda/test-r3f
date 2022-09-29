/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: the Show Orange (https://sketchfab.com/orangetheshow)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/cat-is2-670791315b634cb0b1f59cbfe7cff3e4
title: Cat IS2
*/

import React, { useEffect, useRef, useState, useContext } from 'react'
import { useGLTF, useAnimations, PivotControls, useScroll } from '@react-three/drei'
import gsap from 'gsap'
import { useFrame } from '@react-three/fiber'
import firstScene from '../../../helpers/helpers'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { editable as e } from '@theatre/r3f'
import { AppContext } from '../../../context/appContext'

gsap.registerPlugin(ScrollTrigger)

const Cat = ({ scene, demoSheet }) => {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('./models/cat/scene.gltf')
    const { actions } = useAnimations(animations, group)
    //const [positionScroll, setPositionScroll] = useState(0)
    const [position, setPosition] = useState({ x: 0, y: 0.85, z: -5 })
    const { appState } = useContext(AppContext)
    const [scroll, setScroll] = useState(0)
    

    const [aToB, setAToB] = useState("AtoB")
    const [aToF, setAToF] = useState("AtoF")
    const [aToD, setAToD] = useState("A_pole_start")
    const [bToA, setBToA] = useState("BtoA")

    if (appState.currentStep === 1 ) {
        setTimeout(() => demoSheet.sequence.play(), 2000)
    }
    
    /*const scrollY = useScroll()
    
    const a = scrollY.range(0, 1 / 3)
    const b = scrollY.range(1 / 3, 1 / 3)
    const c = scrollY.range(2 / 3, 1 / 3)
  
    
    
    useEffect(()=>{
        if (scrollY.offset !== 0 && scrollY.offset >= 0) {
            if(a)
                demoSheet.sequence.play({iterationCount: 1, range: [1, 7]})
            
            if(b)
                demoSheet.sequence.play({iterationCount: 1, range: [7, 15]})
            
            if(c)
                demoSheet.sequence.play({iterationCount: 1, range: [15, 23]})
        }

    })*/



    
    useFrame(()=>{
       if (appState.currentStep === 1) {
           
        
       //console.log(demoSheet.sequence.position)
       }
    })

    

    useEffect(() => {
        if (scene === 0) {
            actions?.A_pole_loop.stop()
            actions?.A_idle.play()
            console.log(actions, position, group, scrollY)
            firstScene(actions, position, group, scrollY)
        }
    }, [actions, position, group, scrollY, scene])

    useFrame(({ clock }) => {
        if (scene === 0) {
            const frame = clock.getElapsedTime()
            //console.log(frame);
            if (frame === 5) {
                actions?.A_walk.play()
            }
        }

    })

    // Momento 2 - Proyectos
    useFrame(()=> {
        // Inicio - estático
        if (actions && 
            group.current && 
            scene === 1 &&
            group.current.position.z === -242.26){
                actions?.A_idle.play()
                actions?.A_run.stop()
                actions?.A_walk.stop()
                actions?.B_idle.stop()
                actions?.F_idle.stop()
                actions?.D_idle.stop()
            }
        // Yendo hacia primer Tótem
        else if (group.current.position.z >-242.26 && group.current.position.z <-100) {
            actions?.A_idle.stop()
            actions?.B_idle.stop()
            actions?.F_idle.stop()
            actions?.D_idle.stop()
            actions?.A_walk.stop()
            actions?.A_run.play()
        }
        // Llegando a 1°T
        else if (group.current.position.z > -100 &&   group.current.position.z < -63){
            actions?.A_walk.play()
        } 
        // Acercándose a 1°T
        else if (group.current.position.z > -63 &&   group.current.position.z < -46){
            actions?.A_run.stop()
            actions?.B_idle.stop()
            actions?.A_walk.play()
        } 
        // En 1°T
        else if (group.current.position.z === -44){
            actions?.A_run.stop()
            actions?.A_walk.stop()
            actions[aToB].setLoop(1,1)
            actions?.AtoB.play()
            actions?.B_idle.play()
            
        } 
         // Yendo hacia 2°T
         else if (group.current.position.z >-44 && group.current.position.z <82) {  
            actions?.B_idle.stop()
            actions?.F_idle.stop()
            actions?.D_idle.stop()
            actions?.A_walk.stop()
            actions?.A_run.play()
        }
        // Llegando a 2°T
        else if (group.current.position.z > 82 &&   group.current.position.z < 100){
            actions?.A_walk.play()
            actions?.B_idle.stop()
            actions?.F_idle.stop()
            actions?.D_idle.stop()
        } 
        // Acercándose a 2°T
        else if (group.current.position.z > 70 &&   group.current.position.z < 100){
            actions?.A_run.stop()
            actions?.B_idle.stop()
            actions?.F_idle.stop()
            actions?.D_idle.stop()
        } 
        // En 2°T
        else if (group.current.position.z === 100){
            actions?.A_run.stop()
            actions?.A_walk.stop()
            actions[aToF].setLoop(1,1)
            actions?.AtoF.play()
            actions?.F_idle.play()
        } 
         // Yendo hacia 3°T
         else if (group.current.position.z >100 && group.current.position.z <210) {  
            actions?.B_idle.stop()
            actions?.F_idle.stop()
            actions?.D_idle.stop()
            actions?.A_walk.stop()
            actions?.A_run.play()
        }
        // Llegando a 2°T
        else if (group.current.position.z > 205 &&   group.current.position.z < 220){
            actions?.A_walk.play()
            actions?.B_idle.stop()
            actions?.F_idle.stop()
            actions?.D_idle.stop()
        } 
        // Acercándose a 2°T
        else if (group.current.position.z > 216 &&   group.current.position.z < 220){
            actions?.A_run.stop()
            actions?.B_idle.stop()
            actions?.F_idle.stop()
            actions?.D_idle.stop()

        } 
        // En 2°T
        else if (group.current.position.z === 220){
            actions?.A_run.stop()
            actions?.A_walk.stop()
            actions[aToD].setLoop(1,1)
            actions?.A_pole_start.play()
            actions?.D_idle.play()
        } 
        
    })
    /*useEffect(()=> {
        if (actions && group.current && scene === 1){
            group.current.position.y = -2.85
            let timeline = gsap.timeline();
            timeline
            .to(group.current.position, {
                y:group.current.position.y+4,
                duration:2,
                onStart: function () { 
                actions?.A_pole_loop.play()
            },
                onComplete: function () { 
                actions?.A_pole_loop.stop()
            },
            },)
            .to(group.current.position, {
                duration:.3,
                y: group.current.position.y+6,
                z:group.current.position.z+2,
                onStart: function () { 
                actions?.A_jump_start.play()
            },
                onComplete: function () { 
                actions?.A_jump_start.stop()
            },
            },)
            .to(group.current.position, {
                duration:.5,
                y:group.current.position.y+6,
                z:group.current.position.z+4,
                onStart: function () { 
                actions?.A_jump_loop.play()
            },
                onComplete: function () { 
                actions?.A_jump_loop.stop()
            },
            },)
            .to(group.current.position, {
                duration:.9667,
                y:group.current.position.y+4,
                z:group.current.position.z+5,
                onStart: function () { 
                actions?.A_jump_end.play()
            },
                onComplete: function () { 
                actions?.A_jump_end.stop()
            },
            },)
            .to(group.current.position, {
                duration:.5,
                y:group.current.position.y+4,
                z:group.current.position.z+5,
                onStart: function () { 
                actions?.A_idle.play()
            },
                onComplete: function () { 
                actions?.A_idle.stop()
            },
            },)
            .to(group.current.position, {
                duration:1.7,
                y:group.current.position.y+4,
                z:group.current.position.z+10,
                onStart: function () { 
                actions?.A_run.play()
            },
                onComplete: function () { 
                actions?.A_run.stop()
                actions?.A_idle.play()
            },
            },)
            .to(group.current.position, {
                z:group.current.position.z+10.1,
                onComplete: function () { 
                setStartProjects(true)
            },
            },'+=1')
            
            
        }
    },[])*/
    
   /* useFrame(()=> {
        
        if(startProjects && scene === 1){
            console.log('ctZ '+group.current.position.z);
            console.log('ctX '+group.current.position.x);
            console.log('sc '+scrollY.offset);
             if (scrollY.offset>= 0 && scrollY.offset <= 0.01 ){    
                actions?.F_idle.stop()
                actions?.AtoB.stop()
                actions?.B_idle.stop()
                actions?.A_run.stop()
                actions?.A_idle.play()

            } else if (scrollY.offset>0.01 && scrollY.offset<=0.14) {
                actions?.F_idle.stop()
                actions?.AtoB.stop()
                actions?.B_idle.stop()
                actions?.A_idle.stop()
                actions?.A_run.play()
                group.current.position.z = 5.1 + scrollY.offset*150
            } else if (scrollY.offset>0.14 && scrollY.offset<=0.20) {
                actions?.F_idle.stop()
                actions?.A_run.stop()
                actions[aToB].setLoop(1,1)
                actions?.AtoB.play()
                actions?.B_idle.play()
            } else if (scrollY.offset>0.20 && scrollY.offset<=0.35) {
                actions?.F_idle.stop()
                actions?.B_idle.stop()
                actions[bToA].setLoop(1,1)
                actions?.BtoA.play()
                actions?.A_run.play()
                group.current.position.z = 26.058 + (scrollY.offset-0.20)*180

            } else if (scrollY.offset>0.35) {
                actions?.A_run.stop()
                actions[aToF].setLoop(1,1)
                actions?.AtoF.play()
                actions?.F_idle.play()

            }
            
            
        }
      })*/
    return (
            <e.group theatreKey="Cat" ref={group} position={[position.x, position.y, position.z]} dispose={null}>
                <group name="Sketchfab_Scene">
                    <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={860.73}>
                        <group name="153a0d5dcc9149cfb9856363b51a1918fbx" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                            <group name="Object_2">
                                <group name="RootNode">
                                    <group name="Object_4">
                                        <primitive object={nodes._rootJoint} />
                                        <group name="Object_6" position={[-0.01, -0.1, 0.22]} scale={1.3} />
                                        <skinnedMesh
                                        castShadow
                                            name="Object_7"
                                            geometry={nodes.Object_7.geometry}
                                            material={materials.cu_cat2_mt}
                                            skeleton={nodes.Object_7.skeleton}
                                        />
                                    </group>
                                </group>
                            </group>
                        </group>
                    </group>
                </group>
            </e.group>
    )
}

useGLTF.preload('/models/cat/scene.gltf')

export default Cat
