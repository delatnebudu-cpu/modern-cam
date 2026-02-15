import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import DxfParser from 'dxf-parser';

const FileHandler = ({ onDataParsed }) => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log('📂 Files dropped:', acceptedFiles.length, acceptedFiles);
    
    acceptedFiles.forEach((file) => {
      console.log('📄 Processing file:', file.name, 'type:', file.type);
      const reader = new FileReader();

      reader.onload = () => {
        const fileContent = reader.result;
        console.log('📝 File content length:', fileContent.length);
        
        const parser = new DxfParser();
        try {
          const dxf = parser.parseSync(fileContent);
          console.log('✅ DXF parsed successfully:', dxf);
          console.log('📊 Entities found:', dxf.entities.length);
          
          const points = [];
          dxf.entities.forEach(entity => {
            console.log('🔍 Entity:', entity);
            if (entity.type === 'LINE') {
              points.push({ x: entity.vertices[0].x, y: entity.vertices[0].y, z: 0 });
              points.push({ x: entity.vertices[1].x, y: entity.vertices[1].y, z: 0 });
            }
          });
          
          console.log('📍 Points extracted:', points.length, points);
          onDataParsed(points);
          console.log('✨ Data sent to parent component');
          
        } catch (err) {
          console.error("❌ Chyba při čtení DXF:", err);
        }
      };
      
      reader.onerror = (error) => {
        console.error("❌ FileReader error:", error);
      };
      
      reader.readAsText(file);
    });
  }, [onDataParsed]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ 
    onDrop,
    noClick: true,
  });

  console.log('🎨 FileHandler rendered, isDragActive:', isDragActive);

  return (
    <>
      <div {...getRootProps()} className="absolute inset-0 z-20 pointer-events-none">
        <input {...getInputProps()} />
        {isDragActive && (
          <div className="absolute inset-0 bg-blue-600/20 border-4 border-dashed border-blue-500 flex items-center justify-center backdrop-blur-sm pointer-events-auto">
            <p className="text-white font-bold text-xl">Pusťte DXF soubor zde</p>
          </div>
        )}
      </div>
      
      {/* Tlačítko pro výběr souboru */}
      <button
        onClick={open}
        className="absolute top-4 left-20 z-30 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium"
      >
        📂 Vybrat DXF soubor
      </button>
    </>
  );
};

export default FileHandler;
