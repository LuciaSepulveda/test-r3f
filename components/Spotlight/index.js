import { SpotLight, useTexture, useVideoTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { editable } from '@theatre/r3f'
import { useRef, useState } from 'react'
import * as THREE from 'three'

const EditableSpotLight = editable(SpotLight, 'spotLight')

const SpotlightComponent = ({ id, video, position }) => {
    const texture = useTexture('./colors.png')
    const textureVideo = useVideoTexture('/video.mp4')
    const refLight = useRef()
    // const [target] = useState(() => new THREE.Object3D())

    // if (video) {
    //     target.position.x = -12
    //     target.position.y = 15
    //     target.position.z = -236
    // }

    return (
        <editable.group theatreKey={'spotLight rotation' + id.toString()}>
            <EditableSpotLight
                map={video ? textureVideo : texture}
                position={ position || [0, 9, -8]}
                rotation={[0, 0, 0]}
                angle={Math.PI / 5}
                penumbra={1}
                distance={80}
                intensity={10}
                // color="#ff0000"
                ref={refLight}
                //radiusTop={0.2}
                radiusBottom={100}
                anglePower={4}
                castShadow
                theatreKey={'spotLight' + id.toString()}
                //target={target}
            />
        </editable.group>
    )
}

export default SpotlightComponent
