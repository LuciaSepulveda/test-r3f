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
    const [position, setPosition] = useState({ x: 0, y: -2.85, z: -247 })
    const { appState } = useContext(AppContext)
    const [startScroll, setStartScroll] = useState(false)
    const [positionZ, setPositionZ] = useState(0)
    const [action, setAction] = useState("A_run");
    const prevPositionZ = usePrevious(positionZ)
    const previousAction = usePrevious(action);
    
    // Transiciones de animaciones
    const [aToB, setAToB] = useState("AtoB")
    const [aToF, setAToF] = useState("AtoF")
    const [aToD, setAToD] = useState("A_pole_start")
    const [bToA, setBToA] = useState("BtoA")
    
    // useEffect(() => {
    //     if (previousAction) {
    //       actions[previousAction].fadeOut(0.9);
    //       actions[action].stop().fadeOut(0.9);
    //     }
    //     actions[action].play();
    //     actions[action].fadeIn(0.9);
    //   }, [actions, action, previousAction]);

    useEffect(() => {
        if (!positionZ && !prevPositionZ) return

        if (positionZ && prevPositionZ) {
            const difference = positionZ - prevPositionZ

            if (Math.abs(difference) > 0.06) {
                actions?.A_idle.stop().fadeOut(0.1)
            } else {
                actions?.A_walk.stop().fadeOut(0.1)
                actions?.A_run.stop()
                actions?.A_idle.play()
            }
        }
    }, [positionZ])
    // Inicio gato sale de la caja
    useEffect(()=> {
        setStartScroll(false)
        if (!startScroll && actions && group.current && scene === 1){
            let timeline = gsap.timeline();
            timeline
            .to(group.current.position, {
                duration:0.0000001,
                y: group.current.position.y = -2.85,
                z: group.current.position.z = -247.7
            })
            .to(group.current.position, {
                duration:2,
                y: group.current.position.y = -2.85,
                z: group.current.position.z = -247.7
            })
            .to(group.current.position, {
                y:0.85,
                duration:2,
                onStart: function () { 
                    actions?.A_walk.stop().fadeOut(0.9)
                    actions?.A_idle.stop().fadeOut(0.9)
                    actions?.B_idle.stop().fadeOut(0.9)
                    actions?.F_idle.stop().fadeOut(0.9)
                    actions?.D_idle.stop().fadeOut(0.9)
                    actions?.A_pole_loop.play()
            },
                onComplete: function () { 
                    actions?.A_pole_loop.stop().fadeOut(0.9)
                    actions?.A_idle.stop().fadeOut(0.9)
            },
            },)
            .to(group.current.position, {
                duration:.30,
                y: 2.85,
                z:-244.16,
                onStart: function () {
                    actions?.A_idle.stop().fadeOut(0.9)
                    actions?.A_pole_loop.stop().fadeOut(0.9)
                    actions?.A_jump_start.play()
            },
                onComplete: function () {
                    actions?.A_idle.stop().fadeOut(0.9) 
                    actions?.A_pole_loop.stop().fadeOut(0.9)
                    actions?.A_jump_start.stop().fadeOut(0.9)
            },
            },)
            .to(group.current.position, {
                duration:.5,
                y:2.85,
                z:-243.86,
                onStart: function () { 
                    actions?.A_idle.stop().fadeOut(0.9)
                    actions?.A_pole_loop.stop().fadeOut(0.9)
                    actions?.A_jump_loop.play()
            },
                onComplete: function () { 
                    actions?.A_idle.stop().fadeOut(0.9)
                    actions?.A_pole_loop.stop().fadeOut(0.9)
                    actions?.A_jump_loop.stop().fadeOut(0.9)
            },
            },)
            .to(group.current.position, {
                duration:.9377,
                y:0.85,
                z:-242.26,
                onStart: function () {
                    actions?.A_idle.stop().fadeOut(0.9) 
                    actions?.A_pole_loop.stop().fadeOut(0.9)
                    actions?.A_jump_end.play()
            },
                onComplete: function () { 
                    actions?.A_idle.stop().fadeOut(0.9)
                    actions?.A_pole_loop.stop().fadeOut(0.9)
                    actions?.A_jump_end.stop().fadeOut(0.9)
                    setStartScroll(true)
            }, 
            },)
        }
    },[])
    
    // Theatre Proyectos
    useFrame(()=> {
        // Inicio - estático
        setPositionZ(group.current.position.z)
        if (actions &&
            startScroll && 
            group.current && 
            scene === 1 &&
            group.current.position.z === -242.26){
                actions?.A_jump_end.stop()
                actions?.A_jump_start.stop()
                actions?.A_jump_loop.stop()
                actions?.A_pole_loop.stop()
                actions?.A_run.stop()
                actions?.A_walk.stop()
                actions?.B_idle.stop()
                actions?.F_idle.stop()
                actions?.D_idle.stop()
                actions?.A_idle.play()
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
            actions?.A_idle.stop()
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
            actions?.A_idle.stop()
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
        // Llegando a 3°T
        else if (group.current.position.z > 205 &&   group.current.position.z < 220){
            actions?.A_walk.play()
            actions?.B_idle.stop()
            actions?.F_idle.stop()
            actions?.D_idle.stop()
        } 
        // Acercándose a 3°T
        else if (group.current.position.z > 216 &&   group.current.position.z < 230){
            actions?.A_run.stop()
            actions?.B_idle.stop()
            actions?.F_idle.stop()
            actions?.D_idle.stop()

        } 
        // En 3°T
        else if (group.current.position.z === 230){
            actions?.A_idle.stop()
            actions?.A_run.stop()
            actions?.A_walk.stop()
            actions[aToD].setLoop(1,1)
            actions?.A_pole_start.play()
            actions?.D_idle.play()
        } 
        
    },[startScroll])
    /*
            */
    
      
     
    return (
            <e.group theatreKey="Cat" ref={group} dispose={null}>
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

function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
        ref.current = value
    })
    return ref.current
}
