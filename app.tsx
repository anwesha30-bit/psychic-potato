
import React, { useState, useCallback } from 'react';
import { Theme, ViewMode, Tool, Tile, Tileset, SelectedTile } from './types';
import Header from './components/Header';
import LeftPanel from './components/LeftPanel';
import CenterPanel from './components/CenterPanel';
import RightPanel from './components/RightPanel';
import BottomPanel from './components/BottomPanel';
import { GRID_WIDTH, GRID_HEIGHT } from './constants';

const DEFAULT_TILESET_SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAgCAYAAACinX6EAAAAaklEQVR42u3PMQoAIAwEwPz/04tDQxsg1agKCHt54wUAAADgo7M731/85/4WICBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECCQAK502QHTYQeu9gAAAABJRU5ErkJggg==';

const defaultTileset: Tileset = {
    id: 1,
    name: 'Default Tiles',
    src: DEFAULT_TILESET_SRC,
    tileWidth: 32,
    tileHeight: 32,
    imageWidth: 64,
    imageHeight: 32,
};

const App: React.FC = () => {
    const [theme, setTheme] = useState<Theme>('dark');
    const [viewMode, setViewMode] = useState<ViewMode>('2D');
    const [activeTool, setActiveTool] = useState<Tool>('brush');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [gridData, setGridData] = useState<Array<Tile | null>>(() => Array(GRID_WIDTH * GRID_HEIGHT).fill(null));
    const [tilesets, setTilesets] = useState<Tileset[]>([defaultTileset]);
    const [selectedTile, setSelectedTile] = useState<SelectedTile | null>({
        tilesetId: defaultTileset.id,
        tileX: 0,
        tileY: 0,
    });

    const toggleTheme = useCallback(() => {
        setTheme(currentTheme => {
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.classList.remove(currentTheme);
            document.documentElement.classList.add(newTheme);
            return newTheme;
        });
    }, []);
    
    React.useEffect(() => {
        document.documentElement.classList.add(theme);
    }, [theme]);

    const handleCellPaint = useCallback((index: number) => {
        setGridData(prevGrid => {
            const newGrid = [...prevGrid];
            if (activeTool === 'brush') {
                if (selectedTile) {
                    newGrid[index] = { type: 'tile', ...selectedTile };
                } else if (selectedColor) {
                    newGrid[index] = { type: 'color', value: selectedColor };
                }
            } else if (activeTool === 'eraser') {
                newGrid[index] = null;
            }
            return newGrid;
        });
    }, [activeTool, selectedColor, selectedTile]);
    
    const handleAddTileset = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const newTileset: Tileset = {
                    id: Date.now(),
                    name: file.name,
                    src: e.target?.result as string,
                    tileWidth: 32, // Assuming 32x32, could be configurable
                    tileHeight: 32,
                    imageWidth: img.width,
                    imageHeight: img.height,
                };
                setTilesets(prev => [...prev, newTileset]);
            };
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    };

    const handleSelectTile = useCallback((tile: SelectedTile) => {
        setSelectedTile(tile);
        setSelectedColor(''); // Deselect color
    }, []);
    
    const handleSelectColor = useCallback((color: string) => {
        setSelectedColor(color);
        setSelectedTile(null); // Deselect tile
    }, []);

    return (
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-sans antialiased overflow-hidden">
            <Header
                theme={theme}
                toggleTheme={toggleTheme}
                viewMode={viewMode}
                setViewMode={setViewMode}
            />
            <main className="flex flex-1 overflow-hidden">
                <LeftPanel />
                <div className="flex flex-col flex-1">
                    <CenterPanel 
                        viewMode={viewMode} 
                        gridData={gridData}
                        tilesets={tilesets}
                        onCellPaint={handleCellPaint}
                    />
                    <BottomPanel 
                        tilesets={tilesets} 
                        onAddTileset={handleAddTileset} 
                    />
                </div>
                <RightPanel 
                    activeTool={activeTool}
                    setActiveTool={setActiveTool}
                    selectedColor={selectedColor}
                    onSelectColor={handleSelectColor}
                    tilesets={tilesets}
                    selectedTile={selectedTile}
                    onSelectTile={handleSelectTile}
                />
            </main>
        </div>
    );
};

export default App;
