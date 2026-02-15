import React from 'react';
import { Download } from 'lucide-react';

const Sidebar = ({ selectedEntity, toolSettings, onSettingsChange }) => (
  <aside className="w-72 bg-[#141414] border-l border-white/5 flex flex-col">
    <div className="p-4 border-b border-white/5">
      <h2 className="font-semibold text-sm text-white">
        {selectedEntity ? "Detail objektu" : "Projekt"}
      </h2>
    </div>
    <div className="p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] text-gray-500 font-bold uppercase">
          Průměr frézy (mm)
        </label>
        <input 
          type="number" 
          value={toolSettings.diameter}
          onChange={(e) => onSettingsChange({...toolSettings, diameter: e.target.value})}
          className="bg-[#1f1f1f] border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none"
        />
      </div>
      <button className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-md transition-colors flex items-center justify-center gap-2 text-sm">
        <Download size={16} /> Export G-Code
      </button>
    </div>
  </aside>
);

export default Sidebar;
