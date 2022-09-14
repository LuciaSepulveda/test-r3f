/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Andrew.Mischenko (https://sketchfab.com/Andrew.Mischenko)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/cardboard-box-f43199f19c3142c68cc672db55d9a40d
title: Cardboard Box
*/

import React from 'react';
import { useGLTF } from '@react-three/drei';

const CardboardBox = (props) => {
  const { nodes, materials } = useGLTF('./models/cardboardbox/scene.gltf');
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.defaultMaterial.geometry}
            material={materials.lambert1}
          />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload('./models/cardboardbox/scene.gltf');

export default CardboardBox;
