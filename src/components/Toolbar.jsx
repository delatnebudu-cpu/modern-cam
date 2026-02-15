import React from 'react';
import { MousePointer2, Scissors, Box, Layers, Settings } from 'lucide-react';

const Toolbar = () => (
  <aside className="w-16 flex flex-col items-center py-4 bg-[#141414] border-r border-white/5 gap-6">
    <div className="text-blue-500 mb-4 font-bold text-xl select-none">O</div>
    <button className="p-2.5 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-900/20">
      <MousePointer2 size={20} />
    </button>
    <button className="p-2.5 rounded-xl text-gray-500 hover:bg-white/5 hover:text-white transition-all">
      <Scissors size={20} />
    </button>
    <button className="p-2.5 rounded-xl text-gray-500 hover:bg-white/5 hover:text-white transition-all">
      <Box size={20} />
    </button>
    <button className="p-2.5 rounded-xl text-gray-500 hover:bg-white/5 hover:text-white transition-all">
      <Layers size={20} />
    </button>
    <div className="mt-auto">
      <button className="p-2.5 rounded-xl text-gray-500 hover:bg-white/5">
        <Settings size={20} />
      </button>
    </div>
  </aside>
);

export default Toolbar;
