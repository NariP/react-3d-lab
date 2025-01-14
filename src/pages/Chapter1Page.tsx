import { useRef, useState } from 'react';
import { OrbitControls, PerspectiveCamera, Text, useTexture } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Chapter1Page = () => {
  return (
    <div className="p-4 border border-gray-300 size-full">
      <Canvas shadows={false} className="size-full">
        <Scene />
      </Canvas>
    </div>
  );
};

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform vec3 baseColor;
  varying vec2 vUv;
  void main() {
    vec3 color = baseColor;
    color.r *= sin(time + vUv.x * 3.14) * 0.5 + 0.5;
    gl_FragColor = vec4(color, 1.0);
  }
`;

// 애니메이팅되는 구체 컴포넌트
function AnimatedSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniformsRef = useRef({
    time: { value: 0 },
    baseColor: { value: new THREE.Color(0xff0000) },
  });

  useFrame((_state, delta) => {
    if (!meshRef.current || !uniformsRef.current) {
      return null;
    }
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.2;
    uniformsRef.current.time.value += delta;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial
        uniforms={uniformsRef.current}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

// 텍스처가 적용된 큐브 컴포넌트
function TexturedCube({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture('https://placehold.co/64x64/82abed/FFFFFF/png'); // 예제용 플레이스홀더 텍스처

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

// 그룹으로 묶인 여러 개의 원기둥
function CylinderGroup({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(_state => {
    if (!groupRef.current) {
      return null;
    }
    groupRef.current.rotation.y += 0.01;
  });

  return (
    <group ref={groupRef} position={position}>
      {[0, 1, 2, 3].map(i => (
        <mesh
          key={i}
          position={[Math.cos((i * Math.PI) / 2) * 2, 0, Math.sin((i * Math.PI) / 2) * 2]}
        >
          <cylinderGeometry args={[0.2, 0.2, 2]} />
          <meshPhongMaterial color="#00ff00" />
        </mesh>
      ))}
    </group>
  );
}

// 마우스 인터랙션이 가능한 평면
function InteractivePlane({ position }: { position: [number, number, number] }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <mesh
      position={position}
      scale={clicked ? 1.5 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      <planeGeometry args={[2, 2]} />
      <meshStandardMaterial color={hovered ? '#ff0000' : '#ffffff'} side={THREE.DoubleSide} />
    </mesh>
  );
}

const Scene = () => {
  return (
    <>
      {/* 카메라 */}
      <PerspectiveCamera makeDefault position={[0, 2, 10]} />
      {/* 조명 */}
      <ambientLight intensity={0.5} />
      <directionalLight castShadow position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 5, -5]} intensity={0.5} />
      {/* 오브젝트들 */}
      <AnimatedSphere position={[-4, 2, 0]} />
      <TexturedCube position={[0, 2, 0]} />
      <CylinderGroup position={[4, 1, 0]} />
      <InteractivePlane position={[0, -1, 0]} />
      {/* 텍스트 */}
      <Text position={[0, 4, 0]} fontSize={0.5} color="black">
        이건 텍스트 object 에요
      </Text>
      {/* 컨트롤 */}
      <OrbitControls />
    </>
  );
};

export default Chapter1Page;
