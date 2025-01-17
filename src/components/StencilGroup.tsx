import {
  AlwaysStencilFunc,
  BackSide,
  DecrementStencilOp,
  DoubleSide,
  FrontSide,
  IncrementStencilOp,
  NotEqualStencilFunc,
  Plane,
  ReplaceStencilOp,
  Vector3,
} from 'three';

interface Props {
  clippingPlanes: Plane[];
  width: number;
  height: number;
  boxPosition: Vector3;
  renderOrder: number;
  color: string;
}

const StencilGroup = ({
  clippingPlanes,
  width,
  height,
  boxPosition,
  renderOrder,
  color,
}: Props) => {
  return (
    <group>
      <mesh position={boxPosition} renderOrder={renderOrder}>
        <boxGeometry args={[width, height, height]} />
        <meshBasicMaterial
          side={BackSide}
          {...baseStencilSettings}
          stencilFail={IncrementStencilOp}
          stencilZPass={IncrementStencilOp}
          stencilZFail={IncrementStencilOp}
          clippingPlanes={clippingPlanes}
        />
      </mesh>
      <mesh position={boxPosition} renderOrder={renderOrder}>
        <boxGeometry args={[width, height, height]} />
        <meshBasicMaterial
          side={FrontSide}
          {...baseStencilSettings}
          stencilFail={DecrementStencilOp}
          stencilZPass={DecrementStencilOp}
          stencilZFail={DecrementStencilOp}
          clippingPlanes={clippingPlanes}
        />
      </mesh>
      <mesh position={boxPosition} renderOrder={renderOrder + 0.1}>
        <boxGeometry args={[width, height, height]} />
        <meshBasicMaterial
          color={color}
          depthTest={false}
          stencilWrite={true}
          side={DoubleSide}
          stencilRef={0}
          stencilFunc={NotEqualStencilFunc}
          stencilFail={ReplaceStencilOp}
          stencilZFail={ReplaceStencilOp}
          stencilZPass={ReplaceStencilOp}
          clippingPlanes={clippingPlanes}
        />
      </mesh>
    </group>
  );
};

const baseStencilSettings = {
  depthWrite: false,
  depthTest: false,
  colorWrite: false,
  stencilWrite: true,
  stencilFunc: AlwaysStencilFunc,
  stencilRef: 1,
};

export default StencilGroup;
