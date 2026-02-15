import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import DxfParser from 'dxf-parser';

const FileHandler = ({ onDataParsed }) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const fileContent = reader.result;
        const parser = new DxfParser();
        try {
          const dxf = parser.parseSync(fileContent);
          console.log("DXF Data:", dxf);
          
          const points = [];
          dxf.entities.forEach(entity => {
            if (entity.type === 'LINE') {
              points.push({ x: entity.vertices[0].x, y: entity.vertices[0].y, z: 0 });
              points.push({ x: entity.vertices[1].x, y: entity.vertices[1].y, z: 0 });
            }
          });
          
          onDataParsed(points);
        } catch (err) {
          console.error("Chyba při čtení DXF:", err);
        }
      };
      reader.readAsText(file);
    });
  }, [onDataParsed]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    noClick: true,
    accept: { 'image/vnd.dxf': ['.dxf'] } 
  });

  return (
    <div {...getRootProps()} className="absolute inset-0 z-20">
      <input {...getInputProps()} />
      {isDragActive && (
        <div className="absolute inset-0 bg-blue-600/20 border-4 border-dashed border-blue-500 flex items-center justify-center backdrop-blur-sm">
          <p className="text-white font-bold text-xl">Pusťte DXF soubor zde</p>
        </div>
      )}
    </div>
  );
};

export default FileHandler;
