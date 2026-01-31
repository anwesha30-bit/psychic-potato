
import React from 'react';
import { ViewMode, Tile, Tileset } from '../types';
import TilemapEditor from './center_panel/TilemapEditor';
import { CubeIcon } from './icons/EditorIcons';

interface CenterPanelProps {
    viewMode: ViewMode;
    gridData: Array<Tile | null>;
    tilesets: Tileset[];
    onCellPaint: (index: number) => void;
}

const CenterPanel: React.FC<CenterPanelProps> = ({ viewMode, gridData, tilesets, onCellPaint }) => {
    return (
        <div className="flex-1 bg-gray-300 dark:bg-gray-700 overflow-hidden relative">
            {viewMode === '2D' ? (
                <TilemapEditor 
                    gridData={gridData}
                    tilesets={tilesets}
                    onCellPaint={onCellPaint}
                />
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                    <CubeIcon className="w-24 h-24 mb-4" />
                    <h2 className="text-2xl font-semibold">3D View</h2>
                    <p className="text-sm">3D rendering is not implemented in this demo.</p>
                </div>
            )}
        </div>
    );
};

export default CenterPanel;
