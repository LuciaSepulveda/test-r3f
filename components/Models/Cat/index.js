/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: the Show Orange (https://sketchfab.com/orangetheshow)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/cat-is2-670791315b634cb0b1f59cbfe7cff3e4
title: Cat IS2
*/

import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useAnimations, PivotControls, useScroll } from '@react-three/drei'
import gsap from 'gsap'
import { useFrame } from '@react-three/fiber'
import firstScene from '../../../helpers/helpers'
import { editable as e } from '@theatre/r3f'

const Cat = ({ scene, start, demoSheet }) => {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('./models/cat/scene.gltf')
    const { actions } = useAnimations(animations, group)
    //const [positionScroll, setPositionScroll] = useState(0)
    const [position, setPosition] = useState({ x: 0, y: 0.85, z: -5 })
    const [scroll, setScroll] = useState(0)
    const prevScroll = usePrevious(scroll)
    const [walk, setWalk] = useState(false)
    const [actualAction, setActualAction] = useState({ actualAction: 'A_idle' })

    const scrollY = useScroll()

    useEffect(() => {
        console.log('ACTIONS', actions)
    }, [])

    useEffect(() => {
        actions?.A_idle.play()
        if (scene === 0) {
            console.log(actions, position, group, scrollY)
            firstScene(actions, position, group, scrollY)
        }
    }, [actions, position, group, scrollY, scene])

    const handleSetActualAction = (val) => {
        setActualAction(val)
    }

    const init = async () => {
        const dat = await import('dat.gui')
        const gui = new dat.GUI()

        gui.domElement.id = 'gui'

        const actionsFolder = gui.addFolder('actualAction')
        actionsFolder.open()

        actionsFolder.add(actualAction, 'actualAction').onChange((value) => handleSetActualAction(value))
    }

    useFrame(({ clock }) => {
        const frame = clock.getElapsedTime()
        //console.log(frame);
        if (frame === 5) {
            actions?.A_walk.play()
        }

        // actions?.E_idle.play()

        //setPositionScroll(scrollY.offset)

        if (group.current && start === true) {
            if (scrollY.visible(0, 0.25)) {
                if (scrollY.range(0, 1 / 4) >= 0 && prevScroll >= 0) {
                    setScroll(scrollY.range(0, 1 / 4))
                    if (walk) {
                        //actions?.A_idle.stop()
                        actions?.A_walk.play()
                        //actions?.A_idle.stop()
                        // group.current.position.z = -5 + scrollY.range(0, 1 / 4) * 6
                        // group.current.position.x = scrollY.range(0, 1 / 4) * 5
                        // group.current.rotation.y = scrollY.range(0, 1 / 4) / 2
                        demoSheet.sequence.play({
                            iterationCount: 1,
                            range: [
                                prevScroll < scrollY.range(0, 1 / 4)
                                    ? prevScroll * 3 + 3
                                    : scrollY.range(0, 1 / 4) * 3 + 3,
                                prevScroll < scrollY.range(0, 1 / 4)
                                    ? scrollY.range(0, 1 / 4) * 3 + 3
                                    : prevScroll * 3 + 3,
                            ],
                        })
                    } else {
                        actions?.A_walk.stop()
                        //actions?.A_idle.play()
                        //actions?.A_idle.play()
                    }
                }
            } else {
                //esto era lo anterior: 
                actions?.A_walk.stop()
                if (scrollY.visible(5 / 6, 1 / 6)) {
                    setScroll(scrollY.offset)
                    if (walk) {
                        //actions?.A_idle.stop()
                        actions?.A_run.play()
                        actions?.A_idle.stop()
                        group.current.position.z = 1 + scrollY.range(5 / 6, 1 / 6) * 16
                        group.current.position.x = 5 - scrollY.range(5 / 6, 1 / 6) * 5
                        group.current.rotation.y = 1 / 2 - scrollY.range(5 / 6, 1 / 6)
                    } else {
                        actions?.A_run.stop()
                        actions?.A_idle.play()
                        //actions?.A_idle.play()
                    }
                } else {
                    actions?.A_run.stop()
                    actions?.A_idle.play()
                }
            }
        }
    })

    useEffect(() => {
        if (!scroll && !prevScroll) return

        if (scroll && prevScroll) {
            const difference = scroll - prevScroll

            if (Math.abs(difference) > 0.0001) {
                setWalk(true)
            } else {
                setWalk(false)
            }
        }
    }, [scroll])

    // function renderAnimations() {

    // }
    return (
        <PivotControls position={[position.x, position.y, position.z]} axisColors={['red', 'green', 'blue']}>
            <e.group theatreKey="cat" ref={group} position={[position.x, position.y, position.z]} dispose={null}>
                <group name="Sketchfab_Scene">
                    <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={860.73}>
                        <group name="153a0d5dcc9149cfb9856363b51a1918fbx" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                            <group name="Object_2">
                                <group name="RootNode">
                                    <group name="Object_4">
                                        <primitive object={nodes._rootJoint} />
                                        <group name="Object_6" position={[-0.01, -0.1, 0.22]} scale={1.3} />
                                        <skinnedMesh
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
        </PivotControls>
    )
}

useGLTF.preload('/models/cat/scene.gltf')

function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
        ref.current = value
    })
    return ref.current
}

export default Cat
