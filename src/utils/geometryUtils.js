/**
 * BASIC OFFSET CALCULATION
 */
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

/**
 * POLYGON OFFSET (pro uzavřené tvary)
 */
export const calculatePolygonOffset = (points, distance, side = 'outside') => {
  const offsetPoints = [];
  const n = points.length;
  
  for (let i = 0; i < n; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    
    const offsetSide = side === 'outside' ? 'right' : 'left';
    const [op1, op2] = calculateLineOffset(p1, p2, distance, offsetSide);
    
    offsetPoints.push(op1);
  }
  
  return offsetPoints;
};

/**
 * POCKETING - Spirálové vyfrézování kapsy
 */
export const generatePocketToolpath = (boundary, toolDiameter, stepover = 0.5) => {
  const paths = [];
  const offset = toolDiameter / 2;
  const step = toolDiameter * stepover;
  
  let currentBoundary = [...boundary];
  let currentOffset = offset;
  
  while (currentBoundary.length > 3) {
    try {
      currentBoundary = calculatePolygonOffset(currentBoundary, step, 'inside');
      if (currentBoundary.length > 0) {
        paths.push([...currentBoundary]);
      }
      currentOffset += step;
    } catch (e) {
      break; // Kapsa je vyfrézována
    }
  }
  
  return paths;
};

/**
 * TROCHOIDAL MILLING - Kruhové pohyby pro hluboké řezy
 */
export const generateTrochoidalPath = (startPoint, endPoint, toolDiameter, stepover = 0.3) => {
  const path = [];
  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  const radius = toolDiameter * stepover;
  const steps = Math.ceil(distance / (radius * 2));
  
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const cx = startPoint.x + dx * t;
    const cy = startPoint.y + dy * t;
    
    // Vytvoř kruhový pohyb
    for (let angle = 0; angle < 360; angle += 30) {
      const rad = (angle * Math.PI) / 180;
      path.push({
        x: cx + Math.cos(rad) * radius,
        y: cy + Math.sin(rad) * radius,
        z: 0
      });
    }
  }
  
  return path;
};

/**
 * DRILLING - Generování vrtacích cyklů
 */
export const generateDrillPath = (point, depth, safeZ, peckDepth = null) => {
  const gcode = [];
  
  gcode.push(`G0 Z${safeZ}`);
  gcode.push(`G0 X${point.x.toFixed(3)} Y${point.y.toFixed(3)}`);
  
  if (peckDepth) {
    // Pecking cycle (pro hluboké díry)
    let currentDepth = 0;
    while (currentDepth > depth) {
      currentDepth = Math.max(currentDepth - peckDepth, depth);
      gcode.push(`G1 Z${currentDepth.toFixed(3)} F100`);
      gcode.push(`G0 Z${safeZ}`);
    }
  } else {
    // Simple drilling
    gcode.push(`G1 Z${depth.toFixed(3)} F100`);
  }
  
  gcode.push(`G0 Z${safeZ}`);
  return gcode.join('\n');
};

/**
 * HOLDING TABS - Přidání přidržovacích můstků
 */
export const addHoldingTabs = (points, tabCount = 4, tabWidth = 5, tabHeight = 2) => {
  const totalLength = points.reduce((sum, p, i) => {
    if (i === 0) return 0;
    const prev = points[i - 1];
    return sum + Math.sqrt((p.x - prev.x) ** 2 + (p.y - prev.y) ** 2);
  }, 0);
  
  const tabInterval = totalLength / tabCount;
  const modifiedPoints = [];
  let currentLength = 0;
  let nextTabAt = tabInterval;
  
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    const segmentLength = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
    
    if (currentLength + segmentLength >= nextTabAt) {
      // Přidej tab zde
      const tabStart = nextTabAt - currentLength;
      const t1 = tabStart / segmentLength;
      const t2 = (tabStart + tabWidth) / segmentLength;
      
      modifiedPoints.push(p1);
      modifiedPoints.push({
        x: p1.x + (p2.x - p1.x) * t1,
        y: p1.y + (p2.y - p1.y) * t1,
        z: tabHeight // Zvedni nástroj
      });
      modifiedPoints.push({
        x: p1.x + (p2.x - p1.x) * t2,
        y: p1.y + (p2.y - p1.y) * t2,
        z: tabHeight
      });
      
      nextTabAt += tabInterval;
    } else {
      modifiedPoints.push(p1);
    }
    
    currentLength += segmentLength;
  }
  
  modifiedPoints.push(points[points.length - 1]);
  return modifiedPoints;
};

/**
 * LEAD-IN/LEAD-OUT - Plynulý nájezd a odjezd
 */
