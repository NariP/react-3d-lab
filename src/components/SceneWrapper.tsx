import { ReactNode } from 'react';
import { PerspectiveCamera, Stats, Text } from '@react-three/drei';
import { Canvas, Vector3 } from '@react-three/fiber';

interface Props {
  title: string;
  children?: ReactNode;
}

const SceneWrapper = ({ title, children }: Props) => {
  return (
    <div className="h-screen w-full">
      <Canvas
        shadows
        dpr={[1, 1.75]}
        camera={{ position: [0, 1.3, 3], fov: 36 }}
        className="w-full h-full"
        gl={{
          powerPreference: 'high-performance',
          localClippingEnabled: true,
          autoClearStencil: true,
        }}
      >
        <color attach="background" args={['#ffffff']} />
        {/* 카메라 */}
        <PerspectiveCamera makeDefault position={[0, 2, 10]} />
        {/* 조명 */}
        <ambientLight intensity={0.75} />
        <spotLight
          castShadow
          position={[2, 3, 3]}
          angle={Math.PI / 5}
          penumbra={0.2}
          intensity={60}
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={3}
          shadow-camera-far={10}
        />
        <directionalLight
          castShadow
          position={[0, 3, 0]}
          intensity={3}
          color="#55505a"
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={1}
          shadow-camera-far={10}
          shadow-camera-right={1}
          shadow-camera-left={-1}
          shadow-camera-top={1}
          shadow-camera-bottom={-1}
        />
        {/* 오브젝트 들 */}
        {children}
        <Ground position={[0, -0.8, 0]} />
        {/* 텍스트 */}
        <Text position={[0, 4, 0]} fontSize={0.5} color="black" fontWeight="bold">
          {title}
        </Text>
        <Stats />
      </Canvas>
    </div>
  );
};

const Ground = ({ position }: { position: Vector3 | undefined }) => {
  return (
    <mesh receiveShadow rotation-x={-Math.PI / 2} position={position}>
      <planeGeometry args={[9, 9]} />
      <meshPhongMaterial color="#a0adaf" shininess={150} />
    </mesh>
  );
};

export default SceneWrapper;
