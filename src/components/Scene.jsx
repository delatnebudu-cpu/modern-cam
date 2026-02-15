import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, GizmoHelper, GizmoViewport } from '@react-three/drei';
import Toolpath from './Toolpath';

const Scene = ({ entities, selectedId, onSelectEntity }) => {
  return (
    <div className="w-full h-full bg-black">
      <Canvas
        camera={{ position: [200, 200, 200], fov: 45, near: 1, far: 2000 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[100, 100, 100]} />

        <Grid 
          infiniteGrid 
          fadeDistance={1000} 
          cellSize={10} 
          sectionSize={100} 
          sectionColor="#333" 
          cellColor="#111" 
        />

        <axesHelper args={[100]} />
        <OrbitControls makeDefault />

        {/* Vykreslení všech entit */}
        {entities.map(entity => (
          <Toolpath
            key={entity.id}
            entity={entity}
            isSelected={entity.id === selectedId}
            onClick={onSelectEntity}
          />
        ))}

        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport axisColors={['#ff4d4d', '#4dff4d', '#4d4dff']} labelColor="white" />
        </GizmoHelper>
      </Canvas>
    </div>
  );
};

export default Scene;