export const addLeadInOut = (points, leadDistance = 5, leadType = 'arc') => {
  if (points.length < 2) return points;
  
  const modifiedPoints = [...points];
  const p1 = points[0];
  const p2 = points[1];
  
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  
  if (leadType === 'arc') {
    // Kruhový nájezd
    const angle = Math.atan2(dy, dx);
    const leadIn = {
      x: p1.x - Math.cos(angle) * leadDistance,
      y: p1.y - Math.sin(angle) * leadDistance,
      z: p1.z
    };
    modifiedPoints.unshift(leadIn);
  } else {
    // Lineární nájezd
    const leadIn = {
      x: p1.x - (dx / len) * leadDistance,
      y: p1.y - (dy / len) * leadDistance,
      z: p1.z
    };
    modifiedPoints.unshift(leadIn);
  }
  
  return modifiedPoints;
};

/**
 * G-CODE GENERATION - Rozšířená verze
 */
export const generateGCode = (entity, toolSettings) => {
  const { points, type, depth } = entity;
  const { diameter, safeZ, feedRate, spindleSpeed, plungeRate } = toolSettings;
  
  let gcode = [];
  
  // Header
  gcode.push('; Generated by OpenCAM');
  gcode.push('; Tool Diameter: ' + diameter + 'mm');
  gcode.push('G21 ; mm mode');
  gcode.push('G90 ; Absolute positioning');
  gcode.push(`M3 S${spindleSpeed || 18000} ; Spindle on`);
  gcode.push('G4 P2 ; Wait 2 seconds');
  gcode.push('');
  
  // Vypočítej offset podle typu
  let toolpath = points;
  const offset = diameter / 2;
  
  if (type === 'outside') {
    toolpath = calculatePolygonOffset(points, offset, 'outside');
  } else if (type === 'inside') {
    toolpath = calculatePolygonOffset(points, offset, 'inside');
  } else if (type === 'pocket') {
    const pocketPaths = generatePocketToolpath(points, diameter);
    toolpath = pocketPaths.flat();
  }
  
  // Přidej lead-in
  toolpath = addLeadInOut(toolpath, diameter * 1.5);
  
  // Přidej holding tabs (pokud je to vnější řez)
  if (type === 'outside') {
    toolpath = addHoldingTabs(toolpath, 4, diameter * 2, 1);
  }
  
  // Generuj dráhu
  gcode.push(`G0 Z${safeZ} ; Safe height`);
  
  toolpath.forEach((p, index) => {
    if (index === 0) {
      gcode.push(`G0 X${p.x.toFixed(3)} Y${p.y.toFixed(3)} ; Rapid to start`);
      gcode.push(`G1 Z${-Math.abs(depth).toFixed(3)} F${plungeRate || feedRate/2} ; Plunge`);
    } else {
      const z = p.z !== undefined ? p.z : -Math.abs(depth);
      gcode.push(`G1 X${p.x.toFixed(3)} Y${p.y.toFixed(3)} Z${z.toFixed(3)} F${feedRate}`);
    }
  });
  
  // Footer
  gcode.push('');
  gcode.push(`G0 Z${safeZ} ; Retract`);
  gcode.push('M5 ; Spindle off');
  gcode.push('G0 X0 Y0 ; Return to origin');
  gcode.push('M2 ; End program');
  
  return gcode.join('\n');
};

/**
 * DETECT PATH TYPE - Automatická detekce typu dráhy
 */
export const detectPathType = (points) => {
  if (points.length < 3) return 'center';
  
  // Zkontroluj, jestli je uzavřený
  const first = points[0];
  const last = points[points.length - 1];
  const distance = Math.sqrt((last.x - first.x) ** 2 + (last.y - first.y) ** 2);
  
  if (distance < 0.1) {
    // Uzavřený tvar - určíme podle směru
    const area = calculatePolygonArea(points);
    return area > 0 ? 'outside' : 'inside';
  }
  
  return 'center'; // Otevřená dráha
};

/**
 * CALCULATE POLYGON AREA (pro detekci směru)
 */
const calculatePolygonArea = (points) => {
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % points.length];
    area += (p1.x * p2.y - p2.x * p1.y);
  }
  return area / 2;
};

/**
 * V-CARVE - Výpočet dráhy pro V-bit
 */
export const generateVCarve = (points, vAngle = 90, maxDepth = 5) => {
  // Zjednodušená implementace
  // V reálu by se použil Voronoi diagram pro výpočet mediální osy
  const paths = [];
  const angleRad = (vAngle * Math.PI) / 180;
  
  for (let depth = 0.5; depth <= maxDepth; depth += 0.5) {
    const offset = depth * Math.tan(angleRad / 2);
    const offsetPath = calculatePolygonOffset(points, offset, 'inside');
    paths.push(offsetPath.map(p => ({ ...p, z: -depth })));
  }
  
  return paths;
};
