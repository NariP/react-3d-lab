import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Html, PerspectiveCamera, TransformControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';

interface ExampleProps {
  position: [number, number, number];
}

// 1. Clipping Example
export const ClippingExample: React.FC<ExampleProps> = ({ position }) => {
  const planeRef = useRef<THREE.Mesh>(null);

  const clippingPlane = useMemo(() => {
    console.log('Creating clipping plane');
    return new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0);
  }, []);

  const planeGeometry = useMemo(() => {
    return new THREE.PlaneGeometry(4, 4);
  }, []);

  const boxGeometry = useMemo(() => {
    return new THREE.BoxGeometry(2, 2, 2);
  }, []);

  // 디버깅을 위한 useEffect 추가
  useEffect(() => {
    if (!planeRef.current) return;

    // 초기 위치 로깅
    console.log('Initial plane position:', planeRef.current.position);
    console.log('Initial clipping plane constant:', clippingPlane.constant);
    console.log('Clipping plane normal:', clippingPlane.normal);

    // plane의 위치가 변경될 때마다 constant 업데이트
    const updatePlaneConstant = () => {
      if (planeRef.current) {
        clippingPlane.constant = -planeRef.current.position.x;
        console.log('Updated plane position:', planeRef.current.position);
        console.log('Updated clipping constant:', clippingPlane.constant);
      }
    };

    // Mesh의 position이 변경될 때마다 호출되도록 설정
    planeRef.current.position.setX(0); // 초기 위치 설정
    const mesh = planeRef.current;

    // matrixWorldNeedsUpdate를 true로 설정하여 위치 업데이트가 제대로 반영되도록 함
    mesh.matrixWorldNeedsUpdate = true;

    // updatePlaneConstant 호출
    updatePlaneConstant();
  }, [clippingPlane]);

  return (
    <group position={position}>
      <mesh geometry={boxGeometry}>
        <meshStandardMaterial
          color="pink"
          side={THREE.DoubleSide}
          clippingPlanes={[clippingPlane]}
          transparent={true} // 디버깅을 위해 transparent 추가
          opacity={0.5} // 디버깅을 위해 약간 투명하게 설정
        />
      </mesh>

      <mesh
        ref={planeRef}
        geometry={planeGeometry}
        rotation={[0, Math.PI / 2, 0]}
        position={[0, 0, 0]} // 명시적으로 초기 위치 설정
      >
        <meshBasicMaterial transparent color="yellow" opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// 2. Face Highlighting Example
export const FaceHighlightExample: React.FC<ExampleProps> = ({ position }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry />
      <meshStandardMaterial
        color={hovered ? 'hotpink' : 'orange'}
        emissive={hovered ? 'pink' : 'black'}
        emissiveIntensity={hovered ? 0.5 : 0}
      />
    </mesh>
  );
};

// 3. 2D Image Overlay Example
export const TextureExample: React.FC<ExampleProps> = ({ position }) => {
  const texture = useLoader(TextureLoader, '/penguinWithHardHat.png');

  return (
    <mesh position={position}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

// 4. Transparent Face Example
export const TransparentExample: React.FC<ExampleProps> = ({ position }) => {
  return (
    <mesh position={position}>
      <boxGeometry />
      <meshStandardMaterial transparent color="skyblue" opacity={0.5} />
    </mesh>
  );
};

// 5. HTML Annotation Example
export const AnnotationExample: React.FC<ExampleProps> = ({ position }) => {
  return (
    <mesh position={position}>
      <boxGeometry />
      <meshStandardMaterial color="green" />
      <Html position={[0, 1.2, 0]} className="pointer-events-none">
        <div className="bg-white p-2 rounded shadow-lg text-sm">HTML Annotation</div>
      </Html>
    </mesh>
  );
};

// 6. Multiple Views Example
export const MultipleViewsExample: React.FC<ExampleProps> = ({ position }) => {
  return (
    <mesh position={position}>
      <boxGeometry />
      <meshStandardMaterial color="purple" />
      <PerspectiveCamera makeDefault={false} position={[0, 0, 5]} rotation={[0, Math.PI / 4, 0]} />
    </mesh>
  );
};
