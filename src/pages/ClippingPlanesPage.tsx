import { ReactNode, forwardRef, useRef, useState } from 'react';
import { Base, Geometry, Subtraction } from '@react-three/csg';
import { DragControls, OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import {
  ArrowHelper as ArrowHelperImp,
  DoubleSide,
  Group,
  Mesh,
  Object3D,
  Plane,
  Vector3,
} from 'three';
// https://stackoverflow.com/questions/68462419/three-js-breaks-when-trying-to-import-orbitcontrols-js
// https://github.com/pmndrs/drei/issues/730 ref type
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import Gizmo from '@/components/Gizmo';
import SceneWrapper from '@/components/SceneWrapper';
import StencilGroup from '@/components/StencilGroup';

const ClippingPlanesPage = () => {
  return (
    <div className="relative">
      <SceneWrapper title="Clipping Planes">
        <ClippingPlaneExample />
        <OrbitControls makeDefault target={[0, 1, 0]} />
        <Gizmo margin={[80, 160]} />
      </SceneWrapper>
    </div>
  );
};

interface BoxProps {
  clippingPlane: Plane;
}

// 박스 관련 상수
const BOX_SIZE = 0.8;
const BOX_Y_POSITION = 0.8;

// 박스의 y축 범위 계산
const BOX_TOP = BOX_Y_POSITION + BOX_SIZE / 2; // 1.2
// const BOX_BOTTOM = BOX_Y_POSITION - BOX_SIZE / 2; // 0.4

// Clipping plane 설정
const CLIP_NORMAL = new Vector3(0, -1, 0);

const Box = forwardRef<Mesh, BoxProps>(({ clippingPlane }, ref) => {
  const meshRef = useRef<Mesh | null>(null);

  return (
    <mesh
      castShadow
      position={[0, BOX_Y_POSITION, 0]}
      ref={el => {
        if (meshRef.current) {
          meshRef.current = el;
        }

        if (typeof ref === 'function') {
          ref(el);
        } else if (ref) {
          ref.current = el;
        }
      }}
    >
      <boxGeometry args={[BOX_SIZE, BOX_SIZE, BOX_SIZE]} />
      <meshPhongMaterial
        clipShadows
        alphaToCoverage
        color="#80ee10"
        shininess={100}
        side={DoubleSide}
        clippingPlanes={[clippingPlane]}
      />
    </mesh>
  );
});

Box.displayName = 'Box';

interface DragHandlerProps {
  plane: Plane;
  children: ReactNode;
}

const copyPosition = (target: Object3D, plane: Plane) => {
  const planePosition = plane.normal.clone().multiplyScalar(-plane.constant);
  target.position.copy(planePosition);
};

const copyRotation = (target: Object3D, plane: Plane) => {
  target.lookAt(plane.normal.clone().multiplyScalar(1000));
};

const DragHandler = ({ plane, children }: DragHandlerProps) => {
  const graphicRef = useRef<Group>(null);
  const dragStartConstantRef = useRef<number>(plane.constant);
  const dragStartPositionRef = useRef<Vector3>(new Vector3());

  const { controls } = useThree<{
    controls: OrbitControlsImpl; // 여기에 controls의 타입 지정
  }>();

  useFrame(() => {
    const graphic = graphicRef.current;
    if (!graphic) {
      return;
    }
    // position sync
    copyPosition(graphic, plane);

    // rotation sync
    copyRotation(graphic, plane);
  });

  return (
    <DragControls
      autoTransform={false}
      onDragStart={() => {
        const graphic = graphicRef.current;
        if (!graphic) {
          return;
        }

        if (controls) {
          controls.enabled = false;
        }

        dragStartConstantRef.current = plane.constant;
        dragStartPositionRef.current = graphic.position.clone();
      }}
      onDrag={matrix => {
        const graphic = graphicRef.current;
        if (!graphic) {
          return;
        }

        // plane 값 업데이트
        const position = new Vector3().setFromMatrixPosition(matrix);
        const positionAlongNormal = plane.normal.clone().multiplyScalar(position.dot(plane.normal));
        const nextPosition = positionAlongNormal.add(dragStartPositionRef.current);

        // Update Plane Constant
        const constant = -plane.normal.dot(nextPosition);
        plane.set(plane.normal, constant);

        // useFrame 에서 싱크를 하고 있지만 useFrame 이 모종의 이유로 실행이 안될 떄를 방지해서 추가
        copyPosition(graphic, plane);
      }}
      onDragEnd={() => {
        if (controls) {
          controls.enabled = true;
        }
      }}
    >
      <group ref={graphicRef}>
        <group rotation={[0, Math.PI, 0]}>{children}</group>
      </group>
    </DragControls>
  );
};

interface ViewProps {
  width?: number;
  height?: number;
  center?: Vector3;
  color?: number;
  renderOrder?: number;
}

const DragHandlerView = ({ width = 0, height = 0, center, color, renderOrder }: ViewProps) => {
  const arrowRef = useRef<ArrowHelperImp>(null);

  const { camera } = useThree();

  useFrame(() => {
    const arrow = arrowRef.current;
    if (!arrow) {
      return;
    }

    const scale = camera.position.distanceTo(arrow.position) / 30;
    arrow.setLength(scale, scale * 0.2, scale * 0.2);
  });

  return (
    <group position={center} renderOrder={renderOrder}>
      <mesh>
        <Geometry>
          <Base>
            <planeGeometry args={[width + 0.2, height + 0.2]} />
          </Base>
          <Subtraction>
            <planeGeometry args={[width, height]} />
          </Subtraction>
        </Geometry>
        <meshStandardMaterial transparent color={color} opacity={0.2} side={DoubleSide} />
      </mesh>
      <arrowHelper
        ref={arrowRef}
        args={[new Vector3(0, 0, 1), new Vector3(0, 0, 0), 0, color]}
        renderOrder={renderOrder}
      />
    </group>
  );
};

const clippingPlane = new Plane(CLIP_NORMAL, BOX_TOP);

const ClippingPlaneExample = () => {
  const boxRef = useRef<Mesh>(null);
  const [boxPosition, setBoxPosition] = useState<Vector3>(new Vector3());
  const positionRef = useRef(new Vector3()); // 여기서 한 번만 생성

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.getWorldPosition(positionRef.current);
      setBoxPosition(positionRef.current);
    }
  });

  return (
    <>
      <Box ref={boxRef} clippingPlane={clippingPlane} />
      <StencilGroup
        clippingPlanes={[clippingPlane]}
        width={BOX_SIZE}
        height={BOX_SIZE}
        boxPosition={boxPosition}
        color="pink"
        renderOrder={20}
      />
      <StencilGroup
        clippingPlanes={[clippingPlane]}
        width={BOX_SIZE / 2}
        height={BOX_SIZE}
        boxPosition={boxPosition}
        color="red"
        renderOrder={25}
      />
      <DragHandler plane={clippingPlane}>
        <DragHandlerView
          color={0x000000}
          center={new Vector3(0, 0, 0)}
          width={BOX_SIZE * 1.2}
          height={BOX_SIZE * 1.2}
          renderOrder={30}
        />
      </DragHandler>
    </>
  );
};

export default ClippingPlanesPage;
