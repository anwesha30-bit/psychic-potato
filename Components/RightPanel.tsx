
import React from 'react';
import { Tool, Tileset, SelectedTile } from '../types';
import TilemapTools from './right_panel/TilemapTools';

interface RightPanelProps {
    activeTool: Tool;
    setActiveTool: (tool: Tool) => void;
    selectedColor: string;
    onSelectColor: (color: string) => void;
    tilesets: Tileset[];
    selectedTile: SelectedTile | null;
    onSelectTile: (tile: SelectedTile) => void;
}

const RightPanel: React.FC<RightPanelProps> = (props) => {
    return (
        <aside className="w-80 flex-shrink-0 bg-gray-200 dark:bg-gray-900 p-3 border-l border-gray-300 dark:border-gray-700 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider">Inspector</h2>
            </div>
            
            <TilemapTools {...props} />
            
        </aside>
    );
};

export default RightPanel;
