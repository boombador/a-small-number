import React from 'react';
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshProps } from 'react-three-fiber';
import type { Mesh, Material } from 'three';

type MeshMap = { [key: string]: Mesh };
type MaterialMap = { [key: string]: Material };
type ObservedGLTF = { nodes: MeshMap; materials: MaterialMap };

// based on: https://github.com/pmndrs/react-three-fiber/blob/275bf4b14e80f4ecc87132430abefdfaa52c9d73/examples/src/demos/GltfPlanet.js
export const useGLTFData = (): ObservedGLTF => {
  // the type detected here by TypeScript was GLTF but TS also complained that
  // the type was missing the properties "materials" and "nodes", which I did
  // see while debugging in the console. I noticed some mention in the useLoader
  // docs of having special handling for gltf filetypes to return these
  // properties so I surmise that interferes with the type system

  // workaround of casting to unknown first suggested by compiler
  const mistypedGLTF = useLoader(GLTFLoader, 'models/model-data.glb') as unknown;
  return mistypedGLTF as ObservedGLTF;
};

// alternative code, probably necessary to get this working for multi-material mesh
// Usage:
//   <Asset {...meshProps} url="models/camp.glb" />
const GLTFScene: React.FC<MeshProps & { url: string }> = ({ url, ...meshProps }) => {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} {...meshProps} />;
};

export default GLTFScene;