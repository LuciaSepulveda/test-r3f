import { SpotLight, useTexture, useVideoTexture } from '@react-three/drei'
import { editable } from '@theatre/r3f'

const EditableSpotLight = editable(SpotLight, 'spotLight')

const SpotlightComponent = ({ id, video, position }) => {
    const texture = useTexture('./colors.png')
    const textureVideo = useVideoTexture('/video.mp4')
    return (
        <EditableSpotLight
            map={video ? textureVideo : texture}
            position={position || [0, 9, -8]}
            rotation={[0, 0, 0]}
            angle={Math.PI / 5}
            penumbra={1}
            distance={80}
            intensity={10}
            // color="#ff0000"
            //ref={refLight}
            //radiusTop={0.2}
            radiusBottom={100}
            anglePower={4}
            castShadow
            theatreKey={'spotLight' + id.toString()}
        />
    )
}

export default SpotlightComponent
