import { Canvas } from '@react-three/fiber'
import React, {
    Fragment,
    // useContext,
    Suspense,
    useEffect,
    useState,
    //   useRef,
} from 'react'
import { OrbitControls, Html, PerspectiveCamera } from '@react-three/drei'
import useSpline from '@splinetool/r3f-spline'

export const Test = () => {
    const { nodes, materials } = useSpline('./scene.splinecode')
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Canvas shadows>
                <Fragment>
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.1} />
                        <pointLight intensity={2} position={[7, 5, 1]} />

                        <PerspectiveCamera
                            far={100000}
                            near={5}
                            fov={45}
                            position={[940.57, 694.1, 193.92]}
                            rotation={[-1.16, 1.07, 1.11]}
                        />

                        <color attach="background" args={['#4b4d52']} />
                        <group dispose={null}>
                            <group name="picture" position={[72.59, 119.06, -139.81]} rotation={[0, -Math.PI / 9, 0]}>
                                <mesh
                                    name="Rectangle"
                                    geometry={nodes.Rectangle.geometry}
                                    material={materials['Rectangle Material']}
                                    castShadow
                                    receiveShadow
                                    position={[-0.04, 0.4, 4.02]}
                                    rotation={[-Math.PI / 9, 0, 0]}
                                />
                                <mesh
                                    name="Cube 2"
                                    geometry={nodes['Cube 2'].geometry}
                                    material={materials['Cube 2 Material']}
                                    castShadow
                                    receiveShadow
                                    position={[0, -4.95, -6.28]}
                                    rotation={[0.42, 0, 0]}
                                />
                                <mesh
                                    name="Boolean"
                                    geometry={nodes.Boolean.geometry}
                                    material={materials['Boolean Material']}
                                    castShadow
                                    receiveShadow
                                    position={[0, 0.04, 3.28]}
                                >
                                    <mesh
                                        name="Cube"
                                        geometry={nodes.Cube.geometry}
                                        material={materials['Cube Material']}
                                        visible={false}
                                        castShadow
                                        receiveShadow
                                        position={[0, 0.3, 0.82]}
                                        rotation={[-Math.PI / 9, 0, 0]}
                                    />
                                    <mesh
                                        name="Cube1"
                                        geometry={nodes.Cube1.geometry}
                                        material={materials['Cube1 Material']}
                                        visible={false}
                                        castShadow
                                        receiveShadow
                                        rotation={[-Math.PI / 9, 0, 0]}
                                    />
                                </mesh>
                            </group>
                            <group name="notebook" position={[-33, 113.07, -126.89]}>
                                <group name="keyboard" position={[-0.32, -11.07, 0.81]}>
                                    <mesh
                                        name="Cube 28"
                                        geometry={nodes['Cube 28'].geometry}
                                        material={materials['Cube 28 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-16.81, 0, 1.58]}
                                    />
                                    <mesh
                                        name="Cube 27"
                                        geometry={nodes['Cube 27'].geometry}
                                        material={materials['Cube 27 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[16.59, 0, 1.58]}
                                    />
                                    <mesh
                                        name="Cube 26"
                                        geometry={nodes['Cube 26'].geometry}
                                        material={materials['Cube 26 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-19.8, 0, -8.21]}
                                    />
                                    <mesh
                                        name="Cube 261"
                                        geometry={nodes['Cube 261'].geometry}
                                        material={materials['Cube 261 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-19.7, 0, -4.91]}
                                    />
                                    <mesh
                                        name="Cube 25"
                                        geometry={nodes['Cube 25'].geometry}
                                        material={materials['Cube 25 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-13.13, 0, -8.21]}
                                    />
                                    <mesh
                                        name="Cube 251"
                                        geometry={nodes['Cube 251'].geometry}
                                        material={materials['Cube 251 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-16.46, 0, -8.21]}
                                    />
                                    <mesh
                                        name="Cube 252"
                                        geometry={nodes['Cube 252'].geometry}
                                        material={materials['Cube 252 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[23.21, 0, -8.21]}
                                    />
                                    <mesh
                                        name="Cube 253"
                                        geometry={nodes['Cube 253'].geometry}
                                        material={materials['Cube 253 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[20.17, 0, -8.21]}
                                    />
                                    <mesh
                                        name="Cube 254"
                                        geometry={nodes['Cube 254'].geometry}
                                        material={materials['Cube 254 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[16.94, 0, -8.21]}
                                    />
                                    <mesh
                                        name="Cube 255"
                                        geometry={nodes['Cube 255'].geometry}
                                        material={materials['Cube 255 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[13.66, 0, -8.16]}
                                    />
                                    <mesh
                                        name="Cube 256"
                                        geometry={nodes['Cube 256'].geometry}
                                        material={materials['Cube 256 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[10.32, 0, -8.21]}
                                    />
                                    <mesh
                                        name="Cube 257"
                                        geometry={nodes['Cube 257'].geometry}
                                        material={materials['Cube 257 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[6.99, 0, -8.21]}
                                    />
                                    <mesh
                                        name="Cube 258"
                                        geometry={nodes['Cube 258'].geometry}
                                        material={materials['Cube 258 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[3.64, 0, -8.21]}
                                    />
                                    <mesh
                                        name="Cube 259"
                                        geometry={nodes['Cube 259'].geometry}
                                        material={materials['Cube 259 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[0.26, 0, -8.21]}
                                    />
                                    <mesh
                                        name="Cube 2510"
                                        geometry={nodes['Cube 2510'].geometry}
                                        material={materials['Cube 2510 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-3.06, 0, -8.21]}
                                    />
                                    <mesh
                                        name="Cube 2511"
                                        geometry={nodes['Cube 2511'].geometry}
                                        material={materials['Cube 2511 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-6.34, 0, -8.21]}
                                    />
                                    <mesh
                                        name="Cube 2512"
                                        geometry={nodes['Cube 2512'].geometry}
                                        material={materials['Cube 2512 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-9.68, 0, -8.21]}
                                    />
                                    <mesh
                                        name="Cube 24"
                                        geometry={nodes['Cube 24'].geometry}
                                        material={materials['Cube 24 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-13.03, 0, -4.91]}
                                    />
                                    <mesh
                                        name="Cube 241"
                                        geometry={nodes['Cube 241'].geometry}
                                        material={materials['Cube 241 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-16.36, 0, -4.91]}
                                    />
                                    <mesh
                                        name="Cube 242"
                                        geometry={nodes['Cube 242'].geometry}
                                        material={materials['Cube 242 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[23.21, 0, -4.91]}
                                    />
                                    <mesh
                                        name="Cube 243"
                                        geometry={nodes['Cube 243'].geometry}
                                        material={materials['Cube 243 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[18.72, 0, -4.91]}
                                    />
                                    <mesh
                                        name="Cube 244"
                                        geometry={nodes['Cube 244'].geometry}
                                        material={materials['Cube 244 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[13.76, 0, -4.91]}
                                    />
                                    <mesh
                                        name="Cube 245"
                                        geometry={nodes['Cube 245'].geometry}
                                        material={materials['Cube 245 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[10.42, 0, -4.91]}
                                    />
                                    <mesh
                                        name="Cube 246"
                                        geometry={nodes['Cube 246'].geometry}
                                        material={materials['Cube 246 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[7.09, 0, -4.91]}
                                    />
                                    <mesh
                                        name="Cube 247"
                                        geometry={nodes['Cube 247'].geometry}
                                        material={materials['Cube 247 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[3.74, 0, -4.91]}
                                    />
                                    <mesh
                                        name="Cube 248"
                                        geometry={nodes['Cube 248'].geometry}
                                        material={materials['Cube 248 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[0.36, 0, -4.91]}
                                    />
                                    <mesh
                                        name="Cube 249"
                                        geometry={nodes['Cube 249'].geometry}
                                        material={materials['Cube 249 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-2.96, 0, -4.91]}
                                    />
                                    <mesh
                                        name="Cube 2410"
                                        geometry={nodes['Cube 2410'].geometry}
                                        material={materials['Cube 2410 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-6.24, 0, -4.91]}
                                    />
                                    <mesh
                                        name="Cube 2411"
                                        geometry={nodes['Cube 2411'].geometry}
                                        material={materials['Cube 2411 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-9.58, 0, -4.91]}
                                    />
                                    <mesh
                                        name="Cube 23"
                                        geometry={nodes['Cube 23'].geometry}
                                        material={materials['Cube 23 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-13.23, 0, -1.68]}
                                    />
                                    <mesh
                                        name="Cube 231"
                                        geometry={nodes['Cube 231'].geometry}
                                        material={materials['Cube 231 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-16.56, 0, -1.68]}
                                    />
                                    <mesh
                                        name="Cube 232"
                                        geometry={nodes['Cube 232'].geometry}
                                        material={materials['Cube 232 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[23.21, 0, -1.68]}
                                    />
                                    <mesh
                                        name="Cube 233"
                                        geometry={nodes['Cube 233'].geometry}
                                        material={materials['Cube 233 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[13.8, 0, -1.68]}
                                    />
                                    <mesh
                                        name="Cube 234"
                                        geometry={nodes['Cube 234'].geometry}
                                        material={materials['Cube 234 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[10.22, 0, -1.68]}
                                    />
                                    <mesh
                                        name="Cube 235"
                                        geometry={nodes['Cube 235'].geometry}
                                        material={materials['Cube 235 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[6.89, 0, -1.68]}
                                    />
                                    <mesh
                                        name="Cube 236"
                                        geometry={nodes['Cube 236'].geometry}
                                        material={materials['Cube 236 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[3.54, 0, -1.68]}
                                    />
                                    <mesh
                                        name="Cube 237"
                                        geometry={nodes['Cube 237'].geometry}
                                        material={materials['Cube 237 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[0.16, 0, -1.68]}
                                    />
                                    <mesh
                                        name="Cube 238"
                                        geometry={nodes['Cube 238'].geometry}
                                        material={materials['Cube 238 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-3.16, 0, -1.68]}
                                    />
                                    <mesh
                                        name="Cube 239"
                                        geometry={nodes['Cube 239'].geometry}
                                        material={materials['Cube 239 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-6.44, 0, -1.68]}
                                    />
                                    <mesh
                                        name="Cube 2310"
                                        geometry={nodes['Cube 2310'].geometry}
                                        material={materials['Cube 2310 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-9.78, 0, -1.68]}
                                    />
                                    <mesh
                                        name="Cube 22"
                                        geometry={nodes['Cube 22'].geometry}
                                        material={materials['Cube 22 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-10.11, 0, 1.58]}
                                    />
                                    <mesh
                                        name="Cube 221"
                                        geometry={nodes['Cube 221'].geometry}
                                        material={materials['Cube 221 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-13.44, 0, 1.58]}
                                    />
                                    <mesh
                                        name="Cube 21"
                                        geometry={nodes['Cube 21'].geometry}
                                        material={materials['Cube 21 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[23.21, 0, 1.58]}
                                    />
                                    <mesh
                                        name="Boolean 2"
                                        geometry={nodes['Boolean 2'].geometry}
                                        material={materials['Boolean 2 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[16.94, 0, 1.32]}
                                    >
                                        <mesh
                                            name="Cube 271"
                                            geometry={nodes['Cube 271'].geometry}
                                            material={materials['Cube 271 Material']}
                                            visible={false}
                                            castShadow
                                            receiveShadow
                                            position={[-0.11, 0.34, 0.21]}
                                        />
                                        <mesh
                                            name="Cube 211"
                                            geometry={nodes['Cube 211'].geometry}
                                            material={materials['Cube 211 Material']}
                                            visible={false}
                                            castShadow
                                            receiveShadow
                                            position={[1.72, 0, -1.46]}
                                        />
                                    </mesh>
                                    <mesh
                                        name="Cube 212"
                                        geometry={nodes['Cube 212'].geometry}
                                        material={materials['Cube 212 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[13.34, 0, 1.58]}
                                    />
                                    <mesh
                                        name="Cube 213"
                                        geometry={nodes['Cube 213'].geometry}
                                        material={materials['Cube 213 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[10.01, 0, 1.58]}
                                    />
                                    <mesh
                                        name="Cube 214"
                                        geometry={nodes['Cube 214'].geometry}
                                        material={materials['Cube 214 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[6.66, 0, 1.58]}
                                    />
                                    <mesh
                                        name="Cube 215"
                                        geometry={nodes['Cube 215'].geometry}
                                        material={materials['Cube 215 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[3.28, 0, 1.58]}
                                    />
                                    <mesh
                                        name="Cube 216"
                                        geometry={nodes['Cube 216'].geometry}
                                        material={materials['Cube 216 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-0.04, 0, 1.58]}
                                    />
                                    <mesh
                                        name="Cube 217"
                                        geometry={nodes['Cube 217'].geometry}
                                        material={materials['Cube 217 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-3.32, 0, 1.58]}
                                    />
                                    <mesh
                                        name="Cube 218"
                                        geometry={nodes['Cube 218'].geometry}
                                        material={materials['Cube 218 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-6.66, 0, 1.58]}
                                    />
                                    <mesh
                                        name="Cube 20"
                                        geometry={nodes['Cube 20'].geometry}
                                        material={materials['Cube 20 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[23.21, 0, 4.88]}
                                    />
                                    <mesh
                                        name="Cube 201"
                                        geometry={nodes['Cube 201'].geometry}
                                        material={materials['Cube 201 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[19.68, 0, 4.88]}
                                    />
                                    <mesh
                                        name="Cube 202"
                                        geometry={nodes['Cube 202'].geometry}
                                        material={materials['Cube 202 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[15.75, 0, 4.88]}
                                    />
                                    <mesh
                                        name="Cube 203"
                                        geometry={nodes['Cube 203'].geometry}
                                        material={materials['Cube 203 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[11.86, 0, 4.88]}
                                    />
                                    <mesh
                                        name="Cube 204"
                                        geometry={nodes['Cube 204'].geometry}
                                        material={materials['Cube 204 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[8.52, 0, 4.88]}
                                    />
                                    <mesh
                                        name="Cube 19"
                                        geometry={nodes['Cube 19'].geometry}
                                        material={materials['Cube 19 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[5.19, 0, 4.88]}
                                    />
                                    <mesh
                                        name="Cube 191"
                                        geometry={nodes['Cube 191'].geometry}
                                        material={materials['Cube 191 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[1.84, 0, 4.88]}
                                    />
                                    <mesh
                                        name="Cube 192"
                                        geometry={nodes['Cube 192'].geometry}
                                        material={materials['Cube 192 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-1.53, 0, 4.88]}
                                    />
                                    <mesh
                                        name="Cube 193"
                                        geometry={nodes['Cube 193'].geometry}
                                        material={materials['Cube 193 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-4.86, 0, 4.88]}
                                    />
                                    <mesh
                                        name="Cube 194"
                                        geometry={nodes['Cube 194'].geometry}
                                        material={materials['Cube 194 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-8.14, 0, 4.88]}
                                    />
                                    <mesh
                                        name="Cube 195"
                                        geometry={nodes['Cube 195'].geometry}
                                        material={materials['Cube 195 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-11.48, 0, 4.88]}
                                    />
                                    <mesh
                                        name="Cube 18"
                                        geometry={nodes['Cube 18'].geometry}
                                        material={materials['Cube 18 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[23.17, 0, 8.21]}
                                    />
                                    <mesh
                                        name="Cube 17"
                                        geometry={nodes['Cube 17'].geometry}
                                        material={materials['Cube 17 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[19.81, 0, 8.21]}
                                    />
                                    <mesh
                                        name="Cube 171"
                                        geometry={nodes['Cube 171'].geometry}
                                        material={materials['Cube 171 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[16.44, 0, 8.21]}
                                    />
                                    <mesh
                                        name="Cube 172"
                                        geometry={nodes['Cube 172'].geometry}
                                        material={materials['Cube 172 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[13.11, 0, 8.21]}
                                    />
                                    <mesh
                                        name="Cube 173"
                                        geometry={nodes['Cube 173'].geometry}
                                        material={materials['Cube 173 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[9.83, 0, 8.21]}
                                    />
                                    <mesh
                                        name="Cube 16"
                                        geometry={nodes['Cube 16'].geometry}
                                        material={materials['Cube 16 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[6.5, 0, 8.21]}
                                    />
                                    <mesh
                                        name="Cube 15"
                                        geometry={nodes['Cube 15'].geometry}
                                        material={materials['Cube 15 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-3.23, 0, 8.21]}
                                    />
                                    <mesh
                                        name="Cube 14"
                                        geometry={nodes['Cube 14'].geometry}
                                        material={materials['Cube 14 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-14.97, 0, 4.88]}
                                    />
                                    <mesh
                                        name="Cube 13"
                                        geometry={nodes['Cube 13'].geometry}
                                        material={materials['Cube 13 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-18.37, 0, 4.87]}
                                    />
                                    <mesh
                                        name="Cube 11"
                                        geometry={nodes['Cube 11'].geometry}
                                        material={materials['Cube 11 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-13.05, 0, 8.21]}
                                    />
                                    <mesh
                                        name="Cube 10"
                                        geometry={nodes['Cube 10'].geometry}
                                        material={materials['Cube 10 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-16.42, 0, 8.21]}
                                    />
                                    <mesh
                                        name="Cube 9"
                                        geometry={nodes['Cube 9'].geometry}
                                        material={materials['Cube 9 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-19.75, 0, 8.21]}
                                    />
                                    <mesh
                                        name="Cube 8"
                                        geometry={nodes['Cube 8'].geometry}
                                        material={materials['Cube 8 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-23.03, 0, 8.21]}
                                    />
                                    <mesh
                                        name="Cube 7"
                                        geometry={nodes['Cube 7'].geometry}
                                        material={materials['Cube 7 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-22.5, 0, 4.87]}
                                    />
                                    <mesh
                                        name="Cube 6"
                                        geometry={nodes['Cube 6'].geometry}
                                        material={materials['Cube 6 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-21.58, 0, 1.58]}
                                    />
                                    <mesh
                                        name="Cube 5"
                                        geometry={nodes['Cube 5'].geometry}
                                        material={materials['Cube 5 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-22.05, 0, -1.68]}
                                    />
                                    <mesh
                                        name="Cube 4"
                                        geometry={nodes['Cube 4'].geometry}
                                        material={materials['Cube 4 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-23.1, 0, -4.91]}
                                    />
                                    <mesh
                                        name="Cube 3"
                                        geometry={nodes['Cube 3'].geometry}
                                        material={materials['Cube 3 Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-23.21, 0, -8.17]}
                                    />
                                </group>
                                <mesh
                                    name="screen"
                                    geometry={nodes.screen.geometry}
                                    material={materials['screen Material']}
                                    castShadow
                                    receiveShadow
                                    position={[-0.08, 7.93, -18.01]}
                                    rotation={[-Math.PI / 9, 0, 0]}
                                />
                                <mesh
                                    name="Cube 29"
                                    geometry={nodes['Cube 29'].geometry}
                                    material={materials['Cube 29 Material']}
                                    castShadow
                                    receiveShadow
                                    position={[0, 6.93, -19.11]}
                                    rotation={[1.22, 0, 0]}
                                />
                                <mesh
                                    name="Boolean1"
                                    geometry={nodes.Boolean1.geometry}
                                    material={materials['Boolean1 Material']}
                                    castShadow
                                    receiveShadow
                                    position={[0, -12.15, 0.89]}
                                >
                                    <mesh
                                        name="Cube 31"
                                        geometry={nodes['Cube 31'].geometry}
                                        material={materials['Cube 31 Material']}
                                        visible={false}
                                        castShadow
                                        receiveShadow
                                        position={[0, 1.5, 0]}
                                    />
                                    <mesh
                                        name="Cube2"
                                        geometry={nodes.Cube2.geometry}
                                        material={materials['Cube2 Material']}
                                        visible={false}
                                        castShadow
                                        receiveShadow
                                        position={[0, 0, 6]}
                                    />
                                </mesh>
                            </group>
                            <group name="desk" position={[20, 57, -132]}>
                                <mesh
                                    name="Cube 51"
                                    geometry={nodes['Cube 51'].geometry}
                                    material={materials['Cube 51 Material']}
                                    castShadow
                                    receiveShadow
                                    position={[0, 39, 0]}
                                />
                                <mesh
                                    name="Cube 41"
                                    geometry={nodes['Cube 41'].geometry}
                                    material={materials['Cube 41 Material']}
                                    castShadow
                                    receiveShadow
                                    position={[-60, -3, 32]}
                                />
                                <mesh
                                    name="Cube 32"
                                    geometry={nodes['Cube 32'].geometry}
                                    material={materials['Cube 32 Material']}
                                    castShadow
                                    receiveShadow
                                    position={[60, -3, 32]}
                                />
                                <mesh
                                    name="Cube 210"
                                    geometry={nodes['Cube 210'].geometry}
                                    material={materials['Cube 210 Material']}
                                    castShadow
                                    receiveShadow
                                    position={[60, -3, -36]}
                                />
                                <mesh
                                    name="Cube3"
                                    geometry={nodes.Cube3.geometry}
                                    material={materials['Cube3 Material']}
                                    castShadow
                                    receiveShadow
                                    position={[-60, -3, -36]}
                                />
                            </group>
                            <mesh
                                name="rack"
                                geometry={nodes.rack.geometry}
                                material={materials['rack Material']}
                                castShadow
                                receiveShadow
                                position={[15.87, 240, -178]}
                            />
                            <group name="paint 2" position={[-184, 240, -100.39]}>
                                <mesh
                                    name="Rectangle1"
                                    geometry={nodes.Rectangle1.geometry}
                                    material={materials['Rectangle1 Material']}
                                    castShadow
                                    receiveShadow
                                    position={[1, 0.21, 0.06]}
                                    rotation={[0, Math.PI / 2, 0]}
                                />
                                <mesh
                                    name="Boolean 21"
                                    geometry={nodes['Boolean 21'].geometry}
                                    material={materials['Boolean 21 Material']}
                                    castShadow
                                    receiveShadow
                                    position={[2, 0, 0]}
                                >
                                    <mesh
                                        name="Cube 219"
                                        geometry={nodes['Cube 219'].geometry}
                                        material={materials['Cube 219 Material']}
                                        visible={false}
                                        castShadow
                                        receiveShadow
                                    />
                                    <mesh
                                        name="Cube4"
                                        geometry={nodes.Cube4.geometry}
                                        material={materials['Cube4 Material']}
                                        visible={false}
                                        castShadow
                                        receiveShadow
                                        position={[-2, 0, 0]}
                                    />
                                </mesh>
                            </group>
                            <group name="paint" position={[-184, 240, 76.43]}>
                                <mesh
                                    name="Rectangle2"
                                    geometry={nodes.Rectangle2.geometry}
                                    material={materials['Rectangle2 Material']}
                                    castShadow
                                    receiveShadow
                                    position={[1, 0.21, 0.06]}
                                    rotation={[0, Math.PI / 2, 0]}
                                />
                                <mesh
                                    name="Boolean 22"
                                    geometry={nodes['Boolean 22'].geometry}
                                    material={materials['Boolean 22 Material']}
                                    castShadow
                                    receiveShadow
                                    position={[2, 0, 0]}
                                >
                                    <mesh
                                        name="Cube 220"
                                        geometry={nodes['Cube 220'].geometry}
                                        material={materials['Cube 220 Material']}
                                        visible={false}
                                        castShadow
                                        receiveShadow
                                    />
                                    <mesh
                                        name="Cube5"
                                        geometry={nodes.Cube5.geometry}
                                        material={materials['Cube5 Material']}
                                        visible={false}
                                        castShadow
                                        receiveShadow
                                        position={[-2, 0, 0]}
                                    />
                                </mesh>
                            </group>
                            <mesh
                                name="box"
                                geometry={nodes.box.geometry}
                                material={materials['box Material']}
                                castShadow
                                receiveShadow
                                position={[1, 200, 4]}
                            />
                            <directionalLight
                                name="Directional Light"
                                castShadow
                                intensity={0.7}
                                shadow-mapSize-width={1024}
                                shadow-mapSize-height={1024}
                                shadow-camera-near={-10000}
                                shadow-camera-far={100000}
                                shadow-camera-left={-500}
                                shadow-camera-right={500}
                                shadow-camera-top={500}
                                shadow-camera-bottom={-500}
                                position={[200, 385.6, 465.02]}
                            />
                            <PerspectiveCamera
                                name="1"
                                makeDefault={true}
                                far={100000}
                                near={5}
                                fov={45}
                                position={[660.93, 400.81, -423.3]}
                                rotation={[-2.44, 1, 2.53]}
                            />
                            <hemisphereLight
                                name="Default Ambient Light"
                                intensity={0.75}
                                color="#eaeaea"
                                position={[0, 1, 0]}
                            />
                        </group>
                    </Suspense>

                    <OrbitControls />
                </Fragment>
            </Canvas>
        </div>
    )
}

export default Test
