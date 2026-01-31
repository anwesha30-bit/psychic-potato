
import React, { useState, useMemo } from 'react';
import { Tool, Tileset, SelectedTile } from '../../types';
import { DEFAULT_PALETTE } from '../../constants';
import { BrushIcon, EraserIcon } from '../icons/EditorIcons';

interface TilemapToolsProps {
    activeTool: Tool;
    setActiveTool: (tool: Tool) => void;
    selectedColor: string;
    onSelectColor: (color: string) => void;
    tilesets: Tileset[];
    selectedTile: SelectedTile | null;
    onSelectTile: (tile: SelectedTile) => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-4">
        <h3 className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 mb-2 border-b border-gray-300 dark:border-gray-700 pb-1">{title}</h3>
        {children}
    </div>
);

const TilesetViewer: React.FC<{ tileset: Tileset; selectedTile: SelectedTile | null; onSelectTile: (tile: SelectedTile) => void; }> = ({ tileset, selectedTile, onSelectTile }) => {
    const { id, src, tileWidth, tileHeight, imageWidth, imageHeight } = tileset;
    
    const tiles = useMemo(() => {
        const tileList = [];
        const cols = Math.floor(imageWidth / tileWidth);
        const rows = Math.floor(imageHeight / tileHeight);
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                tileList.push({ tileX: x, tileY: y });
            }
        }
        return tileList;
    }, [imageWidth, imageHeight, tileWidth, tileHeight]);

    return (
        <div className="bg-gray-300 dark:bg-gray-800 p-2 rounded max-h-64 overflow-y-auto">
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${tileWidth}px, 1fr))` }}>
                {tiles.map(({ tileX, tileY }) => {
                    const isSelected = selectedTile?.tilesetId === id && selectedTile?.tileX === tileX && selectedTile?.tileY === tileY;
                    return (
                        <div
                            key={`${tileX}-${tileY}`}
                            onClick={() => onSelectTile({ tilesetId: id, tileX, tileY })}
                            className={`w-[${tileWidth}px] h-[${tileHeight}px] cursor-pointer hover:outline-blue-400 outline-2 ${isSelected ? 'outline outline-blue-500' : ''}`}
                            style={{
                                width: `${tileWidth}px`,
                                height: `${tileHeight}px`,
                                backgroundImage: `url(${src})`,
                                backgroundPosition: `-${tileX * tileWidth}px -${tileY * tileHeight}px`,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

const TilemapTools: React.FC<TilemapToolsProps> = ({ activeTool, setActiveTool, selectedColor, onSelectColor, tilesets, selectedTile, onSelectTile }) => {
    const [openTilesetId, setOpenTilesetId] = useState<number | null>(tilesets.length > 0 ? tilesets[0].id : null);

    return (
        <div>
            <Section title="Tools">
                <div className="flex space-x-2">
                    <button onClick={() => setActiveTool('brush')} className={`p-2 rounded ${activeTool === 'brush' ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'}`}>
                        <BrushIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => setActiveTool('eraser')} className={`p-2 rounded ${activeTool === 'eraser' ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'}`}>
                        <EraserIcon className="w-5 h-5" />
                    </button>
                </div>
            </Section>

            <Section title="Color Palette">
                <div className="grid grid-cols-5 gap-2">
                    {DEFAULT_PALETTE.map(color => (
                        <div
                            key={color}
                            onClick={() => onSelectColor(color)}
                            className={`w-full aspect-square rounded cursor-pointer border-2 ${selectedColor === color ? 'border-blue-500 scale-110' : 'border-transparent'}`}
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </Section>
            
            <Section title="Tilesets">
                 <div className="space-y-2">
                    {tilesets.map(tileset => (
                        <div key={tileset.id}>
                            <button
                                onClick={() => setOpenTilesetId(openTilesetId === tileset.id ? null : tileset.id)}
                                className="w-full text-left text-sm font-medium p-2 bg-gray-300 dark:bg-gray-800 rounded hover:bg-gray-400 dark:hover:bg-gray-700"
                            >
                                {tileset.name}
                            </button>
                            {openTilesetId === tileset.id && (
                                <TilesetViewer tileset={tileset} selectedTile={selectedTile} onSelectTile={onSelectTile} />
                            )}
                        </div>
                    ))}
                    {tilesets.length === 0 && <p className="text-xs text-gray-500">Import a tileset in the bottom panel to get started.</p>}
                </div>
            </Section>
        </div>
    );
};

export default TilemapTools;
