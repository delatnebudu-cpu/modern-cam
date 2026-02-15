import React from 'react';
import { Download } from 'lucide-react';

const Sidebar = ({ selectedEntity, toolSettings, onSettingsChange, onExportGCode, onUpdateEntity }) => {
  const updateToolSettings = (key, value) => {
    onSettingsChange({ ...toolSettings, [key]: parseFloat(value) || value });
  };

  const updateEntityType = (newType) => {
    if (selectedEntity && onUpdateEntity) {
      onUpdateEntity(selectedEntity.id, { type: newType });
    }
  };

  const updateEntityDepth = (newDepth) => {
    if (selectedEntity && onUpdateEntity) {
      onUpdateEntity(selectedEntity.id, { depth: parseFloat(newDepth) });
    }
  };

  return (
    <aside className="w-72 bg-[#141414] border-l border-white/5 flex flex-col overflow-y-auto">
      <div className="p-4 border-b border-white/5">
        <h2 className="font-semibold text-sm text-white">
          {selectedEntity ? `Objekt #${selectedEntity.id}` : "Globální nastavení"}
        </h2>
      </div>
      
      <div className="p-4 flex flex-col gap-4">
        {selectedEntity ? (
          <>
            {/* Typ operace */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-gray-500 uppercase font-bold">Typ frézování</label>
              <div className="grid grid-cols-3 gap-1 bg-black/40 p-1 rounded">
                <button 
                  onClick={() => updateEntityType('outside')}
                  className={`text-[10px] py-1 rounded transition-colors ${selectedEntity.type === 'outside' ? 'bg-blue-600' : 'hover:bg-white/5'}`}
                >
                  Vnější
                </button>
                <button 
                  onClick={() => updateEntityType('inside')}
                  className={`text-[10px] py-1 rounded transition-colors ${selectedEntity.type === 'inside' ? 'bg-blue-600' : 'hover:bg-white/5'}`}
                >
                  Vnitřní
                </button>
                <button 
                  onClick={() => updateEntityType('center')}
                  className={`text-[10px] py-1 rounded transition-colors ${selectedEntity.type === 'center' ? 'bg-blue-600' : 'hover:bg-white/5'}`}
                >
                  Střed
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1 bg-black/40 p-1 rounded mt-1">
                <button 
                  onClick={() => updateEntityType('pocket')}
                  className={`text-[10px] py-1 rounded transition-colors ${selectedEntity.type === 'pocket' ? 'bg-blue-600' : 'hover:bg-white/5'}`}
                >
                  Kapsa
                </button>
                <button 
                  onClick={() => updateEntityType('drill')}
                  className={`text-[10px] py-1 rounded transition-colors ${selectedEntity.type === 'drill' ? 'bg-blue-600' : 'hover:bg-white/5'}`}
                >
                  Vrtání
                </button>
              </div>
            </div>

            {/* Hloubka řezu */}
            <InputGroup 
              label="Hloubka řezu (mm)" 
              value={selectedEntity.depth}
              onChange={(e) => updateEntityDepth(e.target.value)}
              placeholder="3.0"
            />

            {/* Holding tabs */}
            {selectedEntity.type === 'outside' && (
              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <input type="checkbox" id="tabs" className="rounded" />
                <label htmlFor="tabs" className="text-xs text-gray-400">
                  Přidržovací můstky (4x)
                </label>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Globální nastavení nástroje */}
            <InputGroup 
              label="Průměr frézy (mm)" 
              value={toolSettings.diameter}
              onChange={(e) => updateToolSettings('diameter', e.target.value)}
              placeholder="3.175"
            />
            <InputGroup 
              label="Bezpečná výška Z (mm)" 
              value={toolSettings.safeZ}
              onChange={(e) => updateToolSettings('safeZ', e.target.value)}
              placeholder="5.0"
            />
            <InputGroup 
              label="Posuv (mm/min)" 
              value={toolSettings.feedRate}
              onChange={(e) => updateToolSettings('feedRate', e.target.value)}
              placeholder="1200"
            />
            <InputGroup 
              label="Zanoření (mm/min)" 
              value={toolSettings.plungeRate}
              onChange={(e) => updateToolSettings('plungeRate', e.target.value)}
              placeholder="600"
            />
            <InputGroup 
              label="Otáčky vřetena (RPM)" 
              value={toolSettings.spindleSpeed}
              onChange={(e) => updateToolSettings('spindleSpeed', e.target.value)}
              placeholder="18000"
            />

            {/* Pokročilé možnosti */}
            <div className="pt-4 border-t border-white/5">
              <h3 className="text-[10px] text-gray-500 uppercase font-bold mb-2">
                Pokročilé
              </h3>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-xs text-gray-400">
                  <input type="checkbox" className="rounded" />
                  Trochoidal milling (kapsy)
                </label>
                <label className="flex items-center gap-2 text-xs text-gray-400">
                  <input type="checkbox" className="rounded" />
                  Lead-in/Lead-out
                </label>
                <label className="flex items-center gap-2 text-xs text-gray-400">
                  <input type="checkbox" className="rounded" />
                  Optimalizace dráhy
                </label>
              </div>
            </div>
          </>
        )}

        {/* Export tlačítko */}
        <button 
          onClick={onExportGCode}
          disabled={!selectedEntity}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-2 rounded-md transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <Download size={16} /> 
          {selectedEntity ? 'Export vybraného' : 'Vyber objekt'}
        </button>
      </div>
    </aside>
  );
};

const InputGroup = ({ label, value, onChange, placeholder }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">
      {label}
    </label>
    <input 
      type="number" 
      step="0.1"
      value={value || ''}
      onChange={onChange}
      placeholder={placeholder}
      className="bg-[#1f1f1f] border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white transition-colors shadow-inner"
    />
  </div>
);

export default Sidebar;
