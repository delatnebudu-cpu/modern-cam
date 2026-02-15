import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

const Toolpath = ({ entity, isSelected, onClick }) => {
  const { points, type, depth } = entity;
  
  const color = useMemo(() => {
    if (isSelected) return '#3b82f6'; // Modrá pro vybraný
    switch(type) {
      case 'outside': return '#00ff00'; // Zelená pro vnější
      case 'inside': return '#ff00ff';  // Magenta pro vnitřní
      case 'center': return '#ffff00';  // Žlutá pro střed
      case 'pocket': return '#00ffff';  // Cyan pro kapsu
      case 'drill': return '#ff0000';   // Červená pro vrtání
      default: return '#888888';
    }
  }, [type, isSelected]);

  const linePoints = useMemo(() => {
    return points.map(p => [p.x, p.y, p.z || 0]);
  }, [points]);

  return (
    <group onClick={(e) => {
      e.stopPropagation();
      onClick(entity.id);
    }}>
      <Line
        points={linePoints}
        color={color}
        lineWidth={isSelected ? 3 : 2}
      />
      {/* Zobraz startovní bod */}
      {points[0] && (
        <mesh position={[points[0].x, points[0].y, points[0].z || 0]}>
          <sphereGeometry args={[2, 16, 16]} />
          <meshBasicMaterial color={color} />
        </mesh>
      )}
    </group>
  );
};

export default Toolpath;
