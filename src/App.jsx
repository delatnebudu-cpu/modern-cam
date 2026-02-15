import React, { useState } from 'react';
import Scene from './components/Scene';
import FileHandler from './components/FileHandler';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';

const App = () => {
  const [entities, setEntities] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [toolSettings, setToolSettings] = useState({
    diameter: 3.175,
    safeZ: 5.0,
    feedRate: 1200
  });

  const handleDataParsed = (newPoints) => {
    const newEntity = {
      id: Date.now(),
      points: newPoints,
      depth: 3.0,
      type: 'outside'
    };
    setEntities([...entities, newEntity]);
  };

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
          <span className="ml-4 text-blue-500 uppercase">M1 Native Engine Active</span>
        </div>
      </main>
      <Sidebar 
        selectedEntity={entities.find(e => e.id === selectedId)} 
        toolSettings={toolSettings}
        onSettingsChange={setToolSettings}
      />
    </div>
  );
};

export default App;
