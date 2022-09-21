import { SpotLight, useTexture, useVideoTexture } from '@react-three/drei'
import { editable } from '@theatre/r3f'

const EditableSpotLight = editable(SpotLight, 'spotLight')

const SpotlightComponent = () => {
    const texture = useTexture('./colors.png')
    const textureVideo = useVideoTexture('/video.mp4')
    return (
        <EditableSpotLight
            map={textureVideo}
            position={[0, 9, -8]}
            angle={Math.PI / 5}
            penumbra={1}
            distance={80}
            intensity={10}
            // color="#ff0000"
            //ref={refLight}
            // radiusTop={0.2}
            // radiusBottom={100}
            anglePower={4}
            castShadow
            theatreKey="spotLight"
        />
    )
}

export default SpotlightComponent
