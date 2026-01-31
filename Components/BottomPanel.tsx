
import React, { useRef } from 'react';
import { Tileset } from '../types';
import { UploadIcon } from './icons/EditorIcons';

interface BottomPanelProps {
    tilesets: Tileset[];
    onAddTileset: (file: File) => void;
}

const BottomPanel: React.FC<BottomPanelProps> = ({ tilesets, onAddTileset }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onAddTileset(file);
        }
    };
    
    return (
        <div className="h-48 flex-shrink-0 bg-gray-200 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 p-2 flex flex-col">
            <div className="flex items-center space-x-2 border-b border-gray-300 dark:border-gray-700 pb-1 mb-2">
                <button className="text-sm px-3 py-1 bg-gray-300 dark:bg-gray-800 border-b-2 border-blue-500">Project</button>
                <button className="text-sm px-3 py-1 text-gray-500 dark:text-gray-400">Console</button>
            </div>
            <div className="flex-1 overflow-x-auto flex items-start space-x-4 p-2">
                <button 
                    onClick={handleUploadClick}
                    className="flex flex-col items-center justify-center w-24 h-24 flex-shrink-0 bg-gray-300 dark:bg-gray-800 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-400"
                >
                    <UploadIcon className="w-8 h-8 mb-1" />
                    <span className="text-xs text-center">Import Tileset</span>
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />
                {tilesets.map(tileset => (
                    <div key={tileset.id} className="flex flex-col items-center flex-shrink-0 w-24" title={tileset.name}>
                        <div className="w-20 h-20 bg-gray-400 dark:bg-gray-700 rounded-md overflow-hidden flex items-center justify-center">
                            <img src={tileset.src} alt={tileset.name} className="object-contain max-w-full max-h-full" />
                        </div>
                        <p className="text-xs mt-1 truncate w-full text-center">{tileset.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BottomPanel;
