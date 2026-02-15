import React, { useState } from 'react';
import Scene from './components/Scene';
import FileHandler from './components/FileHandler';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import { generateGCode } from './utils/geometryUtils';

const App = () => {
  const [entities, setEntities] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [toolSettings, setToolSettings] = useState({
    diameter: 3.175,
    safeZ: 5.0,
    feedRate: 1200,
    plungeRate: 600,
    spindleSpeed: 18000
  });

  const handleDataParsed = (newPoints) => {
    console.log('🎯 App received points:', newPoints.length);
    
    if (newPoints.length === 0) {
      console.warn('⚠️ No points received!');
      return;
    }
    
    const newEntity = {
      id: Date.now(),
      points: newPoints,
      depth: 3.0,
      type: 'outside'
    };
    
    console.log('✨ Creating new entity:', newEntity);
    setEntities([...entities, newEntity]);
    setSelectedId(newEntity.id);
    console.log('📊 Total entities now:', entities.length + 1);
  };

  const handleUpdateEntity = (entityId, updates) => {
    setEntities(entities.map(e => 
      e.id === entityId ? { ...e, ...updates } : e
    ));
    console.log('🔄 Entity updated:', entityId, updates);
  };

  const handleExportGCode = () => {
    const entity = entities.find(e => e.id === selectedId);
    if (!entity) {
      alert('Nejdřív vyber objekt!');
      return;
    }

    try {
      const gcode = generateGCode(entity, toolSettings);
      
      const blob = new Blob([gcode], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `toolpath_${entity.id}.gcode`;
      link.click();
      URL.revokeObjectURL(url);
      
      console.log('✅ G-Code exportován!');
    } catch (error) {
      console.error('❌ Chyba při exportu:', error);
      alert('Chyba při exportu G-Code: ' + error.message);
    }
  };

  console.log('🔄 App render - entities:', entities.length, 'selected:', selectedId);

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a]/80 text-gray-300 overflow-hidden backdrop-blur-xl">
      <Toolbar />
      
      <main className="flex-1 relative bg-black">
        <FileHandler onDataParsed={handleDataParsed} />
        <Scene 
          entities={entities} 
          selectedId={selectedId} 
          onSelectEntity={setSelectedId} 
        />
        
        <div className="absolute bottom-0 w-full h-8 bg-black/40 border-t border-white/5 px-4 flex items-center text-[10px] tracking-widest text-gray-500">
          <span>UNITS: MM</span>
          <span className="ml-4">ENTITIES: {entities.length}</span>
          {selectedId && <span className="ml-4 text-blue-500">SELECTED: #{selectedId}</span>}
          <span className="ml-auto text-blue-500 uppercase">M1 Native Engine Active</span>
        </div>
      </main>

      <Sidebar 
        selectedEntity={entities.find(e => e.id === selectedId)} 
        toolSettings={toolSettings}
        onSettingsChange={setToolSettings}
        onExportGCode={handleExportGCode}
        onUpdateEntity={handleUpdateEntity}
      />
    </div>
  );
};

export default App;
