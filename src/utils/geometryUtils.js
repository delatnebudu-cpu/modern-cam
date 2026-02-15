export const calculateLineOffset = (p1, p2, distance, side = 'left') => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.sqrt(dx * dx + dy * dy);

  let nx = -dy / len;
  let ny = dx / len;

  if (side === 'right') {
    nx = -nx;
    ny = -ny;
  }

  return [
    { x: p1.x + nx * distance, y: p1.y + ny * distance, z: 0 },
    { x: p2.x + nx * distance, y: p2.y + ny * distance, z: 0 }
  ];
};

export const generateGCode = (points, safeZ, cutZ, feedRate) => {
  let gcode = 'G21\nG90\n';
  
  points.forEach((p, index) => {
    if (index === 0) {
      gcode += `G0 Z${safeZ}\n`;
      gcode += `G0 X${p.x.toFixed(3)} Y${p.y.toFixed(3)}\n`;
      gcode += `G1 Z${cutZ} F${feedRate / 2}\n`;
    } else {
      gcode += `G1 X${p.x.toFixed(3)} Y${p.y.toFixed(3)} F${feedRate}\n`;
    }
  });

  gcode += `G0 Z${safeZ}\n`;
  return gcode;
};
