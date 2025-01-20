import React from 'react';
import { GizmoHelper, GizmoViewport } from '@react-three/drei';
import * as THREE from 'three';

interface ViewHelperProps {
  alignment?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  margin?: [number, number];
  onViewportChange?: (self: THREE.Group<THREE.Object3DEventMap>) => void;
}

const Gizmo: React.FC<ViewHelperProps> = ({ alignment = 'bottom-right', margin = [80, 80] }) => {
  return (
    <GizmoHelper alignment={alignment} margin={margin}>
      <GizmoViewport axisColors={['#ff3653', '#0adb50', '#2c8fdf']} labelColor="black" />
    </GizmoHelper>
  );
};

export default Gizmo;
