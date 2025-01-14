import { forwardRef, useRef, useState } from 'react';
import { CameraControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas, Vector3 } from '@react-three/fiber';
import {
  AnnotationExample,
  ClippingExample,
  FaceHighlightExample,
  MultipleViewsExample,
  TextureExample,
  TransparentExample,
} from '@/components/examples/chapter2';
import ViewSelects from '@/components/ViewSelects';

const initialCameraPosition = [0, 0, 20];

const Chapter2Page = () => {
  const controlsRef = useRef<CameraControls | null>(null);

  const [viewId, setViewId] = useState(1);
  const currentView = views[viewId - 1];

  return (
    <div className="flex flex-col gap-4 h-screen p-4">
      <button
        type="button"
        onClick={() => {
          if (!controlsRef.current) return;

          setViewId(-1);
          controlsRef.current.setLookAt(
            initialCameraPosition[0],
            initialCameraPosition[1],
            initialCameraPosition[2] + 5, // 카메라 위치
            initialCameraPosition[0],
            initialCameraPosition[1],
            initialCameraPosition[2], // 타겟 위치
            true // 애니메이션 활성화
          );
        }}
      >
        reset
      </button>
      <ViewSelects
        views={views}
        viewId={viewId}
        onChangeView={currentViewId => {
          if (!controlsRef.current) return;

          setViewId(currentViewId);
          const position = views[currentViewId - 1].position;
          controlsRef.current.setLookAt(
            position[0],
            position[1] + 2,
            position[2] + 5, // 카메라 위치
            position[0],
            position[1],
            position[2], // 타겟 위치
            true // 애니메이션 활성화
          );
        }}
      />

      <div className="flex-1 relative border border-gray-300 min-h-[600px]">
        <Scene2 ref={controlsRef} />

        {/* 현재 뷰 정보 표시 */}
        {viewId >= 1 && (
          <div className="absolute bottom-0 left-4 z-10 bg-white/80 p-4 rounded-lg">
            <p className="font-medium">
              {views[viewId - 1].icon} {views[viewId - 1].title}
            </p>
            <p className="text-sm text-gray-600 indent-4">
              Position: [{currentView.position.join(', ')}]
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const views = [
  {
    title: '슬라이스 (Clipping)',
    position: [-10, 0, 0] as Vector3,
    rotation: [0, Math.PI / 2, 0],
    icon: '✂️',
    desc: (
      <>
        Three.js에서는 <b className="text-green-600">ClippingPlanes</b>을 사용하여 객체를 자를 수
        있습니다.
      </>
    ),
  },
  {
    title: '면 하이라이트 (Face Highlighting)',
    position: [0, 5, 0] as Vector3,
    rotation: [0, -Math.PI / 2, 0],
    icon: '💡',
    desc: <>객체를 선택했을 때 특정 면을 하이라이트하는 예제입니다.</>,
  },
  {
    title: '2D 이미지 오버레이',
    position: [10, 0, 0] as Vector3,
    rotation: [-Math.PI / 2, 0, 0],
    icon: '🖼️',
    desc: (
      <>
        텍스처나 스프라이트를 사용하여 3D 공간에 2D 이미지를 표시할 수 있습니다.
        <br />
        <b className="text-green-600">TextureLoader</b>를 사용하여 이미지를 로드하고, 이를
        material의 map 속성으로 적용합니다.
      </>
    ),
  },
  {
    title: '투명한 면 (Transparent Faces)',
    position: [-10, -5, 0] as Vector3,
    rotation: [Math.PI / 2, 0, 0],
    icon: '👻',
    desc: (
      <>
        특정 면의 투명도를 조절하는 예제입니다.
        <br />
        material의 transparent: true와 opacity 속성을 사용하여 투명도를 조절합니다.
      </>
    ),
  },
  {
    title: 'Annotation (주석)',
    position: [0, -5, 0] as Vector3,
    rotation: [0, 0, 0],
    icon: '📝',
    desc: (
      <>
        <b className="text-green-600">Html 컴포넌트</b>를 사용하여 3D 공간에 HTML 요소를 배치
      </>
    ),
  },
  {
    title: 'Multiple Views(다중 뷰)',
    position: [10, -5, 0] as Vector3,
    rotation: [0, Math.PI, 0],
    icon: '📦',
    desc: <>단일 WebGL 컨텍스트, ViewComponent</>,
  },
];

// eslint-disable-next-line react/display-name
const Scene2 = forwardRef<CameraControls, { className?: string }>((props, controlsRef) => {
  return (
    <div className="h-screen w-full">
      <Canvas
        className="w-full h-full absolute inset-0"
        gl={{
          powerPreference: 'high-performance',
          localClippingEnabled: true,
          autoClearStencil: true,
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        <PerspectiveCamera makeDefault position={initialCameraPosition} />
        <CameraControls ref={controlsRef} />

        <ClippingExample position={[-10, 0, 0]} />
        <FaceHighlightExample position={[0, 5, 0]} />
        <TextureExample position={[10, 0, 0]} />
        <TransparentExample position={[-10, -5, 0]} />
        <AnnotationExample position={[0, -5, 0]} />
        <MultipleViewsExample position={[10, -5, 0]} />
      </Canvas>
    </div>
  );
});
export default Chapter2Page;
